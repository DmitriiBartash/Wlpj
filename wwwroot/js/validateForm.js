const form = document.querySelector('#phoneForm');
const inputName = document.querySelectorAll('.inputbox1')[0];
const inputPhone = document.querySelectorAll('.inputbox1')[1];
const inputInformation = document.querySelector('.inputInformation');


form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    if (validateInput()) {
        inputInformation.innerHTML = "<p class='inputInformation_success fa fa-check'>" + validationModelJson.text.accepted[selectedLanguage] + "</p>";

        let callDataJSON = {
            "NameSurname": inputName.value,
            "PhoneNumber": inputPhone.value
        }

        $.ajax({
            url: '/Home/AddUserDetails',
            type: 'POST',
            data: JSON.stringify(callDataJSON),
            contentType: 'application/json',
            //success: function (result) {
            //    console.log("suzce");
            //}
        });
    }
});

function validateInput() {
    let isOkay = true;
    let message = "";

    // IF NAME IS EMPTY
    if (inputName.value.length == 0) {
        isOkay = false;
        message += "<p class='inputInformation_error fa fa-times-circle'>" + validationModelJson.text.errors.name[selectedLanguage] + "</p>";
    }
    // validate word count
    // name and family name cant be less or greater than 2
    else {
        let completeData = wordValidationData(inputName.value);
        let wordNumber = completeData.wordCounter;
        let fixedString = completeData.result;
        //console.log(completeData);
        if (wordNumber != 2) {
            isOkay = false;
            message += "<p class='inputInformation_error fa fa-times-circle'>" + validationModelJson.text.errors.name_format[selectedLanguage] + "</p>";
        }
    }

    // IF PHONE IS EMPTY
    if (inputPhone.value.length == 0) {
        message += "<p class='inputInformation_error fa fa-times-circle'>" + validationModelJson.text.errors.phone[selectedLanguage] + "</p>";
        isOkay = false;
    }
    // validate phone number
    // phone number cant be less than 6 and greater than 15
    else {
        let digitsNumber = countDigits(inputPhone.value);
        if (digitsNumber < 6) {
            isOkay = false;
            message += "<p class='inputInformation_error fa fa-times-circle'>" + validationModelJson.text.errors.few_digits[selectedLanguage] + "</p>";
        }
        if (digitsNumber >= 15) {
            isOkay = false;
            message += "<p class='inputInformation_error fa fa-times-circle'>" + validationModelJson.text.errors.many_digits[selectedLanguage] + "</p>";
        }
    }

    inputInformation.innerHTML = message;
    return isOkay;
}

function wordValidationData(string) {
    // remove white spaces from left and right sides
    // TRIM DOESNT WORK INSIDE!
    let trimmedString = string.trim();
    let splitBySpace = trimmedString.split(" ");

    let wordCounter = 0;
    let result = "";

    // calculate amount of words
    for (let word of splitBySpace) {
        if (word != '')
            wordCounter++;
    }

    // if there are only 2 items in it
    // EX:word1,word2
    if (splitBySpace.length == 2) {
        result = splitBySpace[0] + " " + splitBySpace[1];
    }
    else {
        for (let i = 0; i < splitBySpace.length; i++) {
            if (splitBySpace[i] != '' && i < splitBySpace.length - 1) {
                result += splitBySpace[i] + " ";
            }
            else { result += splitBySpace[i]; }
        }
    }
    return { wordCounter, result };
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

// mini animation
inputName.addEventListener("input", function () {
    ControlInputStyles(this);
    // IT'S FOR RESTRICTING USER TO ENTER FORBIDDEN CHARACTERS
    let inputSymbol = this.value.charAt(this.value.length - 1);
    // to test the reg expression insert pattern's content into
    // https://regexr.com
    // '-', ' ', english, russian, romanian
    const pattern = /[- a-zA-Z\u0410-\u04FF\u00e2\u00c2\u00ee\u00ce\u0103\u0102\u021b\u021a\u0219\u0218]/;

    let isValid = pattern.test(inputSymbol);
    if (!isValid) {
        this.value = this.value.slice(0, -1);
        //console.log(this.value);
    }
    //console.log(inputSymbol, pattern.test(inputSymbol));
});

inputPhone.addEventListener("input", function () {
    ControlInputStyles(this);
});

function ControlInputStyles(element) {
    if (element.value.length > 0) {
        element.nextElementSibling.classList.add("notEmptyForm");
    } else {
        element.nextElementSibling.classList.remove("notEmptyForm");
    }
}