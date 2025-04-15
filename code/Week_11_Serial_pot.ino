/*
 * Week 11 Serial communication
 *
 * Pair with https://editor.p5js.org/mangtronix/sketches/vQzE2Yhpj
 * 
 * Inputs:
 *   - A1 - 10k potentiometer connected to 5V and GND
 *
 * If you get "Can't upload" make sure your p5js sketch is stopped.
 * Only one program can access a given serial port at once.
 */

int interval = 100;
int lastMessageTime = 0;

void setup() {
  Serial.begin(9600); // initialize serial communications
}
 
void loop() {
  // read the input pin:
  int potentiometer = analogRead(A1);                  
  // remap the pot value to 0-255:
  int mappedPotValue = map(potentiometer, 0, 1023, 0, 255); 
  // print the value to the serial port.
  // the println function converts the value from e.g. the numeric value 222 to the string "222\n"
  Serial.println(mappedPotValue);
  // slight delay to stabilize the ADC:
  delay(1);                                            
  
  // Delay so we only send 10 times per second and don't
  // flood the serial connection leading to missed characters on the receiving side
  // For a real sketch we would want to use timing rather than a delay, so we can stay responsive
  // to user inputs on the Arduino side. See https://docs.arduino.cc/built-in-examples/digital/BlinkWithoutDelay
  delay(100);
}
