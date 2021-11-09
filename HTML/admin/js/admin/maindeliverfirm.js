let URLDeliverFirm = "http://localhost:8080/api/deliverfirm";
let page = 0;
let count = 0;
let totalPage = 0;
// showBtnCreate()
function showAllDeliverFirm() {
    let getUrl = ""
    let search = $("#q").val()
    if (search == ""){
        getUrl = URLDeliverFirm;
    } else {
        getUrl = URLDeliverFirm + `?q=${search}`
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
                '<td scope="col">  Name DeliverFirm</td>\n' +
                '</tr>'
            '</thead>';
            for (let i = 0; i < data.content.length; i++) {
                content += getDeliverFirm(data.content[i])
            }
            totalPage = data.totalPages;
            $("#countPage").html(page + 1);
            $("#list").html(content);
            $("#createButton").html(`
                                   <button type="button" class="btn btn-default" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Create DeliverFirm
                                    </button>
                                     
                                     `)

            $("#searchButton").html(`
                        <button type="button" class="btn btn-primary" onclick="showAllDeliverFirm()">
                                   <i class="fas fa-search"></i>                           </button>
                        `)

            $("#pageList").html(` <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group" role="group" aria-label="First group">
                        <button type="button" class="btn btn-outline-secondary" onclick="previousPage()" id="pre-btn">Previous</button>
                        <button type="button" class="btn btn-outline-secondary"  id="countPage"></button>
                        <button type="button" class="btn btn-outline-secondary" onclick="nextPage()" id="next-btn">Next</button>
                    </div>
                </div>`)
        }
    })
}

function getDeliverFirm(deliverFirm) {
    return `
        <tr>
            <th scope="row">${deliverFirm.id}</th>
            <td>${deliverFirm.name}</td>
            <td>
                <button onclick="showEditDeliverFirm(${deliverFirm.id})" class="btn btn-primary">Update</button>
                <button onclick="showDeleteDeliverFirm(${deliverFirm.id})" class="btn btn-outline-danger">Delete</button>
                
            </td>
        </tr>`
}

function nextPage() {
    page++
    if (page === totalPage - 1) {
        $("#next-btn").hide();
    }
    $("#countPage").html(page + 1)
    $.ajax({
        type: "GET",
        url: URLDeliverFirm + `?page=${page}`,
        success: function (data) {
            let content = '<thead>\n' +
                '<tr>\n' +
                '<td scope="col">  Id</td>\n' +
                '<td scope="col">  Name DeliverFirm</td>\n' +
                '</tr>' +
                '</thead>';
            for (let i = 0; i < data.content.length; i++) {
                content += getDeliverFirm(data.content[i])
            }
            $("#list").html(content);
        }
    })


}

function previousPage() {
    if (page > 0) {
        page--;
        $("#next-btn").show();
    }
    if (page < 0) {
        $("#pre-btn").hide();
    }
    $("#countPage").html(page + 1)
    $.ajax({
        type: "GET",
        url: URLDeliverFirm + `?page=${page}`,
        success: function (data) {
            let content = '<thead>\n ' +
                '<tr>\n' +
                '<td scope="col">Id</td>\n' +
                '<td scope="col">Name DeliverFirm</td>\n' +
                '</tr>' +
                '</thead>';
            for (let i = 0; i < data.content.length; i++) {
                content += getDeliverFirm(data.content[i])
            }
            $("#list").html(content);
        }
    });
}

function showDeleteDeliverFirm(id) {
    let myModal = new bootstrap.Modal(document.getElementById('deleteDeliverFirm'));
    myModal.show();
    $.ajax({
        url: URLDeliverFirm + `/`+ id,
        type: 'GET',
        success: function (data) {
            $("#titleDeliverFirmDelete").html(data.name)
            $('#confirmDeleteDeliverFirm').click(function () {
                removeDeliverFirm(id)
            });
        }
    });
}

function removeDeliverFirm(id) {
    $.ajax({
        type: 'DELETE',
        url: URLDeliverFirm + `/${id}`,
        success: showAllDeliverFirm
    });
}

function showEditDeliverFirm(id) {
    var myModal = new bootstrap.Modal(document.getElementById('updateModalDeliverFirm'));
    myModal.show();
    $.ajax({
        async: false,
        url: URLDeliverFirm + `/` + id,
        type: 'GET',
        success: function (data) {
            $("#updateModalDeliverFirm").val(data.name);
            $("#updateDeliverFirm").html(`<button onclick="updateDeliverFirm(${id})" id="updateDeliverFirm" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Changes
                        </button>`)

            // $('#updateDeliverFirm').click(function () {
            //     update(id)
            // });
        }
    })
}

function updateDeliverFirm(id) {
    let name = $("#nameUpdateDeliverFirm").val();
    let deliverFirmUpdate = {
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
        url: URLDeliverFirm + `/` + id,
        data: JSON.stringify(deliverFirmUpdate),
        success: showAllDeliverFirm,
    });
}

// function showBtnCreate() {
//     let content = ``
//     $("#createBtn").html(content);
// }

function createNewDeliverFirm(){
    let nameNewDeliverFirm= $('#nameNewDeliverFirm').val();
    let newDeliverFirm= {
        name: nameNewDeliverFirm
    };
    if(nameNewDeliverFirm==""){
        $("#errorDeliverFirm").html("Name must be not Null");
    }else {
        $.ajax({
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            type:"POST",
            url: URLDeliverFirm,
            data: JSON.stringify(newDeliverFirm),
            success:function (){
                $("#errorDeliverFirm").hide();
                showAllDeliverFirm();
                clearDeliverFirm();
                var modalToggleDeliverFirm = document.getElementById('exampleModalDeliverFirm')
                modalToggleDeliverFirm.hide();
            },
        }).fail(function (){
            $('#errorDeliverFirm').html("Tên bị trùng"+
                "");
        });
    }


    event.preventDefault();
}

function clearDeliverFirm() {
    $("#nameNewDeliverFirm").val("")
}

function searchDeliverFirm(){
    let name= $('#searchDeliverFirm').val()
    $.ajax({
        url: `${URLDeliverFirm}?q=${name}`,
        type: 'GET',
        data: name,
        success:function (data){
            let content='<thead>\n ' +
                '<tr>\n' +
                '<td scope="col">Id</td>\n' +
                '<td scope="col">Name DeliverFirm</td>\n' +
                '</tr>' +
                '</thead>';
            for (let i = 0; i < data.content.length; i++) {
                content += getDeliverFirm(data.content[i])
            }
            $("#list").html(content);
        }
    })
}

