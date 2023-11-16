let countrySelected;
let ctas = document.querySelectorAll('.cta');


hookAccordion();

function hookAccordion() {
    for (let i = 0; i < ctas.length; i++) {
        ctas[i].addEventListener("click", function () {

            $.ajax({
                url: '/Admin/LoadTags',
                type: 'POST',
                data: JSON.stringify(this.children[0].id),
                contentType: 'application/json',
                success: function (result) {
                    $('#TagsNPrices').html(result);
                }
            });

            $.ajax({
                url: '/Admin/LoadImages',
                type: 'POST',
                data: JSON.stringify(this.children[0].id),
                contentType: 'application/json',
                success: function (result) {
                    $('#CountryImages').html(result);
                }
            });

        });
    }
}



            // remove all other active elements first
            //for (const element of accordions) {
            //    if (element.classList.contains("active")) {

            //        if (countrySelected == this) {
            //            element.classList.toggle("active");
            //        }
            //        else {
            //            element.classList.toggle("active");
            //            let panelTemp = element.nextElementSibling;
            //            if (panelTemp.style.maxHeight) {
            //                panelTemp.style.maxHeight = null;
            //            }
            //        }
            //    }
            //}
            //countrySelected = this;

            //// assign active element
            //this.classList.toggle("active");

            //let panel = this.nextElementSibling;
            //if (panel.style.maxHeight) {
            //    panel.style.maxHeight = null;
            //} else {
            //    panel.style.maxHeight = panel.scrollHeight + "px";
            //}