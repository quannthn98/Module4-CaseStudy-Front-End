let baseUrl = "http://localhost:8080"
let jwt = localStorage.token
let username = localStorage.username

function init(){
    checkLoginStatus();
    showSideBarCart();
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