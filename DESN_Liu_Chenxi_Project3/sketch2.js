/* 
The Arduino file and part of this sketch2.js were from Prof. Doug Whitton's "threeSensorExample", I edited and added my own code based on the example
*/

let playing = false;
let serial;
let latestData = "waiting for data";  
let splitter;
let diameter0 = 0, diameter1 = 0, diameter2 = 0;
// let min, max, radius, h, s, b;
let speed = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  setupSerialPort();
  pixelDensity(1);
//  radius = 150;
  colorMode(HSB, 255, 255, 255);
 // h = random(255);
 // s = random(255);
 // b = random(125) + 130;
}

function setupSerialPort(){



  serial = new p5.SerialPort();

  
  serial.list();
  console.log("serial.list()   ", serial.list());

 
  serial.open('COM3');
 
  serial.on('connected', serverConnected);

  serial.on('list', gotList);
  
  serial.on('data', gotData);
 
  serial.on('error', gotError);
 
  serial.on('open', gotOpen);
  
}

function serverConnected() {
  console.log("Connected to Server");
}


function gotList(thelist) {
  console.log("List of Serial Ports:");
 
  for (var i = 0; i < thelist.length; i++) {
    
    console.log(i + " " + thelist[i]);
  }
}


function gotOpen() {
  console.log("Serial Port is Open");
}


function gotError(theerror) {
  console.log(theerror);
}




function gotData() {
  var currentString = serial.readLine();  
  trim(currentString);                    
  if (!currentString) return;             
  console.log("currentString  ", currentString);             
  latestData = currentString;            
  console.log("latestData" + latestData);   
  splitter = split(latestData, ',');       
  diameter0 = splitter[0];            
  diameter1 = splitter[1];
  diameter2 = splitter[2];
}


function gotRawData(thedata) {
  println("gotRawData" + thedata);
}


function draw() {

  background(255,165,0);
  text(latestData, 10,10);

  drawCircle1();
  drawCircle2();
}




function drawCircle1(){
 var s = map(diameter1, 0, 100, 100, 255);
 var h = map(diameter2, 0, 100, 0, 255);
 var b = map(diameter1, 0, 100, 100, 255);
 var radius = map(diameter2, 0, 100, 100, 350);

 var min = map(diameter2, 0, 100, 0.1, 0.5);
 var max = map(diameter2, 0, 100, 0.8, 1.8);

 // fill(0,0.5);
 // rect(0, 0, windowWidth, windowHeight);

  speed += 5;
  translate(width / 4, height / 2);
  for (var i = 0; i < 360; i += 0.5) {
      push();
          rotate(radians(i));
          translate(0, radius);
          rotate(radians(i * 3));
          scale(
              map(sin(radians(i * 6 + (speed))), -1, 1, min, max),
              map(sin(radians(i * 2 + (speed))), -1, 1, min, max)
          );
          drawEllipse(s, h, b);
      pop();
  }
}


function drawCircle2(){
 var s = map(diameter1, 0, 100, 100, 255);
 var h = map(diameter2, 0, 100, 0, 255);
 var b = map(diameter1, 0, 100, 100, 255);
 var radius = map(diameter2, 0, 100, 100, 350);

 var min = map(diameter2, 0, 100, 0.1, 0.5);
 var max = map(diameter2, 0, 100, 0.8, 1.8);

 // fill(0,0.5);
 // rect(0, 0, windowWidth, windowHeight);

  speed += 5;
  translate(width / 4, height / 4);
  for (var i = 0; i < 360; i += 0.5) {
      push();
          rotate(radians(i));
          translate(0, radius);
          rotate(radians(i * 3));
          scale(
              map(sin(radians(i * 6 + (speed))), -1, 1, min, max),
              map(sin(radians(i * 2 + (speed))), -1, 1, min, max)
          );
          drawEllipse(s, h, b);
      pop();
  }
}


function drawEllipse(s, h, b){
  noFill();
  stroke(h, s, b, 128);
  ellipse(0, 0, 120, 80);
}

