tsunami = this.tsunami || {};
tsunami.window = tsunami.window || {};


tsunami.clock = new tsunami.EventDispatcher();

tsunami.clock.time = new Date();

tsunami.clock.tick = function() {
	tsunami.clock.time = new Date();
	tsunami.clock.dispatchEvent({type:"tick"});
};

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

tsunami.evalProperty = function(path, object) {
	if (!object) {
		object = window;
	}
	var array = path.split(".");
	while(array.length > 0) {
		var name = array.shift();
		object = object[name];
	}
	return object;
};

tsunami.mustacheRender = null;

tsunami.applyWrapperAttribute = function(element, attributeName) {
	var objects = tsunami.getAllObjects(element);
	for (var i = objects.length - 1; i > -1; i--) {
		var object = objects[i];
		if (tsunami.Element) {
			tsunami.Element(object);
		}
		if (object.getAttribute) {
			var attribute = object.getAttribute(attributeName);
			if (attribute) {
				var classNames = attribute.split(" ");
				for (var k = 0; k < classNames.length; k++) {
					var className = classNames[k];
					if (className) {
						var method;
						method = eval(className);
						if (method) {
							method(object);
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
	if (tsunami.mustacheRender) {
		text = tsunami.mustacheRender(text, scope);
	}
	factory.innerHTML = text;
	var children = [];
	for (var i = 0; i < factory.children.length; i++) {
		var child = factory.children.item(i);
		children.push(child);
	}
	return children;
};

tsunami.insertHTML = function(text, scope, referenceNode) {
	var children = tsunami.createHTML(text, scope);
	var parent = referenceNode.parentNode;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		parent.insertBefore(child, referenceNode);
		tsunami.applyWrapperAttribute(child, "wrapper");
	}
	return children;
};

tsunami.appendHTML = function(text, scope, parent) {
	var children = tsunami.createHTML(text, scope);
	for (var i = 0; i < children.length; i++) {
		var child = children[0];
		parent.appendChild(child);
	}
	return children;
};

tsunami.createElement = function(templateText, parent, wrapper, model, index, branch) {
	if (!wrapper) {
		wrapper = "wrapper";
	}
	var factory = document.createElement("div");
	if (tsunami.mustacheRender) {
		templateText = tsunami.mustacheRender(templateText, {model:model, index:index, window:window, branch:branch});
	}
	factory.innerHTML = templateText;
	var element = factory.children.item(0);
	if (parent) {
		parent.appendChild(element);
	}
	tsunami.applyWrapperAttribute(element, wrapper);
	if (model) {
		element.model = model;
	}
	return element;
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

