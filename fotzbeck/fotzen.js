let Fotzen = class {
    constructor(imgfotzen) {
        this.imgfotzen = imgfotzen
        this.fotzen = new Set()
        this.maxFotzen = 10
    }
    newFotz() {
        let img = this.imgfotzen[getRandomInt(this.imgfotzen.length)]
        this.fotzen.add(new Fotz(img, 1 * BLOCKSIZE))
  
    }
    draw() {
        if (this.maxFotzen > 0 && Math.random() > 0.1) {
            this.maxFotzen--
            let img = this.imgfotzen[getRandomInt(this.imgfotzen.length)]
            this.newFotz()
        }
        for (let fotz of this.fotzen) {
            fotz.draw()
            if (fotz.live == false) {
                this.fotzen.delete(fotz)
            }
        }
    }
    click(x, y) {
        for (let fotz of this.fotzen) {
            fotz.click(x, y)
        }
    }
}