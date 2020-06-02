/* element */
var elements = 
	{
		alertBlock: null,
		statusIcon: null,
		statusMsg: null,
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

/**
 * Update status pin-note content
 * @param iconClass: 
 *        Classes list you want to assign to pin ('.pin' is loaded by default). Note that original classes will be discarded. 
 *        (passing null to preserve all old classes)
 * @param iconText: innerHTML you want to assign to pin
 * @param noteClass: 
 *        Classes list you want to assign to pin ('.note' is loaded by default). Note that original classes will be discarded. 
 *        (assign null to preserve all old classes)
 * @param noteText: innerHTML you want to assign to note
 */
function UpdateStatus(iconClass, iconText, noteClass, noteText)
{
	if(iconClass != null) {
		elements.statusIcon.removeClass();
		elements.statusIcon.addClass(['pin'].concat(iconClass));
	}
	elements.statusIcon.html(iconText);
	if (noteClass != null) {
		elements.statusMsg.removeClass();
		elements.statusMsg.addClass(['note'].concat(noteClass));
	}
	elements.statusMsg.html(noteText);
}

/**
 * Handle processing errors and show in floating alert pop-up and status bar.
 * @param type: error type.
 * @param message: error message information (best provided for debug).
 */
function ErrorHandler(type, message) {
	/* set alert */
	ShowAlert("danger", "似乎出了點問題，晚點再試試！")
	
	switch(type){
	case "RequestFail":
		UpdateStatus(['badge', 'badge-danger'], "Fail", null, "請求失敗，請檢查連線，或者請稍後再試。");
		break;
	case "ProcessFail":
		UpdateStatus(['badge', 'badge-danger'], "Fail", null, "解析失敗，請檢查噗文網址是否正確。");
		break;
	default:
		console.log("Unknow error.")
	}
	console.log(message);
	
	submitBtnRestore();
}

function GenerateDownloadLink(data) {
	console.log("Request succeed. Open file in new tab.");
	ShowAlert("success", "擷取成功！現在可以點擊下載檔案了。");
	
	content = encodeURIComponent(data['content']);
	
	UpdateStatus(['badge', 'badge-success'], "success", null, "若沒有顯示檔案，請點擊<a id=\"download-link\" target=\"_blank\">連結</a>手動開啟畫面。");
	$("#download-link").attr("href", '/download?content=' + content);
	window.open('/download?content=' + content, '_blank');
	
	submitBtnRestore();
}

function RequestFail(e) {
	ErrorHandler("RequestFail", e);
}

function ProcessReturnData(data) {
	/* check return data */
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
}

function inputPrecheck(input) {
	// strip string
	url = input.replace(/^\s+|\s+$/g, '');
	console.log(url);
	
	// preclude invalid charactors
	let validChars = /^[\d|a-zA-Z:/.\/]+$/;
	if(!validChars.test(url)) {
		UpdateStatus(['badge', 'badge-danger'], "Error", null, "輸入不正確。請確保輸入不含非法符號，且輸入欄不可為空。");
		return null;
	}
	
	// deal with mobile url: 'plurk.com/m/p/xxxx' -> 'plurk.com/p/xxxx'
	url = url.replace(/com\/m\/p/g, 'com/p');
	console.log(url);
	
	// automatically append protocal: http/https
	if(!url.startsWith('http')) {
		url = 'https://' + url;
		console.log(url);
	}
	
	// check url format
	// valid format:
	//   * http://www.plurk.com/p/xxxx
	//   * https://www.plurk.com/p/xxxx
	urlFormat = validFormat = /^((http|https):\/\/)?www.plurk.com\/p\/([\da-z]+)$/
	if(!urlFormat.test(url)) {
		UpdateStatus(['badge', 'badge-danger'], "Error", null, "網址格式不正確。請確保輸入網址為噗文網址。<br/>(www.plurk.com/p/...或www.plurk.com/m/p/...)");
		return null;
	}
	
	return url;
}

// restore submit button status and re-enable input again
function submitBtnRestore() {
	state.BTN_CLICKED = false;
	elements.btnSubmit.removeClass("disabled");
}

function submitClick(event) {
	if(!state.BTN_CLICKED){
		state.BTN_CLICKED = true;
		elements.btnSubmit.addClass("disabled");		
		/* show loading icon */
		UpdateStatus(['spinner-border', 'text-success'], '', null, '處理中...');
		
		url = inputPrecheck($("#plurk-url").val());
		if(url != null) {
			RequestData("POST", "/backup", url)
		}else {
			submitBtnRestore();
		}
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
	elements.statusIcon = $("#status-icon");
	elements.statusMsg = $("#status-msg");
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
