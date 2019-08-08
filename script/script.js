
function ErrorHandler(e) {
	console.log("Error: " + e);
	$("#status").html("<p><span class=\"badge badge-danger\">Error</span>Download fail.</p>");
}

function GenerateDownloadLink(data) {
	console.log("Request succeed. Start to download.");
	
	// show loading icon
	$("#status").html("<div class=\"spinner-border text-success\"><span class=\"sr-only\">Loading...</span></div>");
	
	// get data 
	// $.ajax({
		// url: rqUrl,
		// type: rqType,
		// dataType: 'json',
		// contentType: 'application/json',
		// data: JSON.stringify({"link":rqData}),
		// success: GenerateDownloadLink,
		// error: ErrorHandler
	// });
	content = "data:text/plain;charset=UTF-8," + data;
	
	// show download button
	$("#status").html("<a type=\"button\" download=\"content.txt\" class=\"btn btn-secondary\" id=\"download-btn\">Download</a>");
	$("#download-btn").attr("href", content);
}

function RequestData(rqType, rqUrl, rqData) {
	console.log("Requesting data...");
	GenerateDownloadLink(rqData);
	// ErrorHandler("test");
}

function SubmitClick(event) {
	url = $("#plurk-url").val();
	console.log(url);
	// TODO:
	//   do input examining to prevent attack
	RequestData("Post", "http://140.114.195.85:8765/backup", url)
}

function onload() {
	console.log("page ready.")
	$("#plurk-url-submit").click(SubmitClick);
}

$(document).ready(onload);