let Fotzbeck = class extends Widget {
    constructor(img, b) {
        super(X/2, Y/2, img, b)
        this.ltr = true
    }
    draw() {
        let ltr = this.ltr
        if (ltr == false) {
            push()
            scale(-1, 1)
            image(this.img, -this.x, this.y, this.b, this.b)
            pop()
        } else {
            super.draw()
        }
    }
    click(x, y) {
        this.ltr = x > X/2
    }
}