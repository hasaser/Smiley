import { allCircles, stop} from "./index.js";

export function toggleAlpha(){
    const steps = 30;
    allCircles.forEach(circle => {
        const step = (1 - circle.startAlpha)/steps;
        if(stop && circle.alpha <= 1){
            circle.alpha += step;
        }
        else if(!stop && circle.alpha > circle.startAlpha){
            circle.alpha -= step;
        }
    });
}