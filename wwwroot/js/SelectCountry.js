function SelectCountry(element) {

    let desiredId;
    desiredId = (element.getAttribute("id") == "selectedCountry") ? element.textContent : element.getAttribute("id");

    let dataJSON = {
        "countryID": desiredId,
        "selectedLanguage": selectedLanguage
    }

    $.ajax({
        url: '/Home/LoadSwiper',
        type: 'POST',
        data: JSON.stringify(dataJSON),
        contentType: 'application/json',
        success: function (result) {
            console.log("success");
            $('#swiper-container').html(result);
        }
    });
}