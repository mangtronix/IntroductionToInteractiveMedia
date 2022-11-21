/*
 * Week 12 - Motor Driver - 2 channel with speed control
 *
 * Schematic: https://github.com/mangtronix/IntroductionToInteractiveMedia/blob/master/lectureNotes2.md#week-12
 * With additional potentiometer connected to A5 
 */

const int ain1Pin = 3;
const int ain2Pin = 4;
const int pwmAPin = 5;

const int bin1Pin = 8;
const int bin2Pin = 7;
const int pwmBPin = 6;

const int potPin = A5;

int deadband = 30; // Pot value within this amount of center stop the motor

int oldPotVal; // Keep track of previous value of input

void setup() {
  Serial.begin(9600);
  pinMode(ain1Pin, OUTPUT);
  pinMode(ain2Pin, OUTPUT);
  pinMode(pwmAPin, OUTPUT); // not needed really

  oldPotVal = analogRead(potPin); // Initial reading

  Serial.println("Starting up");
}

void loop() {
  int potVal = analogRead(potPin);
  // Print the value if it's changed enough
  int potChange = potVal - oldPotVal;
  if (abs(potChange) > 10) {
    Serial.print("potVal ");
    Serial.print(potVal);
    Serial.println();
  }

  delay(20);

  int speed;

  if (potVal > 1023 / 2) { //counterclockwise
    speed = potVal / 4;
    digitalWrite(ain1Pin, HIGH);
    digitalWrite(ain2Pin, LOW);
    digitalWrite(bin1Pin, HIGH);
    digitalWrite(bin2Pin, LOW);


  } else { //clockwise
    speed = 255 - potVal / 4;
    digitalWrite(ain1Pin, LOW);
    digitalWrite(ain2Pin, HIGH);
    digitalWrite(bin1Pin, LOW);
    digitalWrite(bin2Pin, HIGH);
  }

  // Override the speed (set to 0) if the pot is near the middle
  if (abs(potVal - 512) < deadband) {
    speed = 0;
  }

  analogWrite(pwmAPin, speed);
  analogWrite(pwmBPin, speed);

  oldPotVal = potVal; // Store so we can compare in the next loop
}