function showOrders(){
    let url = `${baseUrl}/users/order`;
    $.ajax({
        type: "GET",
        url: url,
        headers:{
            "Authorization": "Bearer " + localStorage.token
        },
        success: function (data){
            drawOrders(data)
        }
    }).fail(function (){
        console.log('fail')
    })
}

function drawOrders(data){
    let content = ""
    for (let i = 0; i < data.content.length; i++) {
        let order = data.content[i]
        content +=
            `<tr>
                  <td>
                      <div> 
                          ${i + 1}
                      </div>
                  </td>
                  <td>
                      <div> 
                          ${order.dateCreated.slice(0,10)}
                      </div>
                  </td>
                  <td>
                      <div> 
                          ${order.fullName}
                      </div>
                  </td>
                  <td>
                      <div> 
                          ${order.email}
                      </div>
                  </td>
                  <td>
                      <div> 
                          ${order.phone}
                      </div>
                  </td>
                  <td>
                      <div> 
                          ${order.paymentMethod.name}
                      </div>
                  </td>
                  <td>
                      <div> 
                          ${order.deliverFirm.name}
                      </div>
                  </td>
                  <td>
                      <div> 
                          ${order.orderStatus.name}
                      </div>
                  </td>
                  <td>
                      <div> 
                          <button onclick="showOrderDetail(${order.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Show Detail
                          </button>
                      </div>
                  </td>
            </tr>`
    }
    $("#order").html(content);
}

function showOrderDetail(id){
    let url = `${baseUrl}/users/order/${id}`;
    $.ajax({
        type: "GET",
        url: url,
        headers: {
            "Authorization": "Bearer " + localStorage.token
        },
        success: function (data){
            drawOrderDetail(data)
            console.log(data)
        }
    }).fail(function (){
        console.log('Fail')
    })
}

function drawOrderDetail(data){
    let content = "";
    let totalPayment = 0
    for (let i = 0; i < data.length; i++) {
        let element = data[i];
        let product = element.product;
        totalPayment += product.price * (1 - product.saleOff/100) * element.quantity
        content +=
            `<tr>
                <td>${i+1}</td>
                <td>${product.name}</td>
                <td>$${product.price * (1 - product.saleOff/100)}</td>
                <td>${element.quantity}</td>
                <td>${product.saleOff}</td>
                <td>$${product.price * (1 - product.saleOff/100) * element.quantity}</td>
            </tr>
          
            `
    }
    content += `<tr>
                <th colspan="5">Total Payment</th>
                <td>$${totalPayment}</td>
            </tr>`
    $("#orderDetail").html(content)
}

