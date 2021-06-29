let Intro = class extends Screen {
    constructor() {
      super();
      this.valid = X > Y
    }
    draw(x, y) {
      background(255)
      textSize(32);
      if (this.valid) {
        text('Fotzbeck v1.1 geht glei los! Klick für Start!', 10, 30);
      } else {
        text('Fotzbeck v1.1 wird QUER gespielt du Fotz! Klick für Neustart!', 10, 30);
      }
    }
    click(x, y) {
      if (this.valid) {
        currentScreen = new Game()
      } else {
        location.reload()
      }
    }
  }