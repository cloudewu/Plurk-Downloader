/* element */
var alertBlock = null;
var statusBlock = null;
var input_url = null;
var btn_submit = null;

/* properties */
var BTN_CLICKED = false;
var ALERT_TIME = 2000;	// 2s

/**
 * comment
 */
function ErrorHandler(e, message) {
	console.log("Error: " + e);
	
	BTN_CLICKED = false;
	btn_submit.removeClass("disabled");
	$("#status").html("<p><span class=\"badge badge-danger\">Error</span><span id=\"status-content\">Download fail.</span></p>");
	alertBlock.html("<div class=\"alert alert-danger\">Something wrong. Please try again later.</div>")
	alertBlock.fadeIn("slow");
	setTimeout(function(){alertBlock.fadeOut("slow")}, ALERT_TIME);
}

function GenerateDownloadLink(data) {
	console.log("Request succeed. Start to download.");
	
	// content = "data:text/plain;charset=UTF-8," + encodeURIComponent(data[result]);
	content = "data:text/plain;charset=UTF-8," + encodeURIComponent("Success!");
	
	var blob = new Blob(["Success!"], {type: "data:text/plain;charset=UTF-8"});
	saveAs(blob, "content.txt");
	
	$("#status").html("<a type=\"button\" download=\"content.txt\" class=\"btn btn-secondary\" id=\"download-btn\">Download</a>");
	$("#download-btn").attr("href", content);
	
	BTN_CLICKED = false;
	btn_submit.removeClass("disabled");
	alertBlock.html("<div class=\"alert alert-success\">Request success! You can download the file now.</div>")
	alertBlock.fadeIn("slow");
	setTimeout(function(){alertBlock.fadeOut("slow")}, ALERT_TIME);
}

function RequestData(rqType, rqUrl, rqData) {
	console.log("Requesting data...");
	// show loading icon
	$("#status").html("<div class=\"spinner-border text-success\"/><span class=\"text-dark\" id=\"status-content\">Processing...</span>");
	
	/* get data */
	// $.ajax({
		// url: rqUrl,
		// type: rqType,
		// dataType: 'json',
		// contentType: 'application/json',
		// data: JSON.stringify({"link":rqData}),
		// success: GenerateDownloadLink,
		// error: ErrorHandler
	// });
	
	GenerateDownloadLink(rqData);
	// ErrorHandler("test");
}

function SubmitClick(event) {
	if(!BTN_CLICKED){
		BTN_CLICKED = true;
		btn_submit.addClass("disabled");
		
		url = $("#plurk-url").val();
		// TODO:
		//   do input examining to prevent attack
		RequestData("POST", "http://140.114.195.85:8765/backup", url)
	}
}

function onload() {
	/* get component */
	alertBlock = $("#alert");
	statusBlock = $("#status");
	btn_submit = $("#plurk-url-submit");
	
	/* page ready, registor event respectively */
	btn_submit.click(SubmitClick);
	alertBlock.removeClass("d-none").hide();
}

$(document).ready(onload);