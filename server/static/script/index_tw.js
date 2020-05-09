/* element */
var elements = 
	{
		alertBlock: null,
		statusBlock: null,
		btnSubmit: null,
		inputURL: null
	}

/* properties */
var state = 
	{
		BTN_CLICKED: false		// recored if the button is clicked or not
	};
var properties = 
	{
		ALERT_TIME: 2000		// how long the pop-up alert will fade out
	};

function ShowAlert(type, message)
{
	if(type!="primary" && type!="sencodary" && type!="success" && type!= "danger" && type!= "warning" && type!= "info" && type!= "lignt" && type!= "dark")
	{
		console.warn("Unknow status type: " + type);
		return;
	}
	
	elements.alertBlock.html("<div class=\"alert alert-" + type + "\">" + message + "</div>")
	elements.alertBlock.fadeIn("slow");
	setTimeout(()=>{elements.alertBlock.fadeOut("slow")}, properties.ALERT_TIME);
}

function UpdateStatus(type, message)
{
	if(type!="primary" && type!="sencodary" && type!="success" && type!= "danger" && type!= "warning" && type!= "info" && type!= "lignt" && type!= "dark")
	{
		console.warn("Unknow status type: " + type);
		return;
	}
	let badge = "<span class=\"status-icon badge badge-" + type + "\">" + type + "</span>";
	let content = "<span class=\"status-content\">" + message + "</span>";
	
	elements.statusBlock.html("<div>" + badge + content + "</div>");
}

/**
 * Handle processing errors and show in floating alert pop-up and status bar.
 * @param type: error type.
 * @param message: error message information (best provided for debug).
 */
function ErrorHandler(type, message) {
	/* enable submit btn */
	state.BTN_CLICKED = false;
	elements.btnSubmit.removeClass("disabled");
	
	/* set alert */
	ShowAlert("danger", "似乎出了點問題，晚點再試試！")
	
	switch(type){
	case "RequestFail":
		UpdateStatus("danger", "請求失敗，請檢查連線，或者請稍後再試。");
		break;
	case "ProcessFail":
		UpdateStatus("danger", "解析失敗，請檢查噗文網址是否正確。");
		break;
	default:
		console.log("Unknow error.")
	}
	console.log(message);
}

function GenerateDownloadLink(data) {
	console.log("Request succeed. Open file in new tab.");
	ShowAlert("success", "擷取成功！現在可以點擊下載檔案了。");
	
	content = encodeURIComponent(data['content']);
	
	/* auto-download */
	// var filename = data['title'] +".txt"
	// var blob = new Blob([data['content']], {type: "data:text/plain;charset=UTF-8"});
	// saveAs(blob, filename);
	
	/* download btn(prevent auto-downloading fail) */
	UpdateStatus("success", "若沒有顯示檔案，請點擊<a id=\"download-link\" target=\"_blank\">連結</a>手動開啟畫面。");
	$("#download-link").attr("href", '/download?content=' + content);
	window.open('/download?content=' + content, '_blank');
	
	/* enable submit button to make the second download */
	state.BTN_CLICKED = false;
	elements.btnSubmit.removeClass("disabled");
}

function RequestFail(e) {
	ErrorHandler("RequestFail", e);
}

function ProcessReturnData(data) {
	/* check return data */
	// console.log("Data:\n",data)
	if(data['status_code']!=200){
		ErrorHandler("ProcessFail", data['reason']);
	}else{
		GenerateDownloadLink(data);
	}

}

/**
 * send request to backend through ajax.
 * @param rqType: request type like "POST", "GET", etc.
 * @param rqUrl:  request destination.
 * @param rqData: request data.
 */
function RequestData(rqType, rqUrl, rqData) {
	console.log("Requesting data...");
	/* show loading icon */
	elements.statusBlock.html("<div class=\"spinner-border text-success\"/><span class=\"text-dark status-content\">處理中...</span>");
	
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

function submitClick(event) {
	if(!state.BTN_CLICKED){
		state.BTN_CLICKED = true;
		elements.btnSubmit.addClass("disabled");
		
		url = $("#plurk-url").val();

		// TODO:
		//   do input examining to prevent attack
		RequestData("POST", "/backup", url)
	}
}

function keyEnterPress(event)
{
	var keycode = event.keyCode || e.which;
	if (keycode === 13) {
		event.preventDefault();
		elements.btnSubmit.click();
    }
}

function onload() {
	/* get component */
	elements.alertBlock = $("#alert");
	elements.statusBlock = $("#status");
	elements.btnSubmit = $("#plurk-url-submit");
	elements.inputURL = $("#plurk-url");
	
	/* page ready, registor events respectively */
	elements.btnSubmit.click(submitClick);
	elements.inputURL.keypress(keyEnterPress);
	
	/* setting */
	elements.alertBlock.removeClass("d-none").hide();
	state.BTN_CLICKED = false;
}

$(document).ready(onload);
