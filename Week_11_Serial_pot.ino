/*
 * Week 11 Serial communication
 *
 * Pair with https://editor.p5js.org/mangtronix/sketches/vQzE2Yhpj
 *
 * If you get "Can't upload" make sure your p5js sketch is stopped.
 * Only one program can access a given serial port at once.
 */ 

void setup() {
  Serial.begin(9600); // initialize serial communications
}
 
void loop() {
  // read the input pin:
  int potentiometer = analogRead(A0);                  
  // remap the pot value to fit in 1 byte:
  int mappedPot = map(potentiometer, 0, 1023, 0, 255); 
  // print it out the serial port:
  Serial.write(mappedPot);                             
  // slight delay to stabilize the ADC:
  delay(1);                                            
  
  // Delay so we only send 10 times per second and don't
  // flood the serial connection
  delay(100);
}
