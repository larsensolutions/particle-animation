class Vector {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    get getAngle() {
        return Math.atan2(this.y, this.x);
    }

    // Gets the length of the vector
    get getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // Allows us to get a new vector from angle and magnitude
    static fromAngle(angle, magnitude) {
        return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
    }

    // Calculate distance between two vectors
    static distance(a, b) {
        return Math.sqrt((Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)));
    }
}

export default Vector;
