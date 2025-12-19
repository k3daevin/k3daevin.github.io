class Tony {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.vx = 0;
    this.vy = 0;
    this.image = img.tony.still;
    this.facing = Facing.Right;
  }
  draw(camera) {
    if (!camera) camera = {x:0, y:0};
    if (this.facing === Facing.Right) {
        image(this.image, this.x-50 - camera.x, this.y-75 - camera.y, 100, 150);
    } else {
        push();
        //translate(this.x, 0);
        scale(-1, 1);
        image(this.image, -50-this.x + camera.x, this.y-75 - camera.y, 100, 150);
        pop();
    }
  }
  advance(dt) {
    if (this.image === img.tony.wupp) {
      this.x += dt * this.vx;
      this.y += dt * this.vy;
    }
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

    this.facing = (pminust.x < 0) ? Facing.Left : Facing.Right;
  }
  out_of_bounds() {
    return (this.x < 0 || this.x + 20 > width || this.y < 0 || this.y +20 > height);
  }
}