let Widget = class {
    constructor(x, y, img, b) {
        this.x = x
        this.y = y
        this.img = img
        this.scale = 1.0
        this.b = b
        this.b0 = b
    }
    draw() {
        image(this.img, this.x, this.y, this.b, this.b)
    }
    click(x, y) {}
    set(x, y) {
        this.x = x
        this.y = y
    }
    rescale(scale) {
        this.scale = scale
        this.b = scale * this.b0
    }
}