// Serial step 4: buttons
//
// This adds a second kind of message from the Arduino. The potentiometer
// sends one number. The four buttons send four values in one message,
// separated by commas: 1 for a button that is pressed, 0 for one that
// is not.
//
//   Arduino -> p5    "POT 512"              sets the size of the circle
//                    "B 0,1,0,0"            shows an arrow for each button
//   p5 -> Arduino    "LED ON" / "LED OFF"   sent by the two buttons
//
// Both kinds of message are read the same way. The first word tells us
// which one it is, and so what to do with the rest.
//
// Arduino sketch: p5ArduinoSerial.ino
// p5 editor copy: https://editor.p5js.org/mangtronix/sketches/wYxJaFu3n
// (keep that copy and this file in sync)
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
let ledOnButton;
let ledOffButton;

let pot = 0; // the latest potentiometer reading, 0 to 1023
let buttons = ["0", "0", "0", "0"]; // the four buttons: "1" is pressed

let lastReceived = ""; // latest message from the Arduino
let lastSent = ""; // latest message to the Arduino

function setup() {
  createCanvas(400, 400);
  textSize(16);

  port = createSerial();

  // The browser only lets us open a serial port when the user asks for
  // it, e.g. by clicking a button
  connectButton = createButton("Connect to Arduino");
  connectButton.mousePressed(connectToArduino);

  // One button for each message we can send
  ledOnButton = createButton("LED ON");
  ledOnButton.mousePressed(sendLedOn);

  ledOffButton = createButton("LED OFF");
  ledOffButton.mousePressed(sendLedOff);
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
    lastReceived = msg;

    let parts = msg.split(" "); // split at the space: ["B", "0,1,0,0"]

    // The first word says what kind of message this is
    if (parts[0] == "POT") {
      pot = int(parts[1]); // turn the text "512" into the number 512
    } else if (parts[0] == "B") {
      buttons = parts[1].split(","); // split at commas: ["0", "1", "0", "0"]
    }
  }
}

// Sending: each button sends its own message
function sendLedOn() {
  port.write("LED ON\n"); // "\n" marks the end of the message
  lastSent = "LED ON";
}

function sendLedOff() {
  port.write("LED OFF\n");
  lastSent = "LED OFF";
}

function draw() {
  receiveMessage();

  background(220);

  // The potentiometer sets the size of the circle
  let diameter = map(pot, 0, 1023, 10, 100);
  fill(255, 150, 0);
  circle(width / 2, height / 2, diameter);

  // Each button that is pressed shows an arrow, in the button's colour
  if (buttons[0] == "1") {
    fill(220, 45, 45); // red
    drawArrow(180); // left
  }
  if (buttons[1] == "1") {
    fill(245, 200, 30); // yellow
    drawArrow(270); // up
  }
  if (buttons[2] == "1") {
    fill(45, 165, 75); // green
    drawArrow(90); // down
  }
  if (buttons[3] == "1") {
    fill(40, 110, 230); // blue
    drawArrow(0); // right
  }

  fill(0);
  text("Turn the potentiometer, press the buttons", 10, 25);
  text("Received: " + lastReceived, 10, 50);
  text("Sent: " + lastSent, 10, 75);

  if (port.opened()) {
    connectButton.html("Disconnect");
  } else {
    connectButton.html("Connect to Arduino");
  }
}

// Draw an arrow pointing out from the middle of the canvas.
// angle is in degrees: 0 points right, 90 down, 180 left, 270 up.
function drawArrow(angle) {
  push();
  translate(width / 2, height / 2);
  rotate(radians(angle));
  beginShape();
  vertex(60, -10);
  vertex(88, -10);
  vertex(88, -24);
  vertex(112, 0);
  vertex(88, 24);
  vertex(88, 10);
  vertex(60, 10);
  endShape(CLOSE);
  pop();
}
