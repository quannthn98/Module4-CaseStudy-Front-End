let baseUrl = "http://localhost:8080"

function login(){
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
        success: function (data){
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
        },
        async: false
    }).fail(function (){
        swal({
            title: "Login error",
            text: "Username or password is incorrect",
            icon: "error"
        })
    })
}



function register(){
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
            console.log(data)
        }
    }).fail(function (){
        swal({
            title: "Register failed",
            text: "Username"
        })
    })
}

$(document).ready(function (){
    $("#register-button").on('click', function (){
        register();
    })
})