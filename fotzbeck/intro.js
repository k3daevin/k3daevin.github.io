let Intro = class extends Screen {
    constructor() {
      super();
      this.valid = X > Y
    }
    draw(x, y) {
      textSize(32);
      if (this.valid) {
        text('Fotzbeck geht glei los! Klick für Start!', 10, 30);
      } else {
        text('Fotzbeck wird QUER gespielt du Fotz! Klick für Neustart!', 10, 30);
      }
    }
    click(x, y) {
      if (this.valid) {
        currentScreen = game
      } else {
        location.reload()
      }
    }
  }