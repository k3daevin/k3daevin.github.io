

function preload() {
  img.fotzbeck = loadImage('assets/fotzbeck_orig.jpg')
  img.faust = loadImage('assets/faust_orig.jpg')
  img.fotzen = []
  img.fotzen.push(loadImage('assets/fotz_orig.jpg'))
  img.fotzen.push(loadImage('assets/fotz2_orig.png'))
  img.fotzen.push(loadImage('assets/fotz3_orig.png'))
}


let currentScreen
let highscore
let startButton
let highscoreButton

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

let canvas

function resize() {
  setSize()
  startButton.position(0, Y/2)
  highscoreButton.position(0, Y/2+Y/4)
  resizeCanvas(X, Y)
}

function setup() {
  frameRate(framerate)
  imageMode(CENTER)
  setSize();
  textSize(BLOCKSIZE)

  let buttonWidth = X/4
  let buttonHeight = BLOCKSIZE
  

  //TODO in eigene Klasse auslagern
  startButton = createButton('Start')
  startButton.position(0, Y/2)
  startButton.size(buttonWidth, buttonHeight)
  startButton.class('btn btn-4 btn-sep icon-send')
  let startFunc = function() {
    currentScreen = new Game()
    startButton.hide()
  }
  startButton.mousePressed(startFunc)
  startButton.touchStarted(startFunc)

  highscoreButton = createButton('Highscore')
  highscoreButton.position(0, Y/2+Y/4)
  highscoreButton.size(buttonWidth, buttonHeight)
  highscoreButton.class('btn btn-1 btn-sep icon-info')
  let highscoreFunc = function() {
    currentScreen = new Highscore()
    highscoreButton.hide()
    startButton.show()
  }
  highscoreButton.mousePressed(highscoreFunc)
  highscoreButton.touchStarted(highscoreFunc)

  highscore = new Highscore()
  currentScreen = new Intro()
  canvas = createCanvas(X, Y);
  window.addEventListener('resize', resize);
  resize()
  background(255);
}

function draw() {
  currentScreen.draw(mouseX, mouseY);
}