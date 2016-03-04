tsunami = this.tsunami || {};
tsunami.window = tsunami.window || {};

tsunami.isMobile = {
	android: navigator.userAgent.match(/Android/i) ? true : false,
	blackBerry: navigator.userAgent.match(/BlackBerry/i) ? true : false,
	iOS: navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false,
	windows: navigator.userAgent.match(/IEMobile/i) ? true : false
};

tsunami.isMobile.any = (tsunami.isMobile.android || tsunami.isMobile.blackBerry || tsunami.isMobile.iOS || tsunami.isMobile.windows);

if (tsunami.isMobile.any) {
	tsunami.events = {
		mouseover: "touchstart",
		mouseout: "touchend",
		mousedown: "touchstart",
		mouseup: "touchend",
		mousemove: "touchmove"
	}
} else {
	tsunami.events = {
		mouseover: "mouseover",
		mouseout: "mouseout",
		mousedown: "mousedown",
		mouseup: "mouseup",
		mousemove: "mousemove"
	}
}

tsunami.events.complete = "complete";
tsunami.events.change = "change";

tsunami.evalProperty = function(path, scope) {
	if (!scope) {
		scope = window;
	}
	var array = path.split(".");
	while(array.length > 0) {
		var name = array.shift();
		scope = scope[name];
	}
	return scope;
};

tsunami.renderTemplate = null;

tsunami.applyControllers = function(element, scope) {
	var elements = tsunami.getAllObjects(element);
	for (var i = elements.length - 1; i > -1; i--) {
		var element = elements[i];
		if (element.getAttribute) {
			var className = element.getAttribute("data-controller");
			if (className) {
				var classReference = tsunami.evalProperty(className, window);
				if (classReference) {
					var controller = new classReference();
					element.controller = controller;
					if (controller.parseElement) {
						controller.parseElement(element, scope);
					} else {
						console.log ("Warning! ", className + " doesn't implement the parseHTML method");
					}
				} else {
					console.log ("Warning! ", className + " is an undefined reference.");
				}
			}
		}
	}
};

tsunami.applyWrapperAttribute = function(element, attributeName, scope) {
	var objects = tsunami.getAllObjects(element);
	for (var i = objects.length - 1; i > -1; i--) {
		var object = objects[i];
		/*
		if (tsunami.Element) {
			tsunami.Element(object);
		}
		*/
		if (object.getAttribute) {
			var attribute = object.getAttribute(attributeName);
			if (attribute) {
				var classNames = attribute.split(" ");
				for (var k = 0; k < classNames.length; k++) {
					var className = classNames[k];
					if (className) {
						var method;
						method = tsunami.evalProperty(className, window);
						if (method) {
							var obj = method(object, scope);
						} else {
							console.log ("Warning! ", className + " is an undefined method.");
						}
					}
				}
			}
		}
	}
};

tsunami.applyWrapper = function(element, method) {
	if (!method) {
		throw "tsunami.applyWrapper was called with an undefined method";
	}
	var objects = tsunami.getAllObjects(element);
	for (var i = objects.length - 1; i > -1; i--) {
		var object = objects[i];
		method(object);
	}
	method(element);
};

tsunami.createHTML = function(text, scope) {
	var factory = document.createElement("div");
	if (tsunami.renderTemplate) {
		if (!scope) {
			scope = window;
		}
		text = tsunami.renderTemplate(text, scope);
	}
	factory.innerHTML = text;
	var children = [];
	for (var i = 0; i < factory.childNodes.length; i++) {
		var child = factory.childNodes.item(i);
		children.push(child);
	}
	return children;
};

tsunami.insertBefore = function(text, referenceNode, scope) {
	var children = tsunami.createHTML(text, scope);
	var parent = referenceNode.parentNode;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		parent.insertBefore(child, referenceNode);
		tsunami.applyWrapperAttribute(child, "data-wrapper", scope);
		tsunami.applyControllers(child, scope);
	}
	return children;
};

tsunami.remove = function(elements) {
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		element.parentNode.removeChild(element);
		if (element.destroy) {
			try {
				element.destroy();
			} catch(e) {
				console.log("error on destroy", element);
			}
		}
	}
};

tsunami.append = function(text, parent, scope) {
	var children = tsunami.createHTML(text, scope);
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		parent.appendChild(child);
		tsunami.applyWrapperAttribute(child, "data-wrapper", scope);
	}
	return children;
};

tsunami.getAllObjects = function(element, array) {
	if (!array) {
		array = [];
	}
	array.push(element);

	var children = element.childNodes;
	for (var i = 0; i < children.length; i++) {
		var child = children.item(i);
		if (child.nodeName != "#text") {
			tsunami.getAllObjects(child, array);
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

