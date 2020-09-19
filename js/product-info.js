var product = {};
var prodrelatedProduct = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];
        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6 contenedor">
            <div class="d-block mb-4 h-100">
            <a href="${imageSrc}" target="_blank"><img class="img-fluid img-thumbnail imagen" src="${imageSrc}" alt=""></a>
            </div>
        </div>
        `
        document.getElementById("productImagGallery").innerHTML = htmlContentToAppend;
    }
}

function showRelatedProduct(array) {

    let htmlContentToAppend = "";

    for (let i = 1; i < array.length; i = i + 2) {
        let prodrel = array[i];

        htmlContentToAppend += `
        <span class="container">
        <div class="col-lg-3 col-md-4 col-6">
           <h3 class="mb-1">${prodrel.name}</h3>
              <div class="d-block mb-4 h-100">
                 <img class="img-fluid img-thumbnail imagen" src="${prodrel.imgSrc}" alt="${prodrel.description}">
              </div>
              <p class="mb-1">${prodrel.description}</p>
        </div>
        </span>
    `
        document.getElementById("relatedprod").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");

            let productPriceHTML = document.getElementById("productPrice")
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategHTML = document.getElementById("productCateg");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;

            productCategHTML.innerHTML = product.category;
            productPriceHTML.innerHTML = product.cost + ' ' + product.currency;

            showImagesGallery(product.images);

        }
    });
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {

            prodrelatedProduct = resultObj.data
            showRelatedProduct(prodrelatedProduct);
        }
    });

});