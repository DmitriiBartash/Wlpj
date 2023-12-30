let isPopupOpen = false;
let popUpWindow = document.querySelector(".popup");
let EditTxt = 'Измените страну';

popUpWindow.style.display = 'none';

let nameId = 0;
let popupTXT = "";


function openPopUp(element) {
    popupTXT = document.querySelector("#popUPName");
    if (element.textContent == "Редактировать страну") {
        popupTXT.textContent = "Изменить страну";

        let id = document.querySelector("#countrySelectedID").textContent;
        nameId = id;

        $.ajax({
            url: '/Admin/LoadPopUp',
            type: 'POST',
            data: JSON.stringify(id),
            contentType: 'application/json',
            success: function (result) {
                $('.popup').html(result);
            }
        });
        hookAccordion();
    }
    else {
        popupTXT.textContent = "Добавить страну";
    }
    popUpWindow.style.display = 'flex';
}

function submit() {
    let isValid = customCountryValidation();
    if (isValid) {
        if (popupTXT.textContent == "Добавить страну") {
            $.ajax({
                url: '/Admin/CountryAdd',
                type: 'POST',
                data: JSON.stringify(assembleData()),
                contentType: 'application/json',
                success: function (result) {
                    $('#TagsNPrices').html(result);
                    hookAccordion();

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
                }
            });
        }
        else {
            $.ajax({
                url: '/Admin/SubmitPoster',
                type: 'POST',
                data: JSON.stringify(assembleData()),
                contentType: 'application/json',
                success: function (result) {
                    $('#TagsNPrices').html(result);
                    hookAccordion();

                    $.ajax({
                        url: '/Admin/ListCountries',
                        type: 'POST',
                        data: JSON.stringify("dd"),
                        contentType: 'application/json',
                        success: function (result3) {
                            $('#CountryData').html(result3);
                            hookAccordion();
                        }
                    });
                }
            });
        }
        popUpWindow.style.display = 'none';
    }
    else {
        console.log("invalid");
    }
}
function reject() {
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
        "Price": priceUsd,
        "Currency": priceEuro
    };
}