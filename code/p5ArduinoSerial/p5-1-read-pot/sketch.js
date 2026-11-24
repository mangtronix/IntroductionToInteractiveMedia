// Serial step 1: p5 listens
//
// The Arduino sends messages like "POT 512" when you turn the
// potentiometer. This sketch reads them and uses the number to set the
// size of a circle.
//
// Arduino sketch: SerialExplainer.ino
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

let pot = 0; // the latest potentiometer reading, 0 to 1023
let lastMessage = ""; // the latest message, so we can show it

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
  } else {
    port.close();
  }
}

function draw() {
  // Read one whole message, up to the newline at the end.
  // If a whole message hasn't arrived yet we get an empty string.
  let msg = port.readUntil("\n");

  if (msg.length > 0) {
    msg = trim(msg); // remove the line ending:  "POT 512"
    lastMessage = msg;

    let parts = split(msg, " "); // split at the space: ["POT", "512"]

    if (parts[0] == "POT") {
      pot = int(parts[1]); // turn the text "512" into the number 512
    }
  }

  background(220);

  // Use the number: the potentiometer sets the size of the circle
  let diameter = map(pot, 0, 1023, 10, 380);
  fill(255, 150, 0);
  circle(width / 2, height / 2, diameter);

  fill(0);
  text("Last message: " + lastMessage, 10, 25);
  text("pot = " + pot, 10, 50);

  if (port.opened()) {
    connectButton.html("Disconnect");
  } else {
    connectButton.html("Connect to Arduino");
  }
}
