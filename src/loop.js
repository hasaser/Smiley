import {MOUTHCIRCLENUM, now, stop } from ".";
import { getColor } from "./color";

export function mouthLoop(circles, range){
    const tetaY = Math.PI / 360;
    const tetaX = Math.PI / 1800;
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        circle.x = circle.startX + range * Math.sin(now) * circle.random * Math.sign(MOUTHCIRCLENUM/2 - i)
        circle.y = circle.startY + range * Math.sin(now * 2) * circle.random * (i%2 + 1)
    }
}

export function eyeLoop(circles, x, y){
    const tetaX = Math.PI / 360,
          tetaY = Math.PI / 180;
    const permutation = [[1, -1], [-1, 1], [1, 1], [-1, -1]];
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        const muls = permutation[i];
        circle.x = x + 12 * Math.sin(now) * muls[0] + Math.cos(Date.now() * tetaX) * 5 * circle.random;
        circle.y = y + 12 * Math.sin(now) * muls[1] + Math.cos(Date.now() * tetaY) * 5 * circle.random;
    }
}

export function* NowGen(divider=1){
    const aDegree = Math.PI / 36 /divider;
    let i = 0;
    while (true) {
        if(stop && i % 36 == 0){
            yield i * aDegree;
        }
        else{
            i++;
            yield i * aDegree;
        }
    }
}

export function colorLoop(circles){
    circles.forEach(circle => {
        // if(circle.hsl <= 1 || circle.hsl >= 359) {circle.colorDirection *= -1}
        circle.hsl+=0.05;
        circle.tint = getColor(circle)
    });
}

