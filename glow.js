import Random from './random'

function Glow(x, y){
    this.x = x;
    this.y = y;
    // Radius of the white glow.
    this.innerRadius = 2,
    this.outerRadius = 20,
    // Radius of the entire circle.
    this.radius = 20;
    this.speed=1;
    this.acceleration = Random.range(1,1.05);
    this.direction = Random.plusMinus();
}

Glow.prototype.draw = function(ctx){
  var gradient = ctx.createRadialGradient(this.x, this.y, this.innerRadius, this.x, this.y, this.outerRadius);
  gradient.addColorStop(0, '#fff');
  gradient.addColorStop(0.01, '#E8E8E8');
  gradient.addColorStop(0.1, '#666');
  gradient.addColorStop(1, 'transparent');
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = gradient;
  ctx.fill();
}

export default Glow;