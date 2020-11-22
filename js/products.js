const ORDER_ASC_BY_PRICE = "Min$";
const ORDER_DESC_BY_PRICE = "Max$";
const ORDER_BY_PROD_SOLDCOUNT = "Sold";
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
        <a href="product-info.html" class="list-group-item list-group-item-action">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="col-3">
                    <img src="${ product.imgSrc}" alt="${ product.description} " class="img-thumbnail">
                    </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${ product.name }</h4>
                        <small class="text-muted">${ product.soldCount} artículos</small>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-1">Precio:${product.cost}<span> ${ product.currency}</span></p>
                    </div>
                    <p class="mb-1">${ product.description}</p>
                    </div>
                </div>
            </div>
        </div>    
        <div class="w-100"></div>
        </a>
        `
    }
    if (htmlContentToAppend !== "") {
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

function searchProducts(value, products) {

    if (value !== undefined && value !== null && value !== '') {
        let filtered = [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].name.toLowerCase().search(value.toLowerCase()) >= 0) {
                filtered.push(products[i]);
            }
        }
        return filtered;
    }
    return [];
}

function sortAndShowProducts(sortCriteria, productArray) {
    currentsortCriteria = sortCriteria;
    if (productArray != undefined) {
        currentProductArray = productArray;
    }
    currentProductArray = sortProduct(currentsortCriteria, currentProductArray);
    showProductList(currentProductArray);
}
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

    document.getElementById("clearRangeFilterprice").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMinprice").value = "";
        document.getElementById("rangeFilterCountMaxprice").value = "";
        minPrice = undefined;
        maxPrice = undefined;
        document.getElementById("rangeFilterCountMinprice").setAttribute("placeholder", "min.");
        document.getElementById("rangeFilterCountMaxprice").setAttribute("placeholder", "max.");
        getJSONData(PRODUCTS_URL).then(function(resultObj) {
            if (resultObj.status === "ok") {
                sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT, resultObj.data);
            }
        });
    });
    document.getElementById("rangeFilterCountprice").addEventListener("click", function() {
        minPrice = document.getElementById("rangeFilterCountMinprice").value;
        maxPrice = document.getElementById("rangeFilterCountMaxprice").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        } else {
            minPrice = undefined;
            document.getElementById("rangeFilterCountMinprice").setAttribute("placeholder", "ingrese precio");
        }
        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        } else {
            maxPrice = undefined;
            document.getElementById("rangeFilterCountMaxprice").setAttribute("placeholder", "ingrese precio");
        }
        if (parseInt(minPrice) > parseInt(maxPrice)) {
            alert("Minimo no debe ser mayor que Maximo");
        }

        let filteredProducts = currentProductArray.filter(product => product.cost >= minPrice && product.cost <= maxPrice);

        if (filteredProducts.length == 0) {
            alert("No existe articulo en ese rango de precio");
        } else {
            showProductList(filteredProducts)
        };
    });
    document.getElementById('searchbar').addEventListener('keyup', (e) => {
        let criteria = e.target.value;
        let filteredProducts = searchProducts(criteria, currentProductArray);
        if (filteredProducts.length > 0) {
            showProductList(filteredProducts);
        } else {
            getJSONData(PRODUCTS_URL).then(function(resultObj) {
                if (resultObj.status === "ok") {
                    sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT, resultObj.data);
                }
            });
        }
    });
});