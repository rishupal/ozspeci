/*function postData(input) {
    $.ajax({
        type: "POST",
        url: "/reverse_pca.py",
        data: { param: input },
        success: callbackFunc
    });
}

function callbackFunc(response) {
    // do something with the response
    console.log(response);
}

postData('data to process');*/

$("#target").click(function(){
 
 function postData(input) {
    $.ajax({
        type: "POST",
        url: "~/server.py",
        data: { param: input },
        success: callbackFunc

    });
    console.log(url);
        console.log(data);
}

function callbackFunc(response) {
    // do something with the response
    console.log(response);
}

postData('data to process');
});