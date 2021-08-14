let Intro = class extends Screen {
    constructor() {
      super();
      if (this.valid() == false) {

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
        text('Fotzbeck v1.3.0 geht glei los! Los gehts!', 10, 30);
        startButton.show()
        highscoreButton.show()
      } else {
        text('Fotzbeck v1.3.0 wird QUER gespielt du Fotz! Drehen!', 10, 30);
        startButton.hide()
        highscoreButton.hide()
      }
      text(`Highscore: ${this.highscore}`, 10, 70)
    }
    click(x, y) {

    }
  }