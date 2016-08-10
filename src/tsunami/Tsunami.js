tsunami = this.tsunami || {};
tsunami.window = tsunami.window || {};

tsunami.isMobile = {
	android: navigator.userAgent.match(/Android/i) ? true : false,
	blackBerry: navigator.userAgent.match(/BlackBerry/i) ? true : false,
	iOS: navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false,
	windows: navigator.userAgent.match(/IEMobile/i) ? true : false
};

tsunami.isMobile.any = (tsunami.isMobile.android || tsunami.isMobile.blackBerry || tsunami.isMobile.iOS || tsunami.isMobile.windows);

tsunami.isTouch = ("ontouchend" in window);

if ("ontouchend" in window) {
	tsunami.events = {
		mouseover: "touchstart",
		mouseout: "touchend",
		mousedown: "touchstart",
		mouseup: "touchend",
		mousemove: "touchmove",
		click: "touchend"
	}
} else {
	tsunami.events = {
		mouseover: "mouseover",
		mouseout: "mouseout",
		mousedown: "mousedown",
		mouseup: "mouseup",
		mousemove: "mousemove",
		click: "click"
	}
}

tsunami.events.complete = "complete";
tsunami.events.change = "change";

tsunami.evalProperty = function(path, scope) {
	var array = path.split(".");
	var object = scope;
	while(array.length > 0) {
		var name = array.shift();
		var arr = name.split("[");
		for (var i = 0; i < arr.length; i++) {
			var prop = arr[i].split("]")[0];
			object = object[prop];
			if (!object) {
				console.log("Error! The reference '" + path + "' is not valid in " + scope);
			}
		}
	}
	return object;
};

tsunami.applyWrapper = function(element, scope) {
	var dataWrapper = element.getAttribute("data-wrapper");
	if (dataWrapper) {
		var wrappers = dataWrapper.split(" ");
		for (var i = 0; i < wrappers.length; i++) {
			var wrapper = wrappers[i];
			if (wrapper) {
				var method = tsunami.evalProperty(wrapper, window);
				if (method) {
					method(element);
					if ("createdCallback" in element) {
						element.createdCallback();
					}
				}
			}
		}
	}
};

tsunami.Directive = function(name, method) {
	this.name = name;
	this.method = method;
};

tsunami.applyDirectives = function(element, scope) {
	var array = [element];
	var elements = tsunami.getAllObjects(element, array);
	for (var i = elements.length - 1; i > -1; i--) {
		var el = elements[i];
		for (var j = 0; j < tsunami.directives.length; j++) {
			var directive = tsunami.directives[j].method;
			directive(el, scope);
		}
	}
};

tsunami.directives = [];

tsunami.directives.push(new tsunami.Directive("wrapper", tsunami.applyWrapper));

tsunami.directives.push(new tsunami.Directive("scope", function(element, scope) {
	if (("setScope" in element)) {
		element.setScope(scope);
	}
}));

/*
tsunami.directives.push(new tsunami.Directive("data-include", function(element, scope) {
	var include = element.getAttribute("data-include");
	if (include) {
		var text = tsunami.evalProperty(include, scope);
		tsunami.append(text, element, scope);
	}
}));
*/

tsunami.templates = {};

if (Mustache) {
	tsunami.mustache = function(text, scope) {
		return Mustache.render(text, scope);
	};
}

tsunami.importTemplate = function(template, scope) {
	var factory = document.createElement("span");
	if (tsunami.mustache) {
		template = tsunami.mustache(template, scope);
	}
	factory.innerHTML = template;
	var child = factory.childNodes.item(0);
	if (window.CustomElements) {
		CustomElements.upgradeSubtree(child);
	}
	tsunami.applyDirectives(child, scope);
	return child;
};

tsunami.initializeElement = function(element) {
	var array = [element];
	var elements = tsunami.getAllObjects(element, array);
	for (var i = elements.length - 1; i > -1; i--) {
		var el = elements[i];
		if ("initializeElement" in el) {
			el.initializeElement();
		}
	}
};

tsunami.destroyElement = function(element) {
	if (element) {
		var elements = tsunami.getAllObjects(element);
		for (var i = elements.length - 1; i > -1; i--) {
			var el = elements[i];
			if (el.destroy) {
				try {
					el.destroy();
				} catch(e) {
				}
			}
			tsunami.destroyElement(el);
		}
		element.innerHTML = null;
		tsunami.removeElement(element);
	}
};

tsunami.destroyElements = function(elements) {
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		tsunami.destroyElement(element);
	}
};

tsunami.removeElement = function(element) {
	if (element.parentNode) {
		element.parentNode.removeChild(element);
	}
};

tsunami.removeElements = function(elements) {
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		tsunami.removeElement(element);
	}
};

tsunami.getAllObjects = function(parent, array) {
	if (!array) {
		array = [];
	}
	var childNodes = parent.childNodes;
	for (var i = 0; i < childNodes.length; i++) {
		var child = childNodes.item(i);
		switch(child.nodeName) {
			case "#text":
			case "#comment":
			case "BR":
			case "SCRIPT":
				break;
			default:
				array.push(child);
				tsunami.getAllObjects(child, array);
				break;
		}
	}
	return array;
};

tsunami.serialize = function(obj) {
	var str = [];
	for(var p in obj)
		if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
	return str.join("&");
};

tsunami.window.getCookie = function(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
};

tsunami.window.getSearchParams = function(dontDecodeURI) {
	var urlParams = {};
	if (window.location.href.indexOf('?') != -1) {
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++) {
			var string = hashes[i];
			var equalIndex = string.indexOf("=");
			if (equalIndex != -1) {
				var hash = [];
				//var hash = hashes[i].split('=');
				hash[0] = string.substr(0, equalIndex);
				hash[1] = string.substr(equalIndex + 1);
				if (dontDecodeURI) {
					urlParams[hash[0]] = hash[1];
				} else {
					urlParams[hash[0]] = decodeURI(hash[1]);
				}
			}
		}
	}
	return urlParams;
};

tsunami.window.getRect = function() {
	var rectangle = new tsunami.geom.Rectangle();
	rectangle.width =  document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
	rectangle.height =  document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
	return rectangle;
};

Object.defineProperty(tsunami.window, 'rect', {
	get: function() {
		return tsunami.window.getRect();
	}
});

tsunami.window.localToGlobal = function(element, root, point) {
	if (!point) {
		point = new tsunami.geom.Point();
	}
	while(element != root) {
		//point.x += element.offsetLeft - element.parentNode.scrollLeft;
		//point.y += element.offsetTop - element.parentNode.scrollTop;
		point.x += element.offsetLeft;
		point.y += element.offsetTop;
		element = element.parentNode;
	}
	return point;
};

tsunami.window.isHidden = function() {
	return document[tsunami.window.hidden];
};

(function() {

	var prefixes = ['webkit','moz','ms','o'];

	// if 'hidden' is natively supported just return it
	if ('hidden' in document) {
		tsunami.window.hidden = 'hidden';
		tsunami.events.visibilitychange = 'visibilitychange';
	}

	// otherwise loop over all the known prefixes until we find one
	for (var i = 0; i < prefixes.length; i++){
		if ((prefixes[i] + 'Hidden') in document) {
			tsunami.window.hidden = prefixes[i] + 'Hidden';
			tsunami.events.visibilitychange = prefixes[i] + 'visibilitychange';
		}
	}

}());

(function() {
	var i,
		undefined,
		el = document.createElement('div'),
		transitions = {
			'transition':{
				transitionend:'transitionend',
				animationstart:'animationstart',
				animationiteration:'animationiteration',
				animationend:'animationend'
			},
			'OTransition':{
				transitionend:'otransitionend',
				animationstart:'oanimationstart',
				animationiteration:'oanimationiteration',
				animationend:'oanimationend'
			},
			'MozTransition':{
				transitionend:'transitionend',
				animationstart:'moznimationstart',
				animationiteration:'moznimationiteration',
				animationend:'moznimationend'
			},
			'WebkitTransition':{
				transitionend:'webkitTransitionEnd',
				animationstart:'webkitAnimationStart',
				animationiteration:'webkitAnimationIteration',
				animationend:'webkitAnimationEnd'
			}
		};

	for (i in transitions) {
		if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
			//tsunami.events.transitionend = transitions[i].transitionend;
			for (var j in transitions[i]) {
				tsunami.events[j] = transitions[i][j];
			}
		}
	}
}());

tsunami.window.forceProtocol = function(url, protocol) {
	var isHttps = (protocol.indexOf("https") != -1);
	var urlIsHttps = (url.indexOf("https") != -1);
	if (isHttps && !urlIsHttps) {
		url = url.split("http").join("https");
	} else if (!isHttps && urlIsHttps) {
		url = url.split("https").join("http");
	}
	return url;
};

