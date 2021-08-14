let canvas

let X
let Y
let BLOCKSIZE

function setSize() {
  let win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0];
    X = win.innerWidth || docElem.clientWidth || body.clientWidth,
    Y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
    if (X < Y) BLOCKSIZE = X/10; else BLOCKSIZE = Y/10;
}

function resize() {
  setSize()
  resizeCanvas(X, Y)
}

function setup() {
  canvas = createCanvas(400, 400);
  window.addEventListener('resize', resize);
  resize()
}

function draw() {
  background(220);
  line(0, 0, X, Y)
  line(0, Y, X, 0)
  for (let i = 0; i < 3; ++i) {
    circle((2+i)*BLOCKSIZE, 2*BLOCKSIZE, BLOCKSIZE)
  }
}
