let Highscore = class extends Screen {
    constructor() {
        super()
        this.key = 'highscore'
        this.usernameKey = 'fotzbeck_username'
        this.idKey = 'fotzbeck_id'

        this.username = null
        this.id = null

        this.username = this.readUsername()

        if ((this.id = this.readId()) == null) {
            this.generateId()
        }

        if (this.read() == null) {
            this.write(0)
        }
        startButton.show()
        this.hasData = false
        this.namen = null
        this.level = null
        this.fetchNewHighscore()
    }
    fetchNewHighscore() {
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
        if (this.username == null) {
            this.promptUsername()
        }

        try {
            window.localStorage.setItem(this.key, level)
        } catch (e) {
            console.log(e)
        }
        try {
            api_post(this.id, level, this.username, data => {
                console.log(`api_post: ${data}`)
            })
        } catch (e) {
            console.log(e)
        }
    }
    
    readUsername() {
        return window.localStorage.getItem(this.usernameKey)
    }
    writeUsername(name) {
        this.username = name
        try {
            window.localStorage.setItem(this.usernameKey, name)
        } catch (e) {
            console.log(e)
        }
    }
    promptUsername() {
        const letterNumber = /^[0-9a-zA-Z]+$/;
        let valid = false
        let userinput = null
        while(valid == false) {
            userinput = prompt("Name für den Highscore (A-Z, a-z, 0-9, 20 Zeichen max)")
            if (userinput && userinput.length <= 20 && userinput.match(letterNumber)) {
                valid = true
            }
        }
        this.writeUsername(userinput)
    }
    
    readId() {
        return window.localStorage.getItem(this.idKey)
    }
    generateId() {
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        this.id = id
        try {
            window.localStorage.setItem(this.idKey, id)
        } catch (e) {
            console.log(e)
        }
    }

    draw() {
        background(0)
        fill(255)
        if (this.hasData == false) {
            text("HIGHSCORE kommt...", X/2, Y/2)
        } else {
            let len = min(this.namen.length, this.level.length)
            textSize(BLOCKSIZE/2)
            for (var i = 0; i < len; ++i) {
                text(`${i+1}: ${this.namen[i]} (${this.level[i]})`, X/2, (i+1)*BLOCKSIZE/2)
            }
        }
    }
}