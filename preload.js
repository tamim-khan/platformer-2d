let loadingImagesCount = 0;

function loadImage(filename) {
    let image = new Image();

    image.addEventListener("load", function() {
        loadingImagesCount -= 1;
    });    

    image.src = filename;
    loadingImagesCount += 1;

    return image;
}

function areAllAssetsLoaded() {
    return loadingImagesCount == 0;
}
