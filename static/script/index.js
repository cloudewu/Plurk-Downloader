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

/**
 * Show floating alert.
 * @param {string} type - Boostrap type to choose alert color
 * @param {string} message - message shown in alert bubble
 */
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
 * Update pin-note status content.
 * @param iconClass -  
 *        Classes list you want to assign to pin ('.pin' is loaded by default). Note that original classes will be discarded. 
 *        (passing null to preserve all old classes)
 * @param iconText - innerHTML you want to assign to pin
 * @param noteClass - 
 *        Classes list you want to assign to pin ('.note' is loaded by default). Note that original classes will be discarded. 
 *        (assign null to preserve all old classes)
 * @param noteText - innerHTML you want to assign to note
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
 * @param retCode - error code that follows HTTP response format. (0 for client request error)
 * @param message - error description.
 */
function ErrorHandler(retCode, message) {
	/* set alert */
	ShowAlert("danger", "似乎出了點問題，晚點再試試！")
	
	switch(retCode){
	case 0:
		/* request fail */
		UpdateStatus(['badge', 'badge-danger'], "Fail", null, "請求失敗，請檢查連線，或者請稍後再試。");
		console.error("Request Fail\n" + message);
		break;
	case 403:
		/* private plurk */
		UpdateStatus(['badge', 'badge-danger'], "Fail", null, "存取失敗，請檢查該噗是否為私噗，或噗主是否有鎖河道。");
		console.error("403\n" + message);
		break;
	case 404:
		/* plurk not found */
		UpdateStatus(['badge', 'badge-danger'], "Fail", null, "請求失敗，請噗文網址是否正確。");
		console.error("404\n" + message);
		break;
	case 500:
		/* internal server error */
		UpdateStatus(['badge', 'badge-danger'], "Fail", null, "內部錯誤，請稍後再試。若多次出現，請協助填寫問題回報");
		console.error("500\n" + message);
		break;
	default:
		UpdateStatus(['badge', 'badge-danger'], retCode, null, "未知錯誤，請協助填寫問題回報。");
		console.warn("Unknow error.");
		console.error(retCode + "\n" + message);
	}
	
	submitBtnRestore();
}

/** Generate a fake form-submit event to send hidden POST request to server to show result in new tab */
function openDownloadPage(content) {
	$("#download-content").val(content);
	$("#download-request-form").submit();
}

function GenerateDownloadLink(data) {
	console.log("Request succeed. Open file in new tab.");
	ShowAlert("success", "擷取成功！現在可以點擊下載檔案了。");
	
	content = encodeURIComponent(data['content']);
	
	UpdateStatus(['badge', 'badge-success'], "success", null, "若沒有顯示檔案，請點擊<a href=\"/download\" id=\"download-link\">連結</a>手動開啟畫面。");
	console.log("openDownloadPage(\""+content+"\"); return false;");
	$("#download-link").attr("onclick", "openDownloadPage(\""+content+"\"); return false;");

	openDownloadPage(content);
	submitBtnRestore();
}

function RequestFail(e) {
	ErrorHandler("RequestFail", e);
}

function ProcessReturnData(data) {
	var retCode = data['status_code'];
	if(retCode==200){
		GenerateDownloadLink(data);
	}else{
		ErrorHandler(retCode, data['reason']);
	}
}

/**
 * Send request to backend through ajax.
 * @param rqType - request type like "POST", "GET", etc.
 * @param rqUrl -  request destination.
 * @param rqData - request data.
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

/**
 * Sanitize and validate user input
 * @param {string} input - plurk url
 */
function inputPrecheck(input) {
	/* strip string */
	url = input.replace(/^\s+|\s+$/g, '');
	
	/* preclude invalid charactors */
	let validChars = /^[\d|a-zA-Z:/.\/]+$/;
	if(!validChars.test(url)) {
		UpdateStatus(['badge', 'badge-danger'], "Error", null, "輸入不正確。請確保輸入不含非法符號，且輸入欄不可為空。");
		return null;
	}
	
	/* deal with mobile url: 'plurk.com/m/p/xxxx' -> 'plurk.com/p/xxxx' */
	url = url.replace(/com\/m\/p/g, 'com/p');
	
	/* automatically append protocal: http/https */
	if(!url.startsWith('http')) {
		url = 'https://' + url;
	}
	
	/** check url format
	 * valid format:
	 *   - http://www.plurk.com/p/xxxx
	 *   - https://www.plurk.com/p/xxxx
	 */
	urlFormat = validFormat = /^((http|https):\/\/)?www.plurk.com\/p\/([\da-z]+)$/
	if(!urlFormat.test(url)) {
		UpdateStatus(['badge', 'badge-danger'], "Error", null, "網址格式不正確。請確保輸入網址為噗文網址。<br/>(www.plurk.com/p/...或www.plurk.com/m/p/...)");
		return null;
	}
	
	console.log("Processed url:" + url);
	return url;
}

/** restore submit button status and re-enable input again */
function submitBtnRestore() {
	state.BTN_CLICKED = false;
	elements.btnSubmit.removeClass("disabled");
}

function urlRequestSubmit(event) {
	if(!state.BTN_CLICKED){
		state.BTN_CLICKED = true;
		elements.btnSubmit.addClass("disabled");
		elements.statusBlock.show();		
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
	elements.statusBlock = $("#status-block");
	elements.statusIcon = $("#status-icon");
	elements.statusMsg = $("#status-msg");
	elements.btnSubmit = $("#plurk-url-submit");
	elements.inputURL = $("#plurk-url");
	
	/* page ready, regist events respectively */
	elements.btnSubmit.click(urlRequestSubmit);
	elements.inputURL.keypress(keyEnterPress);
	
	/* setting */
	elements.statusBlock.hide();
	elements.alertBlock.removeClass("d-none").hide();
	state.BTN_CLICKED = false;
}

$(document).ready(onload);
