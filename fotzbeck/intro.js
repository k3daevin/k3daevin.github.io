let Intro = class extends Screen {
    constructor() {
      super();
      if (this.valid() == false) {
        startButton.hide()
        highscoreButton.hide()
      }
      this.highscore = highscore.read()
    }
    valid() {
      return X > Y
    }
    draw(x, y) {
      background(255)
      textSize(32);
      if (this.valid()) {
        text('Fotzbeck v1.2.1 geht glei los! Klick für Start!', 10, 30);
      } else {
        text('Fotzbeck v1.2.1 wird QUER gespielt du Fotz! Klick für Neustart!', 10, 30);

      }
      text(`Highscore: ${this.highscore}`, 10, 70)
    }
    click(x, y) {

    }
  }