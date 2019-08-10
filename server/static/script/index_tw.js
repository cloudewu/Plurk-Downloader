/* element */
var alertBlock = null;
var statusBlock = null;
var btn_submit = null;
var server_url = "http://127.0.0.1:8765/backup";
// var server_url = "http://140.114.195.85:8765/backup";

/* properties */
var BTN_CLICKED = false;
var ALERT_TIME = 2000;	// 2s

/**
 * comment
 */
function ErrorHandler(type, message) {
	/* enable submit btn */
	BTN_CLICKED = false;
	btn_submit.removeClass("disabled");
	
	/* set alert */
	alertBlock.html("<div class=\"alert alert-danger\">似乎出了點問題，晚點再試試！</div>")
	alertBlock.fadeIn("slow");
	setTimeout(()=>{alertBlock.fadeOut("slow")}, ALERT_TIME);
	
	switch(type){
	case "RequestFail":
		$("#status").html("<div><span class=\"status-icon badge badge-danger\">Error</span><span class=\"status-content\">請求失敗，請檢查連線，或者請稍後再試。</span></div>");
		break;
	case "ProcessFail":
		$("#status").html("<div><span class=\"status-icon badge badge-danger\">Error</span><span class=\"status-content\">解析失敗，請檢查噗文網址是否正確。</span></div>");
		break;
	default:
		console.log("Unknow error.")
	}
	console.log(message);
}

function GenerateDownloadLink(data) {
	console.log("Request succeed. Start to download.");
	// content = "data:text/plain;charset=UTF-8," + encodeURIComponent(data[result]);
	content = "data:text/plain;charset=UTF-8," + encodeURIComponent("Success!");
	
	/* show alert */
	alertBlock.html("<div class=\"alert alert-success\">擷取成功！現在可以點擊下載檔案了。</div>")
	alertBlock.fadeIn("slow");
	setTimeout(()=>{alertBlock.fadeOut("slow")}, ALERT_TIME);
	
	/* auto-download */
	var blob = new Blob(["Success!"], {type: "data:text/plain;charset=UTF-8"});
	saveAs(blob, "內容.txt");
	
	/* download btn(prevent auto-downloading fail) */
	$("#status").html("<div><span class=\"status-icon badge badge-success\">Success</span><span class=\"status-content\">若沒有自動下載，請點擊<a download=\"內容.txt\" id=\"download-link\">連結</a>下載，或右鍵連結另存為檔案。</span></div>");
	$("#download-link").attr("href", content);
	
	/* enable submit button to make the second download */
	BTN_CLICKED = false;
	btn_submit.removeClass("disabled");
}

function RequestFail(e) {
	ErrorHandler("RequestFail", e);
}

function ProcessReturnData(data) {
	/* check return data */
	if(data[status]==false){
		ErrorHandler("ProcessFail", data[reason]);
	}else{
		GenerateDownloadLink(data);
	}
	
	GenerateDownloadLink(data);
}

function RequestData(rqType, rqUrl, rqData) {
	console.log("Requesting data...");
	/* show loading icon */
	$("#status").html("<div class=\"spinner-border text-success\"/><span class=\"text-dark status-content\">處理中...</span>");
	
	/* get data */
	$.ajax({
		url: rqUrl,
		type: rqType,
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify({"link":rqData}),
		success: ProcessReturnData,
		error: RequestFail
	});
	
	// GenerateDownloadLink(rqData);
	// RequestFail("test");
}

function SubmitClick(event) {
	if(!BTN_CLICKED){
		BTN_CLICKED = true;
		btn_submit.addClass("disabled");
		
		url = $("#plurk-url").val();
		// TODO:
		//   do input examining to prevent attack
		RequestData("POST", server_url, url)
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