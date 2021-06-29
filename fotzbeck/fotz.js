let Fotz = class extends Widget {
    constructor(img, speed) {
        let ltr = Math.random() > .5
        let x = ltr ? BLOCKSIZE : X - BLOCKSIZE
        let y = getRandomInt(Y)
        super(x, y, img, BLOCKSIZE)
        this.ltr = ltr
        this.speed = speed
        this.live = true
        this.b2 = this.b / 2
    }
    draw() {
        let mx = Math.floor(this.speed / framerate)
        let my = (this.y - Y/2) / Math.abs(this.x - X/2) * this.speed / framerate
        this.y -= my
        if (this.ltr == false) {
            this.x -= mx
            super.rtl_draw()
        } else {
            this.x += mx
            super.draw()
        }
    }
    click(x, y) {
        if (this.x - this.b2 < x && x < this.x + this.b2 && 
            this.y - this.b2 < y && y < this.y + this.b2) {
                this.live = false
            }
    }
}