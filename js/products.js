const ORDER_ASC_BY_PRICE = "AZ";
const ORDER_DESC_BY_PRICE = "ZA";
const ORDER_BY_PROD_SOLDCOUNT = "Cant.";
var currentProductArray = [];
var currentsortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;

function sortProduct(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function(a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function(a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SOLDCOUNT) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductList(products) {

    let htmlContentToAppend = "";
    for (let i = 0; i < products.length; i++) {
        let product = products[i];

        htmlContentToAppend += `
        <a href="category-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + product.name + `</h4>
                        <small class="text-muted">` + product.soldCount + ` artículos</small>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-1">Precio: ` + product.cost + `<span> ` + product.currency + `</span></p>
                        
                    </div>
                    <p class="mb-1">` + product.description + `</p>
                </div>
            </div>
        </a>
        `
    }
    if (htmlContentToAppend !== "") {
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productArray) {
    currentsortCriteria = sortCriteria;

    if (productArray != undefined) {
        currentProductArray = productArray;
    }

    currentProductArray = sortProduct(currentsortCriteria, currentProductArray);
    showProductList(currentProductArray);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function() {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT, resultObj.data);
        }
    });

    document.getElementById("sortAscProd").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDescProd").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCountProd").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;


        getJSONData(PRODUCTS_URL).then(function(resultObj) {
            if (resultObj.status === "ok") {
                sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT, resultObj.data);
            }
        });
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        minPrice = document.getElementById("rangeFilterCountMin").value;
        maxPrice = document.getElementById("rangeFilterCountMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        } else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        } else {
            maxPrice = undefined;
        }

        let filteredProducts = currentProductArray.filter(product => product.cost >= minPrice && product.cost <= maxPrice);
        showProductList(filteredProducts);
    });
});