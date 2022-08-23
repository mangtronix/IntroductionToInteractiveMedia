# Mang's section of Intro to IM #
- Shortcut to [today's assignment](weeklySchedule.md/#todays-assignment)    
- Shortcut to [today's lecture](lectureNotes.md/#todays-lecture)    

**New York University Abu Dhabi**  
**Interactive Media Program**  
**Course title: Introduction to Interactive Media**  
Course number: IM-UH 1010   
Section: Michael Ang    
Credit Hours: 4         
Prerequisites: None       

Course website: [https://github.com/mangtronix/IntroductionToInteractiveMedia](https://github.com/mangtronix/IntroductionToInteractiveMedia)      
Instructor: Michael Ang (Mang) michael.ang@nyu.edu    
Office hours: By appointment  
Meeting times:    
- 3:35-6:15PM Monday
- 5:00-6:15PM Wednesday

Session: Fall 2022     

**This is subject to change. UPDATE FOR FALL 2022 IN PROGRESS.**

## Weekly Schedule
- [Week 1](#week-1) - Introductions / GitHub, p5.js
- [Week 2](#week-2) - Variables, animation, conditionals
- [Week 3](#week-3) - Functions, arrays, object oriented programming (OOP)
- [Week 4](#week-4) - Working with text
- [Week 5](#week-5) - Working with pixels, sound
- [Week 6](#week-6) - Computer Vision
- [Week 7](#week-7) - Midterm presentations
- FALL BREAK
- [Week 8](#week-8) - Introduction to Arduino, electricity
- [Week 9](#week-9) - Analog and digital I/O
- [Week 10](#week-10) - Sound, movement, circuit schematics
- [Week 11](#week-11) - Connecting Arduino to p5.js
- [Week 12](#week-12) - Motors, soldering, fabricating
- [Week 13](#week-13) - Circuit debugging
- [Week 14](#week-14) - Final project
- [IM Show](#im-show) - IM End of Semester Show



## Week 1

### Week 1.1 - 08/29

#### Administration

- Introductions
- Syllabus etc.
- Join the Discord server 

#### What’s the class about?

<ul>
 	<li>
Digital computation beyond computers (sometimes called "physical computing") considering humanistic needs in design and usability</li>
 	<li>
Computers traditionally lacked knowledge of outside world beyond a keyboard, mouse</li>
<li>Look critically at products and designs</li>
 	<li>
As artists and designers, we can explore new paradigms of interaction with machines and each other</li>
 	<li>
Relatively easily and inexpensively explore creative computation through open source software and hardware</li>
 	<li>
No background needed, strong DIY attitude</li>
 	<li>
Low barrier to entry, high ceiling</li>
</ul>

#### Example
<ul>
 	<li>Carlos Guedes' wonderful <a href="https://vimeo.com/235763130">Phobos</a>, Orquestra Robótica Disfuncional (1 min)</li>
	<li>Mang's <a href="https://www.michaelang.com/project/city-refl3ctor">City Refl3ctor</li>
 	<li>Sudhu Tewari's <a href="https://www.youtube.com/watch?v=MjNB3nKPMb8" >Yasmin Electro Mechanical Sequencer</a></li>
 	<li>List of <a href="http://eat.cca.edu/" >inspirational movies</a> collected by <a href="http://www.ultrafuzz.net/" >Barney Haynes</a> (also <a href="https://vimeo.com/barneyhaynes" >here</a>) and shown at his interface classes.</li>
 	<li>List collected by <a href="https://github.com/zamfi">J.D. Zamfirescu</a>
<li><a href="http://www.youtube.com/watch?v=zkpH1BjD6Wc" >Tree-climbing robot</a></li>
<li><a href="http://www.youtube.com/watch?v=tOsNXg2vAd4#t=120" >Insect robot</a></li>
<li><a href="http://www.youtube.com/watch?v=YblSltHDbIU" >Treadbot</a></li>
<li><a href="https://www.futureforms.us/murmur-wall" >Murmur Wall</a></li>
<li><a href="http://vimeo.com/72826106" >Floating Couch</a></li>
<li><a href="https://www.youtube.com/watch?v=BZysu9QcceM#t=36" >Wooden Segment Mirror</a></li>
<li><a href="https://www.youtube.com/watch?v=pNkz8wEJljc" >Generative design</a></li>
<li><a href="https://vimeo.com/71044541" >Textile weaving</a></li>
<li><a href="https://www.youtube.com/watch?v=czuhNcNU6qU" >Projection mapping</a></li>
<li><a href="http://www.youtube.com/watch?v=sLVXmsbVwUs#t=20" >Laser
harp</a></li>
<li><a href="http://vimeo.com/57082262#at=130" >Arc-o-matic</a></li>
<li><a href="https://www.youtube.com/watch?v=w4cdbV2oaEc" >Eggbot</a></li>
<li><a href="http://www.youtube.com/watch?v=kx9D74t7GD8#t=89"
>Textspresso</a></li>
<li><a href="http://www.youtube.com/watch?v=pCC1GXnYfFI#t=11" >Shapoko / tinyg</a></li>
<li><a href="http://www.youtube.com/watch?v=NAbiAzYhTOQ" >Makerbot Replicator</a></li>
<li><a href="https://www.youtube.com/watch?v=0DNkbZvVYvc"
>Roomba</a></li></li>
 	<li><a href="https://www.youtube.com/watch?v=1G0MzlfMPuM" >Golan Levin: Art that looks back at you</a></li>
 	<li><a href="https://www.youtube.com/watch?v=PV_w38ldZaE" >Drawdio</a></li>
 	<li>Claire Neel's <a href="https://youtu.be/lYERKTf5YtI" >reactive eye</a></li>
 	<li>Professor Aaron Sherwood's <a href="http://aaron-sherwood.com/works/firewall/">Reactive Wall</a></li>
 	<li><a href="http://melissafelderman.com/digitalgraffitiwall/index.html">Digital Graffiti Wall</a></li>
 	<li><a href="http://www.willjfield.com/itp-2/explorer-space-simulator/">Space Simulator</a></li>
 	<li><a href="https://vimeo.com/114414122">Wind based jug organ</a></li>
 	<li><a href="http://andysigler.com/projects/dipinator/">The Dipinator</a></li>
 	<li><a href="https://www.gabebc.com/jitterbox">Jitterbox</a></li>
</ul>
</li>
</ul>

### Week 1.2 - 08/31

#### Let's get started

##### GitHub
- What is [GitHub](https://github.com/)?
- Difference between an account and a repository
- Follow along with me and create an account
- Instructions for this are
[here](https://github.com/michaelshiloh/resourcesForClasses#github-resources).

Please use your name for your account name so that I can more easily recognize
it.  If you don't want to use your name for privacy reasons, please choose an
alias that I can recognize as you.

Name your repository "introduction to interactive Media". 

- Edit your README.md file
	- What is README.md?
	- What is .md?
- Simple Markdown 
	- **Bold**
	- Paragraphs must be separated by a blank line
	- Inserting images: ![](media/eye-calipers.jpg)
	- Always remember to commit your changes!
	- More [here](https://github.com/michaelshiloh/resourcesForClasses#github-resources).


##### Simple shapes in p5.js

Open [p5.js editor](https://editor.p5.js/)

- `ellipse()`
- `rect()`
- `createCanvas()`
- `triangle(x1, y1, x2, y2, x3, y3)`
- `line()`
- `point()`

What does this all mean?
- Functions
- Arguments or parameters

Controlling color, fill, and stroke

- `stroke()`
- `noStroke()`
- `fill()`
- `arc(100, 100, 100, 100, 0, 180)`
- `arc(100, 100, 100, 100, 0, radians(180), CHORD)`

Here is the program we developed in class:

````
function setup() {
  createCanvas(600,600); 
  background(25, 130, 80); 
  
  // draw a circle and a rectangle with the default colors
  circle (width/2, height/2, 50);
  rect(10, 10, 80, 20);
  
  // change the stroke and fill
  fill(180,0,0);
  stroke(0,0,180);
  // circle(80, 80, 80); this circle is commented out so it won't be drawn
  ellipse(200, 280, 50, 80);
  
  // change the stroke color but keep the same fill
  stroke(180,0,0);
  line( 0,0, 300, 100);
  
  let foo = radians(90);
  prlet(foo);                  //!!!!!!!!!!!!!!!!!!!!!!!! THIS IS VERY USEFUL!!!!!!!
  
  arc(50, 55, // center of the ellipse
      50, 50, // width and height
      0, radians(180)); // start and stop angle
  
  triangle( 100, 100, 10, 200, 100, 300);
  polet(width/2, height/2);
}

let x = 0;
function draw() {
	// Where am I poleting?
  prlet(mouseX, mouseY);
  
	// I can do animation!
  circle(x, 500, 40);
  x=x+1;
}

````
**Notes**
- Built-in variables
	- `width`, `height`, `mouseX`, `mouseY`
	- many others; we will discover more as we go along

**Notice that when working in the web editor your sketches are not
saved!**
- You can create an account on p5.js if you wish for your own use
but all class assignments must be handed in on Github.
- Github is designed to save works in progress. It is not only permissible to
	save unfinished work, it is advisable so that work doesn't get lost
- Github tracks changes so you can go back to any previous commit
- This saves you from having multiple versions of a program on your laptop
- You can even compare different commits to see what changes you made 
	between them

##### Saving a sketch to Github

- Navigate to desired folder
- Click on "Add file" 
- Select "Create new file"
- Type in optional new folder(s) followed by slashes `/` followed by a file
	name
- Copy your code from the p5.js editor and paste it into Github
- Scroll down to the bottom
- Optionally change the commit comment
- Click on "Commit new file"

## Week 2

### Week 2.1 - 09/05

#### Homework
Look at self portraits

#### Questions
Did any questions come up since we last met?

##### Variables

- Javascript is not a typed language: you don't need to declare
	a variable's type
- `let myNumber = 4.5;`
- `let myString = "the quick brown fox";`
- `let myArray = ["the", "quick", "brown", "fox"];`
- `let myRandomNumber = random(255);`
- `let myRandomNumber = round(random(255));`
How can we find out what a variable's value is?
`print()` 

##### Animation

Use the `draw()` function to draw something different in each frame. This can
be the location of a shape but you can manipulate anything such as color also:

The  `draw()` function is called once per frame. Think of it as drawing a new
page on a ["flip book"](https://en.wikipedia.org/wiki/Flip_book)

````
let foo = 0;

function setup() {
  createCanvas(300, 300);
}

function draw() {
  ellipse(foo, 50, 40, 40);
  foo = foo + 1;
}
````

By default, the previous frame is not erased. Sometimes this is useful.
Use the `background()` function to "paint" over any previous drawings. 

````
function setup() {
  createCanvas(500, 500);
}

let triangleTopLeftX = 0;
let redValue = 255;

function draw() {
  // erase previous drawings
  background(10, 255, 255);

  // Move the triangle
  triangleTopLeftX = triangleTopLeftX + 1;

	// If the triangle reaches the right edge, move to the left edge
  if (triangleTopLeftX >= width) {
    triangleTopLeftX = 0;
  }

  // Change the value of red
  redValue = redValue - 1;

	//If red reaches a certian level, reset it
  if (redValue === 55) {
		redValue = 255;
	}

  // Select the fill for the triangle
  fill(redValue, redValue - 100, redValue - 100);

  // Draw the triangle
  triangle(
    triangleTopLeftX,
    20, // top left corner
    triangleTopLeftX + 100,
    30, // top right corner
    triangleTopLeftX + 50,
    200
  ); // bottom corner
  
  // Select the fill for the circle
  fill(10,20, 240);

  // Draw the circle
  circle(mouseX, mouseY, 30);
  print("mouse coordinates = " + mouseX + ", " + mouseY);
}

````

##### Notes:

- Local vs. Global variables
- Built-in variables

````
// Example usage of a global variable

let count; // this is now a global variable

function setup() {
  circle(50, 50, 30);
  count = 7; // the variable is initialized here
}

function draw() {
  count = count + 1; // not algebra!
  // The result of the right hand side calculation
  // replaces whatever value was stored in the variable
  // on the left side of the '=' sign
  // end result: the variable "count" is incremented by 1

  print (count);
}
````

##### What is `frameRate()`?

````
function setup() {
  frameRate(10);       // frameRate() is a function
  print(frameRate()); // it takes awhile for the frame rate to change
}

function draw() {
  print(frameRate());
}
````

### Week 2.2 - 09/07

##### Review

- conditionals 

````
function setup() {
  createCanvas(300, 300);
}

function draw() {
  if (mouseIsPressed === true) {
    background(color(0, 0, 255));
  } else {
    background(color(200, 0, 0));
  }
}
````

**Notes**:
1. `mouseIsPressed` is another built-in variable. There are many others.
1. `mouseIsPressed` is a new type of data, namely a `boolean`, 
	which means it has
	 only one of two values, `true` or `false`
1. Note that `{` and `}` indicate the blocks
1. The `else` part of an `if()` statement is optional (what happens if we
	 remove it?)

In class exercise:
- Using the cursor to draw
- Now use a mouse press to clear the screen
- Clear the screen if the mouse is pressed inside a certain circle
- Combine these to create a primitive painting program

##### Loops
`while()` is like `if()` but it keeps on doing it as long as condition is true

````
function setup() {
  createCanvas(300, 300);

  let foo = 50; // create and initialize a variable

  while (foo < width) { // keep going as long as the condition is true
    ellipse(foo, 50, 40, 40);
		// modify the variable so something different happens next time
    foo = foo + 50; 
  }
}
````

1. You should get in the habit of giving meaningful names to your variables.
	1. What is a better name for the variable foo?
1. What would happen if you replace the `while()` with `if()`?

There is another way to make a loop using the keyword `for()`. The `for()`
loop structure combines the initialization step and the incrementation step
into the `for()` loop construction:

````
function setup() {
  createCanvas(300, 300);

  // initialization, condition, and incrementation all in one line
  for (let foo = 50; foo < width; foo = foo + 50)  {
    ellipse(foo, 50, 40, 40);
  }
}
````

Which should you use? Whichever is easier for you to understand. Remember that
**most of the time spent programming is fixing problems**, and **whatever you
understand best will probably have fewer problems**.

Both `for()` loops and `while()` loops can be nested, meaning a loop inside a
loop:

````

function setup() {
  createCanvas(700, 700);
  background(230);
  fill(0);

  let yPos = 0;
  let xPos = 0;

  for (yPos = 30; yPos < height; yPos=yPos + 40) {
    for (xPos = 20; xPos<width; xPos=xPos + 40) {
      circle(xPos,yPos, 5);
    }
  }
}

````

#### Functions

Every time you use one of the built-in 'commands', you are really using (or
more properly 'calling') a built-in function. Functions are a very important
building block of programming, and in addition to using built-in functions,
you can also create your own. In fact, you've already been doing that, when
you created the `setup()` and `draw()` functions. In the case of
`setup()` and `draw()` you have to use those names, but when you create other
functions you can make up your own names. Just like variables names, good 
function names make your programs easier to understand.

Why create your own functions?

- Reuse (if it's something you might do again)
- Clarity (remember your three important audiences: yourself, others learning
	from you, me when I grade your work)
- Easier to debug (what is debugging?)
	- One of the most powerful ways to approach
	a bug is to reproduce it with simplest possible example. 
	This is much easier when the thing that's causing
	the problem is already a function.
- Modularity
- Flexibility (with good choice of parameters)

Let's modify the example from last class to use a function. First let's draw a
house instead of a circle to make it a little more interesting:

````
function setup() {
  createCanvas(300, 300);

  // initialization, condition, and incrementation all in one line
  for (let foo = 50; foo < width; foo = foo + 50)  {
    rect(foo, 50, 40, 40);
    line(foo, 50, foo+20, 30);
    line(foo+20, 30, foo+40, 50);
  }
}
````

Now let's make a function called `drawOneHouse()`. If we want to
draw a house at different locations, we need a way to tell
the function `drawOneHouse()` where to put the house. Functions accommodate
this by allowing us to pass information into the function by putting 
that information in the parenthesis. In the function, we store this
information in temporary variables that we can use in the function:

````
function setup() {
  createCanvas(300, 300);

  for (let foo = 50; foo < width; foo = foo + 50) {
    drawOneHouseAt(foo);
  }
}

function drawOneHouseAt( x) {
  rect(x, 50, 40, 40);
  line(x, 50, x+20, 30);
  line(x+20, 30, x+40, 50);
}
````

**Notes**
1. I've said this before and I'll keep saying: 
	**Choose descriptive names for your variables and functions!** 
	`foo` is a bad name, `xPos` is a good name,
	 `houseXPos` is a better name.
1. The value of `foo` (50, 100, 150 ...) is the information passed to the
	 function so that the function can do it's work. The proper name for this
	 information is an **argument**
1. The variable `x` is a temporary variable that **only exists in the function**.
	 This variable is used to store the argument that was passed into the
	 function so that the function can do its work. Once the function is
	 finished, this variable is no longer needed and is destroyed. 
	 A variable used in this way is called a **parameter**
1. Functions may take zero, one, or multiple arguments. When you write 
	a function, you decide how many arguments you need. For example, we might
	have included the house size or roof height or house y location. (Of course
	when you use functions that someone else wrote 
	you must use the proper number of parameters.)
1. Functions can return information as well, for example the `random()`
	 function. Functions can either return one piece of information, or none.
	We will see later how to do this. 

#### Variable Scope (again)

````
let foo;  // this is a global variable, visible in all functions

function setup() {
  foo = 7;
}

function draw() {

  print(foo);

  let bar; // this is a local variable, visible only inside of draw()

  for (let i = 0; i < width/2; i++) { 
    // i is a local variable visible only inside this for() loop
    ellipse(i, height/2, 10,15);
  }
}
````

## Week 3

### Week 3.1 - 09/12

##### Discuss reading

##### Functions

Any questions about what we've covered already?

Functions that return a value: See the [reference page for
`return`](https://p5js.org/reference/#/p5/return)

**Notes**
- Functions can take any number of arguments (or none), but can return at most
one

In class exercise:

1. Write a function that will take a single parameter
and draw a vertical line from the top of the canvas to the bottom
at the X coordinate indicated by the parameter
	1. In the `setup()` function test your function 
	at a couple of different locations
1. Write another function that will draw a **horizontal** line
at the indicated **Y** coordinate
	1. Test as before
1. Using these two functions, write a program in `setup()`
that draws a grid of lines at regular intervals on the canvas

#### Callback Functions

`MouseClicked()` [example](https://p5js.org/reference/#/p5/mouseClicked) in
the reference section

**Notes**
- You never have to call **callback functions**. The p5.js system calls them
	for you when that event happens


````
const redLocationX = 40;
const redLocationY = 40;

const blueLocationX = 80;
const blueLocationY = 40;

const menuSizeX = 120
const menuSizeY = 80;

const circleDiameter = 40;
const backgroundColor = 240;

function setup() {
  createCanvas(400,400);

  //prepare background
  background(backgroundColor);

  // Put a box around the menu. We won't be allowed to draw here
  rect(0,0, menuSizeX, menuSizeY);

  // draw red circle
  fill (255,0,0);
  circle(redLocationX, redLocationY, circleDiameter);

  // now blue
  fill (0, 0, 255);
  circle(blueLocationX, blueLocationY, circleDiameter);

  // initialize fill to green
  fill (0, 255, 0);

  // turn off stroke
  noStroke();

  // faster refresh rate makes line more solid
  frameRate(200);
}

function draw() {

  if (mouseIsPressed &&
      !mouseIsWithinRect(0, 0, menuSizeX, menuSizeY)) {
    circle(mouseX, mouseY, 15);
  }
}

function mouseClicked() {

   // Have we chosen red?
  if (mouseIsWithinCircle(redLocationX, redLocationY, circleDiameter/2)) {
    console.log("you chose red!");
    fill (255,0,0);
  }

  // Have we chosen blue?
  if (mouseIsWithinCircle(blueLocationX, blueLocationY, circleDiameter/2)) {
    console.log("you chose blue!");
    fill (0, 0, 255);
  }

}

function mouseIsWithinCircle( x, y, radius) {
  if (dist(mouseX, mouseY, x, y) < radius) {
    return true;
  }
  return false;
}

function mouseIsWithinRect( x, y, sizeX, sizeY) {
  if (mouseX > x &&
      mouseX < x + sizeX &&
      mouseY > y &&
      mouseY < y + sizeY) {
    return true;
  }
  return false;
}

````

**Notes**
- Operator precedence is [very
	complicated](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence). It is best to put parenthesis to
	force the order you want.

### Week 3.2 - 09/14

#### Topics today
- Finish walking through the "paint" program from Thursday
- Arrays
- Object Oriented Programming 
- Transformations

#### Arrays

Very simply, arrays let you store multiple things under one variable name, and
let you identify which thing you want by using an `index`


````
function setup() {
  const numberOfValues = 10;

  let values = []

  let n = 0;
  while (n < numberOfValues ) {
    values.push( n * n );
    n = n + 1;
  }

  for (let i = 0; i < values.length; i++) {
    print(values[i]);
  }
}
````

**Things to notice**

- Similar to the way functions are signified by `()`, 
	arrays are signified by `[]`
- Arrays can be of any data type, but can't be mixed types
- New keyword: `const` 
- Why not just use ten "normal" variables?
- Arrays and loops (either `for()` or `while()`) almost always show up
  together. If you have an array, you almost always want a loop.
- Note that the `while()` loop used to put the numbers into the array
	is exactly the same as the `for()` loop used to print the array. I could
	have used either in both places. I did this to show you that they are
	interchangeable.

#### Object Oriented Programming (OOP)

Walk through
[this](https://github.com/michaelshiloh/resourcesForClasses/tree/master/src/p5jsSketches/simpleP5jsClassExample)

A fun [OOP example](https://editor.p5js.org/aaronsherwood/sketches/JO7e1p6aDr)
by Prof. Aaron


#### Transformations

Walk through
[this](https://creative-coding.decontextualize.com/transformations-and-functions/)
tutorial. You might also find
[this](https://genekogan.com/code/p5js-transformations/) useful for a
slightly different perspective.

## Week 4
### Week 4.1 - 09/19

#### Plan for today

- Discuss reading
- Look at some homework

##### Discuss reading

##### Look at some homework

### Week 4.2 - 09/21
#### Substitute - Mang away
#### Plan for today: Working with text

- How put text on the canvas
- Data Visualization 
- Generative Text

##### Text on the canvas

###### The most basic usage

````
function setup() {
  createCanvas(400, 400);

  text("My Important Message", width / 2, height / 2);
}
````

###### Different Fonts

````
function setup() {
  createCanvas(400, 400);
	textFont("Courier New", 25);

	text("My Important Message", width / 2, height / 2);
}
````

Fonts that seem to be available are 'Courier New' (monospace),
and 'Helvetica' (non-monospace)

You can also load your own fonts but that requires uploading them to the p5.js
server

Help->Reference->LoadFont

**Important**: Note that p5.js is asynchronous, 
meaning that `setup()` will continue even if the `loadFont()` hasn't finished.
There are two ways to force your program to wait for the font to load:

1. Use `preLoad()`
1. Specify an optional callback function in `loadFont()`

###### Selecting one of many fonts

Note that loading a font takes time, so if you expect to use multiple
fonts it's best to preload all of them, and then switch between
them using [`textFont()`](https://p5js.org/reference/#/p5/textFont)

###### Other things to do with text

There are of course many other things you can do with text. You can look at 
Help->Reference->Typography and File->Examples->Typography for ideas and
examples.

##### Data Visualization

What is data visualization? Here are some examples:

- [Ben Fry](http://benfry.com/allstreets/)
- [Aaron Koblin](http://www.aaronkoblin.com/project/flight-patterns)
- [Jer Thorp](https://www.jerthorp.com/portfolio) e.g. Cascade

###### Finding data

Sources

- https://www.springboard.com/blog/free-public-data-sets-data-science-project/
- https://www.ndbc.noaa.gov/rt_data_access.shtml
- https://www.kaggle.com/datasets
- Professor' Mathura's [list of data
	sources](https://github.com/MathuraMG/ConnectionsLabSpring22/blob/master/Week_3_JSON_Fetch/README.md#list-of-data-sources)
 	
Format

- The most common format is CSV. You can create your own CSV file from a 
	spreadsheet because most programs
	(Excel, OpenOffice Calc, Google Sheets) can export any table in CSV format
- Other formats are JSON and XML. We won't spend any time on them, but there
	are p5.js libraries for these.

##### Worked example: Getting and working with a CSV file

- A [database](https://eerscmap.usgs.gov/uswtdb/) of energy generated by wind turbines
- Click "Get Data"
- Scroll down a bit to "Tabular Data: CSV format" and click on "CSV
format". 
	- This will download a `.zip` file.
- Unzip the file. 
	- This will create `uswtdb_v4_1_20210721.csv`
- This is a plain text file; you can view it with a text editor
	- You will see that the first line is the heading of each column
	- Some of the fields are numerical (e.g. case_id)
	- Some of the fields are text (e.g. t_state, t_county)
	- Some of the fields are missing (e.g. faa_ors, faa_asn)
- Now you can load this file into an array of `Strings` and then process each
	line one at a time, pulling out individual fields:

````
/*
 * example to process a CSV file containing data
 * about wind turbines in the USA
 * Source: https://eerscmap.usgs.gov/uswtdb/
 */

// An array of strings to hold the entire file
let strings = [];

// For scaling, we want to know the minimum and maximum latitude and longitude
let minLat;
let maxLat;
let minLong;
let maxLong;

function preload() {
  // The text from the file is loaded into an array.
  strings = loadStrings("uswtdb_v4_3_20220114.csv");
}

function setup() {
  createCanvas(500, 400);
  background(235);

  // Did we succeed to load anything?
  if (strings == null) {
    print("failed to load the file, stopping here");

    // this is an endless loop; it's a common way
    // to prevent a program from continuing when
    // something is so wrong that there is no sense
    // in continuing
    while (true) {}
  }

  print(
    "strings loaded from file successfully, read " + strings.length + " lines"
  );

  // Find the minimum and maximum latitude
  // and longitude
  findMinMaxLatLong();
}

function findMinMaxLatLong() {
  let singleRow = [];

  // loop over each row in the file
  for (let csvRowNumber = 1; csvRowNumber < strings.length; csvRowNumber++) {
    // get a single row and split that row
    // into individual words
    singleRow = split(strings[csvRowNumber], ",");

    // We know that the last two fields are the
    // latitude and longitude and so they are
    // numerical:
    let longitude = float(singleRow[25]);
    let latitude = float(singleRow[26]);

    // The file may be missing a field, in which case
    // the converstion to a float might have failed
    if (isNaN(longitude) || isNaN(latitude)) {
      print("conversion to float failed; skipping row " + csvRowNumber);
    } else {
      if (csvRowNumber == 1) {
        minLat = latitude - 10;
        maxLat = latitude + 10;
        minLong = longitude - 10;
        maxLong = longitude + 10;
      }

      if (latitude < minLat) minLat = latitude;
      if (latitude > maxLat) maxLat = latitude;
      if (longitude < minLong) minLong = longitude;
      if (longitude > maxLong) maxLong = longitude;
    }
  } // end of for() loop

  print("Latitude (min, max) = (" + minLat + "," + maxLat + ") ");
  print("Longitude (min, max) = (" + minLong + "," + maxLong + ")");
} // end of findMinMaxLatLong

let csvRowNumber = 1;
// Skip the first line, since we know it's a header

function draw() {
  let singleRow = [];

  // get a single row and split that row into
  // individual words
  singleRow = split(strings[csvRowNumber], ",");

  // This really slows things
  // down so use only when debugging
  //println("Row " +
  // csvRowNumber +
  //   " contains " +
  //   singleRow.length +
  //   " fields" );

  // We know that the last two fields are the
  // latitude and longitude and so they are
  // numerical:
  let longitude = float(singleRow[25]);
  let latitude = float(singleRow[26]);

  // use only when debugging
  // println("Latitude " +
  // latitude +
  //   " longitude " +
  //   longitude );

  // Check for non-numerical strings.
  if (isNaN(longitude) || isNaN(latitude)) {
    print("conversion to float failed; skipping row " + csvRowNumber);
  } else {
    // scale that to fit on our canvas
    //println(csvRowNumber);
    let ypos = map(latitude, minLat, maxLat, 0, height);
    let xpos = map(longitude, minLong, maxLong, 0, width);

    // Put a mark there
    point(xpos, ypos);
  } // end of valid data

  csvRowNumber++;
  if (csvRowNumber >= strings.length) {
    println("finished");
    noLoop();
  }
}

````


Things to notice:
1. The `split()` function does half the magic
1. The `int()` or `float()` function does much of the rest
1. data files might have errors in them and you need to defend your program
	 against them
1. `loop()` and `noLoop()` can be used anytime you want to start or stop the
	 `draw()` function from repeating


##### JSON and XML: Other file formats

JSON and XML are other format for organizing data in a file. 
They are more complex than CSV, and again p5.js provides functions.

##### Generative Text
Pull words from a CSV file 
and by using `random()` in a clever way,
write poems or slogans or whatever. 

Here is a terribly lame example:

````
/*
Generate poetry from a file of words
 the file has words in this format:

 roses,red,violets,blue,dream,disneyland

 we will refer to them as:

 item1,color1,item2,color2,verb,location

 and construct a poem:

 item1 are color1, item2 are color2
 when I verb I verb to location
 */

// Let's put the index of the word into numbers:
const ITEM1 = 0;
const COLOR1 = 1;
const ITEM2 = 2;
const COLOR2 = 3;
const VERB = 4;
const LOCATION = 5;
// final means that I will not change these variables
// It is conventional to use all caps for variable names that will not change


let strings = [];

function setup() {

  // The text from the file is loaded into an array.
  strings = loadStrings("words.csv");

  // How many lines did we get?
 // println("strings array contains this many lines: " + strings.length);
}

let csvRowNumber = 0;

function draw() {
  let singleRow = [];

  // First line: "item1 are color1, item2 are color2"

  // Pick a random number, round that number DOWN to a whole number,
  // and split that row into individual words
  singleRow = split(strings[int (random(strings.length))], ',');
  // get item1
  let item1 = singleRow[ITEM1] + " are " ;

  // Now keep doing this for each word
  singleRow = split(strings[int (random(strings.length))], ',');
  // get color1
  let color1 = singleRow[COLOR1] + ", " ;

  // Now the second half of the first line: "violets are blue"
  singleRow = split(strings[int (random(strings.length))], ',');
  let item2 = singleRow[ITEM2] + " are " ;
  singleRow = split(strings[int (random(strings.length))], ',');
  // get color2
  let color2 =  singleRow[COLOR2];

  // that's the end of the first line of the poem
  print(item1 + " are " + color1 ", " + item2 + " are " + color2);

  // Now the second line: when I verb I verb of location

  message = "When I " ;
  singleRow = split(strings[int (random(strings.length))], ',');
  message = message + singleRow[VERB]);
  print(" I " );
  singleRow = split(strings[int (random(strings.length))], ',');
  message = message + singleRow[VERB]);
  print(" to the " );
  singleRow = split(strings[int (random(strings.length))], ',');
  message = message + singleRow[LOCATION]);

  // that's the end of the second line of the poem so start a new line
  // and also put an extra blank line
  print('\n');
  print('\n');

  noLoop(); // Wait for a mouse click then do it again
}

// If you click the mouse, allow the draw() function to resume
function mouseClicked() {
  loop();
}
````

and this is an example of the words you can feed it. 
put these contents into a file called `words.csv`:

````
roses,red,violets,blue,dream,disneyland
robots,silver,pencils,grey,run,supermarket
goldfish,orange,motors,white,turn,workbench
books,multicolored,lamposts,azure,swim,island
computers,black,mice,pink,squeak,home
````

(Time permitting)
#### More Data Visualization and generative text:


show text on screen
have students make a scroller in pairs
show how to get by char
make scroller again by char
add randomness/perlin noise
have them look at circle letters, come up with questions and explanations in
pairs
have students work through example on their own and use data
show split lines and table
then have them work with cupcake data https://trends.google.com/
show generative basic example
have them work in pairs to make something
share what they made
show generative word from circles sketch

## Week 5

### Week 5.1 - 09/26
#### Substitute - Mang away
#### Plan for today: 

- Discussion
- Homework feedback to all
- Look at some homework
- Working with images!
- The `pixels` array (time permitting)
- Sound (time permitting)
- Introducing midterm (time permitting)

#### Homework feedback to all:

- Better comments. I should be able to read your code and comments and
	completely understand your program.
	- Your code should explain what is really happening. 
		`things = 2; // increase the number of things` is wrong. It is setting
		the number of things to 2, not increasing the number of things.
- Better formatting:
	- Remove unnecessary spaces
	- Break long lines (both code and comments) into short lines. A line
		should fit in the p5.js editor window.
- Remove unnecessary functions, or explain why they are there
- Remove unnecessary variables, or explain why they are there
- Instead of naming functions thing1, thing2, thing3, give them
	meaningful names like happyFace, sadFace, and surprisedFace
- Any time you have more than 2 or 3 objects they should probably be in an
	array. If there is a reason not to have them in an array you need to
	explain why in the comments.
- Read the assignment carefully and make sure you provide everything that 
is requested
- If `draw()` is empty explain why
- Don't include your entire program in the README.md. You may include short
	pieces to augment your description.
- Explain the arguments to functions, or better yet, use names that are so 
	clear that no comments are needed. `constructor(wid,hgt,rnd,clr)` I could
	guess that `wid` is width and `hgt` is height, but why not use the full
	word? You are all fast typists. Better yet, if you are drawing e.g. a
	car, name the variables `carWidth` and `carHeight`. `clr` and `rnd` I
	could not figure out except by seeing how they were used, but I shouldn't
	have to do that.
- A function that only calls another function e.g.
	is almost certainly pointless.
	if there is a reason, it should be explained.
````
foo() {
	this.bar()
}
````
- If code is commented out, explain why
- If the video clip is in your Github repo, embed it in the README.md
	- If the video clip is on Vimeo or YouTube, put a link in your README.md
- Tidy your code before putting it on Github
- Use the correct suffix for your variables, classes, and functions. If a
	class defines a single car, don't call it `cars`. If individual cars are
	then gathered in an array of multiple cars, don't call it `arrayCar`.
- Try to avoid hardcoded or magic numbers. 
	Use built-in variables (`width/2` instead
	of `const CENTER = 200`) whenever possible. If you must use numbers
	explain why.
- Start your homework early so that there is time to meet with me if you
	need help. I'm willing to meet on the weekend but not late Monday night.

#### Working with images!

The `p5.Image` class
- Just another class, i.e. it has
	- Data (the pixels, width, height, etc.)
	- Functionality `(image()`, `get()`, etc.)

````
let catImg;
function preload() {
  photo = loadImage("https://placekitten.com/400/400");
}
function setup() {
  createCanvas(400, 400);
  background(255);
  image(photo, 0, 0); // this actually displays the image
}
````

- `image(photo, positionX, positionY, width, height)` - display 
this image at this location and scale to this size
- `photo.resize(w,h)` - scale to this size. If one of the arguments is zero,
	then scale to the remaining argument and retain the original aspect ratio.
- `photo.get(x,y,w,h)` - Returns a new p5.Image containing a portion of the image
- `photo.get(x,y)` - Returns the color of the pixel at this location

````
let catImg;
function preload() {
  catImg = loadImage("https://placekitten.com/400/400");
}
function setup() {
  createCanvas(400, 400);
  background(255);
  image(catImg, 0, 0);

  let newImg = catImg.get( 50,60, 100,50);
  image (newImg, 250, 200);
}
````

For more information and ideas
- Reference page for p5.Image for other methods
- Examples -> image

### Week 5.2 - 09/28

#### Plan for today: 

- Pixels array
- Sprite sheets
- Sound
- Introduce midterm project

#### The `pixels` array: Treating the canvas as an image

You can access individual pixels 
from the canvas (and whatever is on the canvas)
using the special built-in array called `pixels`. 
Before using this array you must load everything from the canvas 
into the `pixels` array using the `loadPixels()` function, 
and after making any changes you must call `updatePixels()` 
to write from the `pixels` array back to the canvas
if you want to make the changes visible

````
function setup() {
  let pink = color(255, 102, 204);
  loadPixels();
  let d = pixelDensity();
  let halfImage = 4 * (width * d) * ((height / 2) * d);
  for (let i = 0; i < halfImage; i += 4) {
    pixels[i] = red(pink);
    pixels[i + 1] = green(pink);
    pixels[i + 2] = blue(pink);
    pixels[i + 3] = alpha(pink);
  }
  updatePixels();
}
````

- The pixels array is one-dimensional, 
meaning if you want to go to a different row on the canvas 
you need to offset by that many widths
- Each pixel occupies 4 positions in the array
- Thus the equation for accessing a given pixel is
   (x + y * width) * 4
- Remember to set `pixelDensity(1);` in case you have a high 
resolution display


````
function setup() {
  pixelDensity(1);

	// blue background 
	// makes it easier to see the pink
  background(0, 102, 204);

  loadPixels();

	// Here is the equation 
	// for the start (red value) 
	// of a pixel 
	// at a particular coordinate (x,y)
  // (x + y*width) * 4

  // Change most of the fiftieth row to pink
  // instead of the whole line, 
	// only do from x = 10 to x = 90
  for (let i = (10 + 50 * width) * 4;
       i < (90 + 50 * width) * 4;
       i += 4) {

		// pink
    pixels[i + 0] = 255;
    pixels[i + 1] = 102;
    pixels[i + 2] = 204;
    pixels[i + 3] = 100;
  }

	// this puts the array back on the screen
  updatePixels();
}
````

It's important to remember that a pixel is just four numbers
so you can manipulate pixels mathematically 
e.g. make it fade:

````
function setup() {
  pixelDensity(1);
  background(0, 102, 204);
}

let redValue = 0; 

function draw() {

  loadPixels();
  
  for (let i = 0; i < width * height * 4 ; i+=4) {
    pixels[i] = redValue;
  } 
  updatePixels();

  redValue = (redValue + 1 ) %255
  print(redValue);
  
  updatePixels();

}
````

Just for fun, here is the last example from the video where Dan
created a random (only in the green channel) background:

````
function setup() {
  createCanvas(256,256);
  pixelDensity(1);
}

function draw() {
  loadPixels();
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var index = (x + y * width) * 4;

      pixels[index + 0] = x;
      // red value changes horizontally

      pixels[index + 1] = random(255);
      // green value random

      pixels[index + 2] = y;
      // blue value changes vertically

      pixels[index + 3] = 255;
      // no transparency
    }
  }
  updatePixels();
}
````

Look at the reference page for the pixels array

A fun examples from Professor Sherwood:

![](media/circularImages.png)

````
let tiles = [];
let tileSize = 100;

function preload() {
  img = loadImage("aiweiwei.jpeg");
}

function setup() {
  createCanvas(400, 400);
  let numTiles = img.height / tileSize;
  while (numTiles > 0) {
    tiles.push(
      img.get(
        int(random(img.width - tileSize)),
        int(random(img.height - tileSize)),
        tileSize,
        tileSize
      )
    );
    numTiles--;
  }
  imageMode(CENTER);
}

function draw() {
  push();
  translate(width / 2, height / 2);

  let numSegments = 10;
  let eachAngle = TWO_PI / numSegments;
  let whichImage = int(random(tiles.length));

  for (let i = 0; i < numSegments; i++) {
    let x = cos(eachAngle * i) * tileSize + 1;
    let y = sin(eachAngle * i) * tileSize + 1;
    push();
    translate(x, y);
    rotate(eachAngle * i);
    image(tiles[whichImage], 0, 0);
    pop();
  }

  pop();
  noLoop();
}

function keyPressed() {
  loop();
}
````

Can we use a sequence of images for animation?

![](media/walking.png)


Download this to your laptop: 
https://github.com/michaelshiloh/IntroductionToInteractiveMedia/blob/master/media/walking.png

How would we use them?

````
let spritesheet;
let sprites = [];
let direction = 1; // 0 up
let step = 0;
let x;
let y;
let speed = 3;

function preload() {
  spritesheet = loadImage("walking.png");
}

function setup() {
  // fullscreen(true);
  createCanvas(500, 450);

  // 12 images across, 4 down, in the spritesheet

  let w = int(spritesheet.width / 12);
  let h = int(spritesheet.height / 4);

  for (let y = 0; y < 4; y++) {
    sprites[y] = [];
    for (let x = 0; x < 12; x++) {
      sprites[y][x] =
        spritesheet.get(x * w, y * h, w, h);
    } // iterate over rows
  } // iterate over columns

  x = width / 2;
  y = height / 2;

  imageMode(CENTER);

	// Display first sprite
  image(sprites[direction][step], x, y);
}

// nothing to do here because all the action
// happens in the keyPressed() callback
function draw() {}

function keyPressed() {
  // look at sprite sheet to determine 
  // which direction is which row

  if (keyCode === DOWN_ARROW) {
    direction = 0;
    y += speed;
  }

  if (keyCode === LEFT_ARROW) {
    direction = 1;
    x -= speed;
  }

  if (keyCode === RIGHT_ARROW) {
    direction = 2;
    x += speed;
  }

  if (keyCode === UP_ARROW) {
    direction = 3;
    y -= speed;
  }

	// Every so often 
	// advance to the next sprite
  if (frameCount % speed == 0) {
    step = (step + 1) % 12;
  }

	// Finally draw paint the sprite
  background(255);
  image(sprites[direction][step], x, y);
}

````

You can probably find many sprite sheets by googling "sprite sheet" +
whatever you want.


#### Sound!

Download this to your laptop: 
https://github.com/mangtronix/IntroductionToInteractiveMedia/blob/master/media/doorbell.png

File -> Examples -> Sound

Preload Soundfile

Very basic example:

````
/*
Must upload doorbell.mp3
Must include sound library in index.html
*/

function preload() {
  song = loadSound('doorbell.mp3');
}

function setup() {
  background(234);
  song.play();
}

function draw() {
  if (song.isPlaying()) {
    print("song is playing")
  } else {
    print("song is not playing")
    noLoop
  }
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
````

As always, it's useful to explore the examples and the reference page

- Sound examples
	- File -> Examples -> Sound
		- Record Save
		- Live Input

**Remember**
Sound requires a separate library which must be included

##### Sound Synthesis

The other way to make sounds is to create them mathematically

- Sound examples
	- File -> Examples -> Sound
		- Oscillator Waveform
		- Filters

We can create our own complex sounds starting with basic oscillators and then
changing the envelopes. [Example](https://github.com/aaronsherwood/introduction_interactive_media/blob/master/processingExamples/sound/synthesis/synthesis.pde)

##### Working in groups (time permitting):
If we had multiple sound files, how would we play the
next one when we click the mouse?

## Week 6

### Week 6.1 - 10/03
#### Plan for today: 

- Discussion of reading 
- Homework feedback
- Computer Vision
	- Frame Differencing

#### Homework feedback

- I love the diversity in data sets that you found! So much more creative than
	the example I showed in class.
- In general, your descriptions and comments are weak. Most of you need
	better descriptions and almost all of you need better comments.
	- `k = 0; x = 0; y = 0;` What is `k`? I assume `x` and `y` are coordinates,
		but of what? Why are they set to zero? Is that important? If not, why is
		it there?
	- Your comments must explain what your code does: A comment that says "loop
		over all elements in the array" is accurate but doesn't give the reader
		any new information. You must explain why you are looping over all
		elements. Put a comment (preferably more than one line) at the beginning
		of every function, loop, or distinct block of code explaining a) what it
		does and b) how it does it
	- Make sure your comments agree with the code! A comments that says "the
		last two fields" but then refers to fields 1 and 2 (when I can see that
		there are at least 5 is clearly wrong. Did you just copy that blindly from
		my example?
- Shoutouts 
	- [Ryan](https://github.com/ryanrichardsmith/IntroductionToInteractiveMedia/blob/main/Feb22/playlist.js) for excellent comments
		- Also
			[Pranav](https://github.com/sripranav9/IntroductionToInteractiveMedia/blob/main/February22/dataVisualization.js)
	- [Dhabia](https://github.com/noorajabir/IntroToIM/tree/main/Feb%2022) for excellent presentation
	- [Shaikha](https://github.com/ShaikhaAlN/IntroToIM/tree/main/Feb22) for whimsical project


#### Working with a camera: Computer Vision!

Basic sketch showing how to get input from camera:

````
let capture;

function setup() {
  createCanvas(200, 200);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  image(capture, // what image to display
        0, 0,    // where to place the image on the canvas
        width,   // width to display

        // the height is more complicated:
        // we want the capture height to be
        // the width multiplied by the aspect ratio
        width * capture.height / capture.width);
}
````

Reference page for
[createCapture](https://p5js.org/reference/#/p5/createCapture)

Some video examples:
- [Simple frame differencing](https://editor.p5js.org/michaelshiloh/sketches/ZqXC5-6M0), similar to the method in Golan Levin's article
- A more complex
	[example](https://editor.p5js.org/aaronsherwood/sketches/uxNAkReWT) by Prof.
	Aaron that uses frame differencing to detect which vertical slice of the
	camera image has the most motion, and trigger a corresponding sound clip

### Week 6.2 - 10/05
#### Plan for today: 

- Review frame differencing
- Random items

#### Review frame differencing
- If you wanted to display white (instead of the color of the difference)
	wherever motion above a certain threshold is detected, how would you do this?
- Video Mirror (flipping the x)
	- https://editor.p5js.org/aaronsherwood/sketches/cK59ueQ6a
- In class exercise: Can you trigger sounds according to where there is
	motion?  You might want to borrow ideas from
	[here](https://editor.p5js.org/aaronsherwood/sketches/uxNAkReWT)

#### Random items

##### Grids
- An [example](https://editor.p5js.org/itp42/sketches/dBeLZC8mm) by Prof.
	Mathura showing how to create and move in a grid

##### Perlin Noise

````
function draw() {
  background(204);
  let n = random(0, width);
  line(n, 0, n, height);
}
````

What if we wanted the line to move in a more organic, lifelike
fashion? Organic things (e.g. butterflies, leaves blowing in the wind, clouds) 
don't jump instantly from one place to another,
they tend to move close to where they were last time

````
let offset = 0.0;

function draw() {
  background(204);
  offset = offset + .01;
  let n = noise(offset) * width;
  line(n, 0, n, height);
}
````

Things to notice:

- Why is the variable `offset` global? (Remember our discussion of variable
	scope)

##### Other things you can do with arrays

Look at other array methods in the reference page:
- `append`
- `pop` 


##### Blocking vs. non-blocking functions

- What are blocking and non-blocking functions?
- How do you know when a non-blocking function is done?
- Soundfile reference page

##### Working in groups: 
Use the mouse position to select sound tracks


##### Other resources

[Creative Coding lecture notes](https://creative-coding.decontextualize.com/)

[Coding Train](https://thecodingtrain.com/Tutorials/) tutorials (by Dan Shiffman)

A nice set of p5.js tutorials by [Happy
Coding](https://happycoding.io/tutorials/p5js/)

## Week 7
### Week 7.1 - 10/10
#### Plan for today: 

- Project status
- Debugging

### Week 7.2 - 10/12
#### Plan for today: 

- Midterm projects: Share in a group
- Mid-semester feedback
- Homework due after break
- Introduction to Arduino


## FALL BREAK / FALL BREAK / FALL BREAK

## Week 8
### Week 8.1 - 10/24

#####  Mid-semester feedback

- What was the more surprising thing you learned so far in this class?
- What was the more important thing you learned so far in this class?
- What would you like more of?
- What would you like less of?
- What do you wish we'd talk about, or learn, that we haven't?

##### Introduction to Arduino

- IDE
- blink

### Week 8.2 - 10/26
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

#### Arduino finally!

Make sure everything is working

- Upload the Blink example
- Change the parameter in delay()
- Upload again and verify that the LED blinks at the new rate

## Week 9
### Week 9.1 - 10/31 Happy Halloween!
#### Plan for today: 

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
void setup() {
  pinMode(8, OUTPUT);
  pinMode(13, OUTPUT);
  pinMode(A2, INPUT);
}

void loop() {

  int switchPosition = digitalRead(A2);

  if (switchPosition == HIGH) {
    digitalWrite(8, HIGH);   // turn the LED on (HIGH is the voltage level)
    digitalWrite(13, LOW);
  } else  {
    digitalWrite(8, LOW);    // turn the LED off by making the voltage LOW
    digitalWrite(13, HIGH);
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

### Week 9.2 - 11/02
#### Plan for today: 
- Discuss reading
- Analog Input
- Analog Output

#### Analog Input

Build this circuit. Try to follow the schematic and not the breadboard view:

![](media/ArduinoPhotoresistor_schem.png)
![](media/ArduinoPhotoresistor_bb.png)

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
Here is an example:

![](media/handDrawnSchematicExample.jpg)

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
### Week 10.1 - 11/07
#### Plan for today: 

- Documentation
- Discussion
- Look at homework


#### Documentation
- Almost all of you are missing points simply for leaving out parts of the
	documentation. Paying attention to each requred step is a simple way to get
	more points
- Apparently there was confusion regarding `journals` and `READMEs`. I will
	restore points for the midterm but for the final I want you to do both
	- `journal.md` is for the early proposal of your project, rough sketches,
		notes, and a record of what you do each time you make progress. It is
		meant to be rough and busy.
	- `README.md` is the final document describing your finished project. It
		should be well organized, well written, and clear. Of course it must
		include all the required parts.
- Movies
	- Is there a reason you're not embedding the movies in the page, like
		Ayesha's?
	- Is there a reason some of you putting the movie on Google Drive?
	- Test the movie! Many of your simply don't work
		- e.g.
			[this](https://github.com/sripranav9/IntroductionToInteractiveMedia/blob/main/march31/README.md)
- Don't upload binary files like zip files or pdfs.  Everything must be
	viewable and readable. If you find an exception to this please check with me
	first.

#### Discussion

Tom Igoe's blog post on Physical Computing and Interactive Art
- Breakout rooms
- All together

#### Look at homework
- Creative projects using simple digital and analog inputs and outputs

### Week 10.2 - 11/09
#### Plan for today: 
- Sound
- Servo motor
- PWM
- Data Types
- Schematic conventions
- Circuit theory
- Examples

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


## Week 11
### Week 11.1 - 11/14
#### Plan for today: 
- Announcement
- Discussion
- Look at homework (musical instruments)

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

#### Time permitting

##### Debugging

If you want my help solving a problem in your assignment, do the following:
1. Figure out the simplest circuit and program that demonstrates your problem
1. Upload your schematic, code, and 
the best picture you can take of your breadboard circuit to Github 
1. Write a message on Discord, describing carefully
	1. What you think should happen
	1. What you observe happens

What techniques have you learned to help you find problems?

##### Homework feedback

- The first thing in your README.md should be a description!

### Week 11.2 - 11/16
#### Plan for today: 
- Serial Communication

#### Serial Communication

Communicating between p5.js and Arduino
- [Serial Input to p5.js Using the p5.webserial Library](https://itp.nyu.edu/physcomp/labs/

Communication example by Aaron Sherwood
-	[This code](https://editor.p5js.org/aaronsherwood/sketches/q2Pl77SWl)
	connects to the serial port through the web browser and sends and receives messages to a connected Arduino
- Before you incorporate this in your project, first test this as it is and
	make sure you understand it
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


Older examples using serial server

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

In-class exercise (break class into groups of 2-3 students)

- make something that uses only one sensor  on arduino and makes the ellipse
	in p5 move on the horizontal axis, in the middle of the screen, and nothing
	on arduino is controlled by p5 
- make something that controls the LED brightness from p5 
- take the [gravity wind example](https://editor.p5js.org/aaronsherwood/sketches/I7iQrNCul) and make it so
	every time the ball bounces one led lights up and then turns off, and you
	can control the wind from one analog sensor 

## Week 12
### Week 12.1 - 11/21
#### Plan for today: 
- Discussion
- Problems with homework
- Look at final proposals

Discussion of *Design Meets Disability*

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
	
### Week 12.2 - 11/23
#### Plan for today: 
- Motors
- Soldering
- Fabrication and Construction Techniques
- Time permitting

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

LEDs have relatively <strong>high</strong> "resistance", 
and so consume <strong>low</strong> current.
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

Code

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

#### Fabrication and Construction Techniques

- Panel mount vs. PCB mount
- Stranded vs. solid core wire
- Strain relief

## Week 13
### Week 13.1 - 11/28
#### Plan for today: 
- Blink without `delay()`
- Soldering
- How to use a Digital Multimeter (DMM) 
- Work on projects


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


[Tutorial](https://www.arduino.cc/en/Tutorial/BlinkWithoutDelay)

So much for blinking. What if we want to move a servo motor at the same time?

Adafruit [Multitasking Tutorial Part
I](https://learn.adafruit.com/multi-tasking-the-arduino-part-1?view=all)

Play a melody and blink an LED 
without using `delay()`:
[toneMelodyAndBlinkWithoutDelay](https://github.com/michaelshiloh/toneMelodyAndBlinkWithoutDelay)

#### Soldering
- [Soldering
	resources](https://github.com/michaelshiloh/resourcesForClasses#soldering)

#### How to use a Digital Multimeter (DMM) 

- The three most useful measurements
	- Continuity
		- Checking connections
		- Checking switches
	- Voltage
		- Checking sensor circuits
		- Checking Arduino digital outputs
	- Resistance
		- Checking resistive sensors
		- Checking motorso
- How to connect to Arduino pins or the solderless breadboard


### Week 13.2 - 11/30 NO CLASS
NO CLASS - NATIONAL DAY HOLIDAY


## Week 14
### Week 14.1 - 12/05
#### Plan for today: 
- Final project check-in
- Work session

### Week 14.2 - 12/07
#### Plan for today: 
- Final project presentations

### Week 14.3 - 12/11 SUNDAY CLASS
SUNDAY CLASS - LEGISLATIVE DAY - 5:00-6:15PM

#### Plan for today:
- Course review
- Course evaluation
- Project help

#### Announcements

Clean up after yourselves in the lab!  Students have started leaving trash on
the tables as well as their personal belongings over a long period of time
unattended. 

If the mess continues swipe access to the lab will be disabled at 9pm as a
courtesy to the lab staff. 

## IM Show
IM End of Semester Show
- Each student needs to show at least one project
- Time TBD
