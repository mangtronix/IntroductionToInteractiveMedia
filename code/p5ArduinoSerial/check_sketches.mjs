// Checks that the p5 sketches in this folder still work on the latest p5.js.
//
// The sketches load p5.js without a version number, so they always get the
// newest release. That keeps the course on the current version, but a new
// release can break a sketch without anyone touching it. This script opens
// each sketch in a real browser, feeds it the messages an Arduino would
// send, and checks that it does the right thing with them.
//
// GitHub runs it when a file in this folder changes, and on request from
// the Actions page (see .github/workflows/p5-sketches.yml). When it fails,
// GitHub sends an email, and the log says which sketch broke and on which
// p5.js version.
//
// To run it yourself:
//
//   npm install --no-save playwright
//   npx playwright install chromium
//   node check_sketches.mjs
//
// No Arduino is needed: the serial port is never opened. Each sketch's
// port.readUntil() is replaced with one that hands over test messages.

import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const folder = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------
// What to check
//
// For each sketch: messages to pretend the Arduino sent (feed), something
// to do in the page (run), and what must then be true (expect). These are
// written as JavaScript that runs inside the sketch's page, so they can
// use the sketch's own variables.
// ---------------------------------------------------------------------

const CHECKS = [
  {
    sketch: "p5-1-read-pot",
    feed: ["POT 321\r\n"],
    expect: 'pot === 321 && lastMessage === "POT 321"',
  },
  {
    sketch: "p5-2-control-led",
    run: "sendLedOn()",
    expect: 'ledOn === true && lastMessage === "LED ON"',
  },
  {
    sketch: "p5-3-both-directions",
    feed: ["POT 55\r\n"],
    run: "sendLedOn()",
    expect: 'pot === 55 && lastSent === "LED ON"',
  },
  {
    sketch: "p5-4-button",
    feed: ["POT 700\r\n", "B 1,0,1,1\r\n"],
    expect: 'pot === 700 && buttons.join(",") === "1,0,1,1"',
  },
  {
    sketch: "p5-5-servo",
    run: "positionSlider.value(140)",
    expect: "positionSlider.value() === 140",
  },
  {
    // Any button starts a round; the blue button then moves the net right
    sketch: "p5-6-game",
    feed: ["POT 0\r\n", "B 0,0,0,1\r\n"],
    expect: "playing === true && pot === 0 && netX > 220",
  },
  {
    // The visualizer has a pretend Arduino, so it produces its own
    // messages. Speed it up, then wait for the first reading to arrive
    // and be used.
    sketch: "p5-visualizer",
    run: "speedSlider.value(0.3)",
    expect: "p5side.pot === 512 && p5side.diameter > 0",
  },
];

// ---------------------------------------------------------------------
// A small web server for this folder, so the pages load as they would
// from any website
// ---------------------------------------------------------------------

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };

const server = http.createServer((request, response) => {
  let file = path.join(folder, decodeURIComponent(request.url.split("?")[0]));
  if (file.endsWith(path.sep)) file = path.join(file, "index.html");
  if (!file.startsWith(folder) || !fs.existsSync(file)) {
    response.writeHead(404);
    response.end();
    return;
  }
  response.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(response);
});
await new Promise((resolve) => server.listen(0, resolve));
const base = `http://localhost:${server.address().port}`;

// ---------------------------------------------------------------------
// Run the checks
// ---------------------------------------------------------------------

// PW_CHANNEL=chrome uses the Chrome already installed on this computer
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined });
let failures = 0;
let p5Version = "unknown";

for (const check of CHECKS) {
  const page = await browser.newPage();
  const errors = [];
  const warnings = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    const text = message.text();
    if (text.includes("p5.js says")) {
      warnings.push(text.replace(/\s+/g, " ").trim());
    } else if (message.type() === "error" && !text.includes("Failed to load resource")) {
      errors.push(text);
    }
  });

  let problem = null;
  try {
    await page.goto(`${base}/${check.sketch}/`);
    // The sketch has started when draw() has run a few times
    await page.waitForFunction("typeof frameCount !== 'undefined' && frameCount > 5", null, { timeout: 30000 });
    p5Version = await page.evaluate("p5.VERSION");

    if (check.feed) {
      await page.evaluate(
        `(() => { const messages = ${JSON.stringify(check.feed)}; port.readUntil = () => messages.shift() || ""; })()`
      );
    }
    if (check.run) {
      await page.evaluate(check.run);
    }
    await page.waitForFunction(check.expect, null, { timeout: 15000 });
  } catch (error) {
    problem = error.message.split("\n")[0];
  }

  if (problem || errors.length > 0) {
    failures++;
    console.log(`FAIL  ${check.sketch}`);
    if (problem) console.log(`      ${problem}`);
    console.log(`      expected: ${check.expect}`);
    for (const error of errors.slice(0, 5)) console.log(`      error: ${error}`);
  } else {
    console.log(`ok    ${check.sketch}`);
  }
  // p5's own hints (for example about a name it has reserved). These don't
  // fail the check, but they often arrive one release before a real break.
  for (const warning of [...new Set(warnings)].slice(0, 5)) console.log(`      note: ${warning}`);

  await page.close();
}

await browser.close();
server.close();

console.log(`\np5.js version: ${p5Version}`);
if (failures > 0) {
  console.log(`${failures} of ${CHECKS.length} sketches failed on this version of p5.js.`);
  process.exit(1);
}
console.log(`All ${CHECKS.length} sketches work on this version of p5.js.`);
