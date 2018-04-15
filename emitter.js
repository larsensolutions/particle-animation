import Random from './random';
import Vector from './vector';
import Particle from './particle';

function Emitter(point, velocity, spread) {
    this.position = point; // Vector
    this.velocity = velocity; // Vector
    this.spread = spread || Math.PI / 32; // possible angles = velocity +/- spread
    this.drawColor = "#999"; // So we can tell them apart from Fields later
    this.emit = true;
    this.drawnToField = false;
}

Emitter.prototype.emitParticle = function () {
    // Use an angle randomized over the spread so we have more of a "spray"
    var angle = this.velocity.getAngle + this.spread - (Math.random() * this.spread * 2);

    // The magnitude of the emitter's velocity
    var magnitude = this.velocity.getMagnitude;

    // The emitter's position
    var position = new Vector(this.position.x, this.position.y + Random.range(-1, -3));

    // New velocity based off of the calculated angle and magnitude
    var velocity = Vector.fromAngle(angle, magnitude);

    // return our new Particle!
    var p = new Particle(position, velocity);
    p.drawnToField = this.drawnToField;
    return p;
};

export default Emitter;