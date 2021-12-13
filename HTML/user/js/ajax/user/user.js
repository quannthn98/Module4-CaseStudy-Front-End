
function login() {
    let username = $("#user-name-email").val();
    let password = $("#login-password").val();
    let user = {
        username: username,
        password: password
    }

    $.ajax({
        type: "POST",
        url: `${baseUrl}/login`,
        data: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        success: function (data) {
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('password', data.password);
            console.log(data.roles[0].authority)
            let authority = data.roles[0].authority
            let string = JSON.stringify(authority)
            console.log(string)
            if (authority == 'ROLE_USER'){
                window.location.href = "home.html"
                // window.location.href = "home.html"
            } else if (authority == 'ROLE_ADMIN'){
                window.location.href = "admin.html";
            }
        }
    }).fail(function () {
        swal({
            title: "Login error",
            text: "Username or password is incorrect",
            icon: "error"
        })
    })
}


function register() {
    let username = $("#username").val();
    let password = $("#password").val();
    let email = $("#email").val()
    let fullName = $("#fullName").val();
    let birthday = $("#birthday").val();
    let age = $("#age").val();
    let address = $("#address").val();
    let phone = $("#phone").val();

    let user = {
        username: username,
        password: password,
        email: email,
        fullName: fullName,
        birthDay: birthday,
        age: age,
        address: address,
        phone: phone,
        roles: [{
            id: "2"
        }]
    }

    $.ajax({
        type: "POST",
        url: `${baseUrl}/register`,
        data: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        success: function (data) {
            swal({
                title: "Register successfully",
                text: "Your account had been created, please login to go shopping",
                icon: "success"
            })
            loginAfterRegister(username, password)
            console.log(data)
        }
    }).fail(function () {
        swal({
            title: "Register failed",
            text: "Username has been taken",
            icon: "error"
        })
    })
}

function loginAfterRegister(username, password){
    let user = {
        username: username,
        password: password
    }
    $.ajax({
        type: "POST",
        url: `${baseUrl}/login`,
        data: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        success: function (data) {
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('password', data.password);
            console.log(data.roles[0].authority)
            let authority = data.roles[0].authority
            let string = JSON.stringify(authority)
            console.log(string)
            if (authority == 'ROLE_USER'){
                window.location.href = "home.html"
                // window.location.href = "home.html"
            } else if (authority == 'ROLE_ADMIN'){
                window.location.href = "admin.html";
            }
        }
    })
}

function changePassword(){
    if (!checkJwt()){
        let currentPassword = $("#currentPassword").val();
        let user = {
            password: currentPassword
        }
        checkPassword(currentPassword)
    }
}

$(document).ready(function (){
    $("#re-confirm-password").on('change', function (){
        let newPassword = $("#newPassword").val();
        let confirmPassword = $("#re-confirm-password").val();
        if (newPassword != confirmPassword){
            $(".confirm-pass-error").text("Confirm password dont match new password")
        }
    })
})

function checkPassword(password){
    $.ajax({
        type: "POST",
        url: `${baseUrl}/users/password/check`,
        data: password,
        headers: {
            "Authorization": "Bearer " + localStorage.token,
            "Accept": 'application/json',
            "Content-type": 'application/json'
        },
        success: function (data){
            let newPassword = $("#newPassword").val()
            let user = {
                password: newPassword
            }
            $.ajax({
                type: "PUT",
                url: `${baseUrl}/users/password`,
                data: JSON.stringify(user),
                headers: {
                    "Authorization": 'Bearer ' + localStorage.token,
                    "Accept": 'application/json',
                    "Content-type": 'application/json'
                },
                success: function (data){
                    console.log(data)
                }
            }).fail(function (){
                console.log('fail')
            })
        }
    }).fail(function (){
        return false;
    })
}



function showProfile(){
    let username = $("#username").val();
    let password = $("#password").val();
    let email = $("#email").val()
    let fullName = $("#fullName").val();
    let birthday = $("#birthday").val();
    let age = $("#age").val();
    let address = $("#address").val();
    let phone = $("#phone").val();

    $.ajax({

    })

}
