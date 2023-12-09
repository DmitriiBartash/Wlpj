
function asyncGet() {
    // Click the hidden file input.
    const clickElement = document.getElementById('hidden-file-input');
    clickElement.click();

    const id = document.querySelector('#countrySelectedID').textContent;

    clickElement.addEventListener('input', function () {
        const files = clickElement.files;

        const formData = new FormData();
        for (const file of files) {
            formData.append("FormFiles", file);
        }

        formData.append("Id", id);

        $(document).ready(function () {
            $.ajax({
                url: '/Admin/LoadImages',
                type: 'PUT',
                data: formData,
                processData: false,
                contentType: false,
                success: function (result) {
                    $('.photos-container').html(result);
                    console.log("successfully loaded images");
                }
            });
        });
    });
}
