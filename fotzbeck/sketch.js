let img;
function preload() {
  img = loadImage('assets/fotzbeck_orig.jpg');
}


let X = 400;
let Y = 300;
let BLOCKSIZE = 30;

let Screen = class {
  draw() {}
  click(x, y) {}
}

let TechDemo = class extends Screen {
  constructor() {
    this.bx = 4*BLOCKSIZE;
    this.by = 4*BLOCKSIZE;
  }
  draw() {
    image(img, mouseX - this.bx / 2, mouseY - this.by / 2, this.bx, this.by)
  }
  click(x, y) {
    ellipse(x, y, 5, 5);
  }
}

let intro = new class extends Screen {
  constructor() {
    this.valid = X < Y
  }
}()


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
  background(255)
  currentScreen.draw();
}