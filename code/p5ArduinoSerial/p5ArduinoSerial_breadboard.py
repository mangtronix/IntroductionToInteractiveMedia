"""Breadboard wiring for p5ArduinoSerial.ino, as a Fritzing sketch.

Regenerate the Fritzing files:

    python3 p5ArduinoSerial_breadboard.py

This writes two versions of the same circuit:
- p5ArduinoSerial_breadboard.fzz       on a full-size breadboard
- p5ArduinoSerial_breadboard_half.fzz  on a half-size breadboard (tighter)

Then update the pictures (the same names, ending .png). Either open the .fzz
in Fritzing and use File > Export > as Image > PNG, or do it from the
command line (Fritzing exports every sketch in a folder to SVG, and
rsvg-convert turns the breadboard view into a PNG):

    mkdir -p /tmp/fz && cp p5ArduinoSerial_breadboard*.fzz /tmp/fz/
    /Applications/Fritzing.app/Contents/MacOS/Fritzing -svg /tmp/fz
    rsvg-convert -w 1800 -b white /tmp/fz/p5ArduinoSerial_breadboard_breadboard.svg \
        -o p5ArduinoSerial_breadboard.png
    rsvg-convert -w 1800 -b white /tmp/fz/p5ArduinoSerial_breadboard_half_breadboard.svg \
        -o p5ArduinoSerial_breadboard_half.png

This needs Fritzing installed in /Applications. Most parts are copied from
the example sketches that come with Fritzing, so that each part is written
exactly the way Fritzing itself writes it; this script only decides where
the parts go and what is connected to what. Written for Fritzing 1.0.3.

The layout follows the SparkFun Inventor's Kit guides: the Arduino on the
left, and a full-size breadboard standing upright on the right. The servo
is connected with three jumper wires to the socket on its lead.

The circuit is the one in p5ArduinoSerial_schematic.png:
- A0      potentiometer (10k) between 5V and GND
- 5 to 8  four pushbuttons to 5V, each with a 10k pull-down to GND
- 2       LED, then a 330 ohm resistor to GND

Each resistor goes straight into a - rail, with no extra wire. The two
- rails are joined by one wire at the bottom of the breadboard.
- 9       servo signal; the servo's other wires to 5V and GND

Wire colours: red is only ever 5V and black is only ever GND.
"""
import copy
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

FRITZING = Path("/Applications/Fritzing.app/Contents/Resources")
PARTS = FRITZING / "fritzing-parts"
EXAMPLES = FRITZING / "sketches" / "core"

RED, BLACK = "#cc1414", "#404040"
ORANGE, YELLOW, GREEN, BLUE = "#ef6100", "#fff800", "#47cc79", "#418dd9"
PURPLE, WHITE, BROWN = "#ab58a2", "#ffffff", "#8c3b00"

# ---------------------------------------------------------------------
# Measurements
#
# Everything is in Fritzing's breadboard-view units: 90 to the inch, so
# breadboard holes are 9 apart.
# ---------------------------------------------------------------------

# Where the Arduino header pins used here are in the Uno's image (measured
# from arduino_Uno_Rev3_breadboard.svg). Digital pins are along the top
# edge of the board and power / analog pins along the bottom edge.
ARDUINO_PINS = {
    "connector0": (202.4645, 180.0),    # A0
    "connector87": (157.4645, 180.0),   # 5V
    "connector88": (166.4645, 180.0),   # GND
    "connector63": (229.4665, 9.0),     # D2
    "connector66": (202.4645, 9.0),     # D5
    "connector67": (193.4645, 9.0),     # D6
    "connector68": (184.4665, 9.0),     # D7
    "connector51": (170.0635, 9.0),     # D8
    "connector52": (161.0645, 9.0),     # D9
}
A0, D2, D5, D6, D7, D8, D9 = ("connector0", "connector63", "connector66", "connector67",
                              "connector68", "connector51", "connector52")
FIVE_V, GND = "connector87", "connector88"

# The full-size breadboard (breadboard2.svg), lying on its side as it is
# drawn in its image: columns 1 to 63 run left to right, rows A to J and
# the four power rails run top to bottom. Rails W and Y are + (red line),
# X and Z are - (blue line).
ROW_Y = {"Z": 9, "Y": 18, "J": 45, "I": 54, "H": 63, "G": 72, "F": 81,
         "E": 108, "D": 117, "C": 126, "B": 135, "A": 144, "X": 171, "W": 180}

# The two breadboards. For each: Fritzing's part, the size of its image,
# where its holes are along its length, which rail holes exist (they come
# in groups of five), and which column or rail hole each thing goes in.
#
# On the full-size board the rail holes line up with the columns. On the
# half-size board they sit between columns, so a wire from a column to
# the rail leans a little, as it does on the real board.
FULL_SIZE = {
    "file": "p5ArduinoSerial_breadboard.fzz",
    "part": "breadboard2.fzp",
    "module_id": "Breadboard-RSR03MB102-ModuleID",
    "size": (585.2975, 189.0),
    "corner": (360.0, 0.0),
    "columns": 63,
    "column_x": lambda column: 4.65 + 9 * column,
    "rail_x": lambda n: 4.65 + 9 * n,
    "rail_holes": [n for n in range(3, 62) if (n - 3) % 6 != 5],
    "servo_rail": 3,
    # for each button: its first column, the rail hole for its 5V wire,
    # the rail hole for its resistor
    "buttons": {"yellow": (10, 10, 12), "red": (19, 19, 21), "blue": (28, 28, 30), "green": (37, 37, 39)},
    "led": (47, 47),            # column of the short leg, rail hole for the resistor
    "pot": (55, 55, 57),        # first column, rail hole for 5V, rail hole for GND
    "power": (59, 61, 60),      # rail holes for GND, 5V and the wire joining the - rails
}
HALF_SIZE = {
    "file": "p5ArduinoSerial_breadboard_half.fzz",
    "part": "Half_breadboard_v2.fzp",
    "module_id": "0152b316-ca6e-11ee-a6fa-8be78db221f8BreadboardModuleID",
    "size": (292.41, 189.0),
    "corner": (360.0, 120.0),
    "columns": 30,
    "column_x": lambda column: 4.4 + 9 * column,
    "rail_x": lambda n: -10.25 + 9 * n,
    "rail_holes": [n for n in range(3, 32) if (n - 3) % 6 != 5],
    "servo_rail": 3,
    "buttons": {"yellow": (2, 4, 6), "red": (7, 9, 11), "blue": (12, 13, 16), "green": (17, 19, 21)},
    "led": (22, 24),
    "pot": (25, 27, 29),
    "power": (30, 31, 31),
}

# Image sizes of the parts, needed to turn them (a part turns about the
# middle of its image)
SIZE = {
    "resistor": (38.625, 8.739),
    "led": (19.32, 36.508),
    "pot": (36.488, 74.556),
    "servo": (102.578, 82.532),
    "button": (42.5, 49.0),
}

# A quarter turn, as Fritzing writes it: a point (x, y) goes to (-y, x)
IDENTITY = ((1, 0), (0, 1))
QUARTER_TURN = ((0, 1), (-1, 0))


def apply(matrix, point):
    x, y = point
    return (x * matrix[0][0] + y * matrix[1][0], x * matrix[0][1] + y * matrix[1][1])


def multiply(a, b):
    """The matrix that does a, then b."""
    return tuple(tuple(sum(a[i][k] * b[k][j] for k in range(2)) for j in range(2)) for i in range(2))


def add(p, q):
    return (p[0] + q[0], p[1] + q[1])


def sub(p, q):
    return (p[0] - q[0], p[1] - q[1])


# ---------------------------------------------------------------------
# Reading Fritzing's own files
# ---------------------------------------------------------------------

def read_example(name):
    """The sketch XML inside one of Fritzing's example .fzz files."""
    with zipfile.ZipFile(EXAMPLES / f"{name}.fzz") as z:
        return ET.fromstring(z.read(f"{name}.fz"))


def template(example, title):
    """A copy of a part as it is written in an example sketch."""
    for inst in example.iter("instance"):
        if inst.findtext("title") == title:
            return copy.deepcopy(inst)
    raise KeyError(title)


# ---------------------------------------------------------------------
# Custom part: a 12mm pushbutton with a coloured cap
#
# Fritzing's own pushbuttons are small and grey. The SparkFun Inventor's
# Kit has 12mm buttons with red, yellow, green and blue caps, so we make
# four parts that look like those. Each is Fritzing's standard four-leg
# pushbutton with a new picture; the files travel inside the .fzz.
# ---------------------------------------------------------------------

BUTTON_COLOURS = {
    "red": ("#d92b2b", "#8f1717"),
    "yellow": ("#f2c81f", "#a88a0d"),
    "green": ("#2ea34f", "#1a6b31"),
    "blue": ("#2a6fe0", "#174596"),
}


def button_module_id(colour):
    return f"p5ArduinoSerial_pushbutton_12mm_{colour}"


def button_svg(colour):
    """The breadboard picture: a square black body, four legs, a round cap.

    The legs are 18 apart one way (two holes) and 45 the other (five
    holes), so the button sits across the gap in the middle of the
    breadboard. The two legs on each side are joined inside the button.
    """
    cap, edge = BUTTON_COLOURS[colour]
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0.47222in" height="0.54444in" viewBox="0 0 42.5 49">
  <g id="breadboard">
    <rect id="connector2pin" x="11" y="0" width="2.5" height="4" fill="#8c8c8c"/>
    <rect id="connector3pin" x="11" y="45" width="2.5" height="4" fill="#8c8c8c"/>
    <rect id="connector0pin" x="29" y="0" width="2.5" height="4" fill="#8c8c8c"/>
    <rect id="connector1pin" x="29" y="45" width="2.5" height="4" fill="#8c8c8c"/>
    <rect x="0" y="3.25" width="42.5" height="42.5" rx="3" fill="#262626"/>
    <rect x="2.5" y="5.75" width="37.5" height="37.5" rx="2" fill="#383838"/>
    <circle cx="21.25" cy="24.5" r="15.5" fill="{edge}"/>
    <circle cx="21.25" cy="24.5" r="13.5" fill="{cap}"/>
    <ellipse cx="16.5" cy="19" rx="6" ry="3.5" fill="#ffffff" fill-opacity="0.35"/>
  </g>
</svg>
'''


def button_fzp(colour):
    """The part definition: Fritzing's four-leg pushbutton with our picture."""
    fzp = (PARTS / "core" / "pushbutton_4_horizontal.fzp").read_text(encoding="utf-8")
    replacements = [
        ('moduleId="20A9BBEE34_ST"', f'moduleId="{button_module_id(colour)}"'),
        ("<title>Pushbutton</title>", f"<title>Pushbutton 12mm ({colour})</title>"),
        ('<property name="family">Switch</property>',
         f'<property name="family">Pushbutton 12mm</property>\n  <property name="color">{colour}</property>'),
        ('image="breadboard/basic_pbutton.svg"',
         f'image="breadboard/{button_module_id(colour)}_breadboard.svg"'),
    ]
    for old, new in replacements:
        assert fzp.count(old) == 1, old
        fzp = fzp.replace(old, new)
    return fzp


# ---------------------------------------------------------------------
# Building the sketch
# ---------------------------------------------------------------------

class Part:
    """A part or wire in the sketch, and its breadboard-view connectors."""

    def __init__(self, inst, bb, index, layer=None):
        self.inst, self.bb, self.index = inst, bb, index
        self.layer = layer or bb.get("layer")

    def connector(self, name):
        connectors = self.bb.find("connectors")
        if connectors is None:
            connectors = ET.SubElement(self.bb, "connectors")
        for connector in connectors.findall("connector"):
            if connector.get("connectorId") == name:
                return connector
        connector = ET.SubElement(connectors, "connector", connectorId=name, layer=self.layer)
        ET.SubElement(connector, "geometry", x="0", y="0")
        return connector

    def link(self, name, other, other_name):
        connects = self.connector(name).find("connects")
        if connects is None:
            connects = ET.SubElement(self.connector(name), "connects")
        ET.SubElement(connects, "connect", connectorId=other_name, modelIndex=str(other.index),
                      layer=other.layer)


def connect(a, a_name, b, b_name):
    """Record a connection in both directions, as Fritzing does."""
    a.link(a_name, b, b_name)
    b.link(b_name, a, a_name)


class Sketch:
    def __init__(self):
        self.instances = []
        self.next_index = 1000
        self.z = 3.5

    def add_part(self, tpl, title, fzp_path, position, matrix=IDENTITY, shift=(0, 0),
                 module_id=None, properties=None):
        """Add a part in breadboard view.

        position is where the corner of its image goes. matrix and shift
        are the turn Fritzing applies to the image (none by default).
        """
        inst = tpl
        inst.set("modelIndex", str(self.next_index))
        inst.set("path", str(fzp_path))
        if module_id:
            inst.set("moduleIdRef", module_id)
        inst.find("title").text = title
        for prop in inst.findall("property"):
            if properties and prop.get("name") in properties:
                prop.set("value", properties[prop.get("name")])
        views = inst.find("views")
        for view in list(views):
            if view.tag != "breadboardView":
                # Keep the part's place in the other views, but none of the
                # example's connections there
                for connectors in view.findall("connectors"):
                    view.remove(connectors)
                geometry = view.find("geometry")
                if geometry is not None:
                    geometry.set("x", str(float(geometry.get("x")) + 60 * len(self.instances)))
        bb = views.find("breadboardView")
        geometry = bb.find("geometry")
        geometry.set("x", f"{position[0]:.4f}")
        geometry.set("y", f"{position[1]:.4f}")
        for transform in geometry.findall("transform"):
            geometry.remove(transform)
        if matrix != IDENTITY:
            ET.SubElement(geometry, "transform",
                          m11=f"{matrix[0][0]:g}", m12=f"{matrix[0][1]:g}", m13="0",
                          m21=f"{matrix[1][0]:g}", m22=f"{matrix[1][1]:g}", m23="0",
                          m31=f"{shift[0]:.4f}", m32=f"{shift[1]:.4f}", m33="1")
        # Forget the example's connections, but keep each connector's shape
        # (some parts have bendable legs)
        connectors = bb.find("connectors")
        if connectors is None:
            connectors = ET.SubElement(bb, "connectors")
        for connector in connectors.findall("connector"):
            for connects in connector.findall("connects"):
                connector.remove(connects)
        part = Part(inst, bb, self.next_index)
        self.next_index += 1
        self.instances.append(inst)
        return part

    def add_wire(self, start, end, colour):
        """Add a straight wire from start to end (x, y points)."""
        index = self.next_index
        self.next_index += 1
        self.z += 0.0001
        inst = ET.Element("instance", moduleIdRef="WireModuleID", modelIndex=str(index),
                          path=":/resources/parts/core/wire.fzp")
        ET.SubElement(inst, "title").text = f"Wire{index}"
        views = ET.SubElement(inst, "views")
        bb = ET.SubElement(views, "breadboardView", layer="breadboardWire")
        ET.SubElement(bb, "geometry", z=f"{self.z:.5f}", x=f"{start[0]:.4f}", y=f"{start[1]:.4f}",
                      x1="0", y1="0", x2=f"{end[0] - start[0]:.4f}", y2=f"{end[1] - start[1]:.4f}",
                      wireFlags="64")
        ET.SubElement(bb, "wireExtras", mils="22.2222", color=colour, opacity="1", banded="0")
        connectors = ET.SubElement(bb, "connectors")
        for name in ("connector0", "connector1"):
            connector = ET.SubElement(connectors, "connector", connectorId=name, layer="breadboardWire")
            ET.SubElement(connector, "geometry", x="0", y="0")
        self.instances.append(inst)
        return Part(inst, bb, index, layer="breadboardWire")


def build(board):
    button_example = read_example("Button")
    servo_example = read_example("AnalogInputToServo")
    sketch = Sketch()

    # ---- Where things go -------------------------------------------------
    AX, AY = 0.0, 80.0          # the Arduino's corner
    BX, BY = board["corner"]    # the corner of the upright breadboard
    BREADBOARD_SIZE = board["size"]

    def on_board(point):
        """Turn a point on the lying-down breadboard into its place in the
        drawing, where the breadboard stands upright: column 1 at the top,
        row A and the W / X rails on the left."""
        return add(apply(QUARTER_TURN, point), (BX + BREADBOARD_SIZE[1], BY))

    def hole_xy(column, row):
        if row in "WXYZ":
            assert column in board["rail_holes"], f"no rail hole {column}{row}"
            return (board["rail_x"](column), ROW_Y[row])
        assert 1 <= column <= board["columns"]
        return (board["column_x"](column), ROW_Y[row])

    def hole(column, row):
        return on_board(hole_xy(column, row))

    def pin(connector):
        x, y = ARDUINO_PINS[connector]
        return (AX + x, AY + y)

    # ---- The two boards ---------------------------------------------------
    arduino = sketch.add_part(template(button_example, "Arduino1"), "Arduino",
                              PARTS / "core" / "arduino_Uno_Rev3(fix).fzp", (AX, AY))

    def board_part(tpl, title, fzp_path, position, size, matrix=IDENTITY, shift=(0, 0), **kwargs):
        """Add a part that is on the breadboard: position (and any turn of
        its own) are for the lying-down breadboard, and the part is turned
        upright along with it."""
        turned = multiply(matrix, QUARTER_TURN)
        centre = (size[0] / 2, size[1] / 2)
        new_shift = sub(centre, apply(turned, centre))
        corner = sub(on_board(add(shift, position)), new_shift)
        return sketch.add_part(tpl, title, fzp_path, corner, turned, new_shift, **kwargs)

    breadboard_tpl = ET.Element("instance", moduleIdRef=board["module_id"])
    ET.SubElement(breadboard_tpl, "title")
    views = ET.SubElement(breadboard_tpl, "views")
    ET.SubElement(ET.SubElement(views, "breadboardView", layer="breadboardbreadboard"), "geometry", z="1.5")
    for view in ("schematicView", "pcbView"):
        ET.SubElement(ET.SubElement(views, view, layer="breadboardbreadboard"), "geometry", z="-1", x="0", y="0")
    breadboard = board_part(breadboard_tpl, "Breadboard", PARTS / "core" / board["part"],
                            (0, 0), BREADBOARD_SIZE)

    # Start the Arduino with no connectors listed; they are added as
    # things are connected to it
    connectors = arduino.bb.find("connectors")
    for connector in list(connectors):
        connectors.remove(connector)

    # ---- Wiring helpers ---------------------------------------------------
    def plug(part, name, column, row):
        connect(part, name, breadboard, f"pin{column}{row}")

    def jumper(colour, a, b):
        """A straight wire between two breadboard holes: (column, row) each."""
        w = sketch.add_wire(hole(*a), hole(*b), colour)
        connect(w, "connector0", breadboard, f"pin{a[0]}{a[1]}")
        connect(w, "connector1", breadboard, f"pin{b[0]}{b[1]}")

    def routed(colour, connector, target, lane_y, lane_x):
        """A wire from an Arduino pin to a breadboard hole, drawn with
        right-angle bends: away from the board to its own lane, across to
        its own lane beside the breadboard, along that to the hole's
        height, then straight in to the hole."""
        start, end = pin(connector), hole(*target)
        points = [start, (start[0], lane_y), (lane_x, lane_y), (lane_x, end[1]), end]
        previous = None
        for i in range(len(points) - 1):
            w = sketch.add_wire(points[i], points[i + 1], colour)
            if i == 0:
                connect(w, "connector0", arduino, connector)
            else:
                connect(previous, "connector1", w, "connector0")
            previous = w
        connect(previous, "connector1", breadboard, f"pin{target[0]}{target[1]}")

    def resistor(title, ohms, column, row):
        """A resistor lying along a row, from column to column + 4."""
        r = board_part(template(button_example, "R1"), title, PARTS / "core" / "resistor.fzp",
                       add(hole_xy(column, row), (-1.316, -4.541)), SIZE["resistor"],
                       properties={"resistance": ohms})
        plug(r, "connector0", column, row)
        plug(r, "connector1", column + 4, row)

    def resistor_to_rail(title, ohms, column, row, rail, rail_hole):
        """A resistor from a hole straight across into a power rail, with no
        extra wire. The hole and the rail must be four holes apart, which
        is the length of a resistor. If the rail hole isn't exactly in line
        with the column, the leg at the rail is bent across to reach it."""
        rail_first = ROW_Y[rail] < ROW_Y[row]
        first, second = (rail, row) if rail_first else (row, rail)
        assert ROW_Y[second] - ROW_Y[first] == 36, "the resistor doesn't reach"
        size = SIZE["resistor"]
        centre = (size[0] / 2, size[1] / 2)
        shift = sub(centre, apply(QUARTER_TURN, centre))
        position = add(sub((hole_xy(column, row)[0], ROW_Y[first]), shift), (4.541, -1.316))
        r = board_part(template(button_example, "R1"), title, PARTS / "core" / "resistor.fzp",
                       position, size, QUARTER_TURN, shift, properties={"resistance": ohms})
        sideways = hole_xy(rail_hole, rail)[0] - hole_xy(column, row)[0]
        rail_connector = "connector0" if rail_first else "connector1"
        for connector in r.bb.findall("connectors/connector"):
            if connector.get("connectorId") == rail_connector:
                connector.findall("leg/point")[1].set("y", f"{-sideways:.4f}")
        plug(r, "connector0" if rail_first else "connector1", rail_hole, rail)
        plug(r, "connector1" if rail_first else "connector0", column, row)

    # ---- Wire lanes ---------------------------------------------------------
    # Each wire from the Arduino gets its own lane, chosen so that wires
    # cross as little as possible. Digital pins are on the Arduino's top edge: their wires
    # go up, across and down. Power and analog pins are on the bottom edge:
    # their wires go down, across and down again. Wires don't cross where
    # parts are placed down the breadboard in the same order as their pins
    # (everything except the buttons).
    def top_lane(i):          # i = 0 is the lane nearest the Arduino
        return AY - 12 - 8 * i

    def bottom_lane(i):
        return AY + 189 + 10 + 8 * i

    def digital_x(i):
        return 300 + 8 * i

    def power_x(i):
        return 292 - 8 * i

    # ---- Servo on pin 9 -------------------------------------------------------
    # A servo's lead ends in a socket, so it isn't plugged into the
    # breadboard. Three jumper wires go from the socket: signal to pin 9,
    # 5V to the + rail and GND to the - rail.
    #
    # The servo sits above the Arduino with its lead pointing down. Its
    # image is turned and flipped so that the three wires leave in an order
    # that lets them reach their ends without crossing: signal on the left.
    signal_end = (270.0, -12.0)                  # where the lead's signal wire ends
    servo_matrix = ((0, 1), (1, 0))              # a quarter turn, then a flip
    servo_shift = (10.023, -10.023)              # keeps the turn about the middle of the image
    servo = sketch.add_part(template(servo_example, "J1"), "Servo", PARTS / "core" / "servo.fzp",
                            sub(signal_end, (67.7917, 113.4373)), servo_matrix, servo_shift)

    def lead_wire(colour, points, servo_connector, end_part, end_connector):
        """A jumper wire from the servo's socket, drawn through the points."""
        previous = None
        for i in range(len(points) - 1):
            w = sketch.add_wire(points[i], points[i + 1], colour)
            if i == 0:
                connect(w, "connector0", servo, servo_connector)
            else:
                connect(previous, "connector1", w, "connector0")
            previous = w
        connect(previous, "connector1", end_part, end_connector)

    sx, sy = signal_end
    servo_rail = board["servo_rail"]
    lead_wire(PURPLE, [(sx, sy), (sx, 14), (pin(D9)[0], 14), pin(D9)], "connector2", arduino, D9)
    lead_wire(RED, [(sx + 9, sy), (sx + 9, 6), (hole(servo_rail, "W")[0], 6), hole(servo_rail, "W")],
              "connector1", breadboard, f"pin{servo_rail}W")
    lead_wire(BLACK, [(sx + 18, sy), (sx + 18, -2), (hole(servo_rail, "X")[0], -2), hole(servo_rail, "X")],
              "connector0", breadboard, f"pin{servo_rail}X")

    # ---- Four pushbuttons, each with a pull-down resistor ----------------------
    # Each button sits across the gap in the middle. Its first column goes
    # to 5V. Its second column goes to the Arduino pin on the left side of
    # the gap, and on the right side through a 10k resistor straight into
    # the - rail.
    #
    # A cross of buttons doesn't fit on a breadboard (every button has to
    # sit across the gap), so they are in a line that reads like a cross
    # laid flat: Up, Left, Right, Down. That order is not the order of the
    # pins, so the Left and Up wires each cross the Right and Down wires.
    buttons = [
        ("yellow", "Yellow / Up", D6, YELLOW, 2),
        ("red", "Red / Left", D5, ORANGE, 1),
        ("blue", "Blue / Right", D8, BLUE, 4),
        ("green", "Green / Down", D7, GREEN, 3),
    ]
    for colour, name, arduino_pin, wire_colour, lane in buttons:
        col, five_v_hole, resistor_hole = board["buttons"][colour]
        button = board_part(template(button_example, "S1"), f"Button {name}",
                            f"{button_module_id(colour)}.fzp",
                            sub(hole_xy(col, "G"), (12.25, 2.0)), SIZE["button"],
                            module_id=button_module_id(colour))
        plug(button, "connector2", col, "G")
        plug(button, "connector3", col, "D")
        plug(button, "connector0", col + 2, "G")
        plug(button, "connector1", col + 2, "D")
        jumper(RED, (col, "A"), (five_v_hole, "W"))
        resistor_to_rail(f"10k {name}", "10kΩ", col + 2, "J", "Z", resistor_hole)
        routed(wire_colour, arduino_pin, (col + 2, "A"), top_lane(lane), digital_x(lane))

    # ---- LED on pin 2, with its resistor to GND ---------------------------------
    # The LED's legs are drawn straight into two holes side by side.
    led_col, led_rail = board["led"]
    led = board_part(template(button_example, "LED1"), "LED", PARTS / "core" / "LED-generic-5mm.fzp",
                     sub(hole_xy(led_col, "D"), (5.6583, 67.279)), SIZE["led"])
    for connector in led.bb.findall("connectors/connector"):
        end = connector.findall("leg/point")[1]
        end.set("x", "0")
        end.set("y", "30.7705")
    plug(led, "connector0", led_col, "D")       # cathode (the short leg)
    plug(led, "connector1", led_col + 1, "D")   # anode
    resistor_to_rail("330", "330Ω", led_col, "B", "X", led_rail)
    routed(WHITE, D2, (led_col + 1, "A"), top_lane(0), digital_x(0))

    # ---- Potentiometer on A0 -------------------------------------------------------
    pot_col, pot_five_v, pot_gnd = board["pot"]
    pot = board_part(template(servo_example, "R1"), "Potentiometer",
                     PARTS / "core" / "potentiometer_rotary_9mm_6.fzp",
                     sub(hole_xy(pot_col, "D"), (9.27, 73.62)), SIZE["pot"])
    plug(pot, "connector0", pot_col, "D")
    plug(pot, "connector1", pot_col + 1, "D")
    plug(pot, "connector2", pot_col + 2, "D")
    jumper(RED, (pot_col, "A"), (pot_five_v, "W"))
    jumper(BLACK, (pot_col + 2, "A"), (pot_gnd, "X"))
    routed(BROWN, A0, (pot_col + 1, "A"), bottom_lane(0), power_x(0))

    # ---- Power: the Arduino's GND and 5V to the left-hand rails -----------------
    gnd_hole, five_v_hole, link_hole = board["power"]
    routed(BLACK, GND, (gnd_hole, "X"), bottom_lane(1), power_x(1))
    routed(RED, FIVE_V, (five_v_hole, "W"), bottom_lane(2), power_x(2))
    # The pull-down resistors use the - rail on the right, so join the two
    # - rails together
    jumper(BLACK, (link_hole, "X"), (link_hole, "Z"))

    return sketch, button_example


def write(sketch, example, out):
    module = ET.Element("module", fritzingVersion=example.get("fritzingVersion"))
    for child in example:
        if child.tag in ("project_properties", "views"):
            module.append(copy.deepcopy(child))
    instances = ET.SubElement(module, "instances")
    for inst in sketch.instances:
        instances.append(inst)
    ET.indent(module, space="    ")
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n' + ET.tostring(module, encoding="unicode") + "\n"
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr(out.with_suffix(".fz").name, xml)
        # The custom pushbuttons travel inside the sketch file
        for colour in BUTTON_COLOURS:
            name = button_module_id(colour)
            z.writestr(f"part.{name}.fzp", button_fzp(colour))
            z.writestr(f"svg.breadboard.{name}_breadboard.svg", button_svg(colour))


if __name__ == "__main__":
    for board in (FULL_SIZE, HALF_SIZE):
        out = Path(__file__).with_name(board["file"])
        sketch, example = build(board)
        write(sketch, example, out)
        wires = sum(1 for i in sketch.instances if i.get("moduleIdRef") == "WireModuleID")
        print(f"wrote {out.name}: {len(sketch.instances) - wires} parts, {wires} wires")
