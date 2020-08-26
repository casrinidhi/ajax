function displayResult(data, textStatus, jqXHR) {
	var $outputEle = $('#output');
	$outputEle.append(" ========== Data ========== " + '<br />');
	$outputEle.append(JSON.stringify(data));
	$outputEle.append('<br />');
	$outputEle.append(" ========== Text Status ========== " + '<br />');
	$outputEle.append(textStatus);
	$outputEle.append('<br />');
}

$(document).ready(function() {
	var $urlTxt = $('#url');
	var $dataTxt = $('#data');
	var $extraParamsTxt = $('#extraParams');

	var $getDataBtn = $('#getData');
	var $postDataBtn = $('#postData');
	var $putDataBtn = $('#putData');
	var $patchDataBtn = $('#patchData');
	var $deleteDataBtn = $('#deleteData');

	var onSuccess = function(data, textStatus, jqXHR) {
		displayResult(data, textStatus, jqXHR);
	}

	var onError = function(data, textStatus, jqXHR) {
		displayResult(data, textStatus, jqXHR);
	}

	var onPending = function(data, textStatus, jqXHR) {
		displayResult(data, textStatus, jqXHR);
	}

	// Create instance of xhr
	var xhr = new app.xhr();

	$getDataBtn.click(function(event) {
		event.preventDefault();

		var url = $urlTxt.val() || "https://reqres.in/api/users?page=2";
		var data = $dataTxt.val();
		var extraParams = $extraParamsTxt.val() || "";
		xhr.get(url, onSuccess, onError, onPending, extraParams);

		/* jQuery way */
		/*
		 # var options = { method: "get", url: url, onSuccess: onSuccess,
		 # onError: onError, onPending: onPending }; $.fn.xhrRequest(options);
		 */
	});

	$postDataBtn.click(function(event) {
		event.preventDefault();

		var url = $urlTxt.val() || "https://reqres.in/api/users?page=2";
		var data = $dataTxt.val();
		var extraParams = $extraParamsTxt.val() || "";
		xhr.post(url, data, onSuccess, onError, onPending, extraParams);
	});

	$putDataBtn.click(function(event) {
		event.preventDefault();

		var url = $urlTxt.val() || "https://reqres.in/api/users?page=2";
		var data = $dataTxt.val();
		var extraParams = $extraParamsTxt.val() || "";
		xhr.put(url, data, onSuccess, onError, onPending, extraParams);
	});

	$patchDataBtn.click(function(event) {
		event.preventDefault();

		var url = $urlTxt.val() || "https://reqres.in/api/users?page=2";
		var data = $dataTxt.val();
		var extraParams = $extraParamsTxt.val() || "";
		xhr.patch(url, data, onSuccess, onError, onPending, extraParams);
	});

	$deleteDataBtn.click(function(event) {
		event.preventDefault();

		var url = $urlTxt.val() || "https://reqres.in/api/users?page=2";
		var data = $dataTxt.val();
		var extraParams = $extraParamsTxt.val() || "";
		xhr.destroy(url, data, onSuccess, onError, onPending, extraParams);
	});
})