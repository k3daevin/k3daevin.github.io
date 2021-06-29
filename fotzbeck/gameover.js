let Gameover = class extends Screen {
    constructor(level) {
        super();
        this.level = level
        this.waitSeconds = 5
        this.intervalId = window.setInterval(() => {
            this.waitSeconds--
            if (this.waitSeconds == 0) {
                window.clearInterval(this.intervalId)
            }
        }, 1000)
        this.highscore = highscore.read()
        this.newHighscore = ""
        if (level > this.highscore) {
            highscore.write(level)
            this.newHighscore = " Neuer Highscore!"
            this.highscore = level
        }
    }
    draw(x, y) {
        fill(getRandomInt(255), getRandomInt(255), getRandomInt(255))
        text('GAMEOVER', getRandomInt(X), getRandomInt(Y))
        fill(255)
        rect(X/4, Y/2+Y/4, X/2, Y/4)
        fill(0)
        text(`Erreichtes Level: ${this.level}`, X/2, Y/2+Y/4+50)
        text(`Highscore: ${this.highscore}${this.newHighscore}`, X/2, Y/2+Y/4+100)
        if (this.waitSeconds > 0) {
            text(`Continue in ${this.waitSeconds}`, X/2, Y/2+Y/4+150)       
        } else {
            text("Klicken für Continue", X/2, Y/2+Y/4+150)
        }
    }
    click(x, y) {
        if (this.waitSeconds == 0) {
            currentScreen = new Game()
        }
    }
}