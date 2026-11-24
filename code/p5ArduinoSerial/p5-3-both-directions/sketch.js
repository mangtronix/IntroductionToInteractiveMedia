// Serial step 3: both directions
//
// This combines the two previous steps. The two directions are
// independent of each other:
//
//   Arduino -> p5    "POT 512"              sets the size of the circle
//   p5 -> Arduino    "LED ON" / "LED OFF"   sent by the two buttons
//
// Arduino sketch: p5ArduinoSerial.ino
// p5 editor copy: https://editor.p5js.org/mangtronix/sketches/5ne2zOz-E
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
let ledOn = false; // what we last told the Arduino

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
    msg = msg.trim(); // remove the line ending:  "POT 512"
    lastReceived = msg;

    let parts = msg.split(" "); // split at the space: ["POT", "512"]

    if (parts[0] == "POT") {
      pot = int(parts[1]); // turn the text "512" into the number 512
    }
  }
}

// Sending: each button sends its own message
function sendLedOn() {
  port.write("LED ON\n"); // "\n" marks the end of the message
  lastSent = "LED ON";
  ledOn = true;
}

function sendLedOff() {
  port.write("LED OFF\n");
  lastSent = "LED OFF";
  ledOn = false;
}

function draw() {
  receiveMessage();

  background(220);

  // The potentiometer sets the size of the circle,
  // and the circle is bright when the LED is on
  let diameter = map(pot, 0, 1023, 10, 380);
  if (ledOn) {
    fill(255, 0, 0);
  } else {
    fill(90, 0, 0);
  }
  circle(width / 2, height / 2, diameter);

  fill(0);
  text("Turn the potentiometer, use the buttons for the LED", 10, 25);
  text("Received: " + lastReceived, 10, 50);
  text("Sent: " + lastSent, 10, 75);

  if (port.opened()) {
    connectButton.html("Disconnect");
  } else {
    connectButton.html("Connect to Arduino");
  }
}
