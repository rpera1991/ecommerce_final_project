var comments = [];

function showComents() {

    let htmlContentToAppend = "";

    for (let i = 0; i < comments.length; i++) {
        let comment = comments[i];

        htmlContentToAppend += `
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + comment.user + `</h4>
                        <small class="text-muted">` + comment.score + ` Puntuacion</small>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-1">Fecha: ` + comment.dataTime `</p>
                    </div>
                    <p class="mb-1">` + comment.description + `</p>
                </div>
            </div>        
        `
        document.getElementById("comments").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            showComents(comments);
            // let productNameHTML = document.getElementById("productName");
            // let productDescriptionHTML = document.getElementById("productDescription");
            // let relatedProdHTML = document.getElementById("relatedprod");
            // let productPriceHTML = document.getElementById("productPrice")
            // let productSoldCountHTML = document.getElementById("productSoldCount");
            // let productCategHTML = document.getElementById("productCateg");

            // productNameHTML.innerHTML = product.name;
            // productDescriptionHTML.innerHTML = product.description;
            // productSoldCountHTML.innerHTML = product.soldCount;
            // relatedProdHTML.innerHTML = product.relatedProducts;
            // productCategHTML.innerHTML = product.category;
            // productPriceHTML.innerHTML = product.cost + ' ' + product.currency;

            //Muestro las imagenes en forma de galería
            // showImagesGallery(product.images);
        }
    });
});