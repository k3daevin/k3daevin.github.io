
let X = 400;
let Y = 300;
let BLOCKSIZE = 30;

function setSize() {
  var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0];
    X = win.innerWidth || docElem.clientWidth || body.clientWidth,
    Y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
    if (X < Y) BLOCKSIZE = X/10; else BLOCKSIZE = Y/10;
}

function touchStarted() {
  click();
  return false;
}

function mousePressed() {
  click();
  return false;
}

function click() {
  ellipse(mouseX, mouseY, 5, 5);
}

function setup() {
  setSize();
  createCanvas(X, Y);
  background(153);
  line(0, 0, width, height);
}

function draw() {
  // put drawing code here
}