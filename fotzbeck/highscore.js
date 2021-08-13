let Highscore = class extends Screen {
    constructor() {
        super()
        this.key = 'highscore'
        if (this.read() == null) {
            this.write(0)
        }
        startButton.show()
        this.hasData = false
        this.namen = null
        this.level = null
        api_get(json => {
            this.namen = json.name
            this.level = json.level
            this.hasData = true
        })
    }
    read() {
        return window.localStorage.getItem(this.key)
    }
    write(level) {
        try {
            window.localStorage.setItem(this.key, level)
        } catch (e) {
            
        }
    }
    draw() {
        background(0)
        fill(255)
        if (this.hasData == false) {
            text("HIGHSCORE kommt...", X/2, Y/2)
        } else {
            for (var i = 0; i <= 9; ++i) {
                text(`${i+1}: ${this.namen[i]} (${this.level[i]})`, X/2, (i+1)*BLOCKSIZE/2)
            }
        }
    }
}