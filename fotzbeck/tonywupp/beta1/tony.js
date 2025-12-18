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