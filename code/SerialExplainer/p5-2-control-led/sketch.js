// Serial step 2: p5 talks
//
// Click the "LED ON" and "LED OFF" buttons to control the LED on the
// Arduino. Each button sends the message written on it - the same
// messages you typed by hand in the Arduino Serial Monitor.
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
let ledOnButton;
let ledOffButton;

let ledOn = false; // what we last told the Arduino
let lastMessage = ""; // the latest message we sent, so we can show it

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
  } else {
    port.close();
  }
}

function sendLedOn() {
  // Send the message. The "\n" is a newline: it marks the end of the
  // message so the Arduino knows it has received all of it.
  port.write("LED ON\n");
  lastMessage = "LED ON";
  ledOn = true;
}

function sendLedOff() {
  port.write("LED OFF\n");
  lastMessage = "LED OFF";
  ledOn = false;
}

function draw() {
  background(220);

  // Draw our own LED so we can compare it with the real one
  if (ledOn) {
    fill(255, 0, 0);
  } else {
    fill(90, 0, 0);
  }
  circle(width / 2, height / 2, 150);

  fill(0);
  text("Use the buttons to switch the LED", 10, 25);
  text("Last message sent: " + lastMessage, 10, 50);

  if (port.opened()) {
    connectButton.html("Disconnect");
  } else {
    connectButton.html("Connect to Arduino");
  }
}
