let URLPaymentMethod = "http://localhost:8080/api/paymentmethod";
function showAllPaymentMethod() {
    let getUrl = ""
    let search = $("#q").val()
    if (search == ""){
        getUrl = URLPaymentMethod;
    } else {
        getUrl = URLPaymentMethod+ `?q=${search}`
    }
    $.ajax({
        url: getUrl,
        type: 'GET',
        success: function (data) {
            console.log(data)
            let content =
                '<thead>\n' +
                '<tr>\n' +
                '<td scope="col">  ID</td>\n' +
                '<td scope="col">  Name PaymentMethod</td>\n' +
                '</tr>'
            '</thead>';
            for (let i = 0; i < data.content.length; i++) {
                content += getPaymentMethod(data.content[i])
            }
            totalPage = data.totalPages;
            $("#countPage").html(page + 1);
            $("#list").html(content);
            $("#createButton").html(`
                                   <button type="button" class="btn btn-default" data-bs-toggle="modal" data-bs-target="#exampleModalPaymentMethod">
                                    Create PaymentMethod
                                    </button>
                                     
                                     `)

            $("#searchButton").html(`
                        <button type="button" class="btn btn-primary" onclick="showAllPaymentMethod()">
                                   <i class="fas fa-search"></i>                           </button>
                        `)

            $("#pageList").html(` <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group" role="group" aria-label="First group">
                        <button type="button" class="btn btn-outline-secondary" onclick="previousPagePaymentMethod()" id="pre-btnPaymentMethod">Previous</button>
                        <button type="button" class="btn btn-outline-secondary"  id="countPagePaymentMethod"></button>
                        <button type="button" class="btn btn-outline-secondary" onclick="nextPagePaymentMethod()" id="next-btnPaymentMethod">Next</button>
                    </div>
                </div>`)
        }
    })
}

function getPaymentMethod(paymentMethod) {
    return `
        <tr>
            <th scope="row">${paymentMethod.id}</th>
            <td>${paymentMethod.name}</td>
            <td>
                <button onclick="showEditPaymentMethod(${paymentMethod.id})" class="btn btn-primary">Update</button>
                <button onclick="showDeletePaymentMethod(${paymentMethod.id})" class="btn btn-outline-danger">Delete</button>
                
            </td>
        </tr>`
}

function nextPagePaymentMethod() {
    page++
    if (page === totalPage - 1) {
        $("#next-btnPaymentMethod").hide();
    }
    $("#countPagePaymentMethod").html(page + 1)
    $.ajax({
        type: "GET",
        url: URLPaymentMethod + `?page=${page}`,
        success: function (data) {
            let content = '<thead>\n' +
                '<tr>\n' +
                '<td scope="col">  Id</td>\n' +
                '<td scope="col">  Name PaymentMethod</td>\n' +
                '</tr>' +
                '</thead>';
            for (let i = 0; i < data.content.length; i++) {
                content += getPaymentMethod(data.content[i])
            }
            $("#list").html(content);
        }
    })
}

function previousPagePaymentMethod() {
    if (page > 0) {
        page--;
        $("#next-btnPaymentMethod").show();
    }
    if (page < 0) {
        $("#pre-btnPaymentMehtod").hide();
    }
    $("#countPagePaymentMethod").html(page + 1)
    $.ajax({
        type: "GET",
        url: URLPaymentMethod + `?page=${page}`,
        success: function (data) {
            let content = '<thead>\n ' +
                '<tr>\n' +
                '<td scope="col">Id</td>\n' +
                '<td scope="col">Name PaymentMethod</td>\n' +
                '</tr>' +
                '</thead>';
            for (let i = 0; i < data.content.length; i++) {
                content += getPaymentMethod(data.content[i])
            }
            $("#list").html(content);
        }
    });
}

function createNewPaymentMethod(){
    let nameNewPaymentMethod= $('#nameNewPaymentMethod').val();
    let newPaymentMethod= {
        name: nameNewPaymentMethod,
    };
    // ____Check validate____
    if (nameNewPaymentMethod==""){
        $('#errorPaymentMethod').html("Name must be not Null")

    }else {
        $.ajax({
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            type:"POST",
            url: URLPaymentMethod,
            data: JSON.stringify(newPaymentMethod),
            success:function (){
                $('#errorPaymentMethod').hide();
                showAllPaymentMethod();
                clearPaymentMethod();
                var modalToggle = document.getElementById('exampleModalPaymentMethod')
                modalToggle.hide();
            },
        }).fail(function (){
            $('#errorPaymentMethod').html("Tên đã bị trùng" +
                "")

        });
    }
    // ______________________

    event.preventDefault();
}

function clearPaymentMethod() {
    $("#nameNewPaymentMethod").val("")
}

function showDeletePaymentMethod(id) {
    let myModal = new bootstrap.Modal(document.getElementById('deletePaymentMethod'));
    myModal.show();
    $.ajax({
        url: URLPaymentMethod + `/`+ id,
        type: 'GET',
        success: function (data) {
            $("#titlePaymentMethodDelete").html(data.name)
            $('#confirmDeletePaymentMethod').click(function () {
                removePaymentMethod(id)
            });
        }
    });
}

function removePaymentMethod(id) {
    $.ajax({
        type: 'DELETE',
        url: URLPaymentMethod + `/${id}`,
        success: showAllPaymentMethod
    });
}


function showEditPaymentMethod(id) {
    var myModal = new bootstrap.Modal(document.getElementById('updateModalPaymentMethod'));
    myModal.show();
    $.ajax({
        async: false,
        url: URLPaymentMethod + `/` + id,
        type: 'GET',
        success: function (data) {
            $("#updateModalPaymentMethod").val(data.name);
            $("#updatePaymentMethod").html(`<button onclick="updatePaymentMethod(${id})" id="updatePaymentMethod" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Changes
                        </button>`)

            // $('#updateDeliverFirm').click(function () {
            //     update(id)
            // });
        }
    })
}

function updatePaymentMethod(id) {
    let name = $("#nameUpdatePaymentMethod").val();
    let paymentMethodUpdate = {
        id: id,
        name: name,
    };

    $.ajax({
        async: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: URLPaymentMethod + `/` + id,
        data: JSON.stringify(paymentMethodUpdate),
        success: showAllPaymentMethod,
    });
}

