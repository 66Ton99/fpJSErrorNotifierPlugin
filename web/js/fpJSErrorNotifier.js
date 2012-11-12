window.fpJSErrorNotifier = (function(window) {
  var self = this;

  var img;

  var makeRequest = function(url, params) {
    var paramsString = '';

    for(var i in params) {
      paramsString = paramsString + i + "=" + encodeURIComponent(params[i]) + "&";
    }

    var createRequestObject = function() {
      if (typeof XMLHttpRequest === 'undefined') { // IE
        XMLHttpRequest = function() {
          try { return new ActiveXObject("Microsoft.XMLHTTP"); }
          catch(e) {}
          try { return new ActiveXObject("Msxml2.XMLHTTP"); }
          catch(e) {}
          try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
          catch(e) {}
          try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
          catch(e) {}
          return false;
        };
      }
      return new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
    }

    try {
      if (httpRequest = createRequestObject()) {
        httpRequest.open('POST', url);
        httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        httpRequest.send(paramsString);
        return true;
      }
    } catch (e) {}

    // create Image if it's not created already.
    if (null == img) {
      img = new Image();
    }

    // send request
    img.src = url + "?" + paramsString;
  }


  this.sendEmail = function(msg, file, line, url) {
    if (!url) {
      url = window.location.href;
    }

    makeRequest(
      '/test/fpJSErrorNotifier',
      {
        msg: msg,
        path: url,
        file: file,
        line: line,
        url: url,
        userAgent: window.navigator.userAgent
      }
    );
  }

  window.onerror = function (msg, file, line) {
    self.sendEmail(msg, file, line);
    return true;
  };
  return this;
})(window);
