// Serial step 5: a servo
//
// So far p5 has sent messages that are complete in themselves, like
// "LED ON". This one carries a value: the position the servo should
// move to, from 0 to 180 degrees.
//
//   p5 -> Arduino    "SERVO 90"   move the servo to 90 degrees
//
// Drag the slider to move the servo. A message is only sent when the
// slider has moved, and at most 20 times a second, so the Arduino isn't
// flooded with messages. It is the same idea the Arduino uses when it
// sends the potentiometer reading.
//
// Arduino sketch: p5ArduinoSerial.ino
// p5 editor copy: https://editor.p5js.org/mangtronix/sketches/vO1mlVwjb
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
let triedToConnect = false; // has the Connect button been pressed?
let wasConnected = false; // were we connected a moment ago?
let positionSlider;

let lastPositionSent = -1; // the last position we told the Arduino
let lastSendTime = 0; // when we sent it (in milliseconds)
let lastSent = ""; // the latest message, so we can show it

function setup() {
  createCanvas(400, 400);
  textSize(16);

  port = createSerial();

  // The browser only lets us open a serial port when the user asks for
  // it, e.g. by clicking a button
  connectButton = createButton("Connect to Arduino");
  connectButton.mousePressed(connectToArduino);

  // A slider from 0 to 180, starting at 90
  positionSlider = createSlider(0, 180, 90);
}

function connectToArduino() {
  if (!port.opened()) {
    port.open(9600); // must match Serial.begin(9600) on the Arduino
    // For faster transmission use 57600, and change it on the Arduino too:
    // port.open(57600);
    triedToConnect = true;
    wasConnected = false;
  } else {
    port.close();
    triedToConnect = false;
    wasConnected = false;
  }
}

// What to tell the user while there is no connection
function connectionStatus() {
  if (!triedToConnect) {
    return "Press Connect to Arduino";
  }
  if (wasConnected) {
    return "Connection lost. Check the USB cable,\nthen press Connect to Arduino";
  }
  return (
    "Choose your Arduino in the list.\n" +
    "If it doesn't connect, close the Arduino\n" +
    "Serial Monitor and any other tab that is\n" +
    "using the Arduino, then try again."
  );
}

// Sending: tell the Arduino the position, but only when it has changed
function sendPosition() {
  let servoPosition = positionSlider.value();

  let changed = servoPosition != lastPositionSent;
  let timeSinceSend = millis() - lastSendTime;

  if (port.opened() && changed && timeSinceSend >= 50) {
    // Join the word and the number into one message: "SERVO 90"
    let msg = "SERVO " + servoPosition;

    port.write(msg + "\n"); // "\n" marks the end of the message
    lastSent = msg;

    // Remember what we sent and when, for the comparisons next time
    lastPositionSent = servoPosition;
    lastSendTime = millis();
  }
}

function draw() {
  sendPosition();

  background(220);

  // Draw our own servo arm so we can compare it with the real one.
  // 0 degrees points left, 90 points up and 180 points right.
  let servoPosition = positionSlider.value();
  let angle = radians(180 + servoPosition);
  stroke(60);
  strokeWeight(12);
  line(200, 260, 200 + cos(angle) * 130, 260 + sin(angle) * 130);
  noStroke();
  fill(60);
  circle(200, 260, 40);

  fill(0);
  // Say what to do next: connect first, then use the sketch
  if (port.opened()) {
    wasConnected = true;
    connectButton.html("Disconnect");
    text("Drag the slider to move the servo", 10, 25);
    text("position = " + servoPosition, 10, 50);
    text("Sent: " + lastSent, 10, 75);
  } else {
    connectButton.html("Connect to Arduino");
    text(connectionStatus(), 10, 25);
  }
}
