# Mang's Intro to IM - Week 8-14 Lecture Notes #

[Class Dates / Overview](https://docs.google.com/spreadsheets/d/1v9EqYgoUXqTkozkICUszM_Tmsacm4ePBe10r_Ult5pQ/edit?usp=sharing)

[Week 1-7 lecture notes](lectureNotes.md)

[Week 8-14 lecture notes](lectureNotes2.md)

[p5js Example Sketches](https://editor.p5js.org/mangtronix/collections/A3JbliQrM)

## Weekly Schedule
- [Week 1](lectureNotes.md#week-1) - Introductions, p5.js
- [Week 2](lectureNotes.md#week-2) - Variables, Animation, Conditionals
- [Week 3](lectureNotes.md#week-3) - Functions, Arrays, Object-Oriented Programming (OOP)
- [Week 4](lectureNotes.md#week-4) - Tool training (TBC), Working with text
- [Week 5](lectureNotes.md#week-5) - Working with Pixels, Sound
- [Week 6](lectureNotes.md#week-6) - Computer Vision
- [Week 7](lectureNotes.md#week-7) - Midterm presentations
- 7-WEEK FINALS BREAK
- [Week 8](#week-8) - Introduction to Arduino, electricity
- [Week 9](#week-9) - Analog and digital I/O
- SPRING BREAK
- [Week 10](#week-10) - Sound, movement, circuit schematics
- [Week 11](#week-11) - Serial Communication, Connecting Arduino to p5.js
- [Week 12](#week-12) - Motors, Fabrication
- [Week 13](#week-13) - Soldering, Circuit debugging
- [Week 14](#week-14) - Final project presentations, show setup
- [IM Show](#im-show) - IM End of Semester Show

## Week 8

### Week 8.1 - Introduction to Arduino

**Bring** your Arduino kit to class

**Install** the Arduino 2.x IDE before class ([download](https://www.arduino.cc/en/software), [installation instructions](https://docs.arduino.cc/software/ide-v2/tutorials/getting-started/ide-v2-downloading-and-installing)).

##### Mid-term feedback
- Sound not playing on initial sketch load
  - Most browsers require user interaction (e.g. click) before playing sound

#####  Mid-semester feedback

- What was the more surprising thing you learned so far in this class?
- What was the more important thing you learned so far in this class?
- What would you like more of?
- What would you like less of?
- What do you wish we'd talk about, or learn, that we haven't?

##### Introduction to Arduino
- [What is an Arduino? (Sparkfun)](https://learn.sparkfun.com/tutorials/what-is-an-arduino/all)
- [What is Arduino and can I use it for my project? (YouTube)](https://www.youtube.com/watch?v=CSx6k-zXlLE)
  - More in-depth [Arduino MASTERCLASS | Full Programming Workshop in 90 Minutes (YouTube)](https://www.youtube.com/watch?v=BLrHTHUjPuw)
- Our class kit
  - [Sparkfun Inventor's Kit for Arduino Uno](https://www.sparkfun.com/products/15631)

- Arduino IDE (Integrated Development Environment)
  - Download [Arduino 2.x IDE](https://www.arduino.cc/en/software)
  - [Arduino 2.x IDE installation instructions](https://docs.arduino.cc/software/ide-v2/tutorials/getting-started/ide-v2-downloading-and-installing)
  
- Making an LED blink
  -  Arduino IDE -> File -> Examples 01.Basics -> Blink
  -  [LED (Wikipedia)](https://en.wikipedia.org/wiki/Light-emitting_diode)
  -  [Making the Arduino Blinking LED Project (Arduino Intro)](https://arduinointro.com/projects/making-the-arduino-blinking-led-project-a-complete-tutorial)

### Week 8.2
#### Plan for today: 

- Electricity
- Schematics
- Switches
- Series and Parallel
- Arduino

#### Electricity 

**Simple circuit using Arduino, LED, and Resistor**

The most confusing part of this lecture will be the solderless breadboard:
![](media/breadboard.jpg)
Image courtesy of
[SparkFun](https://learn.sparkfun.com/tutorials/how-to-use-a-breadboard/all)

Here is how to build the circuit

![](media/ArduinoPoweringLED_bb.png)


**Theory**

Electricity is mysterious

- We can predict what it will do quite accurately, but don't really understand
	it what is it
- Flow of electrons
- Electrons want to move from place of higher potential energy to place of lower potential energy
	- Like a rock or water falling from a height
	- Unlike a rock or water, electricity can only travel in a conductor
- AC vs. DC - very briefly, will discuss more as it comes up
- (Advanced)[The Big Misconception About Electricity](https://youtu.be/bHIhgxav9LY)

What makes a circuit?

- Something to provide that difference in potential 
that will cause the electrons to want to move. 
	- Typically a battery, charger, or USB port
	- The technical term is "power supply"
	- In our case your laptop via the Arduino
		- What is the Arduino doing in this case?
- Conductors to allow the electronics to move
- Components or other things that usually convert this electrical energy 
to some other form of energy (e.g. light, sound, heat, movement)
- Optionally, switches or other sensors to control the flow of energy
	- In our circuit the resistor is controlling the brightness of the LED so that it doesn't burn out

#### Schematics

Here is the schematic of what you've built

![](media/ArduinoPoweringLED_schem.png)

- Important part of something, 
	without getting distracted by details (e.g. subway maps)
- What's important in an electrical schematic?
	- Where is the power coming from?
	- What other components are there in the circuit?
	- How are they connected?

**Schematics are an important way to show a circuit. You will be required to
understand and use them**

#### Switches

- What if we want to turn it the LED on and off?
 	- Pull out a wire
 	- That's a switch, but a pretty inconvenient one
	- Schematic symbol of switch
	- How does it work?
		- Breaks the flow of electrons by breaking the continuous path
		- Doesn't electricity (the electrons) just flow out the end of the wire?
	- The switch can go on either side. How is this possible?

Let's use a real switch

![](media/ArduinoPoweringLEDWithSwitch_schem.png)
![](media/ArduinoPoweringLEDWithSwitch_bb.png)

- How is this switch different from the earlier switch?
	- Schematic symbol of momentary switch
	- What was the previous "switch"?
	- Schematic symbol of toggle switch

#### Series and Parallel

- What if we put two LEDs or switches in?
- Two different ways: 

Series: All the current (electrons) must go through both components, one after
the other. 
![](media/ArduinoPowering2LEDSeries_schem.png)
![](media/ArduinoPowering2LEDSeries_bb.png)

Parallel: Both components experience the same voltage difference
![](media/ArduinoPowering2LEDparallel_schem.png)
![](media/ArduinoPowering2LEDparallel_bb.png)

- Any components can be connected in series or parallel; not just LEDs or
	switches
- Components might be in series, or parallel, or neither
- Components in series have the same **current** flowing through them
- Components in parallel have the same **voltage** across them
- No matter how many components you have in a circuit, and how they are
	connected, they will obey these principles.

#### Ohm's law
- I=V/R
- The math only works for linear components 
	- But the principle is the same for non-linear components 
	- **is a very important concept**:
		- For a given resistance, 
			the higher the pressure (voltage), 
				the higher the current
		- For a given voltage, the higher the "resistance", 
			the lower the current

![](media/electricityExplained.jpg)

Dr. Megavolt
- [Man vs. Electricity: Meet Dr. Megavolt (Wired / YouTube)](https://www.youtube.com/watch?v=Fyko81WAvvQ)
- [Tesla Coil (The Slo Mo Guys / YouTube)](https://www.youtube.com/watch?v=Lqwj5bACKbU&t=138s)


#### Arduino finally!

Make sure everything is working

- Upload the Blink example
- Change the parameter in delay()
- Upload again and verify that the LED blinks at the new rate

[Back to top](#weekly-schedule)

## Week 9

### Week 9.1 - Arduino Digital / Analog IO
#### Plan for today: 
- Review homework
- Reading discussion
	- [Random shuffle group (p5js)](https://editor.p5js.org/mangtronix/sketches/QxFRtipnL) - Choosing discussion groups 

- Review basic Arduino and Digital Output
- Digital Input
- Analog Input (time permitting)

#### Review basic Arduino and Digital Output

Upload File -> Examples -> Basic -> Blink example

What is going on?

- Code
- Circuit
- I/O pins
	- 20 pins
	- Arduino provides LED on pin 13
	- LED_BUILTIN = 13 

Let's extend this circuit to the breadboard:

![](media/ArduinoControllingLED_schem.png)
![](media/ArduinoControllingLED_bb.png)

#### Digital Input

Adding a switch

![](media/ArduinoLEDMomentarySwitch_schem.png)
![](media/ArduinoLEDMomentarySwitch_bb.png)

````
// Code for one switch and LEDs
// Wiring:
// - switch on Pin A2
// - LED on Pin 8
// - LED on Pin 13

void setup() {
  pinMode(8, OUTPUT);
  pinMode(13, OUTPUT);
  pinMode(A2, INPUT);
}

void loop() {

  int switchPosition = digitalRead(A2);

  if (switchPosition == HIGH) {
    digitalWrite(8, LOW);   
    digitalWrite(13, HIGH); // turn the LED on (HIGH is the voltage level)
  } else  {
    digitalWrite(8, HIGH);    
    digitalWrite(13, LOW); // turn the LED off by making the voltage LOW
  }
}
````

An example:

````

const int pushButton = A2;
const int redLEDPin = A0;
const int greenLEDPin = 8;

void setup() {
  pinMode(redLEDPin, OUTPUT);
  pinMode(greenLEDPin, OUTPUT);
}

void loop() {

  int buttonState = digitalRead(pushButton);

  if (buttonState == HIGH) {
    digitalWrite(redLEDPin, HIGH);
    digitalWrite(greenLEDPin, HIGH);
    delay(500);
    digitalWrite(greenLEDPin, LOW);
    delay(300);
    digitalWrite(redLEDPin, LOW);
    digitalWrite(greenLEDPin, HIGH);
    delay(700);
  }
  allOff();
  delay(1000);
}

void allOff() {
  digitalWrite(redLEDPin, LOW);
  digitalWrite(greenLEDPin, LOW);
}
````

Other things you can do:

Add another LED on a different pin

![](media/ArduinoTwoLEDs_schem.png)
![](media/ArduinoTwoLEDs_bb.png)

Add another switch on a different pin

![](media/ArduinoTwoSwitches_schem.png)
![](media/ArduinoTwoSwitches_bb.png)

#### In-class exercise

Now write a program that will blink different patterns depending on which
switch is pressed. 
Using two switches you can select between four patterns.
How is that possible?

### Week 9.2 - Arduino Programming Syntax
#### Plan for today: 
- Discuss reading
- Analog Input
- Analog Output

#### Arduino Programming Syntax
Programming in Arduino uses C/C++ with a very small number of modifications.

p5js uses JavaScript which has a syntax that's based on C. The way JavaScript
programs run is very different than programs written in C but the syntax of
the language (e.g. how `for` loops are declared) is very similar.

One of the main differences for simple Arduino programs is how variables are
declared. We need to declare the *type* of the variable, for example on the Arduino Uno a `byte`
can store a value from 0-255, an `int` can be used for values -32,768 to 32,767 and a `float` can
be used for values like -2.1 and 20332.22.

Storing a `float` in memory requires 32 bits (4 bytes). With the limited memory on
the Arduino Uno (2k bytes of RAM) it's important for us as programmers to
specify the type of each of our variables and understand how much memory they take up.

- [Arduino Syntax Cheat Sheet](https://github.com/liffiton/Arduino-Cheat-Sheet)
- [Arduino Memory](https://www.arduino.cc/en/Tutorial/Foundations/Memory)


>Notice that there's not much SRAM available in the Uno. It's easy to use it all up by having lots of strings in your program. For example, a declaration like:
>
>char message[] = "I support the Cape Wind project.";
>
>puts 33 bytes into SRAM (each character takes a byte, plus the '\0' terminator). This might not seem like a lot, but it doesn't take long to get >to 2048, especially if you have a large amount of text to send to a display, or a large lookup table, for example.


#### Analog Input

Build this circuit. Try to follow the schematic and not the breadboard view:

![](media/ArduinoPhotoresistor_schem.png)
![](media/ArduinoPhotoresistor_bb.png)

```
/*
  AnalogReadSerial

  Reads an analog input on pin 0, prints the result to the Serial Monitor.
  Graphical representation is available using Serial Plotter (Tools > Serial Plotter menu).
  Attach the center pin of a potentiometer to pin A2, and the outside pins to +5V and ground.

  This example code is in the public domain.

  https://www.arduino.cc/en/Tutorial/BuiltInExamples/AnalogReadSerial
*/

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
}

// the loop routine runs over and over again forever:
void loop() {
  // read the input on analog pin
  int sensorValue = analogRead(A2);
  // print out the value you read:
  Serial.println(sensorValue);
  delay(1);  // delay in between reads for stability
}
```

- Analogue Inputs, `analogRead()`, and (some) sensors go together
	- This only works on the six analog input pins (A0-A5)
	- Digital sensors, like a switch, have only one of two values 
	and so are more suited to a digital input
- Remember that the so-called analog input pins can do digital input and
	output as well
- Since you have so few analog input pins, when you decide which pins to use
	for which device, reserve the analog input pins for analog input devices
	as much as possible

Do you see a similarity between this circuit and 
something we learned earlier?

Some analogue sensors are resistive, some are not. 
Resistive sensors all use the same
pattern: a voltage divider.
Note the similarity to the circuit we used for a switch - 
the switch circuit is also effectively a voltage divider, one that has only
two values instead of an infinite range of values

What other sensors do we have in the kit?

Which ones are resistive?

#### Potentiometer

[Here](https://learn.sparkfun.com/tutorials/sparkfun-inventors-kit-experiment-guide---v41/circuit-1b-potentiometer)

#### Misc
- Hand drawn schematics in your homework are fine!

- Hand drawn switches can use the simple symbol
- Resources are available to help you with homework (me, Jack), but only
	if you start your homework early enough. If you wait until the last minute
	and then don't have time to get help, that is unexcusable.
- Use constants for pin numbers

#### Analog Output

- Analog Outputs, `analogWrite()`, PWM and (some) actuators go together
	- `analogWrite()` only works on the six PWM pins (3, 5, 6, 9, 10, and 11).
	- LEDs, motors, and some other actuators respond properly to PWM
	- Other actuators, like a solenoid, do not respond well to PWM and really
		should be considered digital actuators
	- Since you have so few analog outputs, when you decide which pins to use
		for which device, reserve the analog output pins for analog output devices
		as much as possible

- Not true analog voltage. PWM = Pulse Width Modulation
- Works for LEDs and motors

#### Functions that you know from p5.js which are useful here:
- `map()`
- `constrain()`
- `if()`

Remember how we used `print()` in p5.js to help us find problems in our 
program? You can do that in Arduino to but the function has a slightly
different name: `Serial.println()`
- Must be initialized `Serial.begin()`
- Can not concatenate strings with the `+` function
	- Instead, you need multiple calls to `Serial.print()` e.g.:

````
Serial.print("First value = ");
Serial.print(firstValue);
Serial.print(" Second value = ");
Serial.print(secondValue);
Serial.println();
````

Here is the program we developed at the end of class:

````
const int LED_PIN = 3;           // the PWM pin the LED is attached to
const int POT_PIN = A2;
int brightness = 0;    // how bright the LED is

// the setup routine runs once when you press reset:
void setup() {
  // declare pin 9 to be an output:
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

// the loop routine runs over and over again forever:
void loop() {
  int pot_value = analogRead(POT_PIN); // 0-1023
  brightness = map(pot_value, 0, 1023, 255, 0);
  Serial.println(brightness);
  analogWrite(LED_PIN, brightness); // 0-255
}
````

#### In-class exercise

1. Use one of the analogue sensors to select which of two LEDs lights up
1. Use one of the analogue sensor to control how fast two LEDs alternate
1. Use a momentary switch (often called a *pushbutton* or a *button* in the
	 Arduino literature) to select a different range for mapping an analog
	 sensor to an analog output device
1. Use a potentiometer to select from 4 different behaviors of a circuit


## Week 10

### Week 10.1 - Schematics, Circuit conventions

#### Plan for today: 
- Look at homework
- Reading discussion

- Schematic conventions
- Sound
- Servo motor
- PWM
- Data Types
- Circuit theory
- Examples

#### Schematics

- [How to Read a Schematic (Sparkfun)](https://learn.sparkfun.com/tutorials/how-to-read-a-schematic/all)
- Hand-drawn
  - Best way to get started! Think about your circuit, then draw it

## Michael Start Here

Here is an example:

![](media/handDrawnSchematicExample.jpg)

- [Tinkercad](https://www.tinkercad.com/circuits) (free)
- [Fritzing](https://fritzing.org/) (~$8 download, simple, has many Arduino-related parts)
- [KiCad](https://www.kicad.org/) (open source, complex)

#### Conventions: Schematics and Wire Colours

- When drawing schematics

	- All **sensors** on the **left**
	- All **inputs** on the **left** side of the Arduino 
	- All **actuators** on the **right**
	- All **outputs** on the **right** side of the Arduino 
	- There are exceptions e.g.
		- If using CAD you can't control where the pins are on Arduino
		- Some devices (e.g. the ultrasonic distance measuring sensor) that have
			both inputs and outputs

- When wiring your circuits

	- All **5V** connections should use **red** wire, 
	and don't use red for anything else
	- All **GND** connections should use **black** wire,
	and don't use black for anything else
		- If you run out of black you may either
			- Color some white cables black with a Sharpie
			- Dedicate green as an additional black, and then
			don't use green for anything else either
	- All other connections can use any other colors
	- If you use the buses on the sides of the breadboard
		- Red bus for 5V only
		- Black or Blue bus for GND only


#### Circuits

Some theory that might help you think about why circuits are they way they
are
- Important concepts:
	- Voltage 
		- Voltage is a relative quantity so it's always measured or identified
			relative to some other point (usually a common reference point such as
			"ground")
		- Can be thought of the "pressure" applied to the electrons
		- Analogous to holding a brick at a certain height above the floor. Relative
			to the floor, the brick has a certain amount of potential energy
		- Voltage exists whether or not there is a circuit
	- Resistance 
		- The resistance the electrons face as they try to get through
		components. 
		- Analogous to a traffic jam on a road
		- Conductors (wires) have zero resistance (for our purposes)
		- All components have some sort of "resistance"
		- Resistance is a property of a component and therefore
		exists whether or not there is a circuit
	- Current  
		- The rate of flow of electrons through a circuit (electrons/second)
		- Somewhat analogous to litres/hour or cars/hour
		- **Current only exists when there is a circuit**
- If you measure the voltage between any two points, the voltage will not
	change as you move to different places on the **wire**. 
		However if you cross
		a component the voltage might be different on the other side of the
		component
- If you measure current through components connected in 
	series the current will not change. This is because **all** the electrons
	that go through the first component have to go through the rest. No
	electrons can leave the path, and no new ones can enter.
		However if there are any branches some electrons might go on the
		branches and thus the current will drop.
- Review
- Voltage does **not** change in a conductor
	- That is why we can connect things to the same node in any order
- Voltage **does** change when you go across a component
	- That is why it is **important** to make connections to the correct side of a
		component!

### Week 10.2 - Sound, servos

#### Sound

**`tone()`**

- [Schematic](https://www.arduino.cc/en/Tutorial/ToneMelody)
- Before you try that code, just try 
`tone(spkrPin, 440);`
and
`tone(spkrPin, 440, 1000);`
- [Reference
page](https://www.arduino.cc/reference/en/language/functions/advanced-io/tone/)

**Notes**
- "Use of the `tone()` function will interfere with PWM output on pins 3 and 11"
	- The word "intefere" is rather vague. 
	I think they mean that it 
	prevents `analogWrite()` from working on pins 3 and 11
- The `tone()` function is *non-blocking*
- Arduino supports tabs just like in p5.js
- Arduino has arrays just like in p5.js
- What is resistor for? 
	- [What is a resistor?](https://www.atlearner.com/2020/02/what-is-resistor.html)
	- LED needs a resistor to limit current so it doesn't burn out
	- LDR needs a resistor to form a voltage divider
	- Piezo buzzer neither burns out nor needs a voltage divider
	- So why a resistor?

#### Servo motor

- [Schematic](https://www.arduino.cc/en/Tutorial/Knob)
- [Reference
page](https://www.arduino.cc/en/Reference/Servo)


**Notes**
- Use of the servo library disables `analogWrite()` (PWM) on pins 9 and 10
- The `Servo.write()` function is *non-blocking*

#### More about PWM
- How do you suppose `analogWrite()` makes an LED dimmer?
- [PWM](https://www.ekwb.com/blog/what-is-pwm-and-how-does-it-work/)
- What do `analogWrite()`, `tone()` and `Servo` have in common?
- What is sound?
- How does a servo motor
	[work](https://lastminuteengineers.com/servo-motor-arduino-tutorial/)?

**Notes**
1. You may have noticed that the built-in LED blinks 3 times when you turn on
	 your Arduino. In fact it does this every time it resets, which also happens
	 when you upload a new program. Since this LED is connected directly to pin
	 13, it means that whatever you have attached to pin 13 will be activated 3
	 times briefly whenver the Arduino resets. So, if you make a big robot, 
	 you probably should not use pin 13 for the motor
1. Pins 0 and 1 are used for communication with your laptop, and this has two
	 effects:
	1. Connecting anything to pins 0 or 1 might interfere with laptop
		 communication (which includes uploading!)
	2. Anything connected to pins 0 or 1 might be activated during
		 communication!
1. For these reasons it is best to avoid pins 0, 1, and 13. If you run out of
	 pins and need to use them there are ways around this.

#### Data Types

Unlike in p5.js, you must declare what type of data you want to store in a
variable:

- `int` - whole numbers only
- `float` - a number with a fractional part ('floating point number')
- `char` - a character
- `boolean` - only either `true` or `false`


#### In-class exercises


1. Build a circuit with a switch (pushbutton) and a servo motor, and when you
	 press the switch go to one position, when you don't press the switch go to
	 another

2. Add a piezo buzzer so that when the switch is pressed it plays a tone for
	 half a second, then a tone for another half a second as long as the switch
	 is pressed

3. Modify the code so that it plays the two tones only once when the switch is
	 pressed

4. Add an LED and make the LED change brightness according to which tone is
	 playing

5. Add a potentiometer which controls how fast the servo motor moves from one
	 position to the next

#### Examples

Some examples using the piezo speaker, servo motor, and a potentiometer:

````
// Moving the servo motor first to one position and then to another,
// and then stopping:

const int servoPin = 7;

#include <Servo.h>
Servo myservo;

void setup() {
	myservo.attach(servoPin);
	myservo.write(10);
	delay(1000);
	myservo.write(130);
}

void loop() { 
}
````

````
// Moving the servo motor first to one position and then to another,
// continuously:

const int servoPin = 7;

#include <Servo.h>
Servo myservo;

void setup() {
	myservo.attach(servoPin);
}

void loop() {
	myservo.write(10);
	delay(1000);
	myservo.write(130);
	delay(1000);
}
````

````
// Minimal example of the tone() function
// Make a tone, never stop

const int spkrPin = 7;

void setup() {
	tone(spkrPin, 440); // starts a tone on pin 7 at frequency 440
}

void loop() {
 // Arduino always needs a loop, even if it's empty
}
````

Is the `tone()` function blocking? 

````
// If tone() is a blocking function, the LED will be off while the tone sounds
// If the LED comes on as soon as the tone starts, tone() is non-blocking
const int spkrPin = 7;

void setup() {
	pinMode(LED_BUILTIN, OUTPUT);

	digitalWrite(LED_BUILTIN, LOW);
	tone(spkrPin, 440, 1500); // starts a tone and then automatically stops it after 1500 milliseconds
	digitalWrite(LED_BUILTIN, HIGH);
}

void loop() {
}
````

````
// Using a potentiometer to control the position of a servo motor

#include <Servo.h>

Servo myservo;  // create servo object to control a servo

int potpin = A0;  // analog pin used to connect the potentiometer

void setup() {
	myservo.attach(9);  // attaches the servo on pin 9 to the servo object
}

void loop() {
	int val = analogRead(potpin); // reads the value of the potentiometer (value between 0 and 1023)
	val = map(val, 0, 1023, 0, 180); // scale it for use with the servo (value between 0 and 180)
	myservo.write(val);   // sets the servo position according to the scaled value
	delay(15);            // waits for the servo to get there
}
````

````
	// Use a potentiometer to control the position of a servo motor
	// and the pitch of a tone

	#include <Servo.h>
	Servo myservo;

	void setup() {
		// initialize serial communication at 9600 bits per second:
		Serial.begin(9600);
		myservo.attach(7);
	}

	void loop() {
		// read the input on analog pin 0:
		int sensorValue = analogRead(A2);
		// print out the value you read:
		Serial.println(sensorValue);

		// servo motor stuff
		int servoPosition = map(sensorValue, 0, 1023, 0, 180);
		myservo.write(servoPosition);

		// piezo buzzer stuff
  int pitch = map(sensorValue, 0, 1023, 200, 4000);
  tone(8, pitch);

  delay(1);        // delay in between reads for stability
}
````
[Back to top](#weekly-schedule)


## Week 11

### Week 11.1 - Serial Communication
#### Plan for today: 
- Announcements
  - [IM Show](#im-show) is Thursday May 8, 5-8pm 

- Reading discussion
- Look at homework (musical instruments)
- Debugging
- Serial Communication


##### Debugging

If you want my help solving a problem in your assignment, do the following:
1. Figure out the simplest circuit and program that demonstrates your problem
1. Upload your schematic, code, and 
the best picture you can take of your breadboard circuit to GitHub 
1. Write a message on Discord, describing carefully
	1. What you think should happen
	1. What you observe happens

What techniques have you learned to help you find problems?


#### Serial Communication

Communicating between p5.js and Arduino
  - [p5.webserial library by gohai](https://github.com/gohai/p5.webserial)
  	- Library for reading from the serial port in p5js. Includes automatic reconnection of the serial port and non-blocking reads without callbacks. 
  - [Week 11 Serial pot (p5 editor)](https://editor.p5js.org/mangtronix/sketches/D-d6WE7Eg)
  - [Week 11 Serial pot (Arduino sketch)](https://github.com/mangtronix/IntroductionToInteractiveMedia/blob/master/code/Week_11_Serial_pot.ino)

- Bidirectional communication example
	- This example exchanges information between p5 and Arduino using the serial connection
	- [p5.webserial library (GitHub)](https://github.com/gohai/p5.webserial)
	- [Week 11 Bidirectional serial communication(p5js Sketch)](https://editor.p5js.org/mangtronix/sketches/a96iTkEvR)
	- [Week 11 Arduino serial code (Arduino Sketch)](https://github.com/mangtronix/IntroductionToInteractiveMedia/blob/master/code/Week11Serial.ino)
	- [Week 11 Serial Communication Schematic](https://github.com/mangtronix/IntroductionToInteractiveMedia/blob/master/code/Week_11_Serial_schematic.png)

- Before you incorporate this in your project, first test this as it is and
	make sure you understand it
- The example uses the [p5.webserial library by gohai](https://github.com/gohai/p5.webserial)
- For new sketches ou need to load the library in your sketch index.html file by adding this line:
	```<script src="https://unpkg.com/@gohai/p5.webserial@^1/libraries/p5.webserial.js"></script>```

<img width="1148" alt="p5 webserial script tag" src="https://github.com/user-attachments/assets/82b42bc9-8907-4cf4-8b68-a891e45b6e3f" />


- Briefly, what this code does:
	- Arduino waits for a message from p5.  
	- Arduino expects two values separated by a comma. It uses these two values
		to control two LEDs.  
	- Arduino then reads two sensors and sends the values back to p5, separated
		by a comma.
	- p5 reads these two values from Arduino. One value controls the text color,
		the other controls the text transparency
	- p5 sends two values back to Arduino indicating if the mouse was clicked,
		and if so, which half of the screen it was in.

- Once it's working, duplicate the code and then start adapting it to your
	needs:
	- Duplicate Aaron's project so that you get the other files as well
	- Increase or decrease the amount of data that is exchanged. You may need
		more, or you may need less. 
	- Modify the data that is exchanged. You may need a digital sensor on the
		Arduino instead of an analog sensor. Similarly, on the p5 side, you may
		need something different from a mouse click or changing the text color and
		transparency.
	- Once you are reliable sending information back and forth you can start
		adding the rest of your program

- More tutorials
	- [Serial Input to p5.js Using the p5.webserial Library (ITP)](https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-webserial-input-to-p5-js/)
	- [ITP Labs serial output, bidirectional communication](https://itp.nyu.edu/physcomp/labs/#Serial_Communication)
	- [p5.js and Arduino serial communication - Send a digital sensor to a p5.js sketch (YouTube)](https://www.youtube.com/watch?v=feL_-clJQMs)
	- Note: these use a different serial library, don't mix and match code between the different serial libraries. You need to start with one example and continue to use the same software library


<!-- Older examples using serial server

MacOS or Windows
- Follow Jack's excellent tutorial
[here](https://docs.google.com/document/d/1l7pgSkb9SqoOFyo6xVZTlW-ORQJ_iHNUrOBGdARW4j4/edit)
	- When you download `p5.serialcontrol`, download Beta 1.1

On linux
1. Install a serial server 
	1. sudo npm install -g p5.serialserver --unsafe-perm --build-from-source
1. Invoke it
	1. p5serial

Examples
- A minimal [example](https://editor.p5js.org/michaelshiloh/sketches/h2RQaOmYP) 
	- Clicking the mouse turns on an LED
	- Closing a switch on Arduino sends a signal to p5.js
- Aaron's [example](https://editor.p5js.org/aaronsherwood/sketches/v8OM9VbGe)
	- Two sensors on Arduino control the position of a circle on p5.js
	- Clicking the mouse on different parts of the canvas controls two LEDs
		on Arduino
 -->
 

### Week 11.2 - 11/13 - Serial communication
#### Plan for today
- Serial communication continued
  
#### In-class exercise (break class into groups of 2-3 students)

- make something that uses only one sensor  on arduino and makes an ellipse (or other shape)
	in p5 move on the horizontal axis, in the middle of the screen, and nothing
	on arduino is controlled by p5 
- make something that controls the LED brightness from p5 
- take the [gravity wind example](https://editor.p5js.org/aaronsherwood/sketches/I7iQrNCul) and make it so
	every time the ball bounces one led lights up and then turns off, and you
	can control the wind from one analog sensor 


#### Discussion
- What did the writer mean by Vision?
- Do you agree with the writer when he says future tech neglects the
	importance of hands?
- What are your views on if future technology should actually make use of
	hands, for the feel of it, for the sense of touch?
- What are some examples of how fingers manipulate things?
- Do you agree with the writer about how we will actually be going back and
	not modernizing or not?
- What do you think is a good way of designing the interaction for the future
	rather than extrapolating yesterday's technology?
- Is intuitive interface deeply rooted with our physiology of doing things or
	does it evolve with practice?
- Does experiential perspective helps in creating visionary designs or does it
	fades your vision?


## Week 12
### Week 12.1 - Motors, fabrication

#### Plan for today: 
- No reading discussion - reading is due Thursday
- Review project proposals
- Motors
- Fabrication and Construction Techniques

Inspiration
- [Mechanical Techno Demonstration (Graham Dunning / YouTube)](https://youtu.be/wl1ZrEza7uY?si=tPjuOxoioo-I20gb)

#### Fabrication and construction
- Laser cutting 
    - [Laser Cutting Basics](https://www.instructables.com/Laser-Cutting-Basics/)
    - [IM Lab Laser Cutting presentation (Google Slides)](https://docs.google.com/presentation/d/1l6x9M0nAiH3uMHQKQtethxi2cAhx7vBo1srYkkMT4bA/edit?usp=sharing)

- 2D Design for Laser Cutting
    - [Inkscape](https://inkscape.org/)
    - [Inkscape 11 minute tutorial (YouTube)](https://youtu.be/-_KJZPOYBeA)
    - [Inkscape basic tutorial](https://inkscape.org/doc/tutorials/basic/tutorial-basic.html)
    - [Inkscape Tutorials (YouTube)](https://www.youtube.com/watch?v=8f011wdiW7g&list=PLqazFFzUAPc5lOQwDoZ4Dw2YSXtO7lWNv&index=1)
    - [Inkscape design for laser cutting (YouTube)](https://youtu.be/IzaiISOzXHo)
    - [Inkscape Tutorial: Prepare your files for laser cutting](https://www.sculpteo.com/en/prepare-your-file-laser-cutting/prepare-your-model-laser-cutting-inkscape/)
    - [Convert Text To A Path In Inkscape](https://logosbynick.com/convert-text-to-a-path-in-inkscape/)
 
- Laser cutter booking
    - [IM Lab Resources](https://www.nyuadim.com/resources/) -> Machines
 
- 3D printing
    - [https://www.instructables.com/3D-Printing-Basics/](https://www.instructables.com/3D-Printing-Basics/)
    - 3D design
        - [Tinkercad](https://www.tinkercad.com/dashboard)
            - Free
            - [Tinkercad tutorials](https://www.tinkercad.com/learn)
        - [Autodesk Fusion](https://www.tinkercad.com/dashboard)
            - Personal and educational licenses available
    - Community models
        - User uploaded models
        - Quality varies
        - Good for test prints and inspiration
        - [Printables](https://www.printables.com/)
        - [Thingiverse](https://www.thingiverse.com/)
        - [Cults 3D](https://cults3d.com/)


#### Motors

An LED can make light, what makes motion?

	=> **Electromagnetism**

Electrical devices that rely on the principle of electromagnetism:

- Electromagnets
- Loudspeakers and headphones
- Solenoid
- Relays
- All kind of motors
	- AC motors
	- DC motors
	- Brushless DC motors
	- Stepper motors
	- Servo motors (which actually consist of a DC motor + servo circuitry)

##### In-class exercise

- Take the DC motor and connect it directly to 5V and GND
- Now reverse the wires

Can we connect the motor to an Arduino output just like we did with the piezo
buzzer?
- How would we reverse it?
- Another problem: Arduino current limitations

##### Arduino current limitations

- What is current? It is the rate of flow of electrons through a conductor.
	- You don't get to control the current. 
	- The voltage depends on the current and the resistance (Ohm's law: I=V/R)
	- You can provide a voltage (with Arduino, the voltage is always 5V)
	- Each device has it's own "resistance"

Small LEDs use relatively <strong>low</strong> current (~20-30mA).
- [What is the resistance of a typical LED?](https://www.quora.com/What-is-the-resistance-of-a-typical-red-LED)

Motors have relatively <strong>low</strong> "resistance", 
and so consume <strong>high</strong> current

- Current flowing through any resistance causes heat (P = I^2/R)
- Everything has resistance

**Therefore, where electricity is flowing there will be heat**

**Heat causes damage**

(We've not had to worry about that up to now because everything we've done
uses very little current)

Arduino can not protect itself from damaged caused by overheating. 
It does not <strong>limit</strong> current, 
it is <strong>damaged</strong> by too much current

The amount of heat a component can withstand before it is damaged 
is governed, to a large extent, by its size

The transistors that make up Arduino are tiny 

![](https://cdn.sparkfun.com/assets/7/a/6/9/c/51c0d009ce395feb33000000.jpg)

(Image courtesy of SparkFun)

The reason for using the separate Motor Driver is simple:

**It has much bigger transistors**

(It also makes it easier to control both direction and speed, 
but you could do that with the Arduino alone, 
it  would just be more complicated)

In addition to the bigger transistors, the Motor Driver
includes an H-bridge which allows us to control rotation direction

Circuit Schematic

![](media/arduinoSparkFunMotorDriver_schem.jpg)

How did I choose which pins to use?
- Never use pins 0 and 1 (dedicated for USB communication)
- Avoid pin 13 if possible (it flashes 3 times on reset)
- Directional control pins (ain1, ain2, bin1, bin2) only require
	digital signals so avoid pins with extra functionality 
	(analog input, SPI, PWM)
- Inclusion of the servo library 
	disables `analogWrite()` on pins 9 and 10
	(I'm not using the servo library now but perhaps I'll add it later)
- Use of the `tone()` function 
	disables `analogWrite()` on pins 3 and 11
	(I'm not using the `tone()` function now but perhaps I'll add it later)
- This leaves PWM pins 5 and 6 for the speed controls (pwma and pwmb)
- Might as well choose nearby digital pins

[Code - Week 12 - Simple motor driver (DMA GitHub)](https://github.com/mangtronix/IntroductionToInteractiveMedia/blob/master/code/Week%2012%20-%20Simple%20Motor%20Driver/Week%2012%20-%20Simple%20Motor%20Driver.ino)


````

const int ain1Pin = 3;
const int ain2Pin = 4;
const int pwmAPin = 5;

const int bin1Pin = 8;
const int bin2Pin = 7;
const int pwmBPin = 6;


void setup() {
  pinMode(ain1Pin, OUTPUT);
  pinMode(ain2Pin, OUTPUT);
  pinMode(pwmAPin, OUTPUT); // not needed really
}

void loop() {
  // turn in one direction, full speed
  Serial.println("full speed");
  analogWrite(pwmAPin, 255);
  digitalWrite(ain1Pin, HIGH);
  digitalWrite(ain2Pin, LOW);
  // stay here for a second
  delay(1000);

  // slow down
  Serial.println("slowing down");
  int speed = 255;
  while (speed--) {
    analogWrite(pwmAPin, speed);
    delay(20);
  }
}

````

Here is the code that Noah developed to control the motor speed and
direction using a potentiometer:

[Code - Week 12 - Motor Driver - 2 channel (DMA GitHub)](https://github.com/mangtronix/IntroductionToInteractiveMedia/blob/master/code/Week%2012%20-%20Motor%20Driver%202%20channel/Week%2012%20-%20Motor%20Driver%202%20channel.ino)

````
const int ain1Pin = 3;
const int ain2Pin = 4;
const int pwmAPin = 5;

const int bin1Pin = 8;
const int bin2Pin = 7;
const int pwmBPin = 6;

const int potPin = A5;


void setup() {
  pinMode(ain1Pin, OUTPUT);
  pinMode(ain2Pin, OUTPUT);
  pinMode(pwmAPin, OUTPUT); // not needed really
}

void loop() {
  int potVal = analogRead(potPin);
  delay(20);
  if (potVal > 1023 / 2) { //counterclockwise
    digitalWrite(ain1Pin, HIGH);
    digitalWrite(ain2Pin, LOW);
    analogWrite(pwmAPin, potVal / 4);
  } else { //clockwise
    digitalWrite(ain1Pin, LOW);
    digitalWrite(ain2Pin, HIGH);
    analogWrite(pwmAPin, 255 - potVal / 4);
  }
}
````



[Back to top](#weekly-schedule)

### Week 12.2 - Motors continued, Schematics, Multimeters
- Plan for today
	- Reading discussion 
	- Review class schedule through end of semester
 	- Motors, continued
 	- Schematic tips 
  	- Multimeters and circuit debugging 

#### Discussion of *Design Meets Disability*

1. Considering only modern day technology like your phones, can you identify
	 any "features" that are implemented to help people with certain
	 disabilities
1. Why did glasses become a matter of fashion and prostatic limbs are still
	 conservative in design, when both of them are disability aids?
1. How can we make sure that this narrative navigates towards more inclusive
	 and keep the 'design in design' for disabilities?
1. How can the language we use to address disability-wear affect our approach
	 towards such designs? E.g. eyewear vs hearing aids?
1. In the case of glasses, the author mentions “what others see is more
	 important than what you see yourself” - do you guys agree?


- Schedule until the end of semester
	- Final project is due Thursday May 8
 	- Final project presentations will happen at our space in the Arts Center Lobby
  	- Your project must be working for the final class and for the show
	- [IM End of Semester Show](#im-show)
  	- Any projects with special requirements?
  	- Book equipment in Connect2 now
  	- Book laser cutter now
  	- Book 3D printers how
 
- More about our motor driver
	- [Sparkfun Inventor's Kit - 5a Motor Basics](https://learn.sparkfun.com/tutorials/sparkfun-inventors-kit-experiment-guide---v41/circuit-5a-motor-basics)
	- Tutorial for using motor driver board to control yellow geared motor

	- [Sparkfun Inventor's Kit - 5C: Autonomous Robot](https://learn.sparkfun.com/tutorials/sparkfun-inventors-kit-experiment-guide---v41/circuit-5c-autonomous-robot)
	- Set your Arduino free to roam!
 
- Schematic tips
	- Positive power symbols always point up, ground always points down
 	- Make sure you are using the correct symbol for the component (e.g. photoresistor vs photodiode) 
 	- Pin labels should be placed inside the IC symbol next to the pin
   	- Have signals flowing from left to right where possible: inputs on the left and outputs on the right
   	- Indicate the value of components like resistors (resistance value), if the color of an LED or button is important indicate it on the schematic
  	- Voltage dividers: resistors should be vertically aligned
  	- Consistently orient symbols (either horizontal OR vertical)
 	- [Collin's Lab: Schematics (Make / YouTube)](https://www.youtube.com/watch?v=9cps7Q_IrX0)
 		- Good overview of the basics of drawing connections and different component symbols
- Tools for making schematics
	- Draw by hand
 		- Good practice, very useful for communicating quickly
   	- [Fritzing](https://fritzing.org/)
   		- Theoretically open source (paid download)
   	 	- Has many Arduino parts included
   	- [Tinkercad Circuits](https://www.tinkercad.com/blog/official-guide-to-tinkercad-circuits)
   		- Web-based
   	 	- Includes simulator - but beware that reality can be different!
  	- [KiCad](https://www.kicad.org/)
  		- Open source and free
  	 	- Professional level tool

#### How to use a Digital Multimeter (DMM)
- The Multimeter is the most common tool used for debugging hardware circuits
- Primary measurements are continuity, resistance, voltage, and current
- Using the multimeter you can check what's happening electrically in your circuit
- [Multimeters (Adafruit)](https://learn.adafruit.com/multimeters/overview)
- [Collin's Lab: Multimeters (Adafruit / YouTube)](https://youtu.be/rPGoMbVSUu8?si=CSgYd_BgMaoW7Tq8)

- The three most useful measurements
	- Continuity
		- Checking connections
		- Checking switches
	- Voltage
		- Checking sensor circuits
		- Checking Arduino digital outputs
	- Resistance
		- Checking resistive sensors
		- Checking motors
- How to connect to Arduino pins or the solderless breadboard

- In class exercise:
	- Measure the 5V coming out of the 5V pin on your Arduino
 		- Where are places you can connect to ground?
   	- Measure the continuity between the pins of a switch as you push / release the switch
   	- Measure the resistance of a resistor
        - Measure the resistance of your photoresistor under different lighting conditions
   	 	- When does the resistance increase / decrease?
   	- Connect the potentiometer as a voltage divider with the outside pins connected to 5V and ground
   	 	- Measure the voltage at the middle terminal as you sweep the pot 
   	- Measure the resistance between the pins of your potentiometer
   		- How does the resistance change (or not) with different combinations of pins and movement of the pot?

 - In class exercise 2 (time permitting):
 	- Connect the motor driver circuit above
 	- Change the code to make the first motor run at full speed forward
  	- Is your system not working? How can you use the multimeter to debug it?
  	- Verify that when you make the motor run full speed forward that AI1 is high and AI2 is low
  	- Change the code to reverse the direction and check the voltages of the inputs of the motor driver

- Recap
	- IM Show is coming up!
 	- DC Motors
  	- Schematics
  	- Multimeters and debugging	

[Back to top](#weekly-schedule)

## Week 13
### Week 13.1 - Look at final project plans, Blink without delay, Soldering and fabrication
- Look at final project progress
  - Example final projects
    - [Are you stressed?](https://intro.nyuadim.com/author/az2177/)
    - [Friendship lamp](https://intro.nyuadim.com/author/ftt4473/)

- Running sketch fullscreen (reminder)
  - [p5js fullscreen()](https://p5js.org/reference/#/p5/fullscreen) 
  - [Responsive fullscreen (p5js sketch)](https://editor.p5js.org/mangtronix/sketches/t4G0erH1B)
    - Press 'f' to go fullscreen - sketch automatically resizes to full screen size

##### Blink Without `delay()`

Why do we need this? 
- To get rid of `delay()`

What problem does `delay()` cause? 
- **`delay()` is a blocking function. 
Whenever your program encounters `delay()`, 
your program stops until the delay is finished**

For example, how would you
- Blink LEDs at different rates
- Blink an LED while playing a tune
- Play a tune while moving a servo motor
- Do anything while responding to sensors immediately


[BlinkWithoutDelay Tutorial (Arduino.cc)](https://www.arduino.cc/en/Tutorial/BlinkWithoutDelay)

So much for blinking. What if we want to move a servo motor at the same time?

Adafruit [Multitasking Tutorial Part
I](https://learn.adafruit.com/multi-tasking-the-arduino-part-1?view=all)

Play a melody and blink an LED 
without using `delay()`:
[toneMelodyAndBlinkWithoutDelay](https://github.com/michaelshiloh/toneMelodyAndBlinkWithoutDelay)


- Soldering
  - [Adafruit Guide to Excellent Soldering](https://learn.adafruit.com/adafruit-guide-excellent-soldering)
  - Soldering demo - button to solid core wires

- Fabrication and Construction techniques
  - [Building with Cardboard (pdf)](https://714b93b6-8f08-4438-a192-33c8b6312170.filesusr.com/ugd/534455_ad6ffb237afc468da86e74f6bdc07fbf.pdf)
  - [Adaptive Design Association](https://www.adaptivedesign.org/) - A nonprofit building custom adaptations, nurturing communities, and challenging assumptions about disability

### Week 13.2 - Look at final projects, work session
- Soldering
- Class links
	- [NeoPixel Uberguide (Adafruit)](https://learn.adafruit.com/adafruit-neopixel-uberguide/the-magic-of-neopixels)
 	- [NeoPixel soldering guide (Adafruit)](https://learn.adafruit.com/make-it-glow-how-to-solder-neopixels-a-beginners-guide/overview) 
- Work session
- Document / post your progress
- Conduct user testing (see main page for description / documentation requirement)
- Work on final projects
- Ask any questions now!

## Homework
- **Post** your user testing - Due before class Tuesday
	- see [main page](https://intro.nyuadim.com/) for details 	


## Week 14
### Week 14.1 - Final project work session
- Announcement
	- Keep lab clean
	- Turn off soldering irons  
- Course feedback
- Work session

#### Homework
- **Finish** your final project
- **Post** your final project documentation to your blog - Due midnight Wednesday
	- see [main page](https://intro.nyuadim.com/) for details 
- **Your project must be finished with the documentation posted by midnight Wednesday**
- Thursday is for **showing** your project, not further development - don't risk your project not working on Thursday at the last minute

### Week 14.2 - Final project presentations
- **Come directly to the Arts Center Lobby with everything you need for running your project**
- 2:10pm - 2:40pm setup projects in lobby
- 3:00pm - start project presentations in the lobby - no slides necessary - just show your project :)
- 4:30pm - stop presentations, short break before show starts
  
## IM Show 5-8pm

Thursday May 8, 5-8pm
- **Exhibit** your project in the IM End of Semester Show
- **Keep** your table area looking professional and clear of bags, etc.
- **Clean up** your work at end of show
- **Return** any checked out equipment immediately to IM Lab

**Have a great summer!!!! Hope to see you in the Fall!**

<!--
### Timeline
- Monday Dec 9 - Last class
  - Set up our projects in Arts Center Lobby - 3:35pm - 5pm
  - Show your final project in the lobby - 5pm-6:15pm
- Tuesday Dec 10 - IM End of Semester Show - 5-8pm in the Arts Center Lobby and Black Box
  - All IM students must show at least one project (from across their classes)
  - **Your project must be up and running at 4:30pm**
  - Installations open 5-7pm
  - Performances in Black Box 7-8pm
  - Cleanup 8pm
    - Equipment checked out from IM Lab must be returned and checked in (barcode scanned)
    - Clear your space
    - Help move tables, etc
- Have a great summer!
-->


[Back to top](#weekly-schedule) 


