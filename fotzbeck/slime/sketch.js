const X = 800
const Y = 800
let DIFF = 0.01
const DIFF_THRESH = 1e-4 //alles da drunter wird nicht mehr diffundiert
let SCALE = 0.001
const SCALE_THRESH = 1e-6 //alles da drunter wird auf 0 gesetzt
const N_AGENTS = 10000
const AGENT_SIZE = 5
const AGENT_SPEED = 0.001
const VEL_KAPPA = 0.5
let VEL_RANDOM_CHANCE = 0.01
let VEL_RANDOM_MAXPOWER = 1
let DEBUG = false

let searchVecs

let img

function setScale(value) {
  let p = lerp(6, 1, value/100.0)
  SCALE = Math.pow(10, -p)
  console.log({value, p, SCALE})
}


class UnitVector {
  constructor(v) {
    this.v = v
  }
  copy() {
    return new UnitVector(this.v)
  }
  addP5Vec(other) {
    //assume ||other||_inf < 1
    this.v.add(other.x, other.y)
    this.wrap()
  }
  static wrap1(x) { return (x + 1.0) % 1.0 }
  wrap() {
    this.v.x = UnitVector.wrap1(this.v.x)
    this.v.y = UnitVector.wrap1(this.v.y)
  }
}

class Grid {
  constructor(nx, ny) {
    this.nx = nx
    this.ny = ny
    this.ncells = nx * ny
    this.cells = new Array(this.ncells)
    this.neighbours = new Array(this.ncells)
    for (let i = 0; i < this.ncells; ++i) {
      const ci = this.getCellCoordsByIndex(i)
      let localNeighbours = []
      for (let [u,v] of [[1,0], [0,1], [-1,0], [0,-1]]) {
        let nci = {ix: ci.ix + u, iy: ci.iy + v}
        let wnci = this.warpCellCoords(nci)
        let ni = this.getIndexByCellCoords(wnci)
        localNeighbours.push(ni)
      }
      this.neighbours[i] = localNeighbours
    }
    
  }
  initAll(v) {
    for (let i = 0; i < this.ncells; ++i) {
      this.cells[i] = v
    }
  }
  scaleAll(v) {
    for (let i = 0; i < this.ncells; ++i) {
      const val = this.cells[i];
      if (val > SCALE_THRESH) {
        this.cells[i] *= v
      }
    }
  }
  diffuse(v) {
    const oldCells = this.cells.slice(0)
    for (let i = 0; i < this.ncells; ++i) {
      const val = oldCells[i]
      if (val < DIFF_THRESH) continue
      const inc = val/4*v
      const neighbours = this.neighbours[i]
      for (let j = 0; j < 4; ++j) {
        this.cells[neighbours[j]] += inc
      }
      // for (let ni of this.neighbours[i]) {
      //   this.cells[ni] += inc
      // }
      this.cells[i] = (1-v)*val
    }
  }
  getCellCoordsByIndex(i) { return {ix: i % this.nx, iy: i / this.ny} }
  warpCellCoords(ci) { return {ix: Math.round((ci.ix + this.nx) % this.nx), iy: Math.round((ci.iy + this.ny) % this.ny) }}
  getIndexByCellCoords(ci) { return ci.ix + ci.iy * this.nx}
  getByCellIndex(i) { return this.cells[i] }
  getByCellCoords(ix, iy) { return this.cells[ix + iy * this.nx] }
  getCellCordsByUnitCoords(uv) {
    //assume uv: UnitVector, so 0<=x,y<1
    const x = uv.v.x
    const y = uv.v.y
    const ix = Math.floor(x * this.nx)
    const iy = Math.floor(y * this.ny)
    return {ix, iy}
  }
  getCellIndexByUnitCoords(uv) {
    return Math.floor(uv.v.x * this.nx) + Math.floor(uv.v.y * this.ny) * this.nx
  }
  setCellByUnitCoords(uv, value) {
    const cellIndex = this.getCellIndexByUnitCoords(uv)
    this.cells[cellIndex] = value
  }
  getCellByUnitCoords(uv) {

  }
}

class Agent {
  constructor(pos, vel) {
    this.pos = pos
    this.vel = vel
  }

  move() {
    const uv = new UnitVector(this.pos)
    uv.addP5Vec(this.vel)
    this.pos = uv.v
  }

  draw(grid) {
    if (DEBUG) circle(this.pos.x * X, this.pos.y * Y, AGENT_SIZE)
    grid.setCellByUnitCoords(new UnitVector(this.pos), 1)
  }

  updateVel(pixels, d) {
    const ix = int(this.pos.x * X)
    const iy = int(this.pos.y * Y)
    const index = createVector(ix, iy)
    const pixel_index = (x, y) => x * d + 4 * y * d * X
    let neighbours = []

    //bisle randomness introducen
    shuffleArray(scanVecs)

    for (const scanVec of scanVecs) {
      const winkel = scanVec.dot(this.vel)
      if (winkel < 0) continue

      let neighbour = p5.Vector.add(index, scanVec)
      if (neighbour.x < 0) neighbour.x = X - 1
      if (neighbour.x >= X) neighbour.x = 0
      if (neighbour.y < 0) neighbour.y = Y - 1
      if (neighbour.y >= Y) neighbour.y = 0
      neighbours.push(neighbour)
    }

    if (neighbours.length == 0) {
      return
    }

    let maxValue = -1
    let maxIndex
    for (let i = 0; i < neighbours.length; ++i) {
      const neighbour = neighbours[i]
      const pi = pixel_index(neighbour.x, neighbour.y)
      const val = pixels[pi]
      if (val > maxValue) {
        maxValue = val
        maxIndex = i
      }
    }
    const maxDir = scanVecs[maxIndex]

    this.vel.lerp(maxDir, VEL_KAPPA)
    this.vel.setMag(AGENT_SPEED)
  }

  updateVelByGrid(grid) {
    const angle = searchVecs[0].angleBetween(this.vel)
    const mySearchVecs = searchVecs.map(function(x) {
      const y = x.copy()
      y.rotate(angle)
      return y
    })
    let maxVal = -1
    let desiredDir = this.vel
    for (const sv of mySearchVecs) {
      const svc = sv.copy()
      const usv = new UnitVector(svc)
      usv.addP5Vec(this.pos)
      //svc.add(this.pos)
      if (DEBUG) {
        const p = grid.getCellCordsByUnitCoords(new UnitVector(svc))
        circle(p.ix, p.iy, 1)
      }
      const ci = grid.getCellIndexByUnitCoords(new UnitVector(svc))
      const val = grid.getByCellIndex(ci)
      if (val > maxVal) {
        maxVal = val
        desiredDir = sv
      }
    }
    if (random() < VEL_RANDOM_CHANCE) {
      const maxpower = random(VEL_RANDOM_MAXPOWER)
      desiredDir.rotate(random(-maxpower,maxpower))
    }
    this.vel.lerp(desiredDir, VEL_KAPPA)
    this.vel.setMag(AGENT_SPEED)
  }
}

let agents
let grid

function setup() {
  createCanvas(X, Y)
  grid = new Grid(X, Y)
  img = createImage(X, Y)
  grid.initAll(0)
  unit10 = createVector(1, 0)
  searchVecs = [
    createVector(0.02, 0),
    createVector(0.015, 0.005),
    createVector(0.015, -0.005)
  ]
  scanVecs =  [
    createVector(-1, -1),
    createVector(-1, 0),
    createVector(-1, 1),
    createVector(0, -1),
    createVector(0, 1),
    createVector(1, -1),
    createVector(1, 0),
    createVector(1, 1),
  ]
  agents = new Array(N_AGENTS)
  for (let i = 0; i < N_AGENTS; ++i) {
    let vel = createVector(AGENT_SPEED, 0)
    vel.rotate(random(TWO_PI))
    agents[i] = new Agent(createVector(random(), random()), vel)
  }
  background(0)
  noStroke()
}

function draw() {
  grid.diffuse(DIFF)
  grid.scaleAll(1-SCALE)

  img.loadPixels()
  let pixels = img.pixels
  for (let i = 0; i < grid.ncells; ++i) {
    const val = Math.floor(grid.cells[i] * 255)
    const [r, g, b, a] = [val, val, val, 255]
    const pi = i*4
    pixels[pi + 0] = r
    pixels[pi + 1] = g
    pixels[pi + 2] = b
    pixels[pi + 3] = a
  }
  img.updatePixels()

  image(img, 0, 0)

  color(255, 0, 0, 100)
  //loadPixels()
  //const d = pixelDensity()
  for (const agent of agents) {
    //agent.updateVel(pixels, d)
    agent.updateVelByGrid(grid)
  }
  //updatePixels()

  color(255, 100)
  for (const agent of agents) {
    agent.move()
    agent.draw(grid)
  }

}
