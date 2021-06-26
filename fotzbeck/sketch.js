let img;
function preload() {
  img = loadImage('assets/fotzbeck_orig.jpg');
}


let X = 400;
let Y = 300;
let BLOCKSIZE = 30;

let Screen = class {
  draw(x, y) {}
  click(x, y) {}
}

let TechDemo = class extends Screen {
  constructor() {
    super();
    this.bx = 4*BLOCKSIZE;
    this.by = 4*BLOCKSIZE;
    this.w = new Widget(X/2, Y/2, img, 4*BLOCKSIZE)
    this.fotzbeck = new Fotzbeck(img, 4*BLOCKSIZE)
  }
  draw(x, y) {
    this.w.draw()
    this.fotzbeck.draw()
  }
  click(x, y) {
    this.w.set(x, y)
    this.fotzbeck.click(x, y)
  }
}

let Intro = class extends Screen {
  constructor() {
    super();
    this.valid = X > Y
  }
  draw(x, y) {
    textSize(32);
    if (this.valid) {
      text('Fotzbeck geht glei los! Klick für Start!', 10, 30);
    } else {
      text('Fotzbeck wird QUER gespielt du Fotz! Klick für Neustart!', 10, 30);
    }
  }
  click(x, y) {
    if (this.valid) {
      currentScreen = techDemo
    } else {
      location.reload()
    }
  }
}


let currentScreen
let techDemo
let intro

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

function setup() {
  imageMode(CENTER)
  setSize();
  intro = new Intro()
  techDemo = new TechDemo()
  currentScreen = intro

  createCanvas(X, Y);
  background(153);
  line(0, 0, width, height);
}

function draw() {
  background(255)
  currentScreen.draw(mouseX, mouseY);
}