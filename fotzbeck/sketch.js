

function preload() {
  img.fotzbeck = loadImage('assets/fotzbeck_orig.jpg')
  img.faust = loadImage('assets/faust_orig.jpg')
  img.fotzen = []
  img.fotzen.push(loadImage('assets/fotz_orig.jpg'))
  img.fotzen.push(loadImage('assets/fotz2_orig.png'))
  img.fotzen.push(loadImage('assets/fotz3_orig.png'))
}







let currentScreen
let intro
let game
let gameover

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
  frameRate(framerate)
  imageMode(CENTER)
  setSize();
  intro = new Intro()
  game = new Game(img.fotzen)
  gameover = new Gameover()
  currentScreen = intro

  createCanvas(X, Y);
  background(255);
}

function draw() {
  currentScreen.draw(mouseX, mouseY);
}