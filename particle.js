import Vector from './vector';

function Particle(point, velocity, acceleration) {
    this.position = point || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
    this.acceleration = acceleration || new Vector(0, 0);
  }
  
  Particle.prototype.move = function () {
    // Add our current acceleration to our current velocity
    this.velocity.add(this.acceleration);
    // Add our current velocity to our position
    this.position.add(this.velocity);
  };
  
  export default Particle;