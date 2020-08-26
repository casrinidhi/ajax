
/* 

Protect the $ alias and add scope - 
The $ valriable is very popular among the many javascript libraries. You may use $ for some other librabry or assign some 
other object reference. Thereby, changing the object reference variable for the jquery using jQuery.noConfilct(). 

Put all the code inside immediately invoked function expression. Pass the jQuery function and name the parameter as $

*/

(function($){
	$.xhrRequest = function(options) {

		/* $.extend() is used to customize as there are lot of options. It overrides the options passed */
		var config = $.extend({
			url: "",
			method: "get",
			data: "",
			onSuccess: $.isFunction(this.onSuccess) ? this.onSuccess : function(result){},
			onError: $.isFunction(this.onError) ? this.onError : function(result){},
			onPending: $.isFunction(this.onPending) ? this.onPending : function(result){},
			shouldAuthenticate: false,
			async: true,
	        contentType: "application/json",
	        accept: "application/json",
	        dataType: "application/json",
	        timeout: 30000,
	        headers: {},
	        processData: false,
	        enableKeepAlive: false,
	        username: "",
	        password: ""
		}, options);

		/* Helper functions */
		var makeBaseAuth = function(username, password) {
			var tok = username + ':' + password;
			var hash = btoa(tok);
			return "Basic " + hash;
		}

		/* prepare data to be sent */
        var wireData;
        if (config.data) {
            /* if JSON data */
            if (config.contentType && config.contentType.indexOf("application/json") != -1) {
                var jsonString = JSON.stringify(data);
                
                /* Escape special characters */
                wireData = jsonString.replace(/\\n/g, "\\n")
                                     .replace(/\\'/g, "\\'")
                                     .replace(/\\"/g, '\\"')
                                     .replace(/\\&/g, "\\&")
                                     .replace(/\\r/g, "\\r")
                                     .replace(/\\t/g, "\\t")
                                     .replace(/\\b/g, "\\b")
                                     .replace(/\\f/g, "\\f");
            } else  /* If it is not JSON data, pass data as is. */ 
                wireData = data;
        }

        /* Enable persistent connections, unless expressly disallowed */

        /* Create HTTP connection */
        var xhrRequest = $.ajax({
            type: config.method,
            url: config.url,
            async: config.async,
            success: config.onSuccess,
            error: config.onError,
            timeout: config.timeout,
            headers: config.headers,
            processData: config.processData,
            contentType: config.contentType,

            beforeSend: function(xhr, settings){
                if (wireData && config.method === "POST" || config.method === "PUT") {
                    settings.data = wireData;
                }

                if(config.enableKeepAlive) {
                	xhr.setRequestHeader('Authorization', makeBaseAuth(config.username, config.password));
                }
            }
        });
        
        console.log("xhr request sent - " + config.url);

        xhrRequest.done(function(data, textStatus, jqXHR ) {
            console.log("xhr request done");
        });
	}
}(jQuery));