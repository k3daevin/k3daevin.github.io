
let X = 400;
let Y = 300;
let BLOCKSIZE = 30;

var Screen = class {
  draw() {}
  click(x, y) {}
}

var TechDemo = class extends Screen {
  draw() {}
  click(x, y) {
    ellipse(x, y, 5, 5);
  }
}

let techDemo = new TechDemo()

let currentScreen = techDemo

function setSize() {
  let win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0];
    X = win.innerWidth || docElem.clientWidth || body.clientWidth,
    Y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
    if (X < Y) BLOCKSIZE = X/10; else BLOCKSIZE = Y/10;
}

function touchStarted() {
  currentScreen.click(mouseX, mouseY);
  return false;
}

function mousePressed() {
  currentScreen.click(mouseX, mouseY);
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
  currentScreen.draw();
}