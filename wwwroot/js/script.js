let icons = document.querySelector('.element-container');
let buttonFloating = document.querySelector('.pulseCircle');
let navLinks = document.querySelector('.nav-links');
let isButtonActive = true;
icons.style.display = "none";


let toggle_bar = document.querySelector(".nav-header-element");
let sidebar = document.querySelector(".sidebar");

toggle_bar.addEventListener("click", function () {
    if (toggle_bar.firstElementChild.classList.contains("fa-bars")) {
        toggle_bar.firstElementChild.classList.replace("fa-bars", "fa-times");
    }
    else {
        toggle_bar.firstElementChild.classList.replace("fa-times", "fa-bars");
    }
    sidebar.classList.toggle("sidebaractive")
})


/*Popup menu*/
let floatingContainer = document.querySelector(".floating-container");
let floatingButton = document.querySelector(".floating-button");

let isMenuOpen = false;

floatingButton.addEventListener('click', () => {
    if (!isMenuOpen) {
        floatingContainer.classList.add('floating-container-show');
        isMenuOpen = true;
    } else {
        floatingContainer.classList.remove('floating-container-show');
        isMenuOpen = false;
    }
});

buttonFloating.onclick = function () {
    isButtonActive = !isButtonActive;
    if (isButtonActive) {
        icons.style.display = "none";
    }
    else {
        icons.style.display = "block";
    }
};


for (const element of navLinks.children) {
    element.addEventListener('click', function (event) {
        document.querySelector('.fa.fa-times').click();
    });
}