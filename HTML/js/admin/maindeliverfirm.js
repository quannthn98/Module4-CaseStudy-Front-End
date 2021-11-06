let URL = "http://localhost:8080/api/deliverfirm";
let page = 0;
let count = 0;
let totalPage = 0;

function successHandleDeliverFirm() {
    $.ajax({
        url: URL,
        type: 'GET',
        success: function (data) {
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
                <button onclick="showDeleteDeliverFirm(${deliverFirm.id}">Delete</button>
                
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
        url: URL + `?page=${page}`,
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
        url: URL + `?page=${page}`,
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
        url: URL + `/${id}`,
        type: 'GET',
        success: function (data) {
            $("#titleDeliverFirmDelete").html(data.title)
            $('#confirmDelete').click(function () {
                remove(id)
            });
        }
    });
}

function remove(id) {
    $.ajax({
        type: 'DELETE',
        url: URL + `/${id}`,
        success: successHandleDeliverFirm
    });
}
