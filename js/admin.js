const btn = document.querySelector("#btn");
const btnText = document.querySelector("#btnText");

const mainImg = document.querySelector(".main-photo img");

btn.onclick = () => {
    btnText.innerHTML = "Сохранено";
    btn.classList.add("active");
};


function changeMainPhoto(element) {
    mainImg.src = element.src;
    console.log(mainImg);
}