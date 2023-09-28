let i = -1;
let imgsContainer = document.getElementById("imagesToAdd");

let files = [];
let srcs = [];
let isClicked = false;

function asyncGet() {
    // create div block
    let newEl = document.createElement('div');
    newEl.className = 'stretched-button';

    let xButton = document.createElement('p');
    xButton.innerHTML = "X";
    xButton.addEventListener("click", function () {
        deleteElement(this);
    });
    newEl.appendChild(xButton);

    // create image block
    let imageElement = document.createElement('img');

    // Click the hidden file input.
    const clickElement = document.getElementById('hidden-file-input');
    clickElement.click();

    i++;
    let fileSelected = false;

    clickElement.addEventListener('input', function () {
        if (!fileSelected) {
            const file = clickElement.files[0];
            // files.push({ "filelocation": file, "src": "" });
            files.push(file);

            // console.log(files);

            // Create a new FileReader object and read the image file.
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);

            reader.onload = function () {
                // The image file has been read.
                const imageData = reader.result;

                imageElement.src = imageData;
                srcs.push(imageElement.src);

                // Wait for the image to load before inserting it into the DOM.
                imageElement.onload = function () {
                    newEl.appendChild(imageElement);
                    imgsContainer.insertBefore(newEl, imgsContainer.firstChild);
                };
            };
            fileSelected = true;
        }
    });
}

function deleteElement(element) {
    let mainDiv = element.closest(".stretched-button");
    let k = 0;
    files.forEach(file => {
        if (srcs == mainDiv.children[1].src) {
            files.splice(k, 1);
            srcs.splice(k, 1);
            i--;
        }
        k++;
    });
    mainDiv.remove();
}