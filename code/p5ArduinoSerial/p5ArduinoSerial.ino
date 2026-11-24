// p5 ↔ Arduino Serial: the Arduino side
//
// Goes with the p5 sketches in this folder. p5-visualizer draws the messages
// travelling between p5 and Arduino so you can see how serial
// communication works.
//
// The two sides talk using short text messages. Each message ends with a
// newline so the receiver knows where it stops.
//
//   Arduino -> p5      "POT 512"       the potentiometer reading, 0 to 1023
//                      "B 0,1,0,0"     the four buttons: 1 is pressed, 0 is
//                                      not. Here only button 2 is pressed.
//   p5 -> Arduino      "LED ON"    turn the LED on
//                      "LED OFF"   turn the LED off
//                      "SERVO 90"  move the servo to 90 degrees (0 to 180)
//
// The visualizer sketch can also choose when the readings are sent:
//
//   p5 -> Arduino      "SEND CHANGE"   only when they change (the default)
//                      "SEND LOOP"     every time round loop()
//
// Circuit (the same as the Week 11 examples):
// - A0 - potentiometer (or another sensor connected as a voltage divider)
// - 5, 6, 7, 8 - four pushbuttons (red, yellow, green, blue), each to 5V
//                 and each with its own 10k pull-down resistor to GND
// - 2  - LED with resistor
// - 9  - servo signal wire (the servo's other wires go to 5V and GND)
// Schematic: p5ArduinoSerial_schematic.png
// https://github.com/mangtronix/IntroductionToInteractiveMedia/blob/master/code/p5ArduinoSerial/p5ArduinoSerial_schematic.png
// Breadboard: p5ArduinoSerial_breadboard_half.png (half-size breadboard)
// https://github.com/mangtronix/IntroductionToInteractiveMedia/blob/master/code/p5ArduinoSerial/p5ArduinoSerial_breadboard_half.png
// The same on a full-size breadboard: p5ArduinoSerial_breadboard.png
// The built-in LED does the same as the LED on pin 2, so you can also try
// this without an LED connected.
//
// Made by Michael Ang with Claude Fable 5.2
//
// MIT License

// ---------------------------------------------------------------------
// Pins
//
// Giving each pin a name means the rest of the code can say what it is
// doing ("read the potentiometer") and not just which pin it is using.
// If you move a wire to a different pin, this is the only place you need
// to change.
// ---------------------------------------------------------------------

const int potPin = A0;
const int button1Pin = 5; // red
const int button2Pin = 6; // yellow
const int button3Pin = 7; // green
const int button4Pin = 8; // blue
const int ledPin = 2;
const int servoPin = 9;

// The Servo library does the work of controlling the servo motor.
// "servo" is the name we use for our servo in the rest of the sketch.
#include <Servo.h>
Servo servo;

// ---------------------------------------------------------------------
// Things the sketch needs to remember
//
// loop() runs over and over, and ordinary variables inside it are
// forgotten each time. Anything we need to remember from one time round
// to the next is kept here, outside loop().
//
// To send a reading "only when it changes" we have to remember what we
// sent last time, so that we have something to compare the new reading
// with.
// ---------------------------------------------------------------------

// When to send the readings. p5 can change this by sending a message.
const int SEND_LOOP = 1;    // every time round loop()
const int SEND_CHANGE = 2;  // only when a reading has changed
int sendMode = SEND_CHANGE;

int lastPotSent = -1;             // the last readings we told p5 about
int lastB1 = -1;                  // (-1 means nothing sent yet, so the
int lastB2 = -1;                  // first reading always counts as a
int lastB3 = -1;                  // change and gets sent)
int lastB4 = -1;
unsigned long lastSendTime = 0;   // when we last sent (in milliseconds)

// ---------------------------------------------------------------------
// setup: runs once, when the Arduino starts
//
// This is where we get everything ready: start the serial connection and
// say which pins are inputs (we read them) and which are outputs (we
// control them).
// ---------------------------------------------------------------------

void setup() {
  // Start serial communication at 9600 bits per second.
  // The p5 sketch must use the same speed, or the two sides won't
  // understand each other.
  Serial.begin(9600);
  // For faster transmission use 57600, and change it in the p5 sketch too:
  // Serial.begin(57600);

  pinMode(button1Pin, INPUT);
  pinMode(button2Pin, INPUT);
  pinMode(button3Pin, INPUT);
  pinMode(button4Pin, INPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  servo.attach(servoPin); // tell the Servo library which pin to use
}

// ---------------------------------------------------------------------
// loop: runs over and over, thousands of times a second
//
// A conversation has two halves, listening and talking, and each time
// round we do a little of both. Neither half is allowed to wait around,
// because while one waits the other can't happen: that is why there is
// no delay() anywhere in this sketch.
// ---------------------------------------------------------------------

void loop() {
  receiveMessage(); // listen: has p5 told us to do something?
  sendReadings();   // talk: do we have something new to tell p5?
}

// ---------------------------------------------------------------------
// Receiving: p5 -> Arduino
//
// Characters arrive one at a time and wait in a buffer until we read
// them. We read up to the newline, which gives us one whole message, and
// then decide what to do by comparing its text with the messages we
// know.
//
// Some messages are complete in themselves ("LED ON"). Others carry a
// value ("SERVO 90"): for those we check how the message starts, then
// take the rest of the text and turn it into a number.
//
// The newline matters: it is how we can tell where one message ends and
// the next begins.
// ---------------------------------------------------------------------

void receiveMessage() {
  // Only read if something has arrived. If we tried to read when nothing
  // was there, readStringUntil() would wait for up to a second and the
  // whole sketch would pause.
  if (Serial.available() > 0) {
    String message = Serial.readStringUntil('\n');
    message.trim(); // remove any extra spaces or line endings

    // Act on the message. The text must match exactly: "led on" or
    // "LED  ON" would not be recognised.
    if (message == "LED ON") {
      digitalWrite(ledPin, HIGH);
      digitalWrite(LED_BUILTIN, HIGH);
    } else if (message == "LED OFF") {
      digitalWrite(ledPin, LOW);
      digitalWrite(LED_BUILTIN, LOW);
    } else if (message.startsWith("SERVO ")) {
      // The number starts after "SERVO ", which is 6 characters long.
      // substring(6) is the rest of the text, e.g. "90", and toInt()
      // turns that text into the number 90.
      int position = message.substring(6).toInt();
      position = constrain(position, 0, 180); // a servo turns 0 to 180
      servo.write(position);
    } else if (message == "SEND LOOP") {
      sendMode = SEND_LOOP;
    } else if (message == "SEND CHANGE") {
      sendMode = SEND_CHANGE;
    }
    // Any other message is ignored
  }
}

// ---------------------------------------------------------------------
// Sending: Arduino -> p5
//
// We read our inputs and turn each reading into a line of text that p5
// can take apart again: a word saying what it is, a space, then the
// value or values.
//
// By default we only send a reading when it has changed, so we don't
// flood p5 with thousands of identical messages a second. In "loop" mode
// we send both readings every time round loop() instead, whether they
// changed or not. Try both and watch the difference.
// ---------------------------------------------------------------------

void sendReadings() {
  // Never send more than 20 times a second (once every 50 milliseconds).
  // millis() is the time since the Arduino started. Checking the time
  // like this lets us wait without stopping the rest of the sketch, which
  // delay(50) would do.
  unsigned long now = millis();
  if (now - lastSendTime < 50) {
    return; // too soon since the last message: try again next time round
  }

  // --- The potentiometer: one number, e.g. "POT 512" ---

  int pot = analogRead(potPin); // 0 to 1023

  // Readings jitter by 1 or 2 even when the knob is still, so only count
  // bigger differences as a real change
  bool potChanged = abs(pot - lastPotSent) > 2;

  if (sendMode == SEND_LOOP || potChanged) {
    Serial.print("POT ");
    Serial.println(pot); // println adds the line ending: \r\n

    // Remember what we sent and when, for the comparisons next time
    lastPotSent = pot;
    lastSendTime = now;
  }

  // --- The buttons: four values in one message, e.g. "B 0,1,0,0" ---

  // With a pull-down resistor a pin reads HIGH (1) while its button is
  // pressed and LOW (0) when it is released.
  int b1 = digitalRead(button1Pin);
  int b2 = digitalRead(button2Pin);
  int b3 = digitalRead(button3Pin);
  int b4 = digitalRead(button4Pin);

  // If any one of the four is different from last time, send them all
  bool buttonsChanged = b1 != lastB1 || b2 != lastB2 || b3 != lastB3 || b4 != lastB4;

  if (sendMode == SEND_LOOP || buttonsChanged) {
    // Build the message a piece at a time. print() doesn't end the line,
    // so the pieces join up; only the last one, println(), ends it.
    // The commas let p5 split the four values apart again.
    Serial.print("B ");
    Serial.print(b1);
    Serial.print(',');
    Serial.print(b2);
    Serial.print(',');
    Serial.print(b3);
    Serial.print(',');
    Serial.println(b4);

    lastB1 = b1;
    lastB2 = b2;
    lastB3 = b3;
    lastB4 = b4;
    lastSendTime = now;
  }
}
