
function ErrorHandler(e) {
	console.log("Error: " + e);
	$("#status").html("<p><span class=\"badge badge-danger\">Error</span>Download fail.</p>");
}

function GenerateDownloadLink(data) {
	console.log("Request succeed. Start to download.");
	
	// content = "data:text/plain;charset=UTF-8," + encodeURIComponent(data[result]);
	content = "data:text/plain;charset=UTF-8," + encodeURIComponent("Success!");
	
	// show download button
	$("#status").html("<a type=\"button\" download=\"content.txt\" class=\"btn btn-secondary\" id=\"download-btn\">Download</a>");
	$("#download-btn").attr("href", content);
}

function RequestData(rqType, rqUrl, rqData) {
	console.log("Requesting data...");
	// show loading icon
	$("#status").html("<div class=\"spinner-border text-success\"><span class=\"sr-only\">Loading...</span></div>");
	
	// get data 
	// $.getJSON(
		// rqUrl,
		// {link: rqData},
		// GenerateDownloadLink
	// );
	$.ajax({
		url: rqUrl,
		type: rqType,
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify({"link":rqData}),
		success: GenerateDownloadLink,
		error: ErrorHandler
	});
	
	// GenerateDownloadLink(rqData);
	// ErrorHandler("test");
}

function SubmitClick(event) {
	url = $("#plurk-url").val();
	// TODO:
	//   do input examining to prevent attack
	RequestData("POST", "http://140.114.195.85:8765/backup", url)
}

function onload() {
	console.log("page ready.")
	$("#plurk-url-submit").click(SubmitClick);
}

$(document).ready(onload);