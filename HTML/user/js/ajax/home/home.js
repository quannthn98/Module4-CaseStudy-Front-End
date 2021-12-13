// getAllCategories()

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
// getAllItemMenClothing(1)
function getAllItemMenClothing(id) {
    $.ajax({
        async: false,
        url:`http://localhost:8080/categories/${id}/products`,
        type: 'GET',
        success:function (product) {
            let ct = ''
            for (let i = 0; i < product.content.length; i++) {
                ct += showItem1(product.content[i])
            }
            console.log(ct)
            $("#products-slider").html(ct)
        }
    })
}
// getAllItemWomenClothing(2)
function getAllItemWomenClothing(id) {
    $.ajax({
        async: false,
        url:`http://localhost:8080/categories/${id}/products`,
        type: 'GET',
        success:function (product) {
            let ct = ''
            for (let i = 0; i < product.content.length; i++) {
                ct += showItem1(product.content[i])
            }
            $("#womenClothing").html(ct)
        }
    })
}
// function showItem(product) {
//     return `<div class="item">
//                                         <div class="image-container">
//                                             <a class="item-img-wrapper-link" href="single-product.html"
//                                             onclick="location.href=this.href+'?product=${product.id}';return false;">
//                                                 <img class="img-fluid" src="http://localhost:8080/${product.mainImage}" alt="Product">
//                                             </a>
//                                             <div class="item-action-behaviors">
//                                                 <a class="item-quick-look" data-toggle="modal" href="#quick-view">Quick Look
//                                                 </a>
//                                                 <a class="item-mail" href="javascript:void(0)">Mail</a>
//                                                 <a class="item-addwishlist" href="javascript:void(0)">Add to Wishlist</a>
//                                                 <a class="item-addCart" href="javascript:void(0)" onclick="addToCart(${product.id},1)">Add to Cart</a>
//                                             </div>
//                                         </div>
//                                         <div class="item-content">
//                                             <div class="what-product-is">
//                                                 <ul class="bread-crumb">
//                                                     <li class="has-separator">
//                                                         <a href="shop-v1-root-category.html">Men's</a>
//                                                     </li>
//                                                     <li class="has-separator">
//                                                         <a href="shop-v2-sub-category.html">${product.category.name}</a>
//                                                     </li>
//
//                                                 </ul>
//                                                 <h6 class="item-title">
//                                                     <a href="single-product.html"
//                                                     onclick="location.href=this.href+'?product=${product.id}';return false;"
//                                                     >${product.name}</a>
//                                                 </h6>
//                                                 <div class="item-stars">
//                                                     <div class='star' title="0 out of 5 - based on 0 Reviews">
//                                                         <span style='width:0'></span>
//                                                     </div>
//                                                     <span>(${product.quantity})</span>
//                                                 </div>
//                                             </div>
//                                             <div class="price-template">
//                                                 <div class="item-new-price">
//                                                     $ ${product.price * (1 - product.saleOff / 100)}
//                                                 </div>
//                                                 <div class="item-old-price">
//                                                     $ ${product.price}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="tag new">
//                                             <span>NEW</span>
//                                         </div>
//                                     </div>`
// }

function showItem1(product) {
    return `                                    <div class="item">
                                        <div class="image-container">
                                            <a class="item-img-wrapper-link" href="single-product.html" onclick="location.href=this.href+'?product=${product.id}';return false;">
                                                <img class="img-fluid" src="http://localhost:8080/${product.mainImage}" alt="Product">
                                            </a>
                                            <div class="item-action-behaviors">
                                                <a class="item-quick-look" data-toggle="modal" href="#quick-view">Quick Look
                                                </a>
                                                <a class="item-mail" href="javascript:void(0)">Mail</a>
                                                <a class="item-addwishlist" href="javascript:void(0)">Add to Wishlist</a>
                                                <a class="item-addCart" href="javascript:void(0)" onclick="addToCart(${product.id},1)">Add to Cart</a>
                                            </div>
                                        </div>
                                        <div class="item-content">
                                            <div class="what-product-is">
                                                <ul class="bread-crumb">
                                                    <li class="has-separator">
                                                        <a href="shop-v1-root-category.html" onclick="location.href=this.href+'?cate=${product.category.id}';return false;">${product.category.name}</a>
                                                    </li>
                                                </ul>
                                                <h6 class="item-title">
                                                    <a href="single-product.html" onclick="location.href=this.href+'?product=${product.id}';return false;">${product.name}</a>
                                                </h6>
                                                <div class="item-stars">
                                                    <div class='star' title="0 out of 5 - based on 0 Reviews">
                                                        <span style='width:0'></span>
                                                    </div>
                                                    <span>(0)</span>
                                                </div>
                                            </div>
                                            <div class="price-template">
                                                <div class="item-new-price">
                                                    $${product.price * (1-product.saleOff/100)}
                                                </div>
                                                <div class="item-old-price">
                                                    $${product.price}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tag new">
                                            <span>NEW</span>
                                        </div>
                                    </div>
`
}