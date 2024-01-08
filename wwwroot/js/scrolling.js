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


const targetDiv = document.querySelector(".text_about_us_container");
const options = {
    root: null, // Observe the viewport
    threshold: 0.5 // Trigger when 50% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Element is in viewport, fire your function here
            incrementYear();
            incremenyClients();
            observer.disconnect(); // Disconnect if needed (one-time trigger)
        }
    });
}, options);

observer.observe(targetDiv);
const incrementDiv = document.querySelector('.counter_about_us');
// get number value 
const maxValue = incrementDiv.textContent | 1;
const delay = 100;
let number = 0;
async function incrementYear() {
    while (number <= maxValue) {
        let myPromise = new Promise(function (resolve) {
            setTimeout(function () { resolve("<br>" + number); }, delay);
        });
        incrementDiv.innerHTML = await myPromise;
        number++;
    }
}