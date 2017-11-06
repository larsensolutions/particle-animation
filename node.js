import Vector from './vector'
import Random from './random'

export default class Node {
    constructor(fill, color, position, velocity, acceleration) {
        this.parent = null;
        this.children = [];

        this.position = position;
        this.size = Random.range(1, 4);
        this.fill = fill;
        this.color = color;
        this.velocity = velocity || new Vector(0, 0);
        this.acceleration = 0.2;
        this.wait = Random.bool();
        this.waitTime = 0;
        this.waitTimeLength = Random.range(70, 240);
        this.level = 0;
    }

    setPosition = function () {
        this.position = new Vector(this.parent.position.x + Random.range(-50, 50), this.parent.position.y + Random.range(-50, 50));
    }

    setDestination(x,y){
        this.destination = new Vector(x,y);
        this.startDistance = Vector.distance(this.position,this.destination);
    }

    setRandomDestination = function () {
        var dX = 0;
        var dY = 0;
        if (this.parent !== null) {
            dX = this.parent.position.x + Random.range(-70, 70);
            dY = this.parent.position.y + Random.range(-50, 70);
        } else {
            dX = this.position.x + Random.range(-20, 20);
            dY = this.position.y + Random.range(-20, 20);
        }

        this.acceleration = 0.2;
        this.destination = new Vector(dX, dY);
        this.startDistance = Math.sqrt((Math.pow(this.position.x - this.destination.x, 2) + Math.pow(this.position.y - this.destination.y, 2)));;
    }

    getDestinationAngle = function () {
        return Math.atan2((this.destination.y - this.position.y), (this.destination.x - this.position.x));
    }

    move = function () {

        var distance = Math.sqrt((Math.pow(this.position.x - this.destination.x, 2) + Math.pow(this.position.y - this.destination.y, 2)));
        var percent = 100 - ((distance / this.startDistance) * 100);

        var angle = this.getDestinationAngle();

        if (percent < 50 && percent > 10) {
            this.acceleration += 0.3;
        } else if (percent < 70 && percent > 50) {
            this.acceleration = this.acceleration -= 0.3;
        }
        else if (percent > 70) {
            this.acceleration -= 0.2;
            if (this.acceleration < 0) {
                this.acceleration = 0.3;
            }
        }

        var x = Math.cos(angle) * this.acceleration;
        var y = Math.sin(angle) * this.acceleration;
        var velocity = new Vector(x, y);

        //Add our current velocity to our position
        this.position.add(velocity);
    };

    addChild = function (childNode) {
        childNode.level = this.level + 1;
        childNode.parent = this;
        childNode.setPosition();
        childNode.setRandomDestination();

        this.children.push(childNode);
        return childNode;
    }
    reachedTarget = function () {
        var distance = Math.sqrt((Math.pow(this.position.x - this.destination.x, 2) + Math.pow(this.position.y - this.destination.y, 2)));
        if (this.level === 0) {
            return distance < 10;
        }
        return distance < 20;
    }

    update = function () {
        if (this.reachedTarget()) {
            if (this.wait) {
                this.waitTime++;
            } else {
                this.wait = true;
                this.waitTime = 0;
                this.waitTimeLength = Random.range(70, 210);
            }

            if (this.waitTime > this.waitTimeLength) {
                this.wait = false;
                this.setRandomDestination();
            }
        } else {
            this.move();
        }
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].update();
        }
    }
};
