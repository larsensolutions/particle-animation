# Particle animation

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c4f0bb6abb50414791c0721661de599c)](https://www.codacy.com/app/larsensolutions/particle-animation?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=larsensolutions/particle-animation&amp;utm_campaign=Badge_Grade)

[Live demo](http://larsensolutions.no/demos/)

> Add a cool animation to your web site to add life! Tree of nodes pulling on each other randomly to create a soothing behaviour. Starts with an offsets and always seek the center of canvas.

![](http://larsensolutions.no/demos/particle-animation.gif)

## Installation

```sh
npm install particle-animation --save
```

## Features

Available options:

```javascript
   var defaultOptions = {
            id: "elementId", // element id to draw canvas
            levels: 5, // number of levels in the tree
            maximumNodes: 1000, // maximum nodes in the tree
            color:"#0059b3", // Monochrome color, will have different alpha depending on level
            palette : ["#0059b3", "#4CE038", "#E32023", "#ffa500"], //Randomly color nodes using this pallette
            relationColor: '#F5F9FA', // Used to show when parent node pulls children nodes
            usePalette:false,
            drawLines:false
        }
```

Available methods:

```javascript
    toggleColors()
    toggleDrawLines()
    stop()
    run() 
```


## Usage example
html file
```html
<div id="container">

</div>
```
javascript file
```javascript
import ParticleAnimation from "particle-animation"

var animation = new ParticleAnimation({
      id: "container",
      levels: 5,
      maximumNodes: 1000
    });
animation.run();
<script>
```


## Release History
* 1.0.1 to 1.05
    * Just updating readme file
* 1.0.0
    * First release

## Author

Erik Andreas Larsen– [@mapnoter](https://twitter.com/mapnoter) – erik@larsensolutions.no

## Code repository and issue reporting

- [Github](https://github.com/larsensolutions/particle-animation)
- [Issue reporting](https://github.com/larsensolutions/particle-animation/issues)

## License

Distributed under the ISC license. 
