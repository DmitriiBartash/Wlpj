//const Tags =
//{
//    "tags": [
//        {
//            "versions": [
//                "Перелёт",
//                "Flight",
//                "Zbor"
//            ]
//        },
//        {
//            "versions": [
//                "Трансфер",
//                "Transfer",
//                "Transfer"
//            ]
//        },
//        {
//            "versions": [
//                "Проживание",
//                "Residence",
//                "Cazare"
//            ]
//        },
//        {
//            "versions": [
//                "Питание согласно концепции отеля",
//                "Meals according to the hotel concept",
//                "Mese conform conceptului hotelului"
//            ]
//        },
//        {
//            "versions": [
//                "Медицинская страховка",
//                "Medical insurance",
//                "Asigurare medicala"
//            ]
//        }
//    ]
//}
//let finalTagString = "";
//let countryNames = "";

//function processTags() {

//    if (finalTagString != "")
//        finalTagString = "";
//    // get number of these items
//    let counter = 0;
//    for (let i = 0; i < 5; i++) {
//        if (document.getElementById(`tag${i + 1}`).checked) {
//            counter++;
//        }
//    }

//    // get only those that have been marked
//    let found = 0;
//    for (let i = 0; i < 5; i++) {
//        if (document.getElementById(`tag${i + 1}`).checked) {
//            found++;
//            let delim = (found != counter) ? "|" : "";
//            finalTagString += Tags["tags"][i]["versions"][0] + "," + Tags["tags"][i]["versions"][1] + "," + Tags["tags"][i]["versions"][2] + delim;
//        }
//    }
//}

//function addCountry() {
//    // validate();

//    for (let i = 0; i < 3; i++) {
//        let delim = (i != 2) ? "|" : "";
//        countryNames += document.querySelectorAll("#names > input")[i].value + delim;
//    }
//}

// send data with AJAX


function sendCountryData() {

    //processTags();
    //addCountry();

    const formData = new FormData();

    // Add the files to the FormData object.
    console.log(files.length);
    for (const file of files) {
        formData.append("FormFiles", file);
    }
    // Add the other form data to the FormData object.
    formData.append("CountryName", countryNames);
    formData.append("Tags", finalTagString);

    // Iterate over the FormData object and print the values.
    for (const [key, value] of formData) {
        console.log(`${key}: ${value}`);
    }

    $(document).ready(function () {
        $.ajax({
            url: '/Admin/CountryAdd',
            type: 'PUT',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                // $('#swiper-container').html(result);
                console.log("success");
            }
        });
    });
}