let Gameover = class extends Screen {
    constructor() {
        super();
    }
    draw(x, y) {
        fill(getRandomInt(255), getRandomInt(255), getRandomInt(255))
        text('GAMEOVER', getRandomInt(X), getRandomInt(Y))
    }    
}