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


let phonebtn = document.querySelector(".popup-socials-btn-call")
// console.log(phonebtn.children)

let isContactsClicked = false
phonebtn.innerHTML = '<span class="material-symbols-outlined phone-btn">phone_in_talk</span>'

phonebtn.addEventListener("click", function () {
    if (isContactsClicked == true) {
        phonebtn.innerHTML = '<span class="material-symbols-outlined phone-btn">phone_in_talk</span>'
    }
    else {
        phonebtn.innerHTML = '<span class="material-symbols-outlined close-btn">close</span>'
    }
    isContactsClicked = !isContactsClicked
})

let popupmenu = document.querySelector(".popup-menu")

phonebtn.addEventListener("click", function () {
    popupmenu.classList.toggle("popup-menu-show")
})

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