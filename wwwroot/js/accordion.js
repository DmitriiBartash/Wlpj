let countrySelected;

hookAccordion();

function hookAccordion() {
    let ctas = document.querySelectorAll('.cta');

    for (const element of ctas) {
        element.addEventListener("click", function () {

            $.ajax({
                url: '/Admin47/LoadTags',
                type: 'POST',
                data: JSON.stringify(this.children[0].id),
                contentType: 'application/json',
                success: function (result) {
                    $('#TagsNPrices').html(result);
                }
            });

            $.ajax({
                url: '/Admin47/LoadImages',
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