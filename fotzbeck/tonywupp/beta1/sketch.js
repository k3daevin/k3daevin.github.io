let options = {
  gravity: 30,
  pushforce: 100,
};

const img = {}

const Facing = {
  Left: -1,
  Right: 1,
}

function preload() {
  img.tony = {}
  img.tony.still = loadImage('/assets/images/sprites/tony_still.jpg')
  img.tony.wupp = loadImage('/assets/images/sprites/tony_wupp.jpg')
}



let tony;
let clicker;
let wuppSound;

function touchStarted() {
  clicker.click(mouseX, mouseY);
  return false;
}

function mousePressed() {
  clicker.click(mouseX, mouseY);
  return false;
}

function setup() {
  createCanvas(400, 400);
  tony = new Tony();
  wuppSound = createAudio('/assets/audio/tony/wupp-demo-kev.m4a');
  clicker = {
    click: (x, y) => {
      wuppSound.play();
      tony.push(x, y);
    },
  };
}

function draw() {
  const dt = 1. / frameRate();
  background(255);
  tony.advance(dt, 0, options.gravity);
  tony.draw();
  if (tony.out_of_bounds()) {
    tony = new Tony();
  }
}
