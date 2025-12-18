let options = {
  gravity: 30,
  pushforce: 100,
};

const img = {}

function preload() {
  img.tony = {}
  img.tony.still = loadImage('/assets/images/sprites/tony_still.jpg')
  img.tony.wupp = loadImage('/assets/images/sprites/tony_wupp.jpg')
}

class Tony {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.vx = 0;
    this.vy = 0;
    this.image = img.tony.still;
  }
  draw() {
    rect(this.x-10, this.y-10, 20, 20);
    image(this.image, this.x-50, this.y-75, 100, 150);
  }
  advance(dt, ax, ay) {
    this.vx += dt * ax;
    this.vy += dt * ay;
    this.x += dt * this.vx;
    this.y += dt * this.vy;
  }
  push(px, py) {
    this.image = img.tony.wupp;
    setTimeout(() => {
      this.image = img.tony.still;
    }, 200);
    const p = createVector(px, py)
    const t = createVector(this.x, this.y)
    t.mult(-1);
    const pminust = p5.Vector.add(p, t);
    pminust.setMag(options.pushforce);
    this.vx = pminust.x;
    this.vy = pminust.y;
  }
  out_of_bounds() {
    return (this.x < 0 || this.x + 20 > width || this.y < 0 || this.y +20 > height);
  }
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
  background(247);
  tony.advance(dt, 0, options.gravity);
  tony.draw();
  if (tony.out_of_bounds()) {
    tony = new Tony();
  }
}
