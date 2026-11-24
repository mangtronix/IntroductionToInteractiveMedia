# /// script
# dependencies = ["schemdraw", "matplotlib"]
# ///
"""Wiring for p5ArduinoSerial.ino: a potentiometer on A0, four pushbuttons on
pins 5 to 8, an LED on pin 2 and a servo on pin 9.

Regenerate the diagram (writes p5ArduinoSerial_schematic.svg and .png here):

    uv run p5ArduinoSerial_schematic.py

Component values are taken from the Week 11 schematic
(../Week_11_Serial_schematic.png): 10kΩ potentiometer, 330Ω LED resistor.
The 10kΩ pull-down resistors on the buttons are the value used in the course.
The button colours are those of the SparkFun Inventor's Kit.

Power is drawn with 5V and GND symbols rather than wires. The Uno's own 5V
and GND pins are shown on the board so it is clear where they connect.
"""
from pathlib import Path

import schemdraw
schemdraw.use("matplotlib")
import schemdraw.elements as elm

OUT = str(Path(__file__).with_name("p5ArduinoSerial_schematic"))

AX, AW = 8.0, 6.0              # Arduino box left edge and width
TOP, BOTTOM = 3.0, -19.5       # Arduino box top and bottom
RX = AX + AW                   # right edge of the Arduino box


with schemdraw.Drawing(show=False) as d:
    d.config(unit=2.0, fontsize=11, lw=1.4)

    def text(x, y, s, size=11, ha="left", va="center"):
        # .right(): otherwise the label inherits the previous element's direction,
        # which shifts its position.
        d.add(elm.Label().at((x, y)).right().label(s, halign=ha, valign=va, fontsize=size))

    def wire(a, b):
        d.add(elm.Line().at(a).to(b))

    def box(x0, y0, x1, y1):
        wire((x0, y0), (x1, y0)); wire((x1, y0), (x1, y1))
        wire((x1, y1), (x0, y1)); wire((x0, y1), (x0, y0))

    # ---- Arduino -----------------------------------------------------------
    box(AX, BOTTOM, RX, TOP)
    text(AX + AW / 2, -8.0, "Arduino Uno", 13, "center")
    text(AX + AW / 2, TOP + 3.4, "p5 ↔ Arduino Serial Schematic", 18, "center")

    def ground(xy):
        # Every ground symbol is labelled, to match the GND pins on the Uno
        d.add(elm.Ground().at(xy))
        text(xy[0] + 0.5, xy[1] - 0.55, "GND", 10)

    # USB: power and the serial connection both come from the computer
    xusb = RX - 1.5
    text(xusb, TOP - 0.5, "USB", ha="center")
    wire((xusb, TOP), (xusb, TOP + 1.0))
    d.add(elm.Dot(open=True).at((xusb, TOP + 1.0)))
    text(xusb, TOP + 1.6, "Computer (power and serial)", 10, "center")

    # The Uno's 5V and GND pins, named as on the board. Everything drawn
    # with a 5V or GND symbol connects to these pins.
    x5v = AX + 1.0
    text(x5v, TOP - 0.5, "5V", ha="center")
    wire((x5v, TOP), (x5v, TOP + 0.8))
    d.add(elm.Vdd().at((x5v, TOP + 0.8)).label("5V", loc="top"))
    xgnd = AX + AW / 2
    text(xgnd, BOTTOM + 0.5, "GND", ha="center")
    wire((xgnd, BOTTOM), (xgnd, BOTTOM - 0.8))
    d.add(elm.Ground().at((xgnd, BOTTOM - 0.8)))

    # ---- Input, on the left: potentiometer on A0 ----------------------------
    px = 3.5
    d.add(elm.Vdd().at((px, 2.4)).label("5V", loc="top"))
    pot = d.add(elm.Potentiometer().at((px, 2.4)).down())
    ground(pot.end)
    text(px - 0.5, pot.tap[1] + 0.35, "Potentiometer", ha="right")
    text(px - 0.5, pot.tap[1] - 0.35, "10kΩ", ha="right")
    wire(pot.tap, (AX, pot.tap[1]))
    text(AX + 0.2, pot.tap[1], "A0")

    # ---- Inputs, on the left: four pushbuttons with pull-down resistors -----
    # Each button connects its pin to 5V when pressed. The resistor pulls the
    # pin down to GND the rest of the time.
    # Each is labelled with its cap colour and the arrow it shows in p5.
    for i, (pin, label) in enumerate([("5", "Red / Left"), ("6", "Yellow / Up"),
                                      ("7", "Green / Down"), ("8", "Blue / Right")]):
        y = -3.2 - i * 4.2
        d.add(elm.Vdd().at((-0.8, y)).label("5V", loc="top"))
        wire((-0.8, y), (0.4, y))
        btn = d.add(elm.Button().at((0.4, y)).right())
        text(1.4, y + 1.1, f"Pushbutton ({label})", 10, "center")
        wire(btn.end, (px, y))
        d.add(elm.Dot().at((px, y)))
        wire((px, y), (AX, y))
        text(AX + 0.2, y, pin)
        rpd = d.add(elm.Resistor().at((px, y)).down().label("10kΩ", loc="bottom"))
        ground(rpd.end)

    # ---- Output, on the right: LED on pin 2 ---------------------------------
    lx = RX + 3.5
    y2 = pot.tap[1]
    text(RX - 0.2, y2, "2", ha="right")
    wire((RX, y2), (lx, y2))
    led = d.add(elm.LED().at((lx, y2)).down().label("LED", loc="bottom"))
    wire(led.end, (lx, led.end[1] - 0.5))
    r = d.add(elm.Resistor().at((lx, led.end[1] - 0.5)).down().label("330Ω", loc="bottom"))
    ground(r.end)

    # ---- Output, on the right: servo on pin 9 --------------------------------
    # The servo is drawn as a block with its three wires, in the order they
    # sit in its connector. Wire colours vary: the signal wire is usually
    # orange or yellow, 5V is red and GND is brown or black.
    y_sig, y_5v, y_gnd = -6.5, -8.5, -10.5
    sx = RX + 3.5
    box(sx, y_gnd - 1.0, sx + 4.5, y_sig + 1.0)
    text(sx + 3.2, y_5v, "Servo", 11, "center")
    text(sx + 0.2, y_sig, "Signal", 10)
    text(sx + 0.2, y_5v, "5V", 10)
    text(sx + 0.2, y_gnd, "GND", 10)
    text(RX - 0.2, y_sig, "9", ha="right")
    wire((RX, y_sig), (sx, y_sig))
    # The 5V stub is longer than the GND stub so the two symbols don't meet
    wire((sx, y_5v), (sx - 1.6, y_5v))
    d.add(elm.Vdd().at((sx - 1.6, y_5v)).label("5V", loc="top"))
    wire((sx, y_gnd), (sx - 0.8, y_gnd))
    d.add(elm.Ground().at((sx - 0.8, y_gnd)))

    d.save(OUT + ".svg", transparent=False)
    d.save(OUT + ".png", dpi=130, transparent=False)
