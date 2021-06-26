let Widget = class {
    constructor(x, y, img) {
        this.x = x
        this.y = y
        this.img = img
        this.scale = 1.0
        this.bx = img.width
        this.by = img.height
    }
    draw() {
        image(this.img, this.x, this.y, this.bx, this.by)
    }
    set(x, y) {
        this.x = x
        this.y = y
    }
    rescale(scale) {
        this.scale = scale
    }
}