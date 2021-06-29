let Fotzbeck = class extends Widget {
    constructor(img, b) {
        super(X/2, Y/2, img, b)
        this.ltr = true
        this.health = 100
    }
    draw() {
        noFill()
        rect(X/2 - this.b/2, Y/4, this.b, BLOCKSIZE/4)
        fill('green')
        rect(X/2 - this.b/2, Y/4, this.b * (this.health / 100), BLOCKSIZE/4)
        if (this.ltr == false) {
            super.rtl_draw()
        } else {
            super.draw()
        }
    }
    click(x, y) {
        this.ltr = x > X/2
    }
}