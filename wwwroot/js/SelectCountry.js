function SelectCountry(element) {
    let desiredId;
    let copyID = Number(element);

    if (!Number.isInteger(copyID)) {
        desiredId = (element.getAttribute("name") == "selectedCountry") ? element.textContent : element.getAttribute("name");
    }
    else {
        desiredId = element;
    }

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
            $('.hot-deals-container').html(result);
            //changeImgOnClick();
            hookSlicks();
        }
    });
}