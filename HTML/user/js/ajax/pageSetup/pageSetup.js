let baseUrl = "http://localhost:8080"
let jwt = localStorage.token
let username = localStorage.username
// init()
function init(){
    checkLoginStatus();
    showSideBarCart();
    getAllCategories();
    $("#btn-search").html('<button id="btn-search" type="submit" class="button button-primary fas fa-search" onclick="window.location.href=\'shop-v6-search-results.html\'">\n')
}

function checkLoginStatus(){
    if (jwt != null){
        isLoggedHandler()
    } else {
        isNotLoggedHandler()
    }
}

function isLoggedHandler(){
    let content =
        `<li>
              <a>Hello ${username}
              </a>
        </li>
        <li>
              <a onclick="logout()">Logout
              </a>
        </li>
        <li>
              <a style="text-decoration: none" href="checkout.html">Checkout
              </a>
        </li>
        <li>
              <a style="text-decoration: none" href="cart.html">Show cart
              </a>
        </li>
`
    $(".secondary-nav").html(content)
}

function isNotLoggedHandler(){
    let content =
        `
        <li>
              <a href="account.html">Login / Signup
              </a>
        </li>
        `
    $(".secondary-nav").html(content)
}