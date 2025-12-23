class Tier {
    constructor(number, rank, range) {
        this.number = number;
        this.rank = rank; // e.g., 'common', 'rare', etc.
        this.range = range; // e.g., [0, 100]
    }
    isInRange(value) {
        return value >= this.range[0] && value <= this.range[1];
    }
}