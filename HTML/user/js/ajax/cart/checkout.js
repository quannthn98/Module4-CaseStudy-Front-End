

function showCartDetail(){
    let url = `${baseUrl}/users/cart`
    $.ajax({
        type: "GET",
        url: url,
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxdWFueWI5ODEiLCJpYXQiOjE2MzYxNjU5ODQsImV4cCI6ODgwMzYxNjU5ODR9.dtTA4i_YP2P-cCWenHQsS-EWlRvogsKWcdV4BCIvLLAHKrrANwrMb2dEWk06q5RLjBsXhKKMDmBzJX_8K0GPCg"
        },
        success: function (){

        }
    })
}

function drawCartDetail(data){
    let content = "";
    let estimatedPayment = 0;
    for (let i = 0; i < data.length; i++) {

    }
}