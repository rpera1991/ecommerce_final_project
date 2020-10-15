var carrito = {};
var cartArray = [];

function showCartItems() {
    let htmlCartToAppend = "";
    for (let i = 0; i < cartArray.length; i++) {
        let element = cartArray[i];

        htmlCartToAppend += `
        <div>
            <div class="list-group-item list-group-item-action">
                <div class="row" id="product-${i}">
                    <div class="col-3">
                        <img src="${element.src}" alt="${element.name}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                        <a href="product-info.html" class="list-item-action"><h4 class="mb-1">${element.name}</h4></a>
                            <div>
                            <p class="mb-1">Precio: ${element.currency} ${element.unitCost}</p>
                            <p class="mb-1">Unidades: <span class="quantity">${element.count}</span></p>
                            <button type="button" class="btn btn-primary btn-minus" data-quantity="${element.count}" data-price="${element.unitCost}" data-id=${i}>-</button>
                            <button type="button" class="btn btn-primary btn-plus" data-quantity="${element.count}" data-price="${element.unitCost}" data-id="${i}">+</button>
                            </div>
                        </div>
                        <p class="mb-1">${element.name}</p>
                        <p class="mb-1">SubTotal: <span class="currency">${element.currency}</span> <span class="subtotal">${element.unitCost * element.count}</span></p>                        
                    </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("containercart").innerHTML = htmlCartToAppend;
    }
}

function addEventListenersToActionsQuantityButtons() {
    const decreaseButtons = document.getElementsByClassName('btn-minus');
    const increaseButtons = document.getElementsByClassName('btn-plus');

    for (let i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', function(e) {
            let id = e.target.dataset.id;
            let quantity = parseFloat(e.target.dataset.quantity);
            let price = parseFloat(e.target.dataset.price);
            if (quantity - 1 >= 1) {
                quantity -= 1;
                price = parseFloat(price * quantity);
                const parentRow = document.getElementById(`product-${id}`);
                parentRow.getElementsByClassName('subtotal')[0].innerHTML = price;
                parentRow.getElementsByClassName('quantity')[0].innerHTML = quantity;
                e.target.dataset.quantity = quantity;
                parentRow.getElementsByClassName('btn-plus')[0].dataset.quantity = quantity;
                getTotal();
            }
        });
    }

    for (let i = 0; i < increaseButtons.length; i++) {
        (increaseButtons[i]).addEventListener('click', function(e) {
            let id = e.target.dataset.id;
            let quantity = parseFloat(e.target.dataset.quantity);
            let price = parseFloat(e.target.dataset.price);
            quantity += 1;
            price = parseFloat(price * quantity);
            const parentRow = document.getElementById(`product-${id}`);
            parentRow.getElementsByClassName('subtotal')[0].innerHTML = price;
            parentRow.getElementsByClassName('quantity')[0].innerHTML = quantity;
            e.target.dataset.quantity = quantity;
            parentRow.getElementsByClassName('btn-minus')[0].dataset.quantity = quantity;
            getTotal();
        });
    }
}

function addListenerOnSelectEnviosChange() {
    let total = 0;
    document.getElementById('FormControlSelect').addEventListener('change', function(e) {
        const value = e.target.value;
        switch (value) {
            case 'op1':
                total = (parseFloat(getTotal()) * 0.15).toFixed(2);
                break;
            case 'op2':
                total = (parseFloat(getTotal()) * 0.07).toFixed(2);
                break;
            case 'op3':
                total = (parseFloat(getTotal()) * 0.05).toFixed(2);
                break;
        }
        document.getElementById('modalTotal').innerHTML = parseFloat(total) + parseFloat(getTotal());
    });
}

function validate() {
    document.getElementById('formmodal')
    if (document.formmodal.Direccion.value == "") {
        document.getElementById("direction").focus();
        return false;
    }
    if (document.formmodal.Pais.value == "") {
        document.getElementById("pais").focus();
        return false;
    }
    if (document.formmodal.Nombre.value == "") {
        document.getElementById("nameform").focus();
        return false;
    }
    if (document.formmodal.TC.value == "") {
        document.getElementById("tc").focus();
        return false;
    }
    if (document.formmodal.cvv.value == "") {
        document.getElementById("cvv").focus();
        return false;
    }
    if (document.formmodal.Select.value == "op0") {
        document.getElementById("FormControlSelect").focus();
        return false
    }
    return true;
}

function getTotal() {
    let total = 0;
    let subtotals = document.getElementsByClassName('subtotal');
    for (let i = 0; i < subtotals.length; i++) {
        const element = subtotals[i];
        if (element.previousElementSibling.innerHTML === 'USD') {
            total += parseFloat(element.innerHTML) * 40;
        } else {
            total += parseFloat(element.innerHTML);
        }
    }
    total = parseFloat(total).toFixed(2);
    document.getElementById('subT').innerHTML = total;
    document.getElementById('modalTotal').innerHTML = total;
    return total;
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_PROD).then(function(resultObj) {
        if (resultObj.status === "ok") {
            carrito = resultObj.data;
            cartArray = carrito["articles"];
            showCartItems();
            addEventListenersToActionsQuantityButtons();
            addListenerOnSelectEnviosChange();
            getTotal();
        }
        document.getElementById("payid").addEventListener('click', function() {



            if (validate() == true) {
                alert("Se ha realizado su compra con Exito");
                window.location = "index.html"
            }
        });
    });
});