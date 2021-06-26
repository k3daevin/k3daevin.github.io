let Game = class extends Screen {
    constructor() {
      super();
      this.fotzbeck = new Fotzbeck(img.fotzbeck, 4*BLOCKSIZE)
      this.faust = new Faust(img.faust, 2*BLOCKSIZE)
    }
    draw(x, y) {
      this.faust.draw()
      this.fotzbeck.draw()
    }
    click(x, y) {
      this.faust.click(x, y)
      this.fotzbeck.click(x, y)
    }
  }