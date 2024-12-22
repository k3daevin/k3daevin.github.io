let wand = {x: 600, y: 200, w: 75, h: 150}
let monster = {x: 200, y: 240, w: 100, h: 75}

const monsterYsweetspot = monster.y
const monsterYrange = wand.h / 2

function preload() {
  monster.img = loadImage('images/monster.png')
  wand.img = loadImage('images/wand.png')
}

function myDrawImage(o) {
  image(o.img, o.x, o.y, o.w, o.h)
}

const X = 800
const Y = 800 


const speed = 1

function setup() {
  createCanvas(X, Y)
  frameRate(60)
}

function keyPressed() {
  if (keyCode == 32) {
    y -= speed
  }
}

function draw() {
  background(249, 201, 113)

  monster.x += speed
  const jitterThreshold = map(monster.y + monster.h / 2, wand.y, wand.y + wand.h, 0., 1., true)
  if (random() > jitterThreshold) {
    monster.y += 1
  } else {
    monster.y -= 1
  }

  if (monster.x > X) monster.x = 0

  myDrawImage(monster)
  myDrawImage(wand)

}
