function SelectCountry(element) {
    let desiredId;
    let copyID = Number(element);

    // for debug purposesy
    //console.log(element);
    //console.log(element.getAttribute("data-slick-index"));
    //console.log(currentSecondSlideNumber);
    //currentSecondSlideNumber = parseInt(element.getAttribute("data-slick-index"));
    //console.log(currentSecondSlideNumber);
    //updateSecondSwiper();

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
        url: '/Home/LoadSecondSwiper',
        type: 'POST',
        data: JSON.stringify(dataJSON),
        contentType: 'application/json',
        success: function (result) {
            $('#firstSwiperHolder').html(result);
            hookSlicks();
        }
    });
}