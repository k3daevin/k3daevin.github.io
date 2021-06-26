let img = {};
function preload() {
  img.fotzbeck = loadImage('assets/fotzbeck_orig.jpg')
  img.faust = loadImage('assets/faust_orig.jpg')
}


let X = 400;
let Y = 300;
let BLOCKSIZE = 30;

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
      currentScreen = game
    } else {
      location.reload()
    }
  }
}


let currentScreen
let intro
let game

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
  game = new Game()
  currentScreen = intro

  createCanvas(X, Y);
  background(153);
  line(0, 0, width, height);
}

function draw() {
  background(255)
  currentScreen.draw(mouseX, mouseY);
}