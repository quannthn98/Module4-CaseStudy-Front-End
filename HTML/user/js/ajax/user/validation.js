let isUserUsed = false;

$().ready(function () {
    $("#register-form").validate({
        rules: {
            "username": {
                required: true,
                minlength: 6,
                maxlength: 18,
            },
            "password": {
                required: true,
                minlength: 6,
                maxlength: 18,
            },
            "email": {
                required: true,
                email: true
            },
            "fullName": {
                required: true,
                minlength: 4,
                maxlength: 50
            },
            "address": {
                required: true,
                minlength: 4,
                maxlength: 255,
            },
            "phone": {
                required: true,
                minlength: 10,
                maxlength: 11,
            }
        },
        messages: {
            "username": {
                required: "Username must not be empty",
                maxlength: "Username must between 6-18 characters",
                minlength: "Username must between 6-18 characters"
            },
            "password": {
                required: "Password must not be empty",
                maxlength: "Password must between 6-18 characters",
                minlength: "Password must between 6-18 characters"
            },
            "email": {
                required: "Email must not be empty",
                accept: "Email must not contain any special characters like %,_,!,?"
            },
            "address": {
                required: "Address must not be empty",
                maxlength: "Address too long",
                minlength: "Address too short"
            },
            "phone": {
                required: "Phone number must not be empty",
                minlength: "Phone number must between 10-11 numbers",
                maxlength: "Phone number must between 10-11 numbers"
            }
        }
    })
})

$(document).ready(function () {
    $("#register-form").on('change', function () {
        let content = ""
        if (isFormValid()) {
            content = `<button type="button" onclick="register()" id="register-button" class="button button-primary w-100">Register</button>`
        } else {
            content = `<button disabled style="background-color: gray" type="button" id="register-button" class="button button-primary w-100">Register</button>`
        }
        $("#register-button-wrapper").html(content)

    })
})

function isFormValid() {
    if ($("#register-form").valid() && isUserUsed == false) {
        return true
    } else {
        return false;
    }
}

$(document).ready(function () {
    $("#username").on('change', function () {
        event.preventDefault();
        let username = $("#username").val();
        let user = {
            username: username
        }
        $.ajax({
            async: false,
            url: `${baseUrl}/username/check`,
            type: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            data: JSON.stringify(user),
            success: function () {
                isUserUsed = false;
                if ($("#username").valid()) {
                    $("#username-useable").text("Username is available")
                    $("#username-duplicated").text("")
                } else {
                    $("#username-useable").text("")
                    $("#username-duplicated").text("")
                }

                console.log('ok')
            },
            error: function () {
                isUserUsed = true;
                $("#username-useable").text("")
                $("#username-duplicated").text("Username has been used, please choose others")
            }
        })
    })
})
