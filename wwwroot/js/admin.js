let btnLeft = document.querySelector(".arrow left");
let btnRight = document.querySelector(".arrow right");
let allImgs;
let currentImg;
let currentPos = 0;
function changeMainPhoto(element) {
    const mainImg = document.querySelector(".main-photo img");
    currentImg = mainImg;
    currentPos = mainImg.src = element.src;
}

function goBack() {
    allImgs = document.querySelectorAll(".imgEntity");
    console.log("-1");

}
function goNext() {
    allImgs = document.querySelectorAll(".imgEntity");
    console.log("+1");

}

function deleteImage(element) {
    let _id = element.parentNode.children[1].textContent;
    let Cid = document.querySelector('#countrySelectedID').textContent;
    let picture = element.src;

    let dataJSON = {
        "pictureID": _id,
        "countryID": Cid,
        "picturePath": picture
    };

    $.ajax({
        url: '/Admin/DeleteImage',
        type: 'POST',
        data: JSON.stringify(dataJSON),
        contentType: 'application/json',
        success: function (result) {
            $('.photos-container').html(result);
        }
    });
}

function deleteCountry(eleemnt) {

    let Cid = document.querySelector('#countrySelectedID').textContent;

    $.ajax({
        url: '/Admin/DeleteCountry',
        type: 'POST',
        data: JSON.stringify(Cid),
        contentType: 'application/json',
        success: function (result) {
            if (result == 'Error') {
                // it's error
                alert("Ошибка при удалении!");
            }
            else {
                $('#CountryImages').html(result);
                hookAccordion();
            }

            $.ajax({
                url: '/Admin/ListCountries',
                type: 'POST',
                data: JSON.stringify("dd"),
                contentType: 'application/json',
                success: function (result2) {
                    $('#CountryData').html(result2);
                    hookAccordion();
                }
            });

            $.ajax({
                url: '/Admin/LoadTags',
                type: 'POST',
                data: JSON.stringify(Cid),
                contentType: 'application/json',
                success: function (result) {
                    $('#TagsNPrices').html(result);
                }
            });

        }
    });
}