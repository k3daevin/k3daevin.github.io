let Intro = class extends Screen {
    constructor() {
      super();
      this.valid = X > Y
      this.highscore = highscore.read()
    }
    draw(x, y) {
      background(255)
      textSize(32);
      if (this.valid) {
        text('Fotzbeck v1.2 geht glei los! Klick für Start!', 10, 30);
      } else {
        text('Fotzbeck v1.2 wird QUER gespielt du Fotz! Klick für Neustart!', 10, 30);
      }
      text(`Highscore: ${this.highscore}`, 10, 70)
    }
    click(x, y) {
      if (this.valid) {
        currentScreen = new Game()
      } else {
        location.reload()
      }
    }
  }