class Tony {
  constructor(tonydata) {
    this.x = width/2;
    this.y = height/2;
    this.width = tonydata.width;
    this.height = tonydata.height;
    this.vx = 0;
    this.vy = 0;
    this.image = img.tony.still;
    this.facing = Facing.Right;
  }
  draw(camera) {
    if (!camera) camera = {x:0, y:0};
    const img = this.facing === Facing.Right ? this.image.ltr : this.image.rtl;
    image(img, this.x-this.width/2 - camera.x, this.y-this.height/2 - camera.y, this.width, this.height);
  }
  advance(dt) {
    if (this.image === img.tony.wupp) {
      this.x += dt * this.vx;
      this.y += dt * this.vy;
    }
  }
  push(px, py) {
    const p = createVector(px, py)
    const t = createVector(this.x, this.y)
    t.mult(-1);
    const pminust = p5.Vector.add(p, t);
    pminust.setMag(options.pushforce);
    this.vx = pminust.x;
    this.vy = pminust.y;
    this.image = img.tony.wupp;
    setTimeout(() => {
      this.image = img.tony.still;
    }, 200);


    this.facing = (pminust.x < 0) ? Facing.Left : Facing.Right;
  }
  out_of_bounds() {
    return (this.x < 0 || this.x + 20 > width || this.y < 0 || this.y +20 > height);
  }
}