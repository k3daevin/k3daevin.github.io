let options = {
  gravity: 30,
  pushforce: 100,
};


class Tony {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.vx = 0;
    this.vy = 0;
  }
  draw() {
    rect(this.x-10, this.y-10, 20, 20);
  }
  advance(dt, ax, ay) {
    this.vx += dt * ax;
    this.vy += dt * ay;
    this.x += dt * this.vx;
    this.y += dt * this.vy;
  }
  push(px, py) {
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
  wuppSound = createAudio('wupp.m4a');
  clicker = {
    click: (x, y) => {
      wuppSound.play();
      tony.push(x, y);
    },
  };
}

function draw() {
  const dt = 1. / frameRate();
  background(220);
  tony.draw();
  tony.advance(dt, 0, options.gravity);
  if (tony.out_of_bounds()) {
    tony = new Tony();
  }
}
