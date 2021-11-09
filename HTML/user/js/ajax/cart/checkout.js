
function showCartDetail(){
    checkJwt()
    let url = `${baseUrl}/users/cart`
    $.ajax({
        type: "GET",
        url: url,
        headers: {
            "Authorization": "Bearer " + localStorage.token
        },
        success: function (data){
            console.log(data)
            drawCartDetail(data)
        }
    }).fail(function (){
        console.log('fail')
    })
}

function doCheckout(){
    let url = `${baseUrl}/orders`
    let firstName = $("#first-name").val();
    let lastName = $("#last-name").val();
    let fullName = firstName + lastName;
    let address = $("#req-st-address").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    let date = new Date();
    let paymentMethodId = $("input[name=payment-method]:checked", "#formCheckout").val();
    let note = $("#order-notes").val();
    let deliverFirmId = $("#deliverFirm option:selected").val();
    let newOrder = {
        fullName: fullName,
        address: address,
        email: email,
        phone: phone,
        dateCreated: date,
        paymentMethod: {
            id: paymentMethodId
        },
        note: note,
        deliverFirm: {
            id: deliverFirmId
        }
    }

    $.ajax({
        url: url,
        type: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.token,
            "Accept": 'application/json',
            "Content-type": 'application/json'
        },
        data: JSON.stringify(newOrder),
        success: function (data) {
            console.log(data)
        }
    }).fail(function (){
        console.log('fail')
    })


}

function drawCartDetail(data){
    let content = "";
    let estimatedPayment = 0;
    for (let i = 0; i < data.length; i++) {
        var element = data[i];
        var product = element.product;
        var price = product.price*(1 - product.saleOff/100)
        estimatedPayment += price * element.quantity
        content += `
                                             <tr>
                                                <td>
                                                    <h6 class="order-h6">${product.name}</h6>
                                                    <span class="order-span-quantity">x 1</span>
                                                </td>
                                                <td>
                                                    <h6 class="order-h6">$${price}</h6>
                                                </td>
                                            </tr>`
    }

    content +=                              `<tr>
                                                <td>
                                                    <h3 class="order-h3">Subtotal</h3>
                                                </td>
                                                <td>
                                                    <h3 class="order-h3">$${estimatedPayment}</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h3 class="order-h3">Shipping</h3>
                                                </td>
                                                <td>
                                                    <h3 class="order-h3">$0.00</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h3 class="order-h3">Tax</h3>
                                                </td>
                                                <td>
                                                    <h3 class="order-h3">$0.00</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h3 class="order-h3">Total</h3>
                                                </td>
                                                <td>
                                                    <h3 class="order-h3">$${estimatedPayment}</h3>
                                                </td>
                                            </tr>`
    $("#cart").html(content)
}