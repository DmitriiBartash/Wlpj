let isPopupOpen = false;
let popUpWindow = document.querySelector(".popup");
popUpWindow.style.display = 'none';
if (isPopupOpen) {

}
function openPopUp() {
    popUpWindow.style.display = 'flex';
}

function submit() {
    console.log("submit")
    popUpWindow.style.display = 'none';
}
function reject() {
    console.log("reject")
    popUpWindow.style.display = 'none';
}