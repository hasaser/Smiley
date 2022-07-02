import {Application} from 'pixi.js';
import {createCircle, createMouth, createEye} from "./creator.js";
import {mouthLoop, eyeLoop, NowGen} from "./loop.js";
import $ from "jquery";
import { toggleAlpha } from './alpha.js';
export const app = new Application();
document.body.appendChild(app.view)
export let allCircles = new Array(),
           stop = true;
let frameCircles = new Array();

export const FRAMECIRCLENUM = 80,
      LOOPLAMBDA = Math.PI/720,
      LOOPDİSTANCESMALL = 25,
      loopLambdaSmall = Math.PI/720,
      MOUTHCIRCLENUM = 12,
      nowGen = NowGen(),
      nowGen20 = NowGen(20),
      nowGen75 = NowGen(1/75);

let loopDistanceSmall, loopLambda;

for (let i = 0; i < FRAMECIRCLENUM; i++) {
    let circle = createCircle(14, 300 + Math.sin(i)*250, 300 + Math.cos(i)*250);
    circle.random = Math.random();
    frameCircles.push(circle)
}

const leftEye = createEye(16, 200, 200);
const rightEye = createEye(16, 400, 200);
let mouth = createMouth(MOUTHCIRCLENUM, 12)
app.ticker.add((delta) => gameloop(delta))
export let now = nowGen.next().value,
           now20 = nowGen20.next().value,
           now75 = nowGen75.next().value;

function gameloop(){
    now = nowGen.next().value;
    now20 = nowGen20.next().value;
    now75 = nowGen75.next().value;
    eyeLoop(rightEye, 400, 200)
    eyeLoop(leftEye, 200, 200)
    mouthLoop(mouth, 10)
    loopDistanceSmall = LOOPDİSTANCESMALL * Math.sin(now75)
    loopLambda = LOOPLAMBDA
    for (let i = 0; i < frameCircles.length; i++) {
        const circle = frameCircles[i];
        if(i%3==0 || i%3==1){
            circle.x = 300 + Math.sin(i + now20) * (250 + circle.random * loopDistanceSmall * Math.sin(i + now20))
            circle.y = 300 + Math.cos(i + now20) * (250 + circle.random * loopDistanceSmall * Math.sin(i + now20))
        }
        else{
            circle.x = 300 + Math.sin(i + now20 * 2)* (250 + circle.random * loopDistanceSmall * Math.sin(i + now20))
            circle.y = 300 + Math.cos(i + now20 * 2)* (250 + circle.random * loopDistanceSmall * Math.sin(i + now20))
        }
    }
    toggleAlpha()
}

$(app.view).on("click", () => {stop = stop ? false : true})