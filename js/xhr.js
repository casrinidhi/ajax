(function(){
    window.app = {}; /* Use your project namespace */

    app.xhr = function(){};

    // GET requests
    // @url (string) URL to fetch
    // @onSuccess (function) success callback
    // @onError (function) error callback
    // @onPending (function) cached pending request callback
    // @extraParams (object)
    app.xhr.prototype.get = function(url, onSuccess, onError, onPending, extraParams) {
        sendRequest('GET', url, null, onSuccess, onError, onPending, extraParams);
    };

    // POST requests
    // @url (string) URL to fetch
    // @data (object)
    // @onSuccess (function) success callback
    // @onError (function) error callback
    // @onPending (function) cached pending request callback
    // @extraParams (object)
    app.xhr.prototype.post = function(url, data, onSuccess, onError, onPending, extraParams) {
        sendRequest('POST', url, data, onSuccess, onError, onPending, extraParams);
    };

    // PUT requests
    // @url (string) URL to fetch
    // @data (object)
    // @onSuccess (function) success callback
    // @onError (function) error callback
    // @onPending (function) cached pending request callback
    // @extraParams (object)
    app.xhr.prototype.put = function(url, data, onSuccess, onError, onPending, extraParams) {
        sendRequest('PUT', url, data, onSuccess, onError, onPending, extraParams);
    };

    // PATCH requests
    // @url (string) URL to fetch
    // @data (object)
    // @onSuccess (function) success callback
    // @onError (function) error callback
    // @onPending (function) cached pending request callback
    // @extraParams (object)
    app.xhr.prototype.patch = function(url, data, onSuccess, onError, onPending, extraParams) {
        sendRequest('PATCH', url, data, onSuccess, onError, onPending, extraParams);
    };

    // DELETE requests
    // @url (string) URL to fetch
    // @onSuccess (function) success callback
    // @onError (function) error callback
    // @onPending (function) cached pending request callback
    // @extraParams (object)
    app.xhr.prototype.destroy = function(url, onSuccess, onError, onPending, extraParams) {
        sendRequest('DELETE', url, null, onSuccess, onError, onPending, extraParams);
    };


    sendRequest = function(method, url, data, onSuccess, onError, onPending, extraParams) {

        /* Create default parameters */
        var onSuccess = $.isFunction(onSuccess) ? onSuccess : function(result){};
        var onError = $.isFunction(onError) ? onError : function(result){};
        var onPending = $.isFunction(onPending) ? onPending : function(result){};

        extraParams.shouldAuthenticate = extraParams.shouldAuthenticate || false; /* if it is set to true, pass "username" and "password" */
        extraParams.async = extraParams.async || true;
        extraParams.contentType = extraParams.contentType;
        extraParams.accept = extraParams.accept || "application/json";
        extraParams.dataType = extraParams.dataType || "application/json";
        extraParams.timeout = extraParams.timeout || 30000;
        extraParams.headers = extraParams.headers || {};
        extraParams.processData = extraParams.processData || false;

        /* prepare data to be sent */
        var wireData;
        if (data) {

            /* if JSON data */
            if (extraParams.contentType && extraParams.contentType.indexOf("application/json") != -1) {
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
        var enableKeepAlive = extraParams.noKeepAlive ? false : true;
        var uname = encodeURIComponent(extraParams.username);
        var passwd = encodeURIComponent(extraParams.password);

        /* Create HTTP connection */
        var xhrRequest = $.ajax({
            type: method,
            url: url,
            async: extraParams.async,
            success: onSuccess,
            error: onError,
            timeout: extraParams.timeout,
            username: uname,
            password: passwd,
            headers: extraParams.headers,
            processData: extraParams.processData,
            contentType: extraParams.contentType,

            beforeSend: function(xhr, settings){
                if (wireData && method === "POST" || method === "PUT") {
                    settings.data = wireData;
                }
            }
        });

        console.log("xhr request sent - " + url);

        xhrRequest.done(function(data, textStatus, jqXHR ) {
            console.log("xhr request done");
        });
    };
})();
