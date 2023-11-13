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

// reveal();
// window.addEventListener('scroll', reveal);

// function reveal() {
//     var reveals = document.querySelectorAll('.reveal');

//     for (var i = 0; i < reveals.length; i++) {

//         var windowheight = window.innerHeight;
//         var revealtop = reveals[i].getBoundingClientRect().top;
//         var revealpoint = 150;

//         if(revealtop < windowheight - revealpoint){
//             reveals[i].classList.add('active');
//         }
//         else{
//             reveals[i].classList.remove('active');
//         }

//     }
// }

