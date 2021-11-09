// $(document).ready(function () {
//     getCategories()
// })

function getCategories() {
    $.ajax({
        url: 'http://localhost:8080/categories',
        type: 'GET',
        success: function (category) {
            let content = ''
            for (let i = 0; i < category.content.length; i++) {
                content += getCategory(category.content[i])
            }
            $("#categories").html(content)
        }
    })
}

function getCategory(category) {
    return `<li>
                <a href="shop-v1-root-category.html" 
                onclick="location.href=this.href+'?cate=${category.id}';return false;">${category.name}</a>
            </li>`
}