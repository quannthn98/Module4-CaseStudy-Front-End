
function checkJwt() {
    let jwt = localStorage.token;
    if (jwt == null) {
        return swal({
            title: "Error",
            text: "Please login to see you cart",
            icon: "error",
            button: "To login page"
        }).then((valwue) => {
            window.location.href = "account.html"
        })
    } else {
        return false;
    }
}

function showSideBarCart() {
    var jwt = localStorage.token;
    if (jwt == null){
        // let content =
        //     `
        //     <i class="ion ion-md-basket"></i>
        //                                 <span id="total-product-in-cart" class="item-counter">0</span>
        //                                 <span id="mini-cart-trigger-payment" class="item-price">$0</span>
        //     `
        // $("#mini-cart-trigger").html(content)
        $(".item-counter").text("0");
        $(".item-price").text("$0");
        $(".mini-cart-list").text("Please login to see your cart");
        $(".mini-total-price").text("$0");
    } else {
        $.ajax({
            type: "GET",
            url: `${baseUrl}/users/cart`,
            headers: {
                "Authorization": "Bearer " + jwt
            },
            success: function (data){
                drawSidebarCart(data)
            }
        })
    }
}

function showCart() {
    checkJwt();
    showSideBarCart()
    $.ajax({
        type: "GET",
        url: `${baseUrl}/users/cart`,
        headers: {
            "Authorization": "Bearer " + localStorage.token
        },
        success: function (data) {
            if (data.length == 0) {
                swal({
                    title: 'Empty Cart',
                    text: 'You dont have any products in cart',
                    icon: 'info'
                })
                drawCart(data)
                var message = "<tr><td>You don't have any products in cart</td></tr>"
                $("#cart").html(message)
            } else {
                drawCart(data);
            }
        }
    }).fail(function () {
        console.log('fail')
    })
}

function addToCart(productId, quantity) {
    if (!checkJwt()){
        let cartDetail = {
            product: {
                id: productId,
            },
            quantity: quantity
        }
        let url = `${baseUrl}/carts`
        $.ajax({
            type: "POST",
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                "Authorization": "Bearer " + localStorage.token
            },
            data: JSON.stringify(cartDetail),
            success: function (data) {
                showCart();
            }
        }).fail(function () {
            swal({
                title: "Add product fail",
                text: "Not enough product in ware house",
                icon: "error"
            })
        })
    }



}

function updateQuantity(action, id) {
    checkJwt()
    let url = `${baseUrl}/carts/${id}`
    switch (action) {
        case "+":
            url += `/+`
            break;
        case "-":
            url += `/-`
            break;
    }
    $.ajax({
        url: url,
        type: "PUT",
        headers: {
            "Authorization": "Bearer " + localStorage.token
        },
        success: function (data) {
            showCart();
        }
    }).fail(function () {
        swal({
            title: "Can not add product",
            text: "Not enough products in warehouse",
            icon: "error",
        });
    })
}

function removeCart(id) {
    checkJwt()
    let url = `${baseUrl}/carts/${id}`
    $.ajax({
        url: url,
        type: 'DELETE',
        headers: {
            "Authorization": "Bearer " + localStorage.token
        },
        success: function () {
            showCart()
        }
    }).fail(function () {
        console.log("fail")
    })
}

function drawCart(data) {
    let content = "";
    let estimatePayment = 0;
    for (let i = 0; i < data.length; i++) {
        var element = data[i]
        var product = element.product
        var price = product.price * (1 - product.saleOff / 100);
        estimatePayment += price * element.quantity;

        content += `                                
                                <tr>
                                    <td>
                                        <div class="cart-anchor-image">
                                            <a href="single-product.html">
                                                <img src="${product.mainImage}" alt="Product">
                                                <h6>${product.name}</h6>
                                            </a>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="cart-price">
                                            $${product.price * (1 - product.saleOff / 100)}
                                        </div>
                                    </td>
                                    <td>
                                        <div class="cart-quantity">
                                            <div class="quantity">
                                                <input type="text" class="quantity-text-field" value="${element.quantity}">
                                                <a class="plus-a" onclick="updateQuantity('+', ${element.id})" data-max="1000">&#43;</a>
                                                <a class="minus-a" onclick="updateQuantity('-', ${element.id})" data-min="1">&#45;</a>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div >
                                            <button type="button" onclick="removeCart(${element.id})" class="button button-outline-secondary fas fa-trash"></button>
                                        </div>
                                    </td>
                                </tr>
`

    }
    $("#estimatePayment").html("$" + estimatePayment);
    $("#totalPayment").html("$" + estimatePayment);
    $("#cart").html(content)
}

function drawSidebarCart(data) {
    let content = "";
    let estimatePayment = 0;

    for (let i = 0; i < data.length; i++) {
        var element = data[i];
        var product = element.product;
        var price = product.price * (1 - product.saleOff / 100);
        estimatePayment += price * element.quantity;
        content +=
                `    <li class="clearfix">
                        <a href="single-product.html">
                            <img src="${product.mainImage}" alt="Product">
                            <span class="mini-item-name">${product.name}</span>
                            <span class="mini-item-price">$${price}</span>
                            <span class="mini-item-quantity"> x ${element.quantity}</span>
                        </a>
                    </li>`
    }
    $(".item-counter").text(data.length);
    $(".item-price").text("$" + estimatePayment);
    $(".mini-cart-list").html(content);
    $(".mini-total-price").text("$" + estimatePayment);
}