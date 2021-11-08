getAllCategories()

function getAllCategories() {
    $.ajax({
        url: `http://localhost:8080/categories`,
        type: 'GET',
        success: function (category) {
            let content = ''
            for (let i = 0; i < category.content.length; i++) {
                content += getCategory(category.content[i])
            }
            $(".v-list").html(content)
        }
    })
}

function getCategory(category) {
    return `<li class="js-backdrop">
                <a href="shop-v1-root-category.html" 
                onclick="location.href=this.href+'?cate=${category.id}';return false;">
                    <i class="ion ion-md-rocket"></i>
                    ${category.name}
                    <i class="ion ion-ios-arrow-forward"></i>
                </a>
                <button class="v-button ion ion-md-add"></button>`;
}

