let isPopupOpen = false;
let popUpWindow = document.querySelector(".popup");
let EditTxt = 'Измените страну';
let popUpText = popUpWindow.children[0].children[0];

popUpWindow.style.display = 'none';

let nameId = 0;

function openPopUp(element) {
    if (element.textContent == "Редактировать") {
        popUpText.textContent = "Изменить страну";

        id = document.querySelector("#countrySelectedID").textContent;
        nameId = id;
        //let countriesWrapper = element.parentNode.parentNode;
        //let targetId = countriesWrapper.children[0].children[0].id;


        $.ajax({
            url: '/Admin/LoadPopUp',
            type: 'POST',
            data: JSON.stringify(id),
            contentType: 'application/json',
            success: function (result) {
                $('.popup').html(result);
            }
        });

    }
    else {
        popUpText.textContent = "Добавить страну";
    }
    popUpWindow.style.display = 'flex';
}

function submit() {
    console.log("submit")

    let isValid = customCountryValidation();
    if (isValid) {
        console.log("valid");

        console.log(assembleData());

        $.ajax({
            url: '/Admin/SubmitPoster',
            type: 'POST',
            data: JSON.stringify(assembleData()),
            contentType: 'application/json',
            success: function (result) {
                console.log("submitted initiated")
                $('#TagsNPrices').html(result);
                console.log("submitted completed")
                hookAccordion();
            }
        });
        popUpWindow.style.display = 'none';
    }
    else {
        console.log("invalid");
    }
}
function reject() {
    console.log("reject")
    popUpWindow.style.display = 'none';
}




function customCountryValidation() {
    let isValid = true;

    // validate names
    let namesDivs = document.querySelectorAll('.validationDiv');
    for (let item of namesDivs) {
        if (item.children[0].value == '' || item.children[0].value == null) {
            item.children[1].textContent = "Ошибка!";
            isValid = false;
        }
        else {
            item.children[1].textContent = '';
        }
    }

    // validate prices
    let pricesDivs = document.querySelectorAll('.price-input');
    for (let item of pricesDivs) {
        if (item.children[0] == '' || item.children[0].value == null || item.children[0].value == 0) {
            item.children[1].textContent = "Ошибка!";
            isValid = false;
        }
        else {
            item.children[1].textContent = '';
        }
    }

    // validate tags
    let tagsDivs = document.querySelectorAll('.form__group');
    let markedTagsDivs = 0;
    for (let item of tagsDivs) {
        if (item.children[0].checked) {
            markedTagsDivs++;
        }
    }
    let tagsErr = document.querySelector('#tagsErr');
    if (markedTagsDivs == 0) {
        isValid = false;
        tagsErr.textContent = "Ошибка!";
    }
    else {
        tagsErr.textContent = "";
    }

    return isValid;

}

function assembleData() {
    //let countryId = document.querySelector("#countrySelected");
    let countryId = nameId;
    let namesDivs = document.querySelectorAll('.validationDiv');
    let tagsDivs = document.querySelectorAll('.form__group');
    let pricesDivs = document.querySelectorAll('.price-input');

    // get names
    let names = "";
    for (let item of namesDivs) {
        names += item.children[0].value + "|";
    }
    names = names.substring(0, names.length - 1);

    // get tags
    let tags = [];
    for (let item of tagsDivs) {
        tags.push(item.children[0].checked);
    }

    // get prices
    let priceUsd = pricesDivs[0].children[0].value;
    let priceEuro = pricesDivs[1].children[0].value;

    return {
        "Id": countryId,
        "Name": names,
        "ifTagsPresent": tags,
        "PriceUsd": priceUsd,
        "PriceEuro": priceEuro
    };
}