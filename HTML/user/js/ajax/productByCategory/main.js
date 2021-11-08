const urlParams = new URLSearchParams(window.location.search);
const cate = urlParams.get('cate');
getAllProductByCategory(cate)
function getAllProductByCategory(id) {
    $.ajax({
        url: `http://localhost:8080/categories/${id}/products`,
        type: 'GET',
        success: function (product) {
            let content = ``;
            for (let i = 0; i < product.content.length; i++) {
                content += getProduct(product.content[i])
            }
            $("#productByCategory").html(content)
        }
    })
}

function getProduct(product) {
    return `<div class="product-item col-lg-4 col-md-6 col-sm-6">
                            <div class="item">
                                <div class="image-container">
                                    <a class="item-img-wrapper-link" href="single-product.html"
                                    onclick="location.href=this.href+'?product=${product.id}';return false;"
                                    >
                                        <img class="img-fluid" src="images/product/product@3x.jpg" alt="Product">
                                    </a>
                                    <div class="item-action-behaviors">
                                        <a class="item-quick-look" data-toggle="modal" href="#quick-view">Quick Look</a>
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
                                                <a href="shop-v1-root-category.html"
                                                onclick="location.href=this.href+'?cate=${product.category.id}';return false;"
                                                >${product.category.name}</a>
                                            </li>
                                           
                                        </ul>
                                        <h6 class="item-title">
                                            <a href="single-product.html"
                                            onclick="location.href=this.href+'?product=${product.id}';return false;">
                                                ${product.name}
                                            </a>
                                        </h6>
                                        <div class="item-description">
                                            <p>
                                                ${product.description}
                                            </p>
                                        </div>
                                        <div class="item-stars">
                                            <div class='star' title="4.5 out of 5 - based on 23 Reviews">
                                                <span style='width:67px'></span>
                                            </div>
                                            <span>( ${product.quantity})</span>
                                        </div>
                                    </div>
                                    <div class="price-template">
                                        <div class="item-new-price">
                                            $ ${product.price*(1-product.saleOff/100)}
                                        </div>
                                        <div class="item-old-price">
                                            $ ${product.price}
                                        </div>
                                    </div>
                                </div>
                                <div class="tag new">
                                    <span>NEW</span>
                                </div>
                            </div>
                        </div>`
}