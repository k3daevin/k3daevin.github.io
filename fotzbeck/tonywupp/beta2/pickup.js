class Pickup {
    constructor(x, y, definition) {
        this.x = x;
        this.y = y;
        this.definition = definition;
        this.toRemove = false;
    }
    
    draw(camera) {
        if (this.toRemove) return;
        if (!camera) camera = {x:0, y:0};
        image(this.definition.image, this.x - camera.x - 10, this.y - camera.y - 10, 20, 20);
    }

    collect(player) {
        const d = dist(this.x, this.y, player.x, player.y);
        if (d < 50) {
            this.toRemove = true;
            return true;
        }
        return false;
    }
}