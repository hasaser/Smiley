import {Graphics} from "pixi.js";
import { getColor } from "./color.js";
import {app, allCircles} from "./index.js"
function generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return parseInt(color, 16);
}

export function createCircle(r, x, y){
    let circle = new Graphics();
    circle.beginFill(0xFFFFFF);
    circle.drawCircle(0, 0, r);
    circle.endFill();
    circle.x = x;
    circle.y = y;
    circle.hsl = Math.floor(Math.random() * 360)
    circle.colorDirection = 1;
    circle.tint = getColor(circle);
    circle.startAlpha = Math.random()
    circle.alpha = circle.startAlpha
    app.stage.addChild(circle);
    allCircles.push(circle)
    return circle
}

export function createMouth(num, r){
    const degree = (Math.PI * 2 / 3 / num)
    const lambda = Math.PI / 3
    let mouth = new Array()
    for (let i = 0; i < num+1; i++) {
        let circle = createCircle(r, 300 + Math.sin(degree*i - lambda) * 120, 300 + Math.cos(degree*i - lambda) * 120)
        mouth.push(circle)
        circle.startX = circle.x
        circle.startY = circle.y
        circle.random = Math.random() + 0.3
    }
    return mouth
}

export function createEye(r, x, y){
    let circles = new Array()
    for(let i = 0;i<4;i++){
        let circle = createCircle(r, x, y)
        circle.startAlpha = 0.5
        circle.alpha = circle.startAlpha
        circle.random = Math.random()
        circles.push(circle)
        allCircles.push(circle)
    }
    return circles
}
