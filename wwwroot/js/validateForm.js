const form = document.querySelector('#phoneForm');
const inputName = document.querySelectorAll('.inputbox1')[0];
const inputPhone = document.querySelectorAll('.inputbox1')[1];
const inputInformation = document.querySelector('.inputInformation');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    if (validateInput()) {
        inputInformation.textContent = "Принято!";
    }
});

function validateInput() {
    let isOkay = true;
    let message = "";
    // validate word count
    // name and family name cant be less or greater than 2
    let wordNumber = wordCount(inputName.value);
    if (wordNumber != 2) {
        isOkay = false;
        message += "Должно быть только 2 слова в первом поле!";
    }

    // validate phone number
    // phone number cant be less than 6 and greater than
    let digitsNumber = countDigits(inputPhone.value);
    if (digitsNumber < 6) {
        isOkay = false;
        message += "Слишком мало цифр\n";
    }
    if (digitsNumber >= 15) {
        isOkay = false;
        message += "Слишком много цифр";
    }
    inputInformation.textContent = message;
    return isOkay;
}

function wordCount(string) {
    return string.split(/\s+/).length;
}

function countDigits(string) {
    let count = 0;
    for (let char of string) {
        if (/\d/.test(char)) {
            count++;
        }
    }
    return count;
}