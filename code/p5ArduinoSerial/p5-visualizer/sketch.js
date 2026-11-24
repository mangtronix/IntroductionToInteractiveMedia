// Serial Visualizer (part of p5 ↔ Arduino Serial)
//
// Draws the messages travelling between p5 and Arduino, in slow motion,
// so you can see how serial communication works. Each message is sent,
// travels along the wire, waits in the receiver's buffer, is read one
// character at a time up to the newline, and is then used. The line of
// code that is running at each moment is highlighted.
//
//   Arduino -> p5    "POT 512"              the potentiometer reading
//                    "B 0,1,0,0"            four buttons, 1 = pressed
//   p5 -> Arduino    "LED ON" / "LED OFF"   sent when you click a button
//                    "SERVO 90"             sent when you release the slider
//
// It starts in demo mode with a pretend Arduino, so it works without a
// board: drag the knob, hold a button and click the LED buttons. Click "Connect to
// Arduino" to use a real one.
//
// Arduino sketch: p5ArduinoSerial.ino
// p5 editor copy: https://editor.p5js.org/mangtronix/sketches/z3XNYpZA1
// (keep that copy and this file in sync)
// Uses the p5.webserial library by gohai (loaded in index.html)
//
// For demo only, not intended for production code
//
// Made by Michael Ang with Claude Fable 5.2
//
// MIT License

// ---------------------------------------------------------------------
// Layout and colours
//
// All positions are in one place so the drawing code below can talk
// about "the Arduino panel" or "the lane" instead of bare numbers.
// ---------------------------------------------------------------------

const ARDUINO_PANEL = { x: 15, y: 50, w: 180, h: 280 };
const P5_PANEL = { x: 565, y: 50, w: 180, h: 280 };
const WIRE_LEFT = ARDUINO_PANEL.x + ARDUINO_PANEL.w; // where the wires start
const WIRE_RIGHT = P5_PANEL.x; // and end

const KNOB = { x: 105, y: 135, r: 38 };
const LED = { x: 105, y: 265, r: 16 };

// The four pushbuttons, in the colours of the SparkFun Inventor's Kit.
// Each one shows an arrow on the p5 side, and they are laid out in the
// same cross as the arrows. x and y are each button's top left corner.
const BUTTON_SIZE = 32;
const BUTTONS = [
  { x: 52, y: 119, name: "red", rgb: [220, 45, 45], arrow: "left" },
  { x: 89, y: 82, name: "yellow", rgb: [245, 200, 30], arrow: "up" },
  { x: 89, y: 156, name: "green", rgb: [45, 165, 75], arrow: "down" },
  { x: 126, y: 119, name: "blue", rgb: [40, 110, 230], arrow: "right" },
];
const P5_CIRCLE = { x: 655, y: 125 };
const LED_ON_BUTTON = { x: 585, y: 250, w: 66, h: 40 };
const LED_OFF_BUTTON = { x: 659, y: 250, w: 66, h: 40 };
const SERVO = { x: 105, y: 268 }; // the servo drawn on the Arduino panel
const SERVO_SLIDER = { x: 595, y: 275, w: 120 }; // the slider on the p5 panel

const TILE_W = 24; // one character on the wire
const TILE_H = 28;

let ARDUINO_COLOR, P5_COLOR;

// ---------------------------------------------------------------------
// State
//
// Each side only knows what it has been told in a message. To make that
// visible we keep separate state for the Arduino and for p5, and only
// copy a value across when a message arrives.
// ---------------------------------------------------------------------

let port; // the serial port (p5.webserial)

let arduino = {
  pot: 512, // potentiometer reading
  buttons: [0, 0, 0, 0], // 1 for each button that is held down
  led: false, // is the LED lit?
  servo: 90, // the position the servo was told to go to, 0 to 180
  servoShown: 90, // where the drawn arm is now, on its way there
  lastPotSent: -1, // these three are used by the pretend Arduino,
  lastButtonsSent: "", // and work the same as in p5ArduinoSerial.ino
  lastSendTime: 0,
};

let p5side = {
  pot: 0, // the last reading p5 was told about
  diameter: 0, // the size of the circle p5 last drew
  buttons: ["0", "0", "0", "0"], // the button states p5 was last told
  arrows: ["0", "0", "0", "0"], // the arrows p5 last drew
  lastSent: "", // the last LED message p5 sent: "LED ON" or "LED OFF"
  servo: 90, // where the servo slider is, 0 to 180
  servoSent: 90, // the last position p5 sent
  lastServoSendTime: 0, // when it was sent (used in "Loop" mode)
};

// A lane is one direction of travel. Only one message is shown on a lane
// at a time; others sent meanwhile wait their turn.
let toP5 = makeLane(4);
let toArduino = makeLane(3);

function makeLane(steps) {
  return {
    steps: steps, // how many lines of code the receiver runs on a message
    // (a SERVO message takes one more line: see stepCount)
    flying: null, // { text, stage, stageStart } - the message being shown
    waiting: [], // messages waiting to be shown, oldest first
    lastRead: "", // text of the last message the receiver read
  };
}

let draggingKnob = false;
let draggingServo = false;
let heldButton = -1; // which pretend button the mouse is holding, or -1
let lastDragX, lastDragY; // where the mouse was at the last drag step

// Controls below the canvas
let connectButton, fullscreenButton, speedSlider, asciiCheckbox;
let canvasElement; // the canvas, so its displayed size can be changed
let potSendSelect; // "LOOP" or "CHANGE": when the Arduino sends
let showSelect; // "POT" or "B": which input is being explained
let outputSelect; // "LED" or "SERVO": which output is being explained

// Used to tell a real Arduino the send mode shortly after connecting
let wasConnected = false;
let tellArduinoAt = 0;

// ---------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------

function setup() {
  canvasElement = createCanvas(790, 490);
  textFont("monospace");

  ARDUINO_COLOR = color(0, 135, 143);
  P5_COLOR = color(237, 34, 93);

  port = createSerial();

  // The controls go under the canvas, in the "mainRow" block that is
  // written in index.html. style.css lays them out in a row.
  connectButton = createButton("Connect to Arduino");
  connectButton.mousePressed(connectToArduino);
  connectButton.parent("mainRow");

  fullscreenButton = createButton("Fullscreen");
  fullscreenButton.mousePressed(toggleFullscreen);
  fullscreenButton.parent("mainRow");

  let speedControl = createSpan("Speed: fast ");
  speedControl.parent("mainRow");
  speedSlider = createSlider(0.3, 5, 1.2, 0.1); // seconds to cross the wire
  speedSlider.parent(speedControl);
  createSpan(" slow").parent(speedControl);

  asciiCheckbox = createCheckbox(" Show ASCII codes", false); // the number sent for each character
  asciiCheckbox.parent("mainRow");

  // The three selectors are written in index.html
  potSendSelect = select("#potSend");
  potSendSelect.changed(tellArduinoSendMode);
  showSelect = select("#showInput");
  showSelect.changed(showChanged);
  outputSelect = select("#showOutput");
  outputSelect.changed(outputChanged);
}

// ---------------------------------------------------------------------
// Fullscreen
//
// Useful in the p5 editor, where the code takes up half the window: in
// fullscreen only the sketch is shown, as big as fits. The drawing code
// still works on a 790 x 490 canvas; only the size it is displayed at
// changes, so nothing else in the sketch needs to know about it.
// ---------------------------------------------------------------------

function toggleFullscreen() {
  fullscreen(!fullscreen());
}

// The window changes size when fullscreen starts or ends
function windowResized() {
  let zoom = 1;
  if (fullscreen()) {
    // As big as fits, counting the controls under the canvas (about 130
    // pixels tall) as part of what has to fit
    zoom = min(windowWidth / width, windowHeight / (height + 130));
  }
  // Set the displayed size on the canvas's HTML element directly. (Going
  // through p5's style() would also change width and height, and with
  // them where p5 thinks the mouse is.)
  canvasElement.elt.style.width = width * zoom + "px";
  canvasElement.elt.style.height = height * zoom + "px";

  // Make the controls bigger by the same amount, so they stay as wide
  // as the canvas and are easy to read from the back of a room
  select("#controls").style("zoom", zoom);
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

// ---------------------------------------------------------------------
// Main loop
//
// Every frame: collect new messages from the Arduino (real or pretend),
// move each message on to its next stage when it is time, then draw
// everything.
// ---------------------------------------------------------------------

function draw() {
  if (port.opened()) {
    readFromRealArduino();
  } else {
    runPretendArduino();
  }
  keepArduinoSendModeInStep();
  sendServoInLoopMode();

  updateLane(toP5, p5UsesMessage);
  updateLane(toArduino, arduinoUsesMessage);

  background(250);
  drawTitle();
  drawArduinoPanel();
  drawP5Panel();
  drawWire(toP5, 120, true);
  drawWire(toArduino, 250, false);
  drawArduinoExplanation();
  drawP5Explanation();

  connectButton.html(port.opened() ? "Disconnect" : "Connect to Arduino");
  fullscreenButton.html(fullscreen() ? "Exit fullscreen" : "Fullscreen");
}

// ---------------------------------------------------------------------
// Where messages come from
//
// With a real Arduino, messages come in over the serial port. In demo
// mode a pretend Arduino follows the same rules as p5ArduinoSerial.ino.
// The selector under the canvas chooses when the reading is sent:
//
//   Loop       both readings, every time round loop() (at most 20 times
//              a second)
//   On Change  a reading only when it has changed
// ---------------------------------------------------------------------

function readFromRealArduino() {
  // Several messages may have arrived since the last frame
  let msg = port.readUntil("\n");
  while (msg.length > 0) {
    // Show the real knob and buttons straight away
    let parts = msg.trim().split(" ");
    if (parts[0] == "POT") {
      arduino.pot = int(parts[1]);
    } else if (parts[0] == "B") {
      arduino.buttons = int(parts[1].split(","));
    }
    // Only the input chosen in the "Show" selector is explained
    if (parts[0] == showSelect.value()) {
      send(toP5, msg);
    }
    msg = port.readUntil("\n");
  }
}

// A real Arduino has to be told the send mode. This is sent straight
// away and is not drawn, because it controls the demonstration and is
// not part of the conversation being explained.
function tellArduinoSendMode() {
  if (port.opened()) {
    port.write("SEND " + potSendSelect.value() + "\n");
  }
}

// Opening the serial port restarts an Arduino Uno, which puts it back in
// its starting mode. So a couple of seconds after connecting (once it
// has restarted) we tell it the mode chosen in the selector.
function keepArduinoSendModeInStep() {
  if (port.opened() && !wasConnected) {
    tellArduinoAt = millis() + 2000;
  }
  wasConnected = port.opened();

  if (tellArduinoAt > 0 && millis() > tellArduinoAt) {
    tellArduinoSendMode();
    tellArduinoAt = 0;
  }
}

function runPretendArduino() {
  let mode = potSendSelect.value();
  if (millis() - arduino.lastSendTime < 50) {
    return;
  }

  // Only the input chosen in the "Show" selector is sent
  if (showSelect.value() == "POT") {
    // While the knob is being dragged nothing is sent in "On Change"
    // mode: the new value goes out once, when the mouse is let go. That
    // gives one message to follow, not a stream of them.
    let potChanged = !draggingKnob && abs(arduino.pot - arduino.lastPotSent) > 2;
    if (mode == "LOOP" || potChanged) {
      send(toP5, "POT " + arduino.pot + "\r\n"); // println ends with \r\n
      arduino.lastPotSent = arduino.pot;
      arduino.lastSendTime = millis();
    }
  } else {
    let states = arduino.buttons.join(","); // e.g. "0,1,0,0"
    if (mode == "LOOP" || states != arduino.lastButtonsSent) {
      send(toP5, "B " + states + "\r\n");
      arduino.lastButtonsSent = states;
      arduino.lastSendTime = millis();
    }
  }
}

// Changing which input is shown starts the explanation afresh: the wire
// is cleared, and the pretend Arduino sends the new input's reading
// The same for the output: clear the wire from p5 to the Arduino
function outputChanged() {
  toArduino.flying = null;
  toArduino.waiting = [];
  toArduino.lastRead = "";
}

function showChanged() {
  toP5.flying = null;
  toP5.waiting = [];
  toP5.lastRead = "";
  arduino.lastPotSent = -1;
  arduino.lastButtonsSent = "";
}

// ---------------------------------------------------------------------
// The life of a message
//
// A real serial message goes through all of this in a few thousandths of
// a second. To make it visible, each message is taken slowly through a
// list of stages, one after the other. Everything that is drawn (where
// the characters are, which line of code is highlighted) depends on
// which stage the message is in.
//
// Because this is so slow, only one message is shown per direction at a
// time, and the rest wait in a queue. A real Arduino sends many more
// messages than can be shown this slowly, so the queue is kept short:
// an exact repeat of a waiting message is dropped, and only the newest
// waiting potentiometer reading or servo position is kept. Button and
// LED messages are never dropped, so a quick press is always shown.
// ---------------------------------------------------------------------

// "time" is how long the stage lasts, compared to the time to cross the
// wire (which is set by the speed slider)
const STAGES = [
  { name: "send", time: 0.3 }, // the sender runs its line of code
  { name: "travel", time: 1 }, // the characters cross the wire
  { name: "wait", time: 0.4 }, // they sit in the receiver's buffer
  { name: "read", time: 0.9 }, // the receiver reads up to the newline
  { name: "fade", time: 0.4 }, // the buffer is now empty
  { name: "step0", time: 0.45 }, // the receiver uses the message:
  { name: "step1", time: 0.45 }, // a few lines of code, one at a time
  { name: "step2", time: 0.45 },
  { name: "step3", time: 0.45 }, // (only if the receiver has a 4th line)
];

// Which line of code is running: 0 for the first, or -1 if none is
function runningStep(lane) {
  let stage = stageName(lane);
  if (stage.startsWith("step")) {
    return int(stage[4]); // "step1" -> 1
  }
  return -1;
}

function send(lane, text) {
  if (lane.flying == null) {
    lane.flying = { text: text, stage: 0, stageStart: millis() };
    return;
  }

  // Find the newest waiting message of the same kind ("POT", "BUTTON"...)
  let kind = text.split(" ")[0];
  let same = -1;
  for (let i = 0; i < lane.waiting.length; i++) {
    if (lane.waiting[i].split(" ")[0] == kind) {
      same = i;
    }
  }

  if (same >= 0 && lane.waiting[same] == text) {
    return; // an exact repeat: nothing new to show
  }
  if (same >= 0 && (kind == "POT" || kind == "SERVO")) {
    lane.waiting[same] = text; // only the newest value matters
  } else {
    lane.waiting.push(text);
  }
}

// Which stage the lane's message is in, or "idle" if there is none
function stageName(lane) {
  if (lane.flying == null) {
    return "idle";
  }
  return STAGES[lane.flying.stage].name;
}

// How far through the current stage the message is, from 0 to 1
function stageProgress(lane) {
  let stageTime = STAGES[lane.flying.stage].time * speedSlider.value() * 1000;
  return constrain((millis() - lane.flying.stageStart) / stageTime, 0, 1);
}

// How many lines of code the receiver runs on the message being shown
function stepCount(lane) {
  if (lane.flying.text.startsWith("SERVO")) {
    return 4; // one more than an LED message: it has a number to get out
  }
  return lane.steps;
}

// Move the message on to its next stage when the current one is over
function updateLane(lane, useMessage) {
  if (lane.flying == null || stageProgress(lane) < 1) {
    return;
  }

  lane.flying.stage++;
  lane.flying.stageStart = millis();

  if (lane.flying.stage >= STAGES.length || runningStep(lane) >= stepCount(lane)) {
    // All done: make room for the next message
    lane.flying = null;
    if (lane.waiting.length > 0) {
      send(lane, lane.waiting.shift()); // the oldest waiting message
    }
  } else if (stageName(lane) == "fade") {
    // The receiver has finished reading and now has the message
    lane.lastRead = lane.flying.text;
  } else if (runningStep(lane) >= 0) {
    // A line of code runs, and may change something
    useMessage(lane.flying.text, runningStep(lane));
  }
}

// ---------------------------------------------------------------------
// What a message changes
//
// This is the moment information actually crosses from one side to the
// other, so it is the only place where one side's state is changed by
// the other. It happens when the receiver's code runs, not when the
// message arrives: until the receiver has read and understood the
// message, nothing changes. "step" says which line of code is running;
// the lines themselves are listed at the bottom of this file.
// ---------------------------------------------------------------------

function p5UsesMessage(text, step) {
  let parts = text.trim().split(" ");

  if (parts[0] == "POT") {
    if (step == 2) {
      p5side.pot = int(parts[1]); // pot = int(parts[1])
    } else if (step == 3) {
      p5side.diameter = p5side.pot / 10; // circle(x, y, pot / 10)
    }
  } else if (parts[0] == "B") {
    if (step == 2) {
      p5side.buttons = parts[1].split(","); // buttons = parts[1].split(",")
    } else if (step == 3) {
      p5side.arrows = p5side.buttons; // drawArrows(buttons)
    }
  }
}

function arduinoUsesMessage(text, step) {
  let msg = text.trim();
  let isServo = msg.startsWith("SERVO ");

  // Only the last line of code changes anything: digitalWrite for an LED
  // message (line 2), servo.write for a SERVO message (line 3)
  if (step != (isServo ? 3 : 2)) {
    return;
  }

  // The drawn LED or servo changes now. To keep the real one in step
  // with the picture, the real message is also sent now, not when you
  // clicked or dragged.
  if (port.opened()) {
    port.write(text);
  }

  if (msg == "LED ON") {
    arduino.led = true;
  } else if (msg == "LED OFF") {
    arduino.led = false;
  } else if (isServo) {
    arduino.servo = constrain(int(msg.substring(6)), 0, 180);
  }
}

// ---------------------------------------------------------------------
// Mouse
//
// Clicking a button on the p5 side sends an LED message. In demo mode
// the knob on the Arduino side can be dragged up/down or left/right to
// turn the pretend potentiometer, and a pretend button is pressed for
// as long as the mouse is held down on it.
// ---------------------------------------------------------------------

function mousePressed() {
  if (outputSelect.value() == "LED") {
    if (mouseIsOver(LED_ON_BUTTON)) {
      p5side.lastSent = "LED ON";
      send(toArduino, "LED ON\n");
    } else if (mouseIsOver(LED_OFF_BUTTON)) {
      p5side.lastSent = "LED OFF";
      send(toArduino, "LED OFF\n");
    }
  } else {
    let s = SERVO_SLIDER;
    if (mouseIsOver({ x: s.x - 12, y: s.y - 14, w: s.w + 24, h: 28 })) {
      draggingServo = true;
      moveServoSlider();
    }
  }

  // In demo mode, hold the mouse down on a button to press it
  if (!port.opened() && showSelect.value() == "B") {
    for (let i = 0; i < BUTTONS.length; i++) {
      let b = { x: BUTTONS[i].x, y: BUTTONS[i].y, w: BUTTON_SIZE, h: BUTTON_SIZE };
      if (mouseIsOver(b)) {
        arduino.buttons[i] = 1;
        heldButton = i;
      }
    }
  }

  if (!port.opened() && showSelect.value() == "POT" && dist(mouseX, mouseY, KNOB.x, KNOB.y) < KNOB.r + 10) {
    draggingKnob = true;
    lastDragX = mouseX;
    lastDragY = mouseY;
  }
}

function mouseIsOver(b) {
  return mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h;
}

function mouseDragged() {
  if (draggingKnob) {
    turnKnob();
  }
  if (draggingServo) {
    moveServoSlider();
  }
}

// Set the servo slider from the mouse. Dragging only moves the slider:
// when its value is sent depends on the send mode (see sendServoPosition)
function moveServoSlider() {
  let s = SERVO_SLIDER;
  p5side.servo = round(constrain(map(mouseX, s.x, s.x + s.w, 0, 180), 0, 180));
}

// p5 sends the servo position in the same two ways the Arduino sends its
// readings, chosen by the same selector:
//
//   On Change  once, when the slider is released, if it has moved
//   Loop       every time round draw() (at most 20 times a second),
//              whether it has moved or not
function sendServoPosition() {
  send(toArduino, "SERVO " + p5side.servo + "\n");
  p5side.servoSent = p5side.servo;
  p5side.lastServoSendTime = millis();
}

function sendServoInLoopMode() {
  let looping = outputSelect.value() == "SERVO" && potSendSelect.value() == "LOOP";
  if (looping && millis() - p5side.lastServoSendTime >= 50) {
    sendServoPosition();
  }
}

function mouseReleased() {
  draggingKnob = false;

  // In "On Change" mode the slider's value is sent when it is let go
  if (draggingServo && potSendSelect.value() == "CHANGE" && p5side.servo != p5side.servoSent) {
    sendServoPosition();
  }
  draggingServo = false;

  if (heldButton >= 0) {
    arduino.buttons[heldButton] = 0;
    heldButton = -1;
  }
}

// Dragging right or up turns the knob up, dragging left or down turns it
// down. It takes about 250 pixels of dragging to go from 0 to 1023.
function turnKnob() {
  let moved = (mouseX - lastDragX) - (mouseY - lastDragY);
  arduino.pot = round(constrain(arduino.pot + moved * 4, 0, 1023));
  lastDragX = mouseX;
  lastDragY = mouseY;
}

// ---------------------------------------------------------------------
// Drawing: the two sides
// ---------------------------------------------------------------------

function drawTitle() {
  noStroke();
  fill(40);
  textSize(16);
  textAlign(LEFT, BASELINE);
  text("Serial communication between Arduino and p5", 15, 30);

  textAlign(RIGHT, BASELINE);
  textSize(12);
  if (port.opened()) {
    fill(0, 130, 60);
    text("Connected to a real Arduino", width - 15, 30);
  } else {
    fill(120);
    text("Demo mode: pretend Arduino", width - 15, 30);
  }
}

function drawPanel(panel, title, col) {
  stroke(col);
  strokeWeight(2);
  fill(255);
  rect(panel.x, panel.y, panel.w, panel.h, 8);

  noStroke();
  fill(col);
  textSize(15);
  textAlign(CENTER, BASELINE);
  text(title, panel.x + panel.w / 2, panel.y + 24);
}

function drawArduinoPanel() {
  drawPanel(ARDUINO_PANEL, "Arduino", ARDUINO_COLOR);

  // Only the input chosen in the "Show" selector is drawn
  if (showSelect.value() == "POT") {
    drawKnob();
  } else {
    drawPushbuttons();
  }

  // Only the output chosen in the "Show output" selector is drawn
  if (outputSelect.value() == "LED") {
    stroke(60);
    strokeWeight(2);
    fill(arduino.led ? color(255, 40, 40) : color(90, 20, 20));
    circle(LED.x, LED.y, LED.r * 2);
    noStroke();
    fill(40);
    textSize(13);
    textAlign(CENTER, BASELINE);
    text(arduino.led ? "LED is on" : "LED is off", LED.x, LED.y + LED.r + 20);
  } else {
    drawServo();
  }
}

// A servo seen from above: a body with an arm that turns. As on a real
// servo, the arm's pivot is towards one end of the body, not in the
// middle. 0 degrees points left, 90 points up and 180 points right.
function drawServo() {
  stroke(60);
  strokeWeight(2);
  fill(70, 110, 200);
  rect(SERVO.x - 27, SERVO.y - 9, 54, 24, 4); // body

  let pivotX = SERVO.x + 13; // towards the right end of the body
  let pivotY = SERVO.y + 3;

  // A real servo takes time to turn, so the arm moves towards its new
  // position a little each frame (300 degrees a second) and doesn't jump.
  // deltaTime is the time since the last frame; it is capped so the arm
  // still moves smoothly after the page has been in the background.
  let maxMove = (300 * min(deltaTime, 50)) / 1000;
  arduino.servoShown += constrain(arduino.servo - arduino.servoShown, -maxMove, maxMove);
  let angle = radians(180 + arduino.servoShown);

  // The arm is drawn twice, dark then light, to give it a dark outline
  // so it shows up against the white panel as well as the blue body
  let tipX = pivotX + cos(angle) * 24;
  let tipY = pivotY + sin(angle) * 24;
  stroke(25);
  strokeWeight(11);
  line(pivotX, pivotY, tipX, tipY);
  stroke(240);
  strokeWeight(6);
  line(pivotX, pivotY, tipX, tipY);
  stroke(25);
  strokeWeight(2);
  fill(240);
  circle(pivotX, pivotY, 12); // hub

  noStroke();
  fill(40);
  textSize(13);
  textAlign(CENTER, BASELINE);
  text("servo = " + arduino.servo, SERVO.x, SERVO.y + 35);
}

function drawKnob() {
  stroke(60);
  strokeWeight(2);
  fill(port.opened() ? 235 : 255);
  circle(KNOB.x, KNOB.y, KNOB.r * 2);
  let angle = radians(map(arduino.pot, 0, 1023, 135, 405));
  strokeWeight(4);
  line(KNOB.x, KNOB.y, KNOB.x + cos(angle) * (KNOB.r - 6), KNOB.y + sin(angle) * (KNOB.r - 6));

  noStroke();
  fill(40);
  textSize(13);
  textAlign(CENTER, BASELINE);
  text("pot = " + arduino.pot, KNOB.x, KNOB.y + KNOB.r + 22);
  fill(130);
  textSize(11);
  text(port.opened() ? "turn the real knob" : "drag up/down or left/right", KNOB.x, KNOB.y + KNOB.r + 38);
}

// Tactile pushbuttons as in the SparkFun Inventor's Kit: a square black
// body with a round coloured cap. A pressed cap is drawn smaller and
// darker, as if pushed in.
function drawPushbuttons() {
  for (let i = 0; i < BUTTONS.length; i++) {
    let b = BUTTONS[i];
    let down = arduino.buttons[i] == 1;
    let cx = b.x + BUTTON_SIZE / 2;
    let cy = b.y + BUTTON_SIZE / 2;

    stroke(0);
    strokeWeight(1);
    fill(35);
    rect(b.x, b.y, BUTTON_SIZE, BUTTON_SIZE, 4); // body

    let shade = down ? 0.65 : 1;
    stroke(b.rgb[0] * 0.5, b.rgb[1] * 0.5, b.rgb[2] * 0.5);
    strokeWeight(2);
    fill(b.rgb[0] * shade, b.rgb[1] * shade, b.rgb[2] * shade);
    circle(cx, cy, down ? 20 : 24); // cap

    // The button's state, as it is sent in the message
    noStroke();
    fill(b.name == "yellow" ? 0 : 255);
    textSize(13);
    textAlign(CENTER, CENTER);
    text(arduino.buttons[i], cx, cy);
  }

  noStroke();
  fill(40);
  textSize(13);
  textAlign(CENTER, BASELINE);
  text("buttons = " + arduino.buttons.join(","), KNOB.x, 210);
  fill(130);
  textSize(11);
  text(port.opened() ? "press the real buttons" : "hold the mouse on one", KNOB.x, 226);
}

function drawP5Panel() {
  drawPanel(P5_PANEL, "p5 sketch", P5_COLOR);

  // The output on the p5 side, like the LED on the Arduino: a circle
  // sized by the potentiometer, or arrows switched on by the buttons
  textSize(13);
  textAlign(CENTER, BASELINE);
  if (showSelect.value() == "POT") {
    noStroke();
    fill(255, 150, 0);
    circle(P5_CIRCLE.x, P5_CIRCLE.y, p5side.diameter);
    fill(40);
    text("pot = " + p5side.pot, P5_CIRCLE.x, 197);
  } else {
    drawArrows(P5_CIRCLE.x, P5_CIRCLE.y + 7, p5side.arrows);
    noStroke();
    fill(40);
    text("buttons = " + p5side.buttons.join(","), P5_CIRCLE.x, 197);
  }

  // The control for the output chosen in the "Show output" selector
  if (outputSelect.value() == "LED") {
    // Buttons that send the LED messages
    drawLedButton(LED_ON_BUTTON, "LED ON");
    drawLedButton(LED_OFF_BUTTON, "LED OFF");
    fill(130);
    textSize(11);
    text("click to send", P5_CIRCLE.x, LED_ON_BUTTON.y + LED_ON_BUTTON.h + 18);
  } else {
    drawServoSlider();
  }
}

// A slider that sends the servo position
function drawServoSlider() {
  let s = SERVO_SLIDER;
  noStroke();
  fill(40);
  textSize(13);
  textAlign(CENTER, BASELINE);
  text("servo = " + p5side.servo, P5_CIRCLE.x, s.y - 20);

  stroke(P5_COLOR);
  strokeWeight(4);
  line(s.x, s.y, s.x + s.w, s.y); // track
  strokeWeight(2);
  fill(255);
  circle(map(p5side.servo, 0, 180, s.x, s.x + s.w), s.y, 18); // handle

  noStroke();
  fill(130);
  textSize(11);
  text("0", s.x, s.y + 22);
  text("180", s.x + s.w, s.y + 22);
  let looping = potSendSelect.value() == "LOOP";
  text(looping ? "sent every draw()" : "drag, release to send", P5_CIRCLE.x, s.y + 36);
}

// One arrow for each button, in the button's colour when it is pressed
// and a pale outline when it is not
function drawArrows(cx, cy, states) {
  for (let i = 0; i < BUTTONS.length; i++) {
    let b = BUTTONS[i];
    let angle = { right: 0, down: 90, left: 180, up: 270 }[b.arrow];

    push();
    translate(cx, cy);
    rotate(radians(angle));
    if (states[i] == "1") {
      stroke(b.rgb[0] * 0.5, b.rgb[1] * 0.5, b.rgb[2] * 0.5);
      fill(b.rgb[0], b.rgb[1], b.rgb[2]);
    } else {
      stroke(210);
      fill(245);
    }
    strokeWeight(1.5);
    // An arrow pointing right, starting a little way out from the centre
    beginShape();
    vertex(12, -5);
    vertex(28, -5);
    vertex(28, -12);
    vertex(44, 0);
    vertex(28, 12);
    vertex(28, 5);
    vertex(12, 5);
    endShape(CLOSE);
    pop();
  }
}

// Each button is labelled with the message it sends. The one that was
// sent last stays highlighted.
function drawLedButton(b, label) {
  stroke(P5_COLOR);
  strokeWeight(2);
  fill(p5side.lastSent == label ? color(255, 225, 232) : 255);
  rect(b.x, b.y, b.w, b.h, 6);
  noStroke();
  fill(40);
  textSize(12);
  textAlign(CENTER, CENTER);
  text(label, b.x + b.w / 2, b.y + b.h / 2);
  textAlign(CENTER, BASELINE);
}

// ---------------------------------------------------------------------
// Drawing: the wires and the messages on them
//
// Each character is drawn as its own tile because that is what is
// really sent: one character at a time, including the invisible ones
// that mark the end of the line.
// ---------------------------------------------------------------------

function drawWire(lane, y, leftToRight) {
  let col = leftToRight ? ARDUINO_COLOR : P5_COLOR;
  let stage = stageName(lane);

  // The wire, with an arrowhead showing the direction
  stroke(col);
  strokeWeight(2);
  line(WIRE_LEFT, y, WIRE_RIGHT, y);
  noStroke();
  fill(col);
  if (leftToRight) {
    triangle(WIRE_RIGHT, y, WIRE_RIGHT - 10, y - 6, WIRE_RIGHT - 10, y + 6);
  } else {
    triangle(WIRE_LEFT, y, WIRE_LEFT + 10, y - 6, WIRE_LEFT + 10, y + 6);
  }

  // The code that sends (above the wire) and receives (below it).
  // Each is highlighted while it is running.
  let sending = stage == "send";
  let reading = stage == "read" || stage == "fade";
  if (leftToRight) {
    // When this line runs depends on the send selector
    let mode = potSendSelect.value();
    let when = "this runs only when the reading changes";
    if (mode == "LOOP") when = "this runs every time round loop()";
    noStroke();
    fill(130);
    textSize(11);
    textAlign(LEFT, BASELINE);
    text(when, WIRE_LEFT + 10, y - 49);
    // The line that sends the input chosen in the "Show" selector
    let sendCode = 'Serial.print("POT "); Serial.println(pot);';
    if (showSelect.value() == "B") {
      sendCode = 'Serial.print("B "); ... Serial.println(b4);';
    }
    drawCode(sendCode, WIRE_LEFT + 10, y - 30, LEFT, sending);
    drawCode('msg = port.readUntil("\\n");', WIRE_RIGHT - 10, y + 52, RIGHT, reading);
  } else {
    // Show the message being sent now, or else the last one sent
    let example = p5side.lastSent == "" ? "LED ON" : p5side.lastSent;
    if (outputSelect.value() == "SERVO") {
      example = "SERVO " + p5side.servo;
    }
    if (lane.flying != null) {
      example = lane.flying.text.trim();
    }
    drawCode('port.write("' + example + '\\n");', WIRE_RIGHT - 10, y - 30, RIGHT, sending);
    drawCode("message = Serial.readStringUntil('\\n');", WIRE_LEFT + 10, y + 52, LEFT, reading);
  }

  drawMessageOnWire(lane, y, leftToRight, col);

  // A short description of what is happening
  let status = describeStage(lane, leftToRight);
  noStroke();
  fill(130);
  textSize(11);
  textAlign(CENTER, BASELINE);
  text(status, (WIRE_LEFT + WIRE_RIGHT) / 2, y + 70);
}

// Where the characters are depends on the stage: at the sender, crossing
// the wire, or sitting at the receiver's end until they have been read
function drawMessageOnWire(lane, y, leftToRight, col) {
  let stage = stageName(lane);
  if (stage == "idle" || stage.startsWith("step")) {
    return; // nothing on the wire
  }

  let msg = lane.flying.text;
  let p = stageProgress(lane);
  let messageWidth = msg.length * TILE_W;
  let startX = leftToRight ? WIRE_LEFT + 4 : WIRE_RIGHT - messageWidth - 4;
  let endX = leftToRight ? WIRE_RIGHT - messageWidth - 4 : WIRE_LEFT + 4;
  let top = y - TILE_H / 2;
  let last = msg.length - 1; // position of the newline that ends the message

  if (stage == "send") {
    drawTiles(msg, startX, top, col, 255 * p); // appearing at the sender
  } else if (stage == "travel") {
    drawTiles(msg, lerp(startX, endX, p), top, col);
  } else if (stage == "wait") {
    drawTiles(msg, endX, top, col); // stuck here until the receiver reads
  } else if (stage == "read") {
    // The receiver looks at one character after another until it finds
    // the newline. The search takes the first 80% of the stage, then we
    // pause on the newline.
    let readIndex = min(floor((p / 0.8) * msg.length), last);
    drawTiles(msg, endX, top, col, 255, readIndex);
  } else if (stage == "fade") {
    // Reading removes the characters from the buffer
    drawTiles(msg, endX, top, col, 255 * (1 - p), last);
  }
}

function describeStage(lane, leftToRight) {
  let stage = stageName(lane);
  let sender = leftToRight ? "the Arduino" : "p5";
  let receiver = leftToRight ? "p5" : "the Arduino";

  if (stage == "send") return sender + " sends the message";
  if (stage == "travel") return "the characters travel along the wire";
  if (stage == "wait") return "waiting in the buffer until " + receiver + " reads";
  if (stage == "read") {
    let atNewline = stageProgress(lane) >= 0.8;
    return atNewline ? "found \\n: the message is complete" : "reading up to the newline (\\n)";
  }
  if (stage == "fade") return "the message has been read out of the buffer";
  if (stage.startsWith("step")) return receiver + " uses the message";
  return "";
}

// Draw a line of code, with a highlight behind it when it is running
function drawCode(code, x, y, align, running) {
  textSize(12);
  textAlign(align, BASELINE);
  if (running) {
    let w = textWidth(code);
    let left = align == RIGHT ? x - w : x;
    noStroke();
    fill(255, 228, 110);
    rect(left - 4, y - 13, w + 8, 18, 4);
  }
  noStroke();
  fill(running ? 0 : 90);
  text(code, x, y);
}

// Draw a message as a row of character tiles, with its top left at x, y.
// opacity makes the tiles see-through (255 is solid, 0 is invisible).
// readIndex is the position of the character being read right now:
// characters before it have been read already. Leave it out when the
// message isn't being read.
function drawTiles(msg, x, y, col, opacity = 255, readIndex = -1) {
  for (let i = 0; i < msg.length; i++) {
    let c = msg[i];
    let invisible = c == "\n" || c == "\r" || c == " ";

    stroke(red(col), green(col), blue(col), opacity);
    strokeWeight(1.5);
    if (i < readIndex) {
      fill(255, 244, 190, opacity); // already read
    } else if (i == readIndex && c == "\n") {
      fill(150, 225, 150, opacity); // the newline we were looking for
      strokeWeight(3);
    } else if (i == readIndex) {
      fill(255, 215, 70, opacity); // being read now
      strokeWeight(3);
    } else if (invisible) {
      fill(235, opacity);
    } else {
      fill(255, opacity);
    }
    rect(x + i * TILE_W, y, TILE_W - 2, TILE_H, 4);

    noStroke();
    fill(invisible ? 110 : 20, opacity);
    textAlign(CENTER, CENTER);
    textSize(invisible ? 11 : 15);
    text(visibleName(c), x + i * TILE_W + (TILE_W - 2) / 2, y + TILE_H / 2);

    if (asciiCheckbox.checked()) {
      fill(120, opacity);
      textSize(10);
      text(c.charCodeAt(0), x + i * TILE_W + (TILE_W - 2) / 2, y + TILE_H + 8);
    }
  }
}

// Characters you normally can't see get a name
function visibleName(c) {
  if (c == "\n") return "\\n";
  if (c == "\r") return "\\r";
  if (c == " ") return "␣";
  return c;
}

// ---------------------------------------------------------------------
// Drawing: what each side does with a message
//
// What the receiver read is just text. These two boxes show the lines
// of code that turn it into an output: the LED on the Arduino, the
// circle in p5. For a new message they run one at
// a time: the running line is highlighted, and its result appears.
// ---------------------------------------------------------------------

// resultX is how far to the right of the code the results are written
function drawSteps(lane, x, title, col, msg, steps, resultX) {
  noStroke();
  fill(col);
  textSize(12);
  textAlign(LEFT, BASELINE);
  text(title, x, 362);

  if (lane.lastRead == "") {
    fill(150);
    text("(nothing read yet)", x, 390);
    return;
  }

  // Work out which line is running, and how many have run so far.
  // When no message is being worked on, all of them have run.
  let running = runningStep(lane);
  let stepsRun = steps.length;
  let opacity = 255;
  if (stageName(lane) == "fade") {
    // The text is just arriving from the buffer: no line has run yet
    stepsRun = 0;
    opacity = 255 * stageProgress(lane);
  } else if (running >= 0) {
    stepsRun = running + 1;
  }

  drawTiles(msg, x, 370, col, opacity);

  for (let i = 0; i < steps.length; i++) {
    drawCode(steps[i][0], x, 430 + i * 17, LEFT, i == running);
    if (i < stepsRun) {
      fill(20);
      text("→ " + steps[i][1], x + resultX, 430 + i * 17);
    }
  }
}

function drawArduinoExplanation() {
  // Serial.readStringUntil('\n') doesn't include the newline in the text
  // it returns, so it isn't shown here
  let msg = toArduino.lastRead.replace("\n", "");
  let trimmed = msg.trim();

  // The first line is the same for every message. What happens next
  // depends on how the message starts.
  let steps = [["message.trim();", '"' + trimmed + '"']];
  if (trimmed.startsWith("SERVO ")) {
    let servoPosition = constrain(int(trimmed.substring(6)), 0, 180);
    steps.push(['message.startsWith("SERVO ")', "true"]);
    steps.push(["position = message.substring(6).toInt();", servoPosition]);
    steps.push(["servo.write(position);", servoPosition + "°"]);
  } else {
    let on = trimmed == "LED ON";
    steps.push(['message == "' + trimmed + '"', "true"]);
    steps.push(["digitalWrite(ledPin, " + (on ? "HIGH" : "LOW") + ");", "LED " + (on ? "on" : "off")]);
  }

  drawSteps(toArduino, 15, "The Arduino read: message =", P5_COLOR, msg, steps, 290);
}

function drawP5Explanation() {
  // port.readUntil("\n") does include the newline, which is why the
  // first step is to trim it
  let msg = toP5.lastRead;
  if (msg == "") {
    // Nothing has been read yet, so there are no steps to show
    drawSteps(toP5, 410, "p5 read: msg =", ARDUINO_COLOR, msg, [], 225);
    return;
  }
  let trimmed = msg.trim();
  let parts = trimmed.split(" ");

  // The first two lines are the same for every message. What happens
  // next depends on the first word.
  let steps = [
    ["msg.trim()", '"' + trimmed + '"'],
    ['msg.split(" ")', '["' + parts.join('", "') + '"]'],
  ];
  if (parts[0] == "B") {
    let buttons = parts[1].split(",");
    let arrows = [];
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i] == "1") {
        arrows.push({ left: "←", up: "↑", down: "↓", right: "→" }[BUTTONS[i].arrow]);
      }
    }
    steps.push(['buttons = parts[1].split(",")', '["' + buttons.join('","') + '"]']);
    steps.push(["drawArrows(buttons)", arrows.length > 0 ? arrows.join(" ") : "no arrows"]);
  } else {
    steps.push(["pot = int(parts[1])", "pot = " + int(parts[1])]);
    steps.push(["circle(x, y, pot / 10)", "diameter " + round(int(parts[1]) / 10)]);
  }

  drawSteps(toP5, 410, "p5 read: msg =", ARDUINO_COLOR, msg, steps, 225);
}
