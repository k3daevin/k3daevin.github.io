let wand = {x: 700, y: 200, w: 75, h: 150}
let monster = {x: 200, y: 240, w: 100, h: 75}
const meter = {x: 50, w: 100}

//hier gehen die klicks rein
let level = 50

//wird spaeter in setup() zugewiesen
let knoepfe;
const knopfRadius = 100

const monsterYsweetspot = monster.y
const monsterYrange = wand.h

const X = 800
const Y = 800 

const speed = 1

const arrStrichleAlle = [...Array(41).keys()];
const arrStrichleMarkant = [0, 20, 40]

function preload() {
  monster.img = loadImage('images/monster.png')
  wand.img = loadImage('images/wand.png')
}

function myDrawImage(o) {
  image(o.img, o.x, o.y, o.w, o.h)
}

function myDrawStrichle(arr) {
  push()
  fill(219, 213, 204)
  noStroke()
  for (n of arr) {
    const y = map(n, 0, 40, Y-20, 20, true)
    rect(meter.x + 50, y, 47, 4)
  }
  pop()
}

function myClickEventListener(x, y) {
  for (k of knoepfe) {
    if (k.active() == false) continue
    const dx = x - k.x
    const dy = y - k.y
    if (dx*dx + dy*dy < knopfRadius*knopfRadius) {
      level += k.levelDelta
      monster.x += k.monsterDelta
    }
  }
}

function touchStarted() {
  myClickEventListener(mouseX, mouseY);
  return false;
}

function mousePressed() {
  myClickEventListener(mouseX, mouseY);
  return false;
}

function setup() {
  createCanvas(X, Y)

  knoepfe = [
    {x: 250, y: 700, c: color(0, 153, 51), active: () => true, monsterDelta: -5, levelDelta: 1},
    {x: 400, y: 700, c: color(255, 204, 0), active: () => level > 10, monsterDelta: -50, levelDelta: -10},
    {x: 550, y: 700, c: color(191, 64, 191), active: () => false},
    {x: 700, y: 700, c: color(88, 57, 39), active: () => false},
  ]

  frameRate(60)
}


function draw() {
  background(249, 201, 113)

  //
  // Monster bewegen
  //

  //Monster nach rechts schieben
  monster.x += speed

  //Monster bissle zittern lassen
  const jitterThreshold = map(monster.y + monster.h / 2, wand.y, wand.y + wand.h, 0., 1., true)
  if (random() > jitterThreshold) {
    monster.y += 1
  } else {
    monster.y -= 1
  }

  //jetzt nur fuer debugzwecke
  if (monster.x > X) monster.x = 0


  //
  // Knoepfe
  //
  strokeWeight(10)
  for (k of knoepfe) {
    let alpha = k.active() ? 255 : 127
    stroke(0, alpha)
    let c = k.c
    c.setAlpha(alpha)
    fill(c)
    circle(k.x, k.y, knopfRadius)
  }


  //
  // das Meter auf der linken Seite
  //
  strokeWeight(1)
  stroke(102, 102, 102) //grauer Rand
  
  //brauner Hintergrund
  fill(94, 64, 25)
  rect(meter.x, 0, meter.w, Y)
  
  myDrawStrichle(arrStrichleAlle)
  
  //der Uebergang von Gruen nach Rot
  fillGradient('linear', {
    from: [0, 0],
    to: [0, Y],
    steps: [
      [color(5, 181, 54, 255), 0],
      [color(255, 0, 0, 127)]
    ]
  })
  rect(60, 10, 62, Y)

  //die 3 Strichle welche ueber dem Uebergang sind
  myDrawStrichle(arrStrichleMarkant)


  //
  // der kleine Zeiger :3
  //

  push()
  //den Zeichenursprung auf diese Koordinate setzen, 
  //je kleiner das level, desto weiter unten
  translate(60, Y - level)

  fill(200)
  beginShape()
  vertex(0, 25)
  vertex(10, 25)
  vertex(30, 2)
  vertex(40, 2)
  vertex(40, -2)
  vertex(30, -2)
  vertex(10, -25)
  vertex(0, -25)
  endShape(CLOSE)
  pop()



  myDrawImage(monster)
  myDrawImage(wand)

}
