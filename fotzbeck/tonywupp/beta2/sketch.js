let options = {
  gravity: 30,
  pushforce: 500,
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
  createCanvas(VIEWPORT.width, VIEWPORT.height);
  tony = new Tony();
  wuppSound = createAudio('/assets/audio/tony/wupp-demo-kev.m4a');
  clicker = {
    click: (x, y) => {
      wuppSound.play();
      tony.push(x + camera.x, y + camera.y);
    },
  };
}

function draw() {
  const dt = 1. / frameRate();
  background(255);
  
  player.x = tony.x;
  player.y = tony.y;
  updateCamera();
  drawTiles();
  tony.draw(camera);
  tony.advance(dt);

}
