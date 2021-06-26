let Faust = class extends Widget {
    constructor(img, b) {
        super(X/2, Y/2, img, b)
        this.ltr = true
    }
    draw() {
        if (this.ltr == false) {
            super.rtl_draw()
        } else {
            super.draw()
        }
    }
    click(x, y) {
        this.x = x
        this.y = y
        this.ltr = x > X/2
    }
}