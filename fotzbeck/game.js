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
    }
    click(x, y) {
      this.faust.click(x, y)
      this.fotzbeck.click(x, y)
      this.fotzen.click(x, y)
    }
  }