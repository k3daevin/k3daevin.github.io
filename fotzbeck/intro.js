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
      textSize(BLOCKSIZE/2);
      if (this.valid()) {
        text('Fotzbeck v1.3.2 geht glei los! Los gehts!', 10, 2*BLOCKSIZE);
        startButton.show()
        highscoreButton.show()
      } else {
        text('Fotzbeck v1.3.2', 10, 2*BLOCKSIZE);
        text('wird QUER', 10, 4*BLOCKSIZE);
        text('gespielt', 10, 5*BLOCKSIZE);
        text('du Fotz!', 10, 6*BLOCKSIZE);
        text('Drehen!', 10, 7*BLOCKSIZE);
        startButton.hide()
        highscoreButton.hide()
      }
      text(`Highscore: ${this.highscore}`, 10, 8*BLOCKSIZE)
    }
    click(x, y) {

    }
  }