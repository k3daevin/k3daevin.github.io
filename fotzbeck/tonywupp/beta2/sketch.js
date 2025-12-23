let options = {
  gravity: 30,
  pushforce: 250,
};

const img = {}

const Facing = {
  Left: -1,
  Right: 1,
}

function preload() {
  preloadAssetsAndStuff();
}



let tony;
let clicker;
let wuppSound;
let pickupManager;

function touchStarted() {
  clicker.click(mouseX, mouseY);
  return false;
}

function mousePressed() {
  clicker.click(mouseX, mouseY);
  return false;
}

const camera = new Camera(400, 400, 0.6);


function setup() {
  createCanvas(camera.viewWidth, camera.viewHeight);
  tony = new Tony(options.tonydata);
  wuppSound = createAudio('/assets/audio/tony/wupp-demo-kev.m4a');
  pickupManager = new PickupManager({
    maxPickups: 100,
    pickups: options.pickups,
    tiers: options.tiers,
  });
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
  
  tony.advance(dt);

  camera.update(tony.x, tony.y);
  drawTiles(camera);


  pickupManager.removeAddPickups(camera, tony);
  pickupManager.draw(camera);

  tony.draw(camera);

}
