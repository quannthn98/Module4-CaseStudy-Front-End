function showOrders(){
    let url = `${baseUrl}/users/order`;
    $.ajax({
        type: "GET",
        url: url,
        headers:{
            "Authorization": "Bearer " + localStorage.token
        },
        success: function (data){
            console.log(data)
        }
    }).fail(function (){
        console.log('fail')
    })
}

