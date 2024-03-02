let isPopupOpen = false;
let nameId = 0;
let EditTxt = 'Измените страну';

// divs
let popUpWindow = "";
let popupTXT = "";
let namesDivs = "";
let tagsDivs = "";
let priceDiv = "";
let currencyDiv = "";
let tagsErr = "";
let idDiv = "";
fillDivs(true);

function openPopUp(element) {
    if (element.textContent == "Редактировать страну") {
        nameId = document.querySelector("#countrySelectedID").textContent;
        $.ajax({
            url: '/Admin/LoadPopUp',
            type: 'POST',
            data: JSON.stringify(nameId),
            contentType: 'application/json',
            success: function (result) {
                $('.popup').html(result);
                document.querySelector("#popUPName").textContent = "Изменить страну";
                document.querySelector("#currency").value = document.getElementById("modelCurrency").value;
                document.querySelector('.price-input').children[0].addEventListener("input", processInput);
                document.querySelector('.price-input').children[0].addEventListener("paste", processPaste);
            }
        });
        hookAccordion();
    }
    else {
        fillDivs(false);
        cleanDivs();
        popupTXT.textContent = "Добавить страну";
        document.querySelector('.price-input').children[0].addEventListener("input", processInput);
        document.querySelector('.price-input').children[0].addEventListener("paste", processPaste);
    }
    popUpWindow.style.display = 'flex';
}

function submit() {
    let isValid = customCountryValidation();
    if (isValid) {
        if (popupTXT.textContent == "Добавить страну") {
            console.log("addCount");
            $.ajax({
                url: '/Admin/CountryAdd',
                type: 'POST',
                data: JSON.stringify(assembleData()),
                contentType: 'application/json',
                success: function (result) {
                    if (typeof result === 'object') {
                        // it's error
                        alert("Ошибка при добавлении страны!");
                    }
                    else {
                        // add country and update UI
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

                        console.log("Submit");
                        let cId = document.querySelector('#countrySelectedID').textContent | 0;
                        $.ajax({
                            url: '/Admin/LoadImages',
                            type: 'POST',
                            data: JSON.stringify(cId),
                            contentType: 'application/json',
                            success: function (result3) {
                                $('#CountryImages').html(result3);
                            }
                        });
                        popUpWindow.style.display = 'none';
                    }
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
                    if (typeof result === 'object') {
                        // it's error
                        alert("Ошибка при добавлении/редактировании!");
                    }
                    else {
                        // IMPORTANT !! ADD LOGIC HERE AS WELL
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
                        popUpWindow.style.display = 'none';
                    }
                }
            });
        }
    }
    else {
        alert("invalid");
    }
}
function reject() {
    popUpWindow.style.display = 'none';
    fillDivs(false);
    // CLEAN THE FIELDS
    // clean names
    for (let item of namesDivs) {
        item.children[0].value = '';
        item.children[1].textContent = '';
    }

    // clean prices
    priceDiv.children[0].value = '';
    priceDiv.parentElement.children[2].textContent = '';

    // clean currency
    currencyDiv.value = "MDL";

    // clean tags
    for (let item of tagsDivs) {
        item.children[0].checked = false;
    }
    tagsErr.textContent = '';
}
function customCountryValidation() {
    let isValid = true;
    fillDivs(false);

    // validate names
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
    if (priceDiv.children[0] == '' ||
        priceDiv.children[0].value == null ||
        priceDiv.children[0].value == 0 ||
        priceDiv.children[0].value < 10) {
        priceDiv.parentElement.children[2].textContent = "Ошибка!";
        isValid = false;
    }
    else {
        priceDiv.parentElement.children[2].textContent = '';
    }

    // validate tags
    let markedTagsDivs = 0;
    for (let item of tagsDivs) {
        if (item.children[0].checked) {
            markedTagsDivs++;
        }
    }
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

    // get price
    let priceUsd = priceDiv.children[0].value;
    // get currency
    let currency = currencyDiv.value;

    return {
        "Id": nameId,
        "Name": names,
        "ifTagsPresent": tags,
        "Price": priceUsd,
        "Currency": currency
    };
}

function fillDivs(isFirstTime) {
    popUpWindow = document.querySelector(".popup");
    popupTXT = document.querySelector("#popUPName");
    namesDivs = document.querySelectorAll('.validationDiv');
    tagsDivs = document.querySelectorAll('.form__group');
    priceDiv = document.querySelector('.price-input');
    currencyDiv = document.querySelector('#currency');
    tagsErr = document.querySelector('#tagsErr');
    idDiv = document.querySelector("#countrySelectedID");
    if (isFirstTime) {
        popUpWindow.style.display = 'none';
    }
}

function cleanDivs() {
    for (let item of namesDivs) {
        item.children[0].value = "";
    }
    for (let item of tagsDivs) {
        item.children[0].checked = false;
    }
    priceDiv.children[0].value = "";
    currencyDiv.value = "MDL";
}


function processPaste(event) {
    // Prevent default paste behavior
    event.preventDefault();

    let inputElement = event.target;

    // Access the clipboard data
    const clipboardData = event.clipboardData || window.clipboardData;

    // Get the pasted text
    const pastedText = clipboardData.getData("text/plain");

    let isOkay = /^\d+$/.test(pastedText);
    if (isOkay && pastedText.length <= 5) {
        inputElement.value = pastedText;
    }
}
function processInput(event) {
    // Get the input element that triggered the event
    let inputElement = event.target;

    let lastCharacter = inputElement.value.charAt(inputElement.value.length - 1);
    let isDigit = /\d/.test(lastCharacter);

    if (!isDigit) {
        // Remove the last character
        inputElement.value = inputElement.value.slice(0, -1);
    }
}