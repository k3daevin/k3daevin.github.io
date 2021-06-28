let Fotzen = class {
    constructor(imgfotzen) {
        this.imgfotzen = imgfotzen
        this.fotzen = new Set()
        this.maxFotzen = 10
        this.spawnedFotzen = 0
        this.killedFotzen = 0
        this.speed = BLOCKSIZE
    }
    count() {
        return this.maxFotzen - this.killedFotzen
    }
    reset(level) {
        let scale = Math.pow(level, 0.3)
        this.maxFotzen = Math.floor(scale * 10)
        this.speed = Math.floor(scale * BLOCKSIZE)
        this.spawnedFotzen = 0
        this.killedFotzen = 0
    }
    newFotz() {
        let img = this.imgfotzen[getRandomInt(this.imgfotzen.length)]
        this.fotzen.add(new Fotz(img, this.speed))
        this.spawnedFotzen++
  
    }
    draw() {
        if (this.maxFotzen - this.spawnedFotzen > 0 && Math.random() > 0.01) {
            let img = this.imgfotzen[getRandomInt(this.imgfotzen.length)]
            this.newFotz()
        }
        for (let fotz of this.fotzen) {
            fotz.draw()
            if (fotz.live == false) {
                this.fotzen.delete(fotz)
                this.killedFotzen++
            }
        }
    }
    click(x, y) {
        for (let fotz of this.fotzen) {
            fotz.click(x, y)
        }
    }
}