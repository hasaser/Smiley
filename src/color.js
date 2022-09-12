const HSLToRGB = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  };

function correctRGB(rgb){
    let res = new Array()
    rgb.forEach(color => {
        color = Math.floor(color);
        if(color == 0){
            res.push("00")
        }
        else{
            res.push(color.toString(16))
        }
    });
    return res
}

export function getColor(circle){
    let rgb = HSLToRGB(circle.hsl, 100, 50)
    return "0x" + correctRGB(rgb).join("")
}