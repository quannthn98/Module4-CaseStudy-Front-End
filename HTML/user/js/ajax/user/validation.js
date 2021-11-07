// $().ready(function (){
//     $("#register-form").validate({
//         rules:{
//             "username": {
//                 required: true,
//                 minlength: 6,
//                 maxlength: 18,
//             },
//             "password": {
//                 required: true,
//                 minlength: 6,
//                 maxlength: 18,
//             },
//             "email": {
//                 required: true,
//                 email: true,
//                 accept:"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}"
//             },
//             "fullName": {
//                 required: true,
//                 minlength: 4,
//                 maxlength: 50
//             },
//             "address": {
//                 required: true,
//                 minlength: 4,
//                 maxlength: 255,
//             },
//             "phone": {
//                 required: true,
//                 minlength: 10,
//                 maxlength: 11,
//             },
//             "terms": {
//                 required: true
//             }
//         },
//         messages: {
//             "username": {
//                 required: "Username must not be empty",
//                 maxlength: "Username must between 6-18 characters",
//                 minlength: "Username must between 6-18 characters"
//             },
//             "password": {
//                 required: "Password must not be empty",
//                 maxlength: "Password must between 6-18 characters",
//                 minlength: "Password must between 6-18 characters"
//             },
//             "email": {
//                 required: "Email must not be empty",
//                 accept: "Email must not contain any special characters like %,_,!,?"
//             },
//             "address": {
//                 required: "Address must not be empty",
//                 maxlength: "Address too long",
//                 minlength: "Address too short"
//             },
//             "phone": {
//                 required: "Phone number must not be empty",
//                 minlength: "Phone number must between 10-11 numbers",
//                 maxlength: "Phone number must between 10-11 numbers"
//             }
//         }
//     })
// })

$(document).ready(function (){
        $("#register-form").validate({
            rules: {
                "username": {
                    required: true,
                    maxlength: 12
                },
                "password": {
                    required: true,
                    maxlength: 12
                }
            },
            messages: {
                "username": {
                    required: "username must not be empty",
                    maxlength: "username maximum 12 characters"
                },
                "password": {
                    required: "password must be not be empty",
                    maxlength: "password maximum 12 characters"
                }
            }
        })



})