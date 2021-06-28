let Game = class extends Screen {
    constructor(imgfotzen) {
      super();
      this.fotzbeck = new Fotzbeck(img.fotzbeck, 4*BLOCKSIZE)
      this.faust = new Faust(img.faust, 2*BLOCKSIZE)
      this.fotzen = new Fotzen(imgfotzen)
      this.level = 1
    }
    draw(x, y) {
      this.faust.draw()
      this.fotzbeck.draw()
      this.fotzen.draw()
      textAlign(CENTER)
      text(`Level: ${this.level}`, X/2, Y/2+Y/4)
      text(`noch: ${this.fotzen.count()} Fotzen`, X/2, Y/2+Y/4 + 50)

      if (this.fotzen.count() == 0) {
        this.level++
        this.fotzen.reset(this.level)
      }
    }
    click(x, y) {
      this.faust.click(x, y)
      this.fotzbeck.click(x, y)
      this.fotzen.click(x, y)
    }
  }