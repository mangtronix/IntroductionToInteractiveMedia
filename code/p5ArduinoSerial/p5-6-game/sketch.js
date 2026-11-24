// Serial step 6: a game
//
// Catch as many dots as you can before the time runs out. This puts
// everything from the earlier steps together, with messages going both
// ways the whole time. There are no new kinds of message.
//
//   Arduino -> p5    "B 0,1,0,0"   the buttons move the net:
//                                  red left, yellow up, green down, blue right
//                    "POT 512"     the size of the net. A big net catches
//                                  dots more easily, but moves more slowly
//   p5 -> Arduino    "LED ON" / "LED OFF"   flashes when you catch a dot
//                    "SERVO 90"    the servo arm is the clock. It moves
//                                  from 180 to 0 as the time runs out
//
// Press any button on the breadboard to start a round.
//
// Arduino sketch: p5ArduinoSerial.ino
// p5 editor copy: https://editor.p5js.org/mangtronix/sketches/I8v7OI_Z1
// (keep that copy and this file in sync)
// Uses the p5.webserial library by gohai (loaded in index.html)
//
// Remember: close the Arduino Serial Monitor before connecting. Only one
// program can use the serial port at a time.
//
// Made by Michael Ang with Claude Fable 5.2
//
// MIT License

let port;
let connectButton;

// What the Arduino last told us
let pot = 512; // potentiometer reading, 0 to 1023
let buttons = ["0", "0", "0", "0"]; // the four buttons: "1" is pressed

// The game
let roundLength = 30; // seconds
let playing = false;
let readyToStart = true; // false until all buttons have been let go
let roundStartTime = 0; // when this round started (in milliseconds)
let timeLeft = roundLength; // seconds left in this round
let score = 0;
let netX = 200; // the middle of the net
let netY = 200;
let dotX = 100; // the dot to catch
let dotY = 100;

// What we last told the Arduino, so we only send when something changes
let ledIsOn = false;
let ledOffTime = 0; // when to switch the LED off again (in milliseconds)
let lastPositionSent = -1;
let lastSendTime = 0;

function setup() {
  createCanvas(400, 400);
  textSize(16);

  port = createSerial();

  // The browser only lets us open a serial port when the user asks for
  // it, e.g. by clicking a button
  connectButton = createButton("Connect to Arduino");
  connectButton.mousePressed(connectToArduino);
}

function connectToArduino() {
  if (!port.opened()) {
    port.open(9600); // must match Serial.begin(9600) on the Arduino
    // For faster transmission use 57600, and change it on the Arduino too:
    // port.open(57600);
  } else {
    port.close();
  }
}

// Receiving: read a message from the Arduino, if there is one
function receiveMessage() {
  let msg = port.readUntil("\n");

  if (msg.length > 0) {
    msg = msg.trim(); // remove the line ending:  "B 0,1,0,0"
    let parts = msg.split(" "); // split at the space: ["B", "0,1,0,0"]

    // The first word says what kind of message this is
    if (parts[0] == "POT") {
      pot = int(parts[1]); // turn the text "512" into the number 512
    } else if (parts[0] == "B") {
      buttons = parts[1].split(","); // split at commas: ["0", "1", "0", "0"]
    }
  }
}

// Sending: switch the LED, but only send a message when it changes
function setLed(on) {
  if (on != ledIsOn) {
    if (on) {
      port.write("LED ON\n"); // "\n" marks the end of the message
    } else {
      port.write("LED OFF\n");
    }
    ledIsOn = on;
  }
}

// Sending: move the servo, but only when the position has changed, and
// at most 20 times a second
function setServo(servoPosition) {
  let changed = servoPosition != lastPositionSent;
  let timeSinceSend = millis() - lastSendTime;

  if (port.opened() && changed && timeSinceSend >= 50) {
    port.write("SERVO " + servoPosition + "\n");
    lastPositionSent = servoPosition;
    lastSendTime = millis();
  }
}

function startRound() {
  playing = true;
  score = 0;
  netX = width / 2;
  netY = height / 2;
  roundStartTime = millis();
  moveDot();
}

// Put the dot somewhere new, not too close to the edge
function moveDot() {
  dotX = random(30, width - 30);
  dotY = random(110, height - 30);
}

function draw() {
  receiveMessage();

  let anyButtonPressed = buttons.includes("1");

  // The potentiometer sets the size of the net, and with it the speed:
  // a small net is fast, a big net is slow
  let netSize = map(pot, 0, 1023, 30, 120);
  let netSpeed = map(pot, 0, 1023, 5, 1.5);

  if (playing) {
    // The buttons move the net
    if (buttons[0] == "1") {
      netX = netX - netSpeed; // red: left
    }
    if (buttons[1] == "1") {
      netY = netY - netSpeed; // yellow: up
    }
    if (buttons[2] == "1") {
      netY = netY + netSpeed; // green: down
    }
    if (buttons[3] == "1") {
      netX = netX + netSpeed; // blue: right
    }
    netX = constrain(netX, 0, width); // stay on the canvas
    netY = constrain(netY, 0, height);

    // Caught the dot? It is caught when it is inside the net.
    if (dist(netX, netY, dotX, dotY) < netSize / 2) {
      score = score + 1;
      moveDot();
      ledOffTime = millis() + 150; // flash the LED for 150 milliseconds
    }

    // The clock
    timeLeft = roundLength - (millis() - roundStartTime) / 1000;
    if (timeLeft <= 0) {
      timeLeft = 0;
      playing = false;
      readyToStart = false; // a button may still be held down
    }
  } else {
    // Waiting for a round to start. After a round, wait until all the
    // buttons are let go, so a held button doesn't start the next round.
    if (!anyButtonPressed) {
      readyToStart = true;
    } else if (readyToStart) {
      startRound();
    }
  }

  // Tell the Arduino: the LED flashes after a catch, and the servo shows
  // the time left (180 at the start of a round, 0 at the end)
  setLed(millis() < ledOffTime);
  setServo(round(map(timeLeft, 0, roundLength, 0, 180)));

  // Draw the game
  background(220);

  fill(255, 150, 0);
  noStroke();
  circle(dotX, dotY, 16); // the dot

  noFill();
  stroke(40, 110, 230);
  strokeWeight(4);
  circle(netX, netY, netSize); // the net

  noStroke();
  fill(0);
  text("Score: " + score, 10, 25);
  text("Time: " + ceil(timeLeft), 10, 50);
  if (!playing) {
    text("Press any button on the breadboard to start", 10, 75);
  }

  if (port.opened()) {
    connectButton.html("Disconnect");
  } else {
    connectButton.html("Connect to Arduino");
  }
}
