let Highscore = class {
    constructor() {
        this.key = 'highscore'
        if (this.read() == null) {
            this.write(0)
        }
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

}