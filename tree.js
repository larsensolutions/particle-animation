
import Node from './node'
import Vector from './vector'
import Random from './random'

export default {
    build(options) {
        var nodes = 0;
        if (options.levels > 10) {
            console.log('Maximum tree height is limited to 10. This has a potential to create 88572 nodes');
            options.levels = 10;
        }
        if (options.maximumNodes > 3000) {
            console.log('Maximum nodes in tree is limited to 3000. This is plenty!');
        }

        function hex2rgba(hex, a) {
            var r = parseInt(hex.slice(1, 3), 16),
                g = parseInt(hex.slice(3, 5), 16),
                b = parseInt(hex.slice(5, 7), 16)
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
        }

        function AddChildren(node, num, level) {
            var alpha = 1 - (1 / (level - 0.5));
            if(alpha < 0){
                alpha=0.5;
            }
            if (level < options.levels && nodes < options.maximumNodes) {
                for (var i = 0; i < num; i++) {
                    var c = node.addChild(new Node(hex2rgba(options.color, alpha), hex2rgba(Random.item(options.palette),alpha)));
                    nodes++;
                    AddChildren(c, Random.range(0, 3), level + 1);
                }
            }
        }

        var root = new Node(hex2rgba(options.color, 1), Random.item(options.palette), new Vector(options.canvasSize.x/2, options.canvasSize.y/2));
        root.acceleration = 2;
        root.setDestination(options.canvasSize.x/2, options.canvasSize.y/3);
        root.size = 6;
        root.fill = options.color;
        AddChildren(root, 3, 0);

        console.log("Number of nodes in canvas : " +nodes);
        return root;
    }
}