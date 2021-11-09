let URLCategory = "http://localhost:8080/categories";
function showAllCategory() {
    let getUrl = ""
    let search = $("#q").val()
    if (search == ""){
        getUrl = URLCategory;
    } else {
        getUrl = URLCategory + `?q=${search}`
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
                '<td scope="col">  Name Category</td>\n' +
                '</tr>'
            '</thead>';
            for (let i = 0; i < data.content.length; i++) {
                content += getCategory(data.content[i])
            }
            totalPage = data.totalPages;
            $("#countPage").html(page + 1);
            $("#list").html(content);
            $("#createButton").html(`<button type="button" class="btn btn-default" data-bs-toggle="modal" data-bs-target="#exampleModalCategory">
                Create Category
            </button>`)
            $("#searchButton").html(`
                        <button type="button" class="btn btn-primary" onclick="showAllCategory()">
                                   <i class="fas fa-search"></i>                           </button>
                        `)

            $("#pageList").html(` <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group" role="group" aria-label="First group">
                        <button type="button" class="btn btn-outline-secondary" onclick="previousPageCategory()" id="pre-btncategory">Previous</button>
                        <button type="button" class="btn btn-outline-secondary"  id="countPagecategory"></button>
                        <button type="button" class="btn btn-outline-secondary" onclick="nextPageCategory()" id="next-btncategory">Next</button>
                    </div>
                </div>`)
        }
    })


}

function getCategory(category) {
    return `
        <tr>
            <th scope="row">${category.id}</th>
            <td>${category.name}</td>
            <td>
                <button onclick="showEditCategory(${category.id})" class="btn btn-primary">Update</button>
                <button onclick="showDeleteCategory(${category.id})" class="btn btn-outline-danger">Delete</button>
                
            </td>
        </tr>`
}

function nextPageCategory() {
    page++
    if (page === totalPage - 1) {
        $("#next-btncategory").hide();
    }
    $("#countPagecategory").html(page + 1)
    $.ajax({
        type: "GET",
        url: URLCategory + `?page=${page}`,
        success: function (data) {
            let content = '<thead>\n' +
                '<tr>\n' +
                '<td scope="col">  Id</td>\n' +
                '<td scope="col">  Name Category</td>\n' +
                '</tr>' +
                '</thead>';
            for (let i = 0; i < data.content.length; i++) {
                content += getCategory(data.content[i])
            }
            $("#list").html(content);
        }
    })
}

function previousPageCategory() {
    if (page > 0) {
        page--;
        $("#next-btncategory").show();
    }
    if (page < 0) {
        $("#pre-btncategory").hide();
    }
    $("#countPagecategory").html(page + 1)
    $.ajax({
        type: "GET",
        url: URLCategory + `?page=${page}`,
        success: function (data) {
            let content = '<thead>\n ' +
                '<tr>\n' +
                '<td scope="col">Id</td>\n' +
                '<td scope="col">Name Category</td>\n' +
                '</tr>' +
                '</thead>';
            for (let i = 0; i < data.content.length; i++) {
                content += getCategory(data.content[i])
            }
            $("#list").html(content);
        }
    });
}



function showDeleteCategory(id) {
    let myModal = new bootstrap.Modal(document.getElementById('deleteCategory'));
    myModal.show();
    $.ajax({
        url: URLCategory + `/`+ id,
        type: 'GET',
        success: function (data) {
            $("#titleCategoryDelete").html(data.name)
            $('#confirmDeleteCategory').click(function () {
                removeCategory(id)
            });
        }
    });
}

function removeCategory(id) {
    $.ajax({
        type: 'DELETE',
        url: URLCategory + `/${id}`,
        success: showAllCategory
    });
}

function showEditCategory(id) {
    var myModal = new bootstrap.Modal(document.getElementById('updateModalCategory'));
    myModal.show();
    $.ajax({
        async: false,
        url: URLCategory + `/` + id,
        type: 'GET',
        success: function (data) {
            $("#updateModalCategory").val(data.name);
            $("#updateCategory").html(`<button onclick="updateCategory(${id})" id="updateCategory" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Changes
                        </button>`)

            // $('#updateDeliverFirm').click(function () {
            //     update(id)
            // });
        }
    })
}

function updateCategory(id) {
    let name = $("#nameUpdateCategory").val();
    let categoryUpdate = {
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
        url: URLCategory + `/` + id,
        data: JSON.stringify(categoryUpdate),
        success: showAllCategory,
    });
}

// function showBtnCreate() {
//     let content = ``
//     $("#createBtn").html(content);
// }

function createNewCategory(){
    let nameNewCategory= $('#nameNewCategory').val();
    let newCategory= {
        name: nameNewCategory,
    };

    if(nameNewCategory==""){
        $('#errorCategory').html("Name must be not null");
    }else {
        $.ajax({
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            type:"POST",
            url: URLCategory,
            data: JSON.stringify(newCategory),
            success:function (){
                $('#errorCategory').hide();
                showAllCategory();
                clearCategory();
                var modalToggleCategory = document.getElementById('exampleModalCategory')
                modalToggleCategory.hide();
            },
        }).fail(function (){
            $('#errorCategory').html("Tên bị trùng");
        });
    }


    event.preventDefault();
}

function clearCategory() {
    $("#nameNewCategory").val("")
}

// function searchDeliverFirm(){
//     let name= $('#searchDeliverFirm').val()
//     $.ajax({
//         url: `${URLCategory}?q=${name}`,
//         type: 'GET',
//         data: name,
//         success:function (data){
//             let content='<thead>\n ' +
//                 '<tr>\n' +
//                 '<td scope="col">Id</td>\n' +
//                 '<td scope="col">Name DeliverFirm</td>\n' +
//                 '</tr>' +
//                 '</thead>';
//             for (let i = 0; i < data.content.length; i++) {
//                 content += getDeliverFirm(data.content[i])
//             }
//             $("#list").html(content);
//         }
//     })
// }
