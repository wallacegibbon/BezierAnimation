# Introduction

Make any HTML element move in a certain bezier route. The animation is based on `requestAnimationFrame`, so it has good performance on both PCs and cellphones.


The API is pretty simple, this is an example:
```js
//The bezier route(StartPoint, CtlPoint1, CtlPoint2, StopPoint)
const r1 = [{x:30, y:400}, {x:50, y:300}, {x:-50, y:150}, {x:30, y:0}];

//Get a HTML element
const ele = document.querySelector("#e");

//Use BezierElement on this element
const a = new BezierElement(ele, r1);

//Start the animation
a.start();
```

You can download this project and open the `test.html` in your browser to see what it does.

