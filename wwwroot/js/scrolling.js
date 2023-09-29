const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const normalize = (val, max, min) => (val - min) / (max - min);

let element = document.querySelector("#myVideo");

let opacityInc = 1;
let oldScrollValue = 0;
let scrollingDown = false;

window.addEventListener("scroll", async () => {
    scrollingDown = (oldScrollValue < window.scrollY) ? true : false;
    let procentage = clamp(window.scrollY * 0.005, 0, 10);
    if (procentage <= 2) {
        opacityInc = 1;
    }
    if (procentage >= 5) {
        if (scrollingDown && opacityInc > -0.1) {
            opacityInc -= 0.01;
        }
        else if (!scrollingDown && opacityInc < 1.1) {
            opacityInc += 0.01;
        }
        if (clamp(window.scrollY * 0.005, 0, 10) >= 11) {
            opacityInc = 0;
        }
    }

    else {
        if (opacityInc < 1)
            opacityInc += 0.01;
        element.style.filter = `blur(${procentage}px)`;
    }
    element.style.opacity = opacityInc;
    oldScrollValue = window.scrollY;
});


