function SelectCountry(element) {
    let desiredId;
    desiredId = (element.getAttribute("id") == "selectedCountry") ? element.textContent : element.getAttribute("id");

    let dataJSON = {
        "countryID": desiredId,
        "selectedLanguage": selectedLanguage
    }
    console.log(dataJSON);

    $.ajax({
        url: '/Home/LoadSwiper',
        type: 'POST',
        data: JSON.stringify(dataJSON),
        contentType: 'application/json',
        success: function (result) {
            $('.hot-deals-container').html(result);
            //changeImgOnClick();
            hookSlicks();
        }
    });
}