let Game = class extends Screen {
    constructor() {
      super();
      this.fotzbeck = new Fotzbeck(img.fotzbeck, 4*BLOCKSIZE)
      this.faust = new Faust(img.faust, 2*BLOCKSIZE)
      this.fotzen = new Fotzen(img.fotzen)
      this.level = 1
      highscoreButton.hide()
      textSize(BLOCKSIZE)
    }
    draw(x, y) {
      background(255)
      this.faust.draw()
      this.fotzbeck.draw()
      this.fotzen.draw()

      if (this.fotzen.collision()) {
        this.fotzbeck.health -= 5
        this.fotzbeck.rescale((this.fotzbeck.health / 100) * .5 + .5)
        if (this.fotzbeck.health == 0) {
          currentScreen = new Gameover(this.level)
        }
      }

      textAlign(CENTER)
      fill('black')
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