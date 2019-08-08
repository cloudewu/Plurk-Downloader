// var url = "https://www.plurk.com/p/nfssfb";

var link_search = () => {
    console.log('111');

    // get input text
    var url = $('#link').val();
    console.log(url);

    if (url != '') {
        $.ajax({
            url: "http://127.0.0.1:1234/backup",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({"link":url}),
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Headers': 'X-Custom-Header',
            //     'Access-Control-Allow-Credentials': 'true'
            // },
            success: function(response) {
                $('#log').append(`post link ${url} has response`);  
                console.log('receive response');
                console.log(response);       
            },
            error: function(error) {
                alert('Error:' + JSON.stringify(error));
            }
        });
    } else {
        $('#log').append(`please enter a link<br>`);
    }

};

