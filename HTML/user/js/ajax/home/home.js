getAllBrand()

function getAllBrand() {
    $.ajax({
        url: `http://localhost:8080/brands`,
        type: 'GET',
        success: function (brand) {
            let content = ''
            for (let i = 0; i < brand.content.length; i++) {
                content += getBrand(brand.content[i])
            }
            $("#brand").html(content)
        }
    })
}

function getBrand(brand) {
    $.ajax({
        url: `http://localhost:8080/brands`,
        type: 'GET',
        success: function () {
            $.ajax({
                url: `http://localhost:8080/categories`,
                type: 'GET',
                success: function (categories) {
                    let content = ''
                    for (let i = 0; i < categories.content.length; i++) {
                        content += getBrand(categories.content[i])
                    }

                }
            })
            $("#brand").html(content)
        }
    })
    return `<li class="js-backdrop">
                <a href="shop-v1-root-category.html">
                    <i class="ion ion-md-rocket"></i>
                    ${brand.name}
                    <i class="ion ion-ios-arrow-forward"></i>
                </a>
                <button class="v-button ion ion-md-add"></button>
                <div class="v-drop-right" style="width: 700px;">
                    <div class="row">
                        <div class="col-lg-4">
                            <ul class="v-level-2">
                                <li id="category">
                                    <a href="shop-v2-sub-category.html">Solar Energy
                                    </a>
                                    <ul>
                                        <li>
                                            <a href="shop-v3-sub-sub-category.html">RC Helicopter
                                            </a>
                                        </li>
                                        <li>
                                            <a href="shop-v3-sub-sub-category.html">RC Lego Robots
                                            </a>
                                        </li>
                                        <li>
                                            <a href="shop-v3-sub-sub-category.html">RC Drone
                                            </a>
                                        </li>
                                        <li>
                                            <a href="shop-v3-sub-sub-category.html">RC Car
                                            </a>
                                        </li>
                                        <li>
                                            <a href="shop-v3-sub-sub-category.html">RC Boat
                                            </a>
                                        </li>
                                        <li>
                                            <a href="shop-v3-sub-sub-category.html">RC Robot
                                            </a>
                                        </li>
                                        <li>
                                            <a href="shop-v3-sub-sub-category.html">Multi Rotor Parts
                                            </a>
                                        </li>
                                        <li>
                                            <a href="shop-v3-sub-sub-category.html">FPV System
                                            </a>
                                        </li>
                                        <li>
                                            <a href="shop-v3-sub-sub-category.html">Radios & Receiver
                                            </a>
                                        </li>
                                        <li>
                                            <a href="shop-v3-sub-sub-category.html">Battery & Charger
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-4">
                            <ul class="v-level-2">
                                <li>
                                    <a href="shop-v2-sub-category.html">Solar Energy
                                    </a>
                                    <ul id="productByCategory">
<!--                                        <li>-->
<!--                                            <a href="shop-v3-sub-sub-category.html">Solar Powered Toy-->
<!--                                            </a>-->
<!--                                        </li>-->
<!--                                        <li>-->
<!--                                            <a href="shop-v3-sub-sub-category.html">Solar Powered System-->
<!--                                            </a>-->
<!--                                        </li>-->
<!--                                        <li class="view-more-flag">-->
<!--                                            <a href="store-directory.html">View More-->
<!--                                            </a>-->
<!--                                        </li>-->
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- Remember layer image should be place on empty space and its not overlap your list items because user could not read your list items. -->
                    <div class="v-image" style="bottom: 0;right: -25px">
                        <a href="#" class="d-block">
                            <img src="images/banners/mega-3.png" class="img-fluid" alt="Product">
                        </a>
                    </div>
                </div>
            </li>`
}

function getProductByCategory(id) {
    $.ajax({
        url: `http://localhost:8080/${id}/products`,
        type: 'GET',
        success: function (product) {
            let content = ''
            for (let i = 0; i < product.content.length; i++) {
                content += `<li>
                                <a href="shop-v3-sub-sub-category.html">Solar Powered Toy</a>
                            </li>`
            }
            $("#productByCategory").html(content)
        }
    })
}

function drawCategories() {
    $.ajax({
        url: `http://localhost:8080/categories`,
        type: 'GET',
        success: function (category) {
            let content = ''
            for (let i = 0; i < category.length; i++) {
                content += `<a href="shop-v2-sub-category.html">${category[i].name}
                                    </a>`
            }
            $("#category").html(content)
        }
    })
}
drawItems(1)
function drawItems(id) {
    $.ajax({
        url: `http://localhost:8080/products/{id}/brands`,
        type:'GET',
        success:function (products) {
            let content = '';
            for (let i = 0; i < products.content.length; i++) {
                content += `<div class="image-container">
                                            <a class="item-img-wrapper-link" href="single-product.html">
                                                <img class="img-fluid" src="http://localhost:8080/${products.content.mainImage}" alt="Product">
                                            </a>
                                            <div class="item-action-behaviors">
                                                <a class="item-quick-look" data-toggle="modal" href="#quick-view">Quick Look
                                                </a>
                                                <a class="item-mail" href="javascript:void(0)">Mail</a>
                                                <a class="item-addwishlist" href="javascript:void(0)">Add to Wishlist</a>
                                                <a class="item-addCart" href="javascript:void(0)">Add to Cart</a>
                                            </div>
                                        </div>
                                        <div class="item-content">
                                            <div class="what-product-is">
                                                <ul class="bread-crumb">
                                                    <li class="has-separator">
                                                        <a href="shop-v1-root-category.html">Men's</a>
                                                    </li>
                                                    <li class="has-separator">
                                                        <a href="shop-v2-sub-category.html">Tops</a>
                                                    </li>
                                                    <li>
                                                        <a href="shop-v3-sub-sub-category.html">Hoodies</a>
                                                    </li>
                                                </ul>
                                                <h6 class="item-title">
                                                    <a href="single-product.html">${products[i].name}</a>
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
                                                    $55.00
                                                </div>
                                                <div class="item-old-price">
                                                    $60.00
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tag new">
                                            <span>NEW</span>
                                        </div>`
                $("#item1").html(content)
            }
        }
    })
}