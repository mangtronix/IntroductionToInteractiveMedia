/*
 * Created by ArduinoGetStarted.com
 *
 * This example code is in the public domain
 *
 * Tutorial page: https://arduinogetstarted.com/tutorials/arduino-neopixel-led-strip
 *
 * Modified by Mangtronix for Introduction to Interactive Media NYUAD
 *
 * You need to install the Adafruit NeoPixel library
 * - Tools -> Manage Libraries
 * - Search for neopixel
 * - Adafruit Neopixel -> Install
 */

#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
#include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif

#define PIN_NEO_PIXEL  2   // Arduino pin that connects to NeoPixel data in
#define NUM_PIXELS     2   // The number of LEDs (pixels) in the NeoPixel strip

Adafruit_NeoPixel NeoPixel(NUM_PIXELS, PIN_NEO_PIXEL, NEO_GRB + NEO_KHZ800);

void setup() {
  NeoPixel.begin(); // INITIALIZE NeoPixel strip object (REQUIRED)
  NeoPixel.clear(); // set all pixel colors to 'off'. It only takes effect if pixels.show() is called
  NeoPixel.show();
}

void loop() {
  NeoPixel.clear(); // set all pixel colors to 'off'. It only takes effect if pixels.show() is called
  NeoPixel.show();

  // turn pixels to green one by one with delay between each pixel
  for (int pixel = 0; pixel < NUM_PIXELS; pixel++) { // for each pixel
    NeoPixel.setPixelColor(pixel, NeoPixel.Color(0, 255, 0)); // it only takes effect if pixels.show() is called
    NeoPixel.show();   // send the updated pixel colors to the NeoPixel hardware.

    delay(100); // pause between each pixel
  }

  // turn off all pixels for two seconds
  NeoPixel.clear();
  NeoPixel.show(); // send the updated pixel colors to the NeoPixel hardware.
  delay(2000);     // off time

  // turn on all pixels to red at the same time for two seconds
  for (int pixel = 0; pixel < NUM_PIXELS; pixel++) { // for each pixel
    NeoPixel.setPixelColor(pixel, NeoPixel.Color(255, 0, 0)); // it only takes effect if pixels.show() is called
  }
  NeoPixel.show(); // send the updated pixel colors to the NeoPixel hardware.
  delay(2000);     // on time

  // turn off all pixels for two seconds
  NeoPixel.clear();
  NeoPixel.show(); // send the updated pixel colors to the NeoPixel hardware.
  delay(2000);     // off time
}
