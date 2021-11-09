let baseUrl = "http://localhost:8080"
let jwt = localStorage.token
let username = localStorage.username

// init()
function getHeaderSetup() {
    checkLoginStatus();
    showSideBarCart();
    getAllCategories();
    $("#btn-search").html('<button id="btn-search" type="submit" class="button button-primary fas fa-search" onclick="window.location.href=\'shop-v6-search-results.html\'">\n')
}

function checkJwt() {
    let jwt = localStorage.token;
    if (jwt == null) {
        return swal({
            title: "Error",
            text: "Please login to see you cart",
            icon: "error",
            button: "To login page"
        }).then((valwue) => {
            window.location.href = "account.html"
        })
    } else {
        return false;
    }
}

function checkLoginStatus() {
    if (jwt != null) {
        isLoggedHandler()
    } else {
        isNotLoggedHandler()
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "home.html"
}

function isLoggedHandler() {
    let content =
        `<li>
              <a>${username}
              </a>
                        <ul class="g-dropdown" style="width:200px">
                                <li>
                                    <a href="order.html">
                                        <i class="fas fa-cog u-s-m-r-9"></i>
                                        My Order History</a>
                                </li>
                                <li>
                                    <a href="profile.html">
                                        <i class="far fa-heart u-s-m-r-9"></i>
                                        My Profile</a>
                                </li>
                                
                            </ul>
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

function isNotLoggedHandler() {
    let content =
        `
        <li>
              <a href="account.html">Login / Signup
              </a>
        </li>
        `
    $(".secondary-nav").html(content)
}