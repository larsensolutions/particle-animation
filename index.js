import Tree from './tree';

export default class ParticleAnimation {
    constructor(options){
        this.running = false;
        this.parentElement = null;
        this.canvas = null;
        this.root = null;
        this.ctx = null;
        this.parentElement = document.getElementById(options.id);

        //User variables
        this.usePalette = options.usePalette || false;
        this.drawLines = options.drawLines || false
        this.name = options.name || "";
        this.levels = options.levels || 5;
        this.maximumNodes = options.maximumNodes || 3000;
        this.color = options.color || "#0059b3";
        this.palette = options.palette || ["#0059b3", "#4CE038", "#E32023", "#ffa500"];
        this.relationColor = options.relationColor || '#F5F9FA';
        
        if(typeof this.parentElement === 'undefined'){
            console.log("Element id doesn't exist");
            return;
        }

        this.canvas = this.parentElement.querySelector('canvas');
        if(this.canvas === null){
            this.canvas =  document.createElement('canvas');
            this.parentElement.innerHTML="";
            this.parentElement.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.clear();
            this.build();
            this.applyResizeRule();
        }else{
            console.log("Canvas already exist");
        }          
    }
    build(){
        this.root = Tree.build({ levels: this.levels, maximumNodes: this.maximumNodes, color: this.color, palette: this.palette, canvasSize:{x:this.canvas.width, y:this.canvas.height} });   
    }
    clear() {
        this.canvas.width = this.parentElement.clientWidth;
        this.canvas.height = this.parentElement.clientHeight;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    queue() {
        var node = this;
        if(node.ctx===null){
            return;
        }
        window.requestAnimationFrame(function(){
            if (node.running) {
                node.clear();
                node.update();
                node.draw();
                node.queue();
            }
        });
    }
    update() {
        this.root.update();
    }
    draw() {
        var ctx = this.ctx;
        this.ctx.lineWidth=0.5;
        this.drawParticles(this.root);
    }
    drawParticles(node) {
        var ctx = this.ctx;
        
        if (this.usePallette) {
            ctx.fillStyle = node.color;
            ctx.strokeStyle= node.color;
        } else{
            ctx.fillStyle = node.fill;
            ctx.strokeStyle= node.fill;
        }

        ctx.beginPath();
        ctx.arc(node.position.x, node.position.y, node.size, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        for (var i = 0; i < node.children.length; i++) {
            var position = node.children[i].position;
            if (!node.wait && this.drawLines) { 
                ctx.lineWidth = 0.33 - (0.01 * node.level);
                ctx.strokeStyle = this.relationColor;
                ctx.beginPath();
                ctx.moveTo(node.position.x, node.position.y);
                ctx.lineTo(position.x, position.y);
                ctx.stroke();
                ctx.closePath();
            }
            this.drawParticles(node.children[i]);
        }
    }
    loop() {
        if (this.running) {
            this.clear();
            this.update();
            this.draw();
            this.queue();
        }
    }
    applyResizeRule(){
        var node = this;
        window.onresize =function(){
            node.root.acceleration = 2;
            node.root.setDestination(node.parentElement.getBoundingClientRect().width/2,node.parentElement.getBoundingClientRect().height/3)
        }
    }
    toggleColors(){
        this.usePallette = !this.usePallette;   
    }
    toggleDrawLines(){
        this.drawLines = !this.drawLines;   
    }
    stop(){
      this.running = false;
    }
    run() {
        if(this.running==false){
            this.running=true;
            this.queue();
        }
    }
};
