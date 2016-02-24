tsunami = this.tsunami || {};
tsunami.load = tsunami.load || {};

tsunami.load.image = function(url, img) {

	if (!img) {
		img = new Image();
	}

	var promise = new Promise(function(resolve, reject) {

		var loadHandler = function() {
			img.removeEventListener("load", loadHandler);
			img.removeEventListener("error", errorHandler);
			promise.progress = 1;
			resolve(img);
		};

		var errorHandler = function(event) {
			img.removeEventListener("load", loadHandler);
			img.removeEventListener("error", errorHandler);
			promise.progress = 1;
			reject(img);
		};

		img.addEventListener("load", loadHandler);
		img.addEventListener("error", errorHandler);

		try {
			img.src = url;
		} catch(error) {
			reject(img);
		}
		//setTimeout(function() {img.src = url;}, Math.random() * 1000);

	});

	promise.progress = 0;

	return promise;

};

tsunami.load.progressiveImage = function(url, img) {

	if (!img) {
		img = new Image();
	}

	var promise = tsunami.load.xhr(url, "GET", null, null, "blob", false);
	var promise2 = promise.then(function(xhr) {
		return new Promise(function(resolve, reject) {

			img.onload = function() {
				URL.revokeObjectURL(img.src);
				resolve(img);
			};

			img.src = URL.createObjectURL(xhr.response);

		});
	});

	Object.defineProperty(promise2, "progress", {
		get: function () {
			return promise.progress;
		}
	});

	return promise2;

};

tsunami.load.xhr = function(url, method, data, requestHeaders, responseType, noCache) {

	var promise = new Promise(function(resolve, reject) {

		if (!method) {
			method = "GET";
		}

		var xhr = new XMLHttpRequest();

		if (responseType) {
			xhr.responseType = responseType;
		}

		xhr.onload = function(event) {
			promise.progress = 1;
			resolve(xhr);
		};

		xhr.onprogress = function(event) {
			if (event.lengthComputable) {
				promise.progress = event.loaded / event.total;
			}
		};

		xhr.onerror = function(event) {
			promise.progress = 1;
			reject(event);
		};

		xhr.onreadystatechange = function() {
			//console.log("xhr.status", this.xhr.status);
			//console.log("xhr.readyState", this.xhr.readyState);
		};

		var url2 = url;
		if (noCache) {
			var random = Math.round(Math.random() * 1000000000);
			if (url2.indexOf("?") == -1) {
				url2 += "?"
			} else {
				url2 += "&"
			}
			url2 += "nocache=" + random.toString();
		}

		xhr.open(method, url2, true);

		if (requestHeaders) {
			for (var i = 0; i < requestHeaders.length; i++) {
				var requestHeader = requestHeaders[i];
				xhr.setRequestHeader(requestHeader[0], requestHeader[1]);
			}
		}

		if (data) {
			xhr.send(data);
		} else {
			xhr.send();
		}

	});

	promise.progress = 0;

	return promise;

};

tsunami.load.htmlTemplates = function(url) {

	var promise = tsunami.load.xhr(url, "GET", null, null, "text", null);
	var promise2 = promise.then(function(xhr) {
		var container = document.createElement("div");
		container.innerHTML = xhr.response;
		var scripts = container.querySelectorAll("script");
		if (!tsunami.templates) {
			tsunami.templates = {};
		}
		for (var i = 0; i < scripts.length; i++) {
			var script = scripts.item(i);
			var template = script.text;
			if (tsunami.mustacheParse) {
				template = tsunami.mustacheParse(template);
			}
			tsunami.templates[script.id] = template;
		}
		return tsunami.templates;
	});

	Object.defineProperty(promise2, "progress", {
		get: function () {
			return promise.progress;
		}
	});

	return promise2;

};

tsunami.load.json = function(url, method, data, requestHeaders, noCache) {

	var promise = tsunami.load.xhr(url, method, data, requestHeaders, "text", noCache);
	var promise2 = promise.then(function(xhr) {
		return JSON.parse(xhr.response);
	}, function() {
		return {};
	});

	Object.defineProperty(promise2, "progress", {
		get: function () {
			return promise.progress;
		}
	});

	return promise2;

};

tsunami.load.script = function(url, id, noCache) {

	var promise = tsunami.load.xhr(url, "GET", null, null, "text", noCache);
	var promise2 = promise.then(function(xhr) {
		var script = document.createElement("script");
		script.language = "javascript";
		script.type = "text/javascript";
		if (id) {
			script.id = id;
		}
		script.text = xhr.response;
		document.querySelector("head").appendChild(script);
		return script;
	});

	Object.defineProperty(promise2, "progress", {
		get: function () {
			return promise.progress;
		}
	});

	return promise2;

};

tsunami.load.styleSheet = function(url, id, noCache) {

	var promise = tsunami.load.xhr(url, "GET", null, null, "text", noCache);
	var promise2 = promise.then(function(xhr) {
		var style = document.createElement( "style" );
		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = xhr.response;
		} else {
			style.appendChild(document.createTextNode(xhr.response));
		}
		document.querySelector("head").appendChild(style);
		return style;
	});

	Object.defineProperty(promise2, "progress", {
		get: function () {
			return promise.progress;
		}
	});

	return promise2;

};