let baseUrl = "http://localhost:8080"

function showCart() {
    $.ajax({
        type: "GET",
        url: `${baseUrl}/users/cart`,
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxdWFueWI5ODEiLCJpYXQiOjE2MzYxNjU5ODQsImV4cCI6ODgwMzYxNjU5ODR9.dtTA4i_YP2P-cCWenHQsS-EWlRvogsKWcdV4BCIvLLAHKrrANwrMb2dEWk06q5RLjBsXhKKMDmBzJX_8K0GPCg"
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
    }).fail(function (){
        window.location.href= "404.html"
    })
}

function addToCart(productId, quantity){
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
            "Authorization": "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxdWFueWI5ODEiLCJpYXQiOjE2MzYxNjU5ODQsImV4cCI6ODgwMzYxNjU5ODR9.dtTA4i_YP2P-cCWenHQsS-EWlRvogsKWcdV4BCIvLLAHKrrANwrMb2dEWk06q5RLjBsXhKKMDmBzJX_8K0GPCg"
        },
        data: JSON.stringify(cartDetail),
        success: function (data){
            showCart();
        }
    }).fail(function (){
        swal({
            title: "Add product fail",
            text: "Not enough product in ware house",
            icon: "error"
        })
    })

}

function updateQuantity(action, id) {
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
            "Authorization": "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxdWFueWI5ODEiLCJpYXQiOjE2MzYxNjU5ODQsImV4cCI6ODgwMzYxNjU5ODR9.dtTA4i_YP2P-cCWenHQsS-EWlRvogsKWcdV4BCIvLLAHKrrANwrMb2dEWk06q5RLjBsXhKKMDmBzJX_8K0GPCg"
        },
        success: function (data) {

            console.log(data)
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
    let url = `${baseUrl}/carts/${id}`
    $.ajax({
        url: url,
        type: 'DELETE',
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxdWFueWI5ODEiLCJpYXQiOjE2MzYxNjU5ODQsImV4cCI6ODgwMzYxNjU5ODR9.dtTA4i_YP2P-cCWenHQsS-EWlRvogsKWcdV4BCIvLLAHKrrANwrMb2dEWk06q5RLjBsXhKKMDmBzJX_8K0GPCg"
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
        var price = product.price*(1 - product.saleOff/100);
        estimatePayment += price * element.quantity;

        content += `                                
                                <tr>
                                    <td>
                                        <div class="cart-anchor-image">
                                            <a href="single-product.html">
                                                <img src="images/product/product@1x.jpg" alt="Product">
                                                <h6>${product.name}</h6>
                                            </a>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="cart-price">
                                            ${product.price * (1 - product.saleOff / 100)}
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