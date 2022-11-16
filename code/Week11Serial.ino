// Week 11.2 Example of bidirectional serial communication

// Inputs:
// - A0 - sensor connected as voltage divider (e.g. potentiometer or light sensor)
// - A1 - sensor connected as voltage divider 
//
// Outputs:
// - 2 - LED
// - 5 - LED

int leftLedPin = 2;
int rightLedPin = 5;

void setup() {
  // Start serial communication so we can send data
  // over the USB connection to our p5js sketch
  Serial.begin(9600);

  // We'll use the builtin LED as a status output.
  // We can't use the serial monitor since the serial connection is
  // used to communicate to p5js and only one application on the computer
  // can use a serial port at once.
  pinMode(LED_BUILTIN, OUTPUT);

  // Outputs on these pins
  pinMode(leftLedPin, OUTPUT);
  pinMode(rightLedPin, OUTPUT);

  // Blink them so we can check the wiring
  digitalWrite(leftLedPin, HIGH);
  digitalWrite(rightLedPin, HIGH);
  delay(200);
  digitalWrite(leftLedPin, LOW);
  digitalWrite(rightLedPin, LOW);



  // start the handshake
  while (Serial.available() <= 0) {
    digitalWrite(LED_BUILTIN, HIGH); // on/blink while waiting for serial data
    Serial.println("0,0"); // send a starting message
    delay(300);            // wait 1/3 second
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
  }
}

void loop() {
  // wait for data from p5 before doing something
  while (Serial.available()) {
    digitalWrite(LED_BUILTIN, HIGH); // led on while receiving data

    int left = Serial.parseInt();
    int right = Serial.parseInt();
    if (Serial.read() == '\n') {
      digitalWrite(leftLedPin, left);
      digitalWrite(rightLedPin, right);
      int sensor = analogRead(A0);
      delay(5);
      int sensor2 = analogRead(A1);
      delay(5);
      Serial.print(sensor);
      Serial.print(',');
      Serial.println(sensor2);
    }
  }
  digitalWrite(LED_BUILTIN, LOW);
}
