
function changeMainPhoto(element) {

    const btn = document.querySelector("#btn");
    const btnText = document.querySelector("#btnText");

    const mainImg = document.querySelector(".main-photo img");

    console.log(mainImg);

    //btn.onclick = () => {
    //    btnText.innerHTML = "Сохранено";
    //    btn.classList.add("active");
    //};
    mainImg.src = element.src;
}