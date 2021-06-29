let Gameover = class extends Screen {
    constructor() {
        super();
    }
    draw(x, y) {
        fill('black')
        text('GAMEOVER', 100, 100)
    }    
}