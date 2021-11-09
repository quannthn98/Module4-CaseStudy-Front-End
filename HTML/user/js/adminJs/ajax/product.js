function createNewDeliverFirm() {
    let form = new FormData($("#create")[0])
    $.ajax({
        url: `http://localhost:8080/products`,
        type: 'POST',
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        data: form,
        success: function () {
            showProduct()
        }
    })
}

function showProduct() {
    $.ajax({
        url: 'http://localhost:8080/products',
        method: 'GET',
        success: function (data) {
            console.log(data)
            let content = `<tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>SaleOff</th>
                        <th>MainImage</th>
                        <th>SubImage</th>
                        <th>Brand</th>
                        <th>Description</th>
                        <th>Category</th>
                    </tr>`
            for (let i = 0; i < data.content.length; i++) {
                content += showById(data.content[i])
            }

            document.getElementById("modalbutton").innerHTML = '<button id="modalbutton"  onclick="createNewDeliverFirm()" type="button" class="btn btn-success" \n' +
                '                                                       data-bs-dismiss="modal">\n' +
                '                                                      create</button>'

            document.getElementById("list").innerHTML = content
        }
    })
}

$(document).ready(function (){
    $("#create-button").on('click', function (){
        document.getElementById("modalbutton").innerHTML = '<button id="modalbutton"  onclick="createNewDeliverFirm()" type="button" class="btn btn-success" \n' +
            '                                                       data-bs-dismiss="modal">\n' +
            '                                                      create</button>'
    })
})

function showById(product) {
    return `<tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td>${product.saleoff}</td>
            <td>${product.mainImage}</td>
            <td>${product.subImage}</td>
            <td>${product.brand.name}</td>
            <td>${product.description}</td>
            <td>${product.category.name}</td>
            <td>
            <button type="button" onclick="showInfo(${product.id})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                update
            </button>
            <button>delete</button>
            </td>
          </tr>`
}

function showInfo(id) {
    $.ajax({
        url: 'http://localhost:8080/products' + `/` + id,
        type: 'GET',
        success: function (data) {
            console.log(data.brand.name)
            $('#id').val(data.id)
            $('#name').val(data.name)
            $('#quantity').val(data.quantity)
            $('#price').val(data.price)
            $('#saleOff').val(data.saleOff)
            // $('#mainImage').val(data.mainImage)
            // $('#subImage').val(data.subImage)
            $('#brand').val(data.brand.name)
            $('#description').val(data.description)
            $('#category').val(data.category.name)
            document.getElementById("modalbutton").innerHTML = '<button id="modalbutton"  onclick="update(${product.id})" type="button" class="btn btn-success" \n' +
                '                                    data-bs-dismiss="modal">\n' +
                '                                   update</button>'
        }
    })
}

function update() {
    console.log(id)
    $.ajax({
        url: 'http://localhost:8080/products' + `/` + id,
        type:'PUT',
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        data: form,
        success: function () {
            showProduct()
        }
    })
}