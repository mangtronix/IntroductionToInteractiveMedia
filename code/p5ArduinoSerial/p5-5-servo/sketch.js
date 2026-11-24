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
// Uses the p5.webserial library by gohai (loaded in index.html)
//
// Remember: close the Arduino Serial Monitor before connecting. Only one
// program can use the serial port at a time.
//
// For demo only, not intended for production code
//
// Made by Michael Ang with Claude Fable 5.2
//
// MIT License

let port;
let connectButton;
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
  } else {
    port.close();
  }
}

// Sending: tell the Arduino the position, but only when it has changed
function sendPosition() {
  let position = positionSlider.value();

  let changed = position != lastPositionSent;
  let timeSinceSend = millis() - lastSendTime;

  if (port.opened() && changed && timeSinceSend >= 50) {
    // Join the word and the number into one message: "SERVO 90"
    let msg = "SERVO " + position;

    port.write(msg + "\n"); // "\n" marks the end of the message
    lastSent = msg;

    // Remember what we sent and when, for the comparisons next time
    lastPositionSent = position;
    lastSendTime = millis();
  }
}

function draw() {
  sendPosition();

  background(220);

  // Draw our own servo arm so we can compare it with the real one.
  // 0 degrees points left, 90 points up and 180 points right.
  let position = positionSlider.value();
  let angle = radians(180 + position);
  stroke(60);
  strokeWeight(12);
  line(200, 260, 200 + cos(angle) * 130, 260 + sin(angle) * 130);
  noStroke();
  fill(60);
  circle(200, 260, 40);

  fill(0);
  text("Drag the slider to move the servo", 10, 25);
  text("position = " + position, 10, 50);
  text("Sent: " + lastSent, 10, 75);

  if (port.opened()) {
    connectButton.html("Disconnect");
  } else {
    connectButton.html("Connect to Arduino");
  }
}
