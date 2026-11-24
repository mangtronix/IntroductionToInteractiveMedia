// serialTap.js - show the serial messages between p5.js and Arduino in the console
//
// Only one program can use a serial port at a time, so the Arduino Serial
// Monitor can't be open while your p5 sketch is connected. This file lets you
// see the conversation anyway: it copies every message that passes through
// the Web Serial port to the console, in both directions.
//
// To use it, add this line to index.html (before or after p5.webserial):
//
//   <script src="https://cdn.jsdelivr.net/gh/mangtronix/IntroductionToInteractiveMedia@master/code/serialTap.js"></script>
//
// Or put a copy of this file next to your sketch and use:
//
//   <script src="serialTap.js"></script>
//
// You don't need to change your sketch. The console will show e.g.
//
//   Arduino → p5   512,301\r\n
//   p5 → Arduino   0,0\n
//   p5 → Arduino   … same ×57
//
// Line endings are shown as \r and \n so you can check what is really sent.
// A message that is identical to the previous one in the same direction is
// not printed again; instead you get a count ("… same ×57").
//
// Settings (put these in setup(), or type them in the browser console):
//
//   serialTap.mode = "collapse";  // default: count repeated messages
//   serialTap.mode = "all";       // print every single message
//   serialTap.mode = "off";       // print nothing
//
// Works in Chrome and Edge (the browsers that support Web Serial).
//
// Made by Michael Ang with Claude Fable 5.2
//
// MIT License

(function () {
  const root = typeof globalThis !== "undefined" ? globalThis : window;

  // ---------------------------------------------------------------------
  // Settings
  //
  // Everything a user might want to change lives in one object, which is
  // made global as `serialTap` so it can be changed from the sketch or
  // typed into the browser console while the sketch is running.
  // ---------------------------------------------------------------------

  const tap = {
    mode: "collapse", // "collapse", "all" or "off"
    repeatReportMs: 2000, // how often to report the count during a long run of repeats
    partialLineMs: 300, // print data that has no newline after this much silence
    log: (...args) => console.log(...args), // where the output goes
  };
  root.serialTap = tap;

  // ---------------------------------------------------------------------
  // Browser check
  //
  // Without Web Serial there is no port to tap, so say why and stop here
  // rather than failing later with a confusing error.
  // ---------------------------------------------------------------------

  if (typeof root.SerialPort === "undefined") {
    tap.log("[serialTap] This browser doesn't support Web Serial - use Chrome or Edge");
    return;
  }

  // ---------------------------------------------------------------------
  // Formatting
  //
  // The goal is output a beginner can read at a glance: each line says who
  // sent the message, and characters that are normally invisible (like the
  // newline that ends a message) are spelled out, because a missing or
  // extra line ending is one of the most common serial bugs.
  // ---------------------------------------------------------------------

  const LABELS = {
    in: "Arduino → p5  ",
    out: "p5 → Arduino  ",
  };

  // Make invisible characters visible
  function escapeText(text) {
    return text.replace(/[\u0000-\u001f\u007f\\]/g, (c) => {
      if (c === "\n") return "\\n";
      if (c === "\r") return "\\r";
      if (c === "\t") return "\\t";
      if (c === "\\") return "\\\\";
      return "\\x" + c.charCodeAt(0).toString(16).padStart(2, "0");
    });
  }

  // ---------------------------------------------------------------------
  // Channels: turning raw bytes into readable messages
  //
  // Serial data arrives as a stream of bytes that can be split anywhere,
  // e.g. "512,3" then "01\r\n". A channel glues those pieces back together
  // and only prints once it has a whole line, so the console shows the
  // messages the sketches actually sent.
  //
  // It also keeps the console readable when the same message is sent over
  // and over (which is normal in a call-and-response exchange): a repeat is
  // counted instead of printed. Anything that changes, even by one digit,
  // is always printed.
  //
  // There is one channel per direction so that the two sides of the
  // conversation are assembled and counted independently.
  // ---------------------------------------------------------------------

  function makeChannel(direction) {
    const label = LABELS[direction];
    let decoder = new TextDecoder();
    let pending = ""; // text received so far without a newline
    let pendingTimer = null;
    let lastLine = null;
    let repeats = 0;

    // Print how many times the last message was repeated, then start over
    function reportRepeats() {
      if (repeats > 0 && tap.mode === "collapse") {
        tap.log(label + " … same ×" + repeats);
      }
      repeats = 0;
    }

    // Decide what to do with one complete message: print it or count it
    function emit(line) {
      if (tap.mode === "off") return;
      if (tap.mode === "collapse" && line === lastLine) {
        repeats++;
        return;
      }
      reportRepeats();
      lastLine = line;
      tap.log(label + " " + escapeText(line));
    }

    // Data that never gets a newline (e.g. Serial.print instead of
    // Serial.println) would otherwise stay hidden forever, so after a short
    // silence it is printed as it is
    function flushPending() {
      pendingTimer = null;
      if (pending.length > 0) {
        emit(pending);
        pending = "";
      }
    }

    return {
      // chunk is a Uint8Array, ArrayBuffer or string
      data(chunk) {
        let text;
        if (typeof chunk === "string") {
          text = chunk;
        } else {
          const bytes = chunk instanceof ArrayBuffer ? new Uint8Array(chunk) : chunk;
          text = decoder.decode(bytes, { stream: true });
        }
        pending += text;

        let newline;
        while ((newline = pending.indexOf("\n")) !== -1) {
          emit(pending.slice(0, newline + 1));
          pending = pending.slice(newline + 1);
        }

        clearTimeout(pendingTimer);
        pendingTimer = null;
        if (pending.length > 0) {
          pendingTimer = setTimeout(flushPending, tap.partialLineMs);
        }
      },
      reportRepeats,
      // Print anything still waiting and forget the last message, so a new
      // connection starts with a clean slate
      reset() {
        clearTimeout(pendingTimer);
        flushPending();
        reportRepeats();
        lastLine = null;
        decoder = new TextDecoder();
      },
    };
  }

  const channels = { in: makeChannel("in"), out: makeChannel("out") };

  // ---------------------------------------------------------------------
  // Heartbeat
  //
  // A repeat count is normally printed when the message changes. If it
  // never changes, the console would go silent and look like the
  // connection had died. So while the port is open, the counts are also
  // reported every couple of seconds to show the conversation is alive.
  // ---------------------------------------------------------------------

  let reportTimer = null;
  function startReporting() {
    if (reportTimer === null) {
      reportTimer = setInterval(() => {
        channels.in.reportRepeats();
        channels.out.reportRepeats();
      }, tap.repeatReportMs);
    }
  }
  function stopReporting() {
    clearInterval(reportTimer);
    reportTimer = null;
  }

  // Status messages about the port itself (not data), marked with [serial]
  function note(message) {
    if (tap.mode !== "off") tap.log("[serial] " + message);
  }

  // ---------------------------------------------------------------------
  // Tapping the port
  //
  // This is the "passthrough" part. The sketch must keep working exactly
  // as if this file wasn't here, so we don't replace the serial port or
  // take the data away from the sketch. Instead we listen in at the two
  // places every byte has to pass through.
  //
  // p5.webserial (and other Web Serial code) reads with
  //   port.readable.getReader().read()
  // and writes with
  //   port.writable.getWriter().write(data)
  // We wrap read() and write() so they hand a copy of the data to a
  // channel and otherwise behave exactly as before.
  //
  // The wrapping is done on SerialPort.prototype, which is shared by every
  // port, so it works no matter which port is chosen or when it is opened,
  // and it doesn't matter whether this file loads before or after
  // p5.webserial.
  //
  // Any error inside the tap is swallowed on purpose: a bug in a debugging
  // tool must never break the sketch being debugged.
  // ---------------------------------------------------------------------

  const proto = root.SerialPort.prototype;
  const tapped = new WeakSet(); // streams we have already wrapped

  // Incoming data (Arduino → p5): copy whatever read() returns
  function tapReadable(stream) {
    if (!stream || tapped.has(stream)) return stream;
    tapped.add(stream);
    const getReader = stream.getReader;
    stream.getReader = function (...args) {
      const reader = getReader.apply(this, args);
      const read = reader.read;
      reader.read = async function (...readArgs) {
        const result = await read.apply(this, readArgs);
        try {
          if (result && result.value) channels.in.data(result.value);
        } catch (e) {
          // never let the tap break the sketch
        }
        return result;
      };
      return reader;
    };
    return stream;
  }

  // Outgoing data (p5 → Arduino): copy whatever is passed to write()
  function tapWritable(stream) {
    if (!stream || tapped.has(stream)) return stream;
    tapped.add(stream);
    const getWriter = stream.getWriter;
    stream.getWriter = function (...args) {
      const writer = getWriter.apply(this, args);
      const write = writer.write;
      writer.write = function (chunk) {
        try {
          if (chunk !== undefined) channels.out.data(chunk);
        } catch (e) {
          // never let the tap break the sketch
        }
        return write.apply(this, arguments);
      };
      return writer;
    };
    return stream;
  }

  // The streams are created fresh each time a port is opened, so we can't
  // wrap them once at startup. Instead we intercept `port.readable` and
  // `port.writable` themselves and wrap each stream the first time the
  // sketch asks for it.
  function wrapGetter(name, tapStream) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, name);
    if (!descriptor || !descriptor.get) return false;
    Object.defineProperty(proto, name, {
      ...descriptor,
      get() {
        return tapStream(descriptor.get.call(this));
      },
    });
    return true;
  }

  // If the browser's SerialPort doesn't look the way we expect, say so
  // instead of silently showing nothing
  const ok = wrapGetter("readable", tapReadable) && wrapGetter("writable", tapWritable);
  if (!ok) {
    tap.log("[serialTap] Couldn't attach to the serial port - messages won't be shown");
    return;
  }

  // ---------------------------------------------------------------------
  // Connection events
  //
  // Knowing when the port opened, closed or was unplugged explains a lot
  // of confusing behaviour (for example, opening the port resets an
  // Arduino Uno, which restarts its handshake). Each event is printed, and
  // also clears the channels so messages from one connection are never
  // mixed up with or compared to messages from the next.
  // ---------------------------------------------------------------------

  const open = proto.open;
  proto.open = async function (options) {
    const result = await open.apply(this, arguments);
    channels.in.reset();
    channels.out.reset();
    startReporting();
    note("port opened" + (options && options.baudRate ? " at " + options.baudRate + " baud" : ""));
    return result;
  };

  const close = proto.close;
  proto.close = async function () {
    const result = await close.apply(this, arguments);
    channels.in.reset();
    channels.out.reset();
    stopReporting();
    note("port closed");
    return result;
  };

  if (root.navigator && root.navigator.serial && root.navigator.serial.addEventListener) {
    root.navigator.serial.addEventListener("disconnect", () => {
      channels.in.reset();
      channels.out.reset();
      stopReporting();
      note("device unplugged");
    });
    root.navigator.serial.addEventListener("connect", () => note("device plugged in"));
  }
})();
