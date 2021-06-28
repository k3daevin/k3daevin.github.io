let img = {};

function preload() {
  img.fotzbeck = loadImage('assets/fotzbeck_orig.jpg')
  img.faust = loadImage('assets/faust_orig.jpg')
  img.fotzen = []
  img.fotzen.push(loadImage('assets/fotz_orig.jpg'))
  img.fotzen.push(loadImage('assets/fotz2_orig.png'))
  img.fotzen.push(loadImage('assets/fotz3_orig.png'))
}


let X = 400;
let Y = 300;
let BLOCKSIZE = 30;




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
  background(255);
}

function draw() {
  background(255)
  currentScreen.draw(mouseX, mouseY);
}