const X = 800
const Y = 800
let DIFF = 1e-2
let SCALE = 1e-2
const SCALE_THRESH = 1e-6 //alles da drunter wird auf 0 gesetzt
const N_AGENTS = 10000
const AGENT_SIZE = 5
let AGENT_SPEED = 1e-3
let AGENT_TURNANGLE = 3.1415/2 //halbe Spannweite
let SEARCH_DIST = 2e-2
let SEARCH_ANGLE = 3.1415/4 //halbe Spanweite
let VEL_RANDOM_CHANCE = 0.01
let VEL_RANDOM_MAXPOWER = 3.1415/3
let DEBUG = false

let searchVecs

let img

function setScale(value) {
  const p = lerp(6, 1, value/100.0)
  SCALE = Math.pow(10, -p)
  console.log({value, p, SCALE})
}

function setAgentTurnangle(value) {
  const d = lerp(16, 1, value/100.0)
  AGENT_TURNANGLE = PI/d
  console.log({value, d, AGENT_TURNANGLE})
}

function setSearchAngle(value) {
  const d = lerp(16, 1, value/100.0)
  SEARCH_ANGLE = PI/d
  console.log({value, d, SEARCH_ANGLE})
}

function setVelRandomChance(value) {
  const p = lerp(3, 0.9, value/100.0)
  VEL_RANDOM_CHANCE = Math.pow(10, -p)
  console.log({value, p, VEL_RANDOM_CHANCE})
}

function setDiff(value) {
  const p = lerp(6, 1, value/100.0)
  DIFF = Math.pow(10, -p)
  console.log({value, p, DIFF})
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
  static dirs4 = [[1,0], [0,1], [-1,0], [0,-1]] //d.h. x:0,1 y:2,3
  constructor(nx, ny) {
    this.nx = nx
    this.ny = ny
    this.ncells = nx * ny
    this.cells = new Float64Array(this.ncells)
    this.tmpCells = new Float64Array(this.ncells)
    this.neighbours = new Int32Array(this.ncells * 4)
    for (let i = 0; i < this.ncells; ++i) {
      const ci = this.getCellCoordsByIndex(i)
      let j = 0;
      for (let [u,v] of Grid.dirs4) {
        let nci = {ix: ci.ix + u, iy: ci.iy + v}
        let wnci = this.warpCellCoords(nci)
        let ni = this.getIndexByCellCoords(wnci)
        this.neighbours[i * 4 + j] = ni
        j++
      }
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
    const neighbours = this.neighbours
    const cells1 = this.cells
    const cells2 = this.tmpCells
    const DIFF0_25 = 0.25 * DIFF
    const DIFF1m0_5 = 1 - 0.5*DIFF
    //diffuse in x-dir from cells1 to cells2
    for (let i = 0; i < this.ncells; ++i) {
      const i4 = i*4
      const leftVal = cells1[neighbours[i4]]
      const val = cells1[i]
      const rightVal = cells1[neighbours[i4+1]]

      const newVal = DIFF0_25 * (leftVal + rightVal) + DIFF1m0_5 * val
      cells2[i] = newVal
    }
    //diffuse in y-dir from cells2 to cells1
    for (let i = 0; i < this.ncells; ++i) {
      const i4 = i*4
      const topVal = cells2[neighbours[i4+2]]
      const val = cells2[i]
      const bottomVal = cells2[neighbours[i4+3]]

      const newVal = DIFF0_25 * (topVal + bottomVal) + DIFF1m0_5 * val
      cells1[i] = newVal
    }
  }

  getCellCoordsByIndex(i) { return {ix: i % this.nx, iy: i / this.ny} }
  warpCellCoords(ci) { return {ix: Math.floor((ci.ix + this.nx) % this.nx), iy: Math.floor((ci.iy + this.ny) % this.ny) }}
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
    if (random() < VEL_RANDOM_CHANCE) {
      const maxpower = random(VEL_RANDOM_MAXPOWER)
      this.vel.rotate(random(-maxpower,maxpower))
      return
    }

    const dir0 = this.vel.copy().setMag(SEARCH_DIST)
    const dirs = [
      dir0,
      dir0.copy().rotate(SEARCH_ANGLE),
      dir0.copy().rotate(-SEARCH_ANGLE),
    ]
    let maxIndex = 0
    let maxVal = -1
    for (let i = 0; i < dirs.length; ++i) {
      const dir = dirs[i]
      const searchUnitVector = new UnitVector(dir.copy().add(this.pos))
      searchUnitVector.wrap()
      const ci = grid.getCellIndexByUnitCoords(searchUnitVector)
      const val = grid.getByCellIndex(ci)
      if (val >= maxVal) {
        maxVal = val
        maxIndex = i
      }
    }

    let desiredDeltaAngle = 0
    if (maxIndex == 1) {
      desiredDeltaAngle = AGENT_TURNANGLE
    } else if (maxIndex == 2) {
      desiredDeltaAngle = -AGENT_TURNANGLE
    }
    this.vel.rotate(desiredDeltaAngle)
  }

  updateVelByGrid_old(grid) {
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
  frameRate(60)
  grid = new Grid(X, Y)
  img = createImage(X, Y)
  grid.initAll(0)
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
  // grid.initAll(0)
  
  // const coords = {ix: Math.floor(mouseX), iy: Math.floor(mouseY)}
  // const ci = grid.getIndexByCellCoords(coords)
  // console.log(ci)
  // const neighbours = grid.neighbours[ci]
  // if (!neighbours) {
  //   return
  // }
  // grid.cells[ci] = 1
  // for (const neighbour of neighbours) {
  //   grid.cells[neighbour] = 1
  // }

  // img.loadPixels()
  // let pixels = img.pixels
  // for (let i = 0; i < grid.ncells; ++i) {
  //   const val = Math.floor(grid.cells[i] * 255)
  //   const [r, g, b, a] = [val, val, val, 255]
  //   const pi = i*4
  //   pixels[pi + 0] = r
  //   pixels[pi + 1] = g
  //   pixels[pi + 2] = b
  //   pixels[pi + 3] = a
  // }
  // img.updatePixels()

  // image(img, 0, 0)


  // return;
  grid.diffuse(DIFF)
  grid.scaleAll(1-SCALE)

  img.loadPixels()
  const pixels = img.pixels
  for (let i = 0; i < grid.ncells; ++i) {
    const val = Math.floor(grid.cells[i] * 255)
    //const [r, g, b, a] = [val, val, val, 255]
    const pi = i*4
    pixels[pi + 0] = val
    pixels[pi + 1] = val
    pixels[pi + 2] = val
    pixels[pi + 3] = 255
  }
  img.updatePixels()

  image(img, 0, 0)

  color(255, 0, 0, 100)
  for (const agent of agents) {
    agent.updateVelByGrid(grid)
  }

  color(255, 100)
  for (const agent of agents) {
    agent.move()
    agent.draw(grid)
  }



  stroke(255, 0, 0, 255)
  textSize(50)
  text(Math.round(frameRate()), 10, 50)
}
