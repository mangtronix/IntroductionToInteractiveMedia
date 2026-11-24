// Serial step 2: p5 talks
//
// Click the "LED ON" and "LED OFF" buttons to control the LED on the
// Arduino. Each button sends the message written on it - the same
// messages you typed by hand in the Arduino Serial Monitor.
//
// Arduino sketch: p5ArduinoSerial.ino
// p5 editor copy: https://editor.p5js.org/mangtronix/sketches/2F9qXmmkm
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
  // Say what to do next: connect first, then use the sketch
  if (port.opened()) {
    wasConnected = true;
    connectButton.html("Disconnect");
    text("Use the buttons to switch the LED", 10, 25);
    text("Last message sent: " + lastMessage, 10, 50);
  } else {
    connectButton.html("Connect to Arduino");
    text(connectionStatus(), 10, 25);
  }
}
