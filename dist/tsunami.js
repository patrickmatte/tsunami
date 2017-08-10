//Adds bind support
if (!('bind' in Function.prototype)) {
	Function.prototype.bind = function(owner) {
		var that = this;
		var args = Array.prototype.slice.call(arguments, 1);
		return function() {
			return that.apply(owner, args.length===0? arguments : arguments.length===0? args : args.concat(Array.prototype.slice.call(arguments, 0)));
		};
	};
}

//Adds Promise support
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ES6Promise=e()}(this,function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function e(t){return"function"==typeof t}function n(t){I=t}function r(t){J=t}function o(){return function(){return process.nextTick(a)}}function i(){return"undefined"!=typeof H?function(){H(a)}:c()}function s(){var t=0,e=new V(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){return t.port2.postMessage(0)}}function c(){var t=setTimeout;return function(){return t(a,1)}}function a(){for(var t=0;t<G;t+=2){var e=$[t],n=$[t+1];e(n),$[t]=void 0,$[t+1]=void 0}G=0}function f(){try{var t=require,e=t("vertx");return H=e.runOnLoop||e.runOnContext,i()}catch(n){return c()}}function l(t,e){var n=arguments,r=this,o=new this.constructor(p);void 0===o[et]&&k(o);var i=r._state;return i?!function(){var t=n[i-1];J(function(){return x(i,o,t,r._result)})}():E(r,o,t,e),o}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return g(n,t),n}function p(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function _(t){try{return t.then}catch(e){return it.error=e,it}}function y(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function m(t,e,n){J(function(t){var r=!1,o=y(n,e,function(n){r||(r=!0,e!==n?g(t,n):S(t,n))},function(e){r||(r=!0,j(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,j(t,o))},t)}function b(t,e){e._state===rt?S(t,e._result):e._state===ot?j(t,e._result):E(e,void 0,function(e){return g(t,e)},function(e){return j(t,e)})}function w(t,n,r){n.constructor===t.constructor&&r===l&&n.constructor.resolve===h?b(t,n):r===it?(j(t,it.error),it.error=null):void 0===r?S(t,n):e(r)?m(t,n,r):S(t,n)}function g(e,n){e===n?j(e,v()):t(n)?w(e,n,_(n)):S(e,n)}function A(t){t._onerror&&t._onerror(t._result),T(t)}function S(t,e){t._state===nt&&(t._result=e,t._state=rt,0!==t._subscribers.length&&J(T,t))}function j(t,e){t._state===nt&&(t._state=ot,t._result=e,J(A,t))}function E(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+rt]=n,o[i+ot]=r,0===i&&t._state&&J(T,t)}function T(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?x(n,r,o,i):o(i);t._subscribers.length=0}}function M(){this.error=null}function P(t,e){try{return t(e)}catch(n){return st.error=n,st}}function x(t,n,r,o){var i=e(r),s=void 0,u=void 0,c=void 0,a=void 0;if(i){if(s=P(r,o),s===st?(a=!0,u=s.error,s.error=null):c=!0,n===s)return void j(n,d())}else s=o,c=!0;n._state!==nt||(i&&c?g(n,s):a?j(n,u):t===rt?S(n,s):t===ot&&j(n,s))}function C(t,e){try{e(function(e){g(t,e)},function(e){j(t,e)})}catch(n){j(t,n)}}function O(){return ut++}function k(t){t[et]=ut++,t._state=void 0,t._result=void 0,t._subscribers=[]}function Y(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[et]||k(this.promise),B(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&S(this.promise,this._result))):j(this.promise,q())}function q(){return new Error("Array Methods must be provided an Array")}function F(t){return new Y(this,t).promise}function D(t){var e=this;return new e(B(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function K(t){var e=this,n=new e(p);return j(n,t),n}function L(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function N(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function U(t){this[et]=O(),this._result=this._state=void 0,this._subscribers=[],p!==t&&("function"!=typeof t&&L(),this instanceof U?C(this,t):N())}function W(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(e){}if("[object Promise]"===r&&!n.cast)return}t.Promise=U}var z=void 0;z=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var B=z,G=0,H=void 0,I=void 0,J=function(t,e){$[G]=t,$[G+1]=e,G+=2,2===G&&(I?I(a):tt())},Q="undefined"!=typeof window?window:void 0,R=Q||{},V=R.MutationObserver||R.WebKitMutationObserver,X="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),Z="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,$=new Array(1e3),tt=void 0;tt=X?o():V?s():Z?u():void 0===Q&&"function"==typeof require?f():c();var et=Math.random().toString(36).substring(16),nt=void 0,rt=1,ot=2,it=new M,st=new M,ut=0;return Y.prototype._enumerate=function(){for(var t=this.length,e=this._input,n=0;this._state===nt&&n<t;n++)this._eachEntry(e[n],n)},Y.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===h){var o=_(t);if(o===l&&t._state!==nt)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===U){var i=new n(p);w(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},Y.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===nt&&(this._remaining--,t===ot?j(r,n):this._result[e]=n),0===this._remaining&&S(r,this._result)},Y.prototype._willSettleAt=function(t,e){var n=this;E(t,void 0,function(t){return n._settledAt(rt,e,t)},function(t){return n._settledAt(ot,e,t)})},U.all=F,U.race=D,U.resolve=h,U.reject=K,U._setScheduler=n,U._setAsap=r,U._asap=J,U.prototype={constructor:U,then:l,"catch":function(t){return this.then(null,t)}},U.polyfill=W,U.Promise=U,U.polyfill(),U});

//Adds window.location.origin support
if (!window.location.origin) {
	window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

(function () {

	if (!window.CustomEvent) {

		var CustomEvent = function ( event, params ) {
			params = params || { bubbles: false, cancelable: false, detail: undefined };
			var evt = document.createEvent( 'CustomEvent' );
			evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
			return evt;
		}

		CustomEvent.prototype = window.Event.prototype;

		window.CustomEvent = CustomEvent;

	}

})();

// Adds ES5 Object.create functionality
if (typeof Object.create != 'function') {
	Object.create = (function(undefined) {
		var Temp = function() {};
		return function (prototype, propertiesObject) {
			if(prototype !== Object(prototype) && prototype !== null) {
				throw TypeError('Argument must be an object, or null');
			}
			Temp.prototype = prototype || {};
			if (propertiesObject !== undefined) {
				Object.defineProperties(Temp.prototype, propertiesObject);
			}
			var result = new Temp();
			Temp.prototype = null;
			// to imitate the case of Object.create(null)
			if(prototype === null) {
				result.__proto__ = null;
			}
			return result;
		};
	})();
}


// Adds ES2015 Object.assign functionality
if (typeof Object.assign != 'function') {
	Object.assign = function(target) {
		'use strict';
		if (target == null) {
			throw new TypeError('Cannot convert undefined or null to object');
		}

		target = Object(target);
		for (var index = 1; index < arguments.length; index++) {
			var source = arguments[index];
			if (source != null) {
				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}
		}
		return target;
	};
}




// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function () {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}
	if(!window.requestAnimationFrame)
		window.requestAnimationFrame = function (callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () {
					callback(currTime + timeToCall);
				},
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	if(!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
}());


// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

	Array.prototype.map = function(callback, thisArg) {

		var T, A, k;

		if (this == null) {
			throw new TypeError(' this is null or not defined');
		}

		// 1. Let O be the result of calling ToObject passing the |this|
		//    value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get internal
		//    method of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If IsCallable(callback) is false, throw a TypeError exception.
		// See: http://es5.github.com/#x9.11
		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}

		// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
		if (arguments.length > 1) {
			T = thisArg;
		}

		// 6. Let A be a new array created as if by the expression new Array(len)
		//    where Array is the standard built-in constructor with that name and
		//    len is the value of len.
		A = new Array(len);

		// 7. Let k be 0
		k = 0;

		// 8. Repeat, while k < len
		while (k < len) {

			var kValue, mappedValue;

			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the HasProperty internal
			//    method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			if (k in O) {

				// i. Let kValue be the result of calling the Get internal
				//    method of O with argument Pk.
				kValue = O[k];

				// ii. Let mappedValue be the result of calling the Call internal
				//     method of callback with T as the this value and argument
				//     list containing kValue, k, and O.
				mappedValue = callback.call(T, kValue, k, O);

				// iii. Call the DefineOwnProperty internal method of A with arguments
				// Pk, Property Descriptor
				// { Value: mappedValue,
				//   Writable: true,
				//   Enumerable: true,
				//   Configurable: true },
				// and false.

				// In browsers that support Object.defineProperty, use the following:
				// Object.defineProperty(A, k, {
				//   value: mappedValue,
				//   writable: true,
				//   enumerable: true,
				//   configurable: true
				// });

				// For best browser support, use the following:
				A[k] = mappedValue;
			}
			// d. Increase k by 1.
			k++;
		}

		// 9. return A
		return A;
	};
}







/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2014-07-23
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if ("document" in self) {

// Full polyfill for browsers with no classList support
	if (!("classList" in document.createElement("_"))) {

		(function (view) {

			"use strict";

			if (!('Element' in view)) return;

			var
				classListProp = "classList"
				, protoProp = "prototype"
				, elemCtrProto = view.Element[protoProp]
				, objCtr = Object
				, strTrim = String[protoProp].trim || function () {
						return this.replace(/^\s+|\s+$/g, "");
					}
				, arrIndexOf = Array[protoProp].indexOf || function (item) {
						var
							i = 0
							, len = this.length
							;
						for (; i < len; i++) {
							if (i in this && this[i] === item) {
								return i;
							}
						}
						return -1;
					}
			// Vendors: please allow content code to instantiate DOMExceptions
				, DOMEx = function (type, message) {
					this.name = type;
					this.code = DOMException[type];
					this.message = message;
				}
				, checkTokenAndGetIndex = function (classList, token) {
					if (token === "") {
						throw new DOMEx(
							"SYNTAX_ERR"
							, "An invalid or illegal string was specified"
						);
					}
					if (/\s/.test(token)) {
						throw new DOMEx(
							"INVALID_CHARACTER_ERR"
							, "String contains an invalid character"
						);
					}
					return arrIndexOf.call(classList, token);
				}
				, ClassList = function (elem) {
					var
						trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
						, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
						, i = 0
						, len = classes.length
						;
					for (; i < len; i++) {
						this.push(classes[i]);
					}
					this._updateClassName = function () {
						elem.setAttribute("class", this.toString());
					};
				}
				, classListProto = ClassList[protoProp] = []
				, classListGetter = function () {
					return new ClassList(this);
				}
				;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
			DOMEx[protoProp] = Error[protoProp];
			classListProto.item = function (i) {
				return this[i] || null;
			};
			classListProto.contains = function (token) {
				token += "";
				return checkTokenAndGetIndex(this, token) !== -1;
			};
			classListProto.add = function () {
				var
					tokens = arguments
					, i = 0
					, l = tokens.length
					, token
					, updated = false
					;
				do {
					token = tokens[i] + "";
					if (checkTokenAndGetIndex(this, token) === -1) {
						this.push(token);
						updated = true;
					}
				}
				while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.remove = function () {
				var
					tokens = arguments
					, i = 0
					, l = tokens.length
					, token
					, updated = false
					, index
					;
				do {
					token = tokens[i] + "";
					index = checkTokenAndGetIndex(this, token);
					while (index !== -1) {
						this.splice(index, 1);
						updated = true;
						index = checkTokenAndGetIndex(this, token);
					}
				}
				while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.toggle = function (token, force) {
				token += "";

				var
					result = this.contains(token)
					, method = result ?
					force !== true && "remove"
						:
					force !== false && "add"
					;

				if (method) {
					this[method](token);
				}

				if (force === true || force === false) {
					return force;
				} else {
					return !result;
				}
			};
			classListProto.toString = function () {
				return this.join(" ");
			};

			if (objCtr.defineProperty) {
				var classListPropDesc = {
					get: classListGetter
					, enumerable: true
					, configurable: true
				};
				try {
					objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
				} catch (ex) { // IE 8 doesn't support enumerable:true
					if (ex.number === -0x7FF5EC54) {
						classListPropDesc.enumerable = false;
						objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
					}
				}
			} else if (objCtr[protoProp].__defineGetter__) {
				elemCtrProto.__defineGetter__(classListProp, classListGetter);
			}

		}(self));

	} else {
// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

		(function () {
			"use strict";

			var testElement = document.createElement("_");

			testElement.classList.add("c1", "c2");

			// Polyfill for IE 10/11 and Firefox <26, where classList.add and
			// classList.remove exist but support only one argument at a time.
			if (!testElement.classList.contains("c2")) {
				var createMethod = function(method) {
					var original = DOMTokenList.prototype[method];

					DOMTokenList.prototype[method] = function(token) {
						var i, len = arguments.length;

						for (i = 0; i < len; i++) {
							token = arguments[i];
							original.call(this, token);
						}
					};
				};
				createMethod('add');
				createMethod('remove');
			}

			testElement.classList.toggle("c3", false);

			// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
			// support the second argument.
			if (testElement.classList.contains("c3")) {
				var _toggle = DOMTokenList.prototype.toggle;

				DOMTokenList.prototype.toggle = function(token, force) {
					if (1 in arguments && !this.contains(token) === !force) {
						return force;
					} else {
						return _toggle.call(this, token);
					}
				};

			}

			testElement = null;
		}());

	}

}








/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

window.matchMedia || (window.matchMedia = function() {
	"use strict";

	// For browsers that support matchMedium api such as IE 9 and webkit
	var styleMedia = (window.styleMedia || window.media);

	// For those that don't support matchMedium
	if (!styleMedia) {
		var style       = document.createElement('style'),
			script      = document.getElementsByTagName('script')[0],
			info        = null;

		style.type  = 'text/css';
		style.id    = 'matchmediajs-test';

		script.parentNode.insertBefore(style, script);

		// 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
		info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

		styleMedia = {
			matchMedium: function(media) {
				var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

				// 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
				if (style.styleSheet) {
					style.styleSheet.cssText = text;
				} else {
					style.textContent = text;
				}

				// Test if media query is true or false
				return info.width === '1px';
			}
		};
	}

	return function(media) {
		return {
			matches: styleMedia.matchMedium(media || 'all'),
			media: media || 'all'
		};
	};
}());

/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
(function(){
	// Bail out for browsers that have addListener support
	if (window.matchMedia && window.matchMedia('all').addListener) {
		return false;
	}

	var localMatchMedia = window.matchMedia,
		hasMediaQueries = localMatchMedia('only all').matches,
		isListening     = false,
		timeoutID       = 0,    // setTimeout for debouncing 'handleChange'
		queries         = [],   // Contains each 'mql' and associated 'listeners' if 'addListener' is used
		handleChange    = function(evt) {
			// Debounce
			clearTimeout(timeoutID);

			timeoutID = setTimeout(function() {
				for (var i = 0, il = queries.length; i < il; i++) {
					var mql         = queries[i].mql,
						listeners   = queries[i].listeners || [],
						matches     = localMatchMedia(mql.media).matches;

					// Update mql.matches value and call listeners
					// Fire listeners only if transitioning to or from matched state
					if (matches !== mql.matches) {
						mql.matches = matches;

						for (var j = 0, jl = listeners.length; j < jl; j++) {
							listeners[j].call(window, mql);
						}
					}
				}
			}, 30);
		};

	window.matchMedia = function(media) {
		var mql         = localMatchMedia(media),
			listeners   = [],
			index       = 0;

		mql.addListener = function(listener) {
			// Changes would not occur to css media type so return now (Affects IE <= 8)
			if (!hasMediaQueries) {
				return;
			}

			// Set up 'resize' listener for browsers that support CSS3 media queries (Not for IE <= 8)
			// There should only ever be 1 resize listener running for performance
			if (!isListening) {
				isListening = true;
				window.addEventListener('resize', handleChange, true);
			}

			// Push object only if it has not been pushed already
			if (index === 0) {
				index = queries.push({
					mql         : mql,
					listeners   : listeners
				});
			}

			listeners.push(listener);
		};

		mql.removeListener = function(listener) {
			for (var i = 0, il = listeners.length; i < il; i++){
				if (listeners[i] === listener){
					listeners.splice(i, 1);
				}
			}
		};

		return mql;
	};
}());

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

tsunami.createCustomEvent = function(type, params) {
	var event;
	try {
		event = new CustomEvent(event, params);
	} catch(e) {
		event =  document.createEvent('CustomEvent');
		event.initCustomEvent(type, params.bubbles, params.bubbles, params.detail);
	}
	return event;
};

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
		//element.removeAttribute("data-wrapper");
	}
};

tsunami.Directive = function(name, method) {
	this.name = name;
	this.method = method;
};

tsunami.applyDirectives = function(element, scope) {
	var array = [element];
	var elements = tsunami.getAllObjects(element, array);
	for (var i = 0; i < elements.length; i++) {
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

if (window.Mustache) {
	tsunami.mustache = function(text, scope) {
		return window.Mustache.render(text, scope);
	};
}

tsunami.importTemplate = function(template, scope) {
	var factory = document.createElement("span");
	if (tsunami.mustache) {
		template = tsunami.mustache(template, scope);
	}
	factory.innerHTML = template;
	var child = factory.children.item(0);
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

tsunami.window.localToGlobal = function(element, root, point, debug) {
	if (!point) {
		point = new tsunami.geom.Point();
	}
	while(element != root) {
		//point.x += element.offsetLeft - element.parentNode.scrollLeft;
		//point.y += element.offsetTop - element.parentNode.scrollTop;
		if (debug) {
			console.log("$$$ element", element.className, element.offsetTop);
		}
		point.x += element.offsetLeft;
		point.y += element.offsetTop;
		element = element.parentNode;
	}
	return point;
};

tsunami.window.localToGlobalY = function(element, root, y, debug) {
	if (isNaN(y)) {
		y = 0;
	}
	while(element != root) {
		//point.x += element.offsetLeft - element.parentNode.scrollLeft;
		//point.y += element.offsetTop - element.parentNode.scrollTop;
		if (debug) {
			console.log("element", element.className, element.offsetTop);
		}
		y += element.offsetTop;
		element = element.parentNode;
	}
	return y;
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

tsunami.window.getDeviceMotionDifference = function(event) {
	var width =  document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
	var height =  document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
	var devideOrientation = "landscape";
	var deviceDirection = "up";
	var x = 0;
	var y = 0;

	if (height > width) {
		devideOrientation = "portrait"
	}

	if (devideOrientation == "portrait") {
		if (event.accelerationIncludingGravity.y > 0) {
			deviceDirection = "down";
		}
		x = event.accelerationIncludingGravity.x;
		y = event.accelerationIncludingGravity.z;

	}
	if (devideOrientation == "landscape") {
		if (event.accelerationIncludingGravity.x > 0) {
			deviceDirection = "down";
		}
		x = event.accelerationIncludingGravity.y;
		y = event.accelerationIncludingGravity.z;
	}

	if (tsunami.window.devideOrientation != devideOrientation || tsunami.window.deviceDirection != deviceDirection) {
		tsunami.window.devideOrientation = devideOrientation;
		tsunami.window.deviceDirection = deviceDirection;
		this.initialAccelerationIncludingGravity = {x:x, y:y};
	}

	var diff = {
		x:x - this.initialAccelerationIncludingGravity.x,
		y:y - this.initialAccelerationIncludingGravity.y
	};
	return diff;
};

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

tsunami.hasClass = function (element, className) {
	return element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
};

tsunami.addClass = function (element, className) {
	if (!tsunami.hasClass(element, className)) element.className += " " + className;
};

tsunami.removeClass = function (element, className) {
	if (tsunami.hasClass(element, className)) {
		var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
		element.className = element.className.replace(reg," ");
	}
};

tsunami.replaceClass = function (element, oldClass, newClass) {
	tsunami.removeClass(element, oldClass);
	tsunami.addClass(element, newClass);
};

tsunami = this.tsunami || {};

(function() {

	tsunami.EventDispatcher = function() {
		this.listeners = [];
		this._debug = false;
	};

	var p = tsunami.EventDispatcher.prototype;

	p.setDebug = function(value) {
		this._debug = value;
	};

	p.getDebug = function() {
		return this._debug;
	};

	Object.defineProperty(p, 'debug', {
		get: function() {
			return this.getDebug();
		},
		set: function(value) {
			this.setDebug(value);
		}
	});

	p.addEventListener = function(type, func) {
		this.listeners.push({type:type, func:func});
	};

	p.removeEventListener = function(type, func) {
		var newListeners = [];
		for (var i = 0 ; i < this.listeners.length; i++) {
			var listener = this.listeners[i];
			if (listener.type == type && listener.func == func) {

			} else {
				newListeners.push(listener);
			}
		}

		this.listeners = newListeners;
	};

	p.dispatchEvent = function(event) {
		event.target = this;
		if (!event.currentTarget) {
			event.currentTarget = this;
		}
		var listeners = this.listeners.slice();
		for (var i = 0 ; i < listeners.length; i++) {
			var listener = listeners[i];
			if (listener.type == event.type) {
				try {
					listener.func(event);
				} catch(e) {
					console.log(e, this);
				}
			}
		}
	};

	p.destroy = function() {
		this.listeners = [];
	};

}());

tsunami = this.tsunami || {};

(function() {

	tsunami.HistoryFallback = {
		HASH:"hash",
		RELOAD:"reload"
	};

	tsunami.History = function(base, fragment, fallback) {
		tsunami.EventDispatcher.call(this);

		this.base = base;
		this.fragment = fragment;
		this.fallback = fallback;

		this.hasPushed = false;

		this.hash = "#!";

		this.state = null;
		this._updateOnHashChange = true;

		this.historyIsAvailable = (history.pushState)?true:false;

		if (this.historyIsAvailable) {
			window.onpopstate = this._popStateHandler.bind(this);
		} else if (this.fallback == tsunami.HistoryFallback.HASH) {
			window.onhashchange = this._hashChangeHandler.bind(this);
		}
	};

	var p = tsunami.History.prototype = Object.create(tsunami.EventDispatcher.prototype);

	p.constructor = tsunami.History;

	p.start = function() {
		this.state = {};
		if (location.hash.indexOf(this.hash) != -1) {
			this.state.path = this.base + this.fragment + window.location.hash.split(this.hash)[1];
			if (this.state.path != this.base && this.historyIsAvailable) {
				history.replaceState(this.state, "", this.state.path);
			}
		} else {
			this.state.path = window.location.href;
			if (this.state.path != this.base) {
				if (!this.historyIsAvailable) {
					if (this.fallback == tsunami.HistoryFallback.HASH) {
						if (!location.hash) {
							var deeplink = this.state.path.split(this.base)[1];
							deeplink = deeplink.split(this.fragment)[1];
							this._updateOnHashChange = false;
							location.replace(this.base + this.hash + deeplink);
						}
					} else if(this.fallback == tsunami.HistoryFallback.RELOAD) {
						if (location.hash) {
							location.replace(this.base + this.fragment + this.state.path);
						}
					}
				} else {
					//this.replaceState({path:this.state.path}, "", this.state.path);
				}
			}
		}
		//this.dispatchEvent({type:"popstate", state:{path:this.state.path}});
	};

	p.pushState = function(state, title, url) {
		console.log();
		this.hasPushed = true;

		this.state = state;
		if (this.historyIsAvailable) {
			history.pushState(this.state, title, url);
		} else if (this.fallback == tsunami.HistoryFallback.HASH) {
			this._updateOnHashChange = false;
			window.location.href = this.hash + this.state.path.split(this.base + this.fragment)[1];
		} else if(this.fallback == tsunami.HistoryFallback.RELOAD) {
			location.assign(url);
		}
	};

	p.replaceState = function(state, title, url) {
		this.state = state;
		if (this.historyIsAvailable) {
			history.replaceState(this.state, title, url);
		} else if (this.fallback == tsunami.HistoryFallback.HASH) {
			this._updateOnHashChange = false;
			location.replace(this.hash + this.state.path);
		} else if(this.fallback == tsunami.HistoryFallback.RELOAD) {
			location.replace(url);
		}
	};

	p._popStateHandler = function(event) {
		if (!this.hasPushed) {
			//return;
		}
		var state = event.state;
		if (state == null) {
			state = {path:window.location.href};
		}
		this.state = state;
		this.dispatchEvent({type:"popstate", state:state});
	};

	p._hashChangeHandler = function(e) {
		if (this._updateOnHashChange) {
			var path = location.hash.split(this.hash)[1] || "";
			this.state = {path:this.base + this.fragment + path};
			this.dispatchEvent({type:"popstate", state:this.state});
		} else {
			this._updateOnHashChange = true;
		}
	};

}());

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

tsunami.load.imageWithProgress = function(url, img) {

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

tsunami.load.webaudio = function(url, context, loop, volume) {
	if (!context) {
		if (!tsunami.webaudioContext) {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			if (window.AudioContext) {
				tsunami.webaudioContext = new AudioContext();
			}
		}
		context = tsunami.webaudioContext;
	}

	var promise2 = Promise.resolve(null);

	if (context) {

		var promise = tsunami.load.xhr(url, "GET", null, null, "arraybuffer", null);

		promise2 = promise.then(function(xhr) {
			return new Promise(function(resolve, reject) {

				context.decodeAudioData(
					xhr.response,
					function(buffer) {
						if (!buffer) {
							alert('error decoding file data: ' + url);
							reject();
							return;
						}
						var sound = {};
						sound.source = context.createBufferSource();
						sound.gainNode = context.createGain();
						sound.gainNode.gain.value = volume;
						sound.source.buffer = buffer;

						sound.source.connect(sound.gainNode);
						sound.gainNode.connect(context.destination);
						sound.source.loop = loop;
						resolve(sound);
					},
					function(error) {
						reject();
					}
				);

			});
		});


		Object.defineProperty(promise2, "progress", {
			get: function () {
				return promise.progress;
			}
		});

	}

	return promise2;

};


tsunami.load.templates = function(url) {
	var promise = tsunami.load.xhr(url, "GET", null, null, null, null);
	var promise2 = promise.then(function(xhr) {
		var object = {};
		var container = document.createElement("div");
		container.innerHTML = xhr.response;
		var scripts = container.querySelectorAll("script");
		for (var i = 0; i < scripts.length; i++) {
			var script = scripts.item(i);
			var template = script.text;
			object[script.id] = template;
		}
		return object;
	});

	Object.defineProperty(promise2, "progress", {
		get: function () {
			return promise.progress;
		}
	});

	return promise2;

};

tsunami.load.html = function(url) {
	var promise = tsunami.load.xhr(url, "GET", null, null, null, null);
	var promise2 = promise.then(function(xhr) {
		return xhr.response;
	});

	Object.defineProperty(promise2, "progress", {
		get: function () {
			return promise.progress;
		}
	});

	return promise2;

};

tsunami.load.json = function(url, method, data, requestHeaders, noCache) {

	var promise = tsunami.load.xhr(url, method, data, requestHeaders, null, noCache);
	var promise2 = promise.then(function(xhr) {
		var obj = {};
		try {
			obj = JSON.parse(xhr.response)
		} catch (e) {
			console.log(e, " in " + url);
		}
		return obj;
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

tsunami.load.jsonp = function(url, callback) {

	var promise = new Promise(function(resolve, reject) {

		window[callback] = function(object) {
			console.log("object", object);
			promise.progress = 1;
			resolve(object);
		};

		var script = document.createElement("script");
		script.src = url;
		document.querySelector("head").appendChild(script);
	});

	promise.progress = 0;

	return promise;

};



tsunami.load.script = function(url, id, noCache) {

	var promise = tsunami.load.xhr(url, "GET", null, null, null, noCache);
	var promise2 = promise.then(function(xhr) {
		var script = document.createElement("script");
		script.language = "javascript";
		script.type = "text/javascript";
		if (id) {
			script.id = id;
		}
		document.querySelector("head").appendChild(script);
		try {
			script.text = xhr.response;
		} catch(e) {
			console.log(e, " in " + url);
		}
		return script;
	});

	Object.defineProperty(promise2, "progress", {
		get: function () {
			return promise.progress;
		}
	});

	return promise2;

};

tsunami.load.style = function(url, id, noCache) {

	var promise = tsunami.load.xhr(url, "GET", null, null, null, noCache);
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

tsunami = this.tsunami || {};
tsunami.promise = tsunami.promise || {};


tsunami.promise.eventListener = function(dispatcher, eventName, stopPropagation, stopImmediatePropagation, preventDefault) {

	var promise = new Promise(function(resolve, reject) {

		var eventHandler = function(event) {
			event.stopPropagation();
			if (stopPropagation) {
				event.stopPropagation();
			}
			if (stopImmediatePropagation) {
				event.stopImmediatePropagation();
			}
			if (preventDefault) {
				event.preventDefault();
			}
			dispatcher.removeEventListener(eventName, eventHandler);
			resolve(event);
		};

		dispatcher.addEventListener(eventName, eventHandler);

	});

	return promise;

};

tsunami.promise.transition = function(dispatcher, properties) {

	var promise = new Promise(function(resolve, reject) {

		var eventHandler = function(event) {
			var isProperty;
			for (var i = 0; i < properties.length; i++) {
				var prop = properties[i];
				if (prop == event.propertyName) {
					isProperty = true;
				}
			}
			if (!isProperty) {
				return;
			}
			event.stopPropagation();
			//event.stopImmediatePropagation();
			//event.preventDefault();
			dispatcher.removeEventListener(tsunami.events.transitionend, eventHandler);
			resolve(event);
		};

		dispatcher.addEventListener(tsunami.events.transitionend, eventHandler);

	});

	return promise;

};

tsunami.promise.animation = function(dispatcher, animationName) {

	var promise = new Promise(function(resolve, reject) {

		var eventHandler = function(event) {
			if (animationName != event.animationName) {
				return;
			}
			event.stopPropagation();
			//event.stopImmediatePropagation();
			//event.preventDefault();
			dispatcher.removeEventListener(tsunami.events.animationend, eventHandler);
			resolve(event);
		};

		dispatcher.addEventListener(tsunami.events.animationend, eventHandler);

	});

	return promise;
};

tsunami.promise.timeout = function(milliseconds) {

	var promise = new Promise(function(resolve, reject){

		var timeoutComplete = function(){
			resolve();
		};

		setTimeout(timeoutComplete, milliseconds);

	});

	return promise;

};

tsunami.promise.callback = function(target, method) {

	var promise = new Promise(function(resolve, reject){

		target[method] = function() {
			target[method] = function(){};
			resolve(arguments);
		};

	});

	return promise;

};

tsunami.promise.waitForFrames = function(total) {
	if (isNaN(total)) {
		total = 1;
	}
	total = Math.max(1, Math.round(total));

	var count = 0;

	var promise = new Promise(function(resolve, reject){

		function animationFrame() {
			count++;
			if (count >= total) {
				resolve();
			} else {
				window.requestAnimationFrame(animationFrame);
			}
		}

		window.requestAnimationFrame(animationFrame);

	});

	return promise;

};

tsunami = this.tsunami || {};

(function() {

	tsunami.Branch = function(id, branches) {
		this.id = id;
		this.branches = branches || [];
		this.assets = {
			images:[],
			templates:[],
			scripts:[],
			styles:[],
			json:[]
		}
	};
	
	var prototype = tsunami.Branch.prototype;

	prototype.getBranch = function(id) {
		var selectedBranch;
		for (var i = 0; i < this.branches.length; i++) {
			var branch = this.branches[i];
			if (branch.id == id) {
				selectedBranch = branch;
			}
		}
		return selectedBranch;
	};

	prototype.load = function(assetList) {
		var imageAssets = new tsunami.AssetList();
		assetList.add(imageAssets);
		var imagePromises = [];
		if (this.assets.images) {
			for (var i = 0; i < this.assets.images.length; i++) {
				var image = this.assets.images[i];
				var imagePromise = tsunami.load.image(image);
				imageAssets.add(imagePromise);
				imagePromises.push(imagePromise);
			}
		}
		var imagesPromise = Promise.all(imagePromises);

		var templateAssets = new tsunami.AssetList();
		assetList.add(templateAssets);
		var templatePromises = [];
		if (this.assets.templates) {
			for (var i = 0; i < this.assets.templates.length; i++) {
				var template = this.assets.templates[i];
				var templatePromise = tsunami.load.html(template);
				templateAssets.add(templatePromise);
				templatePromises.push(templatePromise);
			}
		}
		var templatesPromise = Promise.all(templatePromises);

		var styleAssets = new tsunami.AssetList();
		assetList.add(styleAssets);
		var styles = [];
		if (this.assets.styles) {
			styles = this.assets.styles.slice();
		}
		var stylesPromise = new Promise(function(resolve, reject) {
			var elements = [];
			var loadStyle = function() {
				if (styles.length > 0) {
					var style = styles.shift();
					var stylePromise = tsunami.load.style(style);
					styleAssets.add(stylePromise);
					stylePromise.then(function(element) {
						elements.push(element);
						loadStyle();
					});
				} else {
					resolve(elements);
				}
			};
			loadStyle();
		});

		var scriptAssets = new tsunami.AssetList();
		assetList.add(scriptAssets);

		var scripts = [];
		if (this.assets.scripts) {
			scripts = this.assets.scripts.slice();
		}
		var scriptsPromise = new Promise(function(resolve, reject) {
			var elements = [];
			var loadScript = function() {
				if (scripts.length > 0) {
					var script = scripts.shift();
					var scriptPromise = tsunami.load.script(script);
					scriptAssets.add(scriptPromise);
					scriptPromise.then(function(element) {
						elements.push(element);
						loadScript();
					});
				} else {
					resolve(elements);
				}
			};
			loadScript();
		});

		var jsonAssets = new tsunami.AssetList();
		assetList.add(jsonAssets);
		var jsonPromises = [];
		if (this.assets.json) {
			for (var i = 0; i < this.assets.json.length; i++) {
				var json = this.assets.json[i];
				var jsonPromise = tsunami.load.json(json);
				jsonAssets.add(jsonPromise);
				jsonPromises.push(jsonPromise);
			}
		}
		var jsonsPromise = Promise.all(jsonPromises);

		var promise = Promise.all([imagesPromise, templatesPromise, stylesPromise, scriptsPromise, jsonsPromise]);
		var promise2 = promise.then(this.loadComplete.bind(this));
		return promise2;
	};

	prototype.loadComplete = function(assets) {
		this.images = assets[0];
		this.templates = assets[1];
		this.styles = assets[2];
		this.scripts = assets[3];
		this.json = assets[4];
	};

	prototype.hide = function() {
		this.images = null;
		this.templates = null;
		tsunami.removeElements(this.styles);
		this.styles = null;
		tsunami.removeElements(this.scripts);
		this.scripts = null;
		this.json = null;
	};

}());
tsunami = this.tsunami || {};

(function() {

	tsunami.Router = function(root) {
		tsunami.EventDispatcher.call(this);

		this._overrideLocation = null;
		this.branches = new tsunami.Array();
		this._location = "";
		this.redirects = {};
		this.fragment = "";
		this.path = "";
		this.root = root;
		this.popStateHandlerMethod = this.popStateHandler.bind(this);

		this.show = new tsunami.RouterTransition(this, "show", this._showComplete.bind(this));
		this.show.tasks = [
			new tsunami.RouterTask("load", true),
			new tsunami.RouterTask("show", false)
		];
		this.hide = new tsunami.RouterTransition(this, "hide", this._hideComplete.bind(this));
		this.hide.tasks = [
			new tsunami.RouterTask("hide", false)
		];
		this.defaultLocation = "";
	};

	var p = tsunami.Router.prototype = Object.create(tsunami.EventDispatcher.prototype);

	p.constructor = tsunami.Router;

	Object.defineProperty(p, 'history', {
		get: function() {
			return this._history;
		},
		set: function(value) {
			if (this._history) {
				this._history.removeEventListener("popstate", this.popStateHandlerMethod);
			}
			this._history = value;
			if (this._history) {
				this._history.addEventListener("popstate", this.popStateHandlerMethod);
			}
		}
	});

	p.start = function() {
		if (this.history) {
			this.history.start();
			//this.dispatchEvent({type:"popstate", state:{path:this.state.path}});
			if (this.history.state) {
				var path = this.history.state.path;
				this.setLocation(path, false);
			} else {
				this.setLocation(this.path, false);
			}
		}
	};

	p.popStateHandler = function(event) {
		var path;
		if (event.state) {
			path = event.state.path;
		} else {
			path = this.path
		}
		this.dispatchEvent({type:"historyChange", path:path});
		this.setLocation(path, false);
	};

	p.getLocation = function() {
		return this._getBranchPath(this.branches.item(this.branches.value.length - 1));
	};

	p.getLocationShort = function() {
		var path = "";
		var branches = this.branches.value;
		if (branches.length > 1) {
			for (var i = 1; i < branches.length; i++) {
				path += branches[i].id;
				if (i < branches.length - 1) {
					path += "/";
				}
			}
		}
		return path;
	};

	p.setLocation = function(value, pushState) {
		if (this._debug) {
			console.log("setLocation", value);
		}

		if (value == this.getLocation() && this.hasLocation) {
			return;
		}
		var path = value.substr(this.path.length + this.fragment.length);

		var hashes = path.split("&");

		this.parameters = {};
		for (var i = 0; i < hashes.length; i++) {
			var string = hashes[i];
			var equalIndex = string.indexOf("=");
			if (equalIndex != -1) {
				var hash = [];
				hash[0] = string.substr(0, equalIndex);
				hash[1] = string.substr(equalIndex + 1);
				this.parameters[hash[0]] = hash[1];
			}
		}

		path = hashes[0];

		// remove slash if it is the last character, we don't need blank pages.
		var lastChar = path.charAt(path.length - 1);
		while (lastChar == "/") {
			path = path.substr(0, path.length - 1);
			lastChar = path.charAt(path.length - 1);
		}

		path = this._applyRedirect(path);


		if (path == this.getLocationShort() && this.hasLocation) {
			return;
		}

		this.location = value;

		this._gotoLocation(path);
		if (this._history && pushState) {
			this._history.pushState({path:value}, "", value);
		}
	};

	p._applyRedirect = function(path) {
		var redirect = this.redirects[path];
		var newPath = redirect || path;
		if (newPath != path) {
			newPath = this._applyRedirect(newPath);
		}
		return newPath;
	};

	p._getBranchPath = function(branch) {
		var pathArray = [];
		if (branch) {
			while(branch.id != "root") {
				pathArray.unshift(branch.id);
				branch = branch.parent;
			}
		}
		var locationPath = this.path;
		if (pathArray.length > 0) {
			locationPath += this.fragment + pathArray.join("/");
		}
		return locationPath;
	};

	p._gotoLocation = function(value) {
		if (this._debug) {
			console.log("_gotoLocation", value);
		}

		if (value == "") {
			value = this.defaultLocation;
		}
		this.dispatchEvent({type:"change", location:value});
		this.hasLocation = true;
		this._overrideLocation = null;
		if (this._inTransition) {
			this._overrideLocation = value;
		} else {
			this._overrideLocation = null;

			this._nextLocation = "root";
			if (value != "") {
				this._nextLocation += "/" + value;
			}
			if (this._debug) {
				console.log("_nextLocation", this._nextLocation);
			}
			this._inTransition = true;
			this._startTransitions();
		}
	};

	p._startTransitions = function() {
		var currentLocationArray = this.branches.value.map(function(item) {
			return item.id;
		});
		var nextLocationArray = this._nextLocation.split("/");
		var breakIndex = -1;
		for (var i = 0; i < currentLocationArray.length; i++) {
			var branchId = currentLocationArray.slice(0, i + 1).join("/");
			var nextBranchId = nextLocationArray.slice(0, i + 1).join("/")
			if (branchId == nextBranchId) {
				breakIndex = i;
			}
		}
		this.hide.branches = this.branches.splice(breakIndex + 1).reverse();
		var parent = this;
		if (this.branches.value.length > 0) {
			parent = this.branches.value[this.branches.value.length - 1];
		}
		var newBranches = [];
		for (var i = breakIndex + 1; i < nextLocationArray.length; i++) {
			var branch = new tsunami.BranchProxy(nextLocationArray[i], parent);
			branch.root = this.root;
			branch.path = this._getBranchPath(branch);
			parent = branch;
			newBranches.push(branch);
		}
		this.show.branches = newBranches;
		this.hide.start();
	};

	p._hideComplete = function(event) {
		if (this._overrideLocation != null || this._overrideLocation != undefined) {
			this._inTransition = false;
			this._gotoLocation(this._overrideLocation);
		} else {
			this.branches.push.apply(this.branches, this.show.branches);
			this.show.start();
		}
	};

	p._showComplete = function(event) {
		this._inTransition = false;
		if (this._overrideLocation != null || this._overrideLocation != undefined) {
			this._gotoLocation(this._overrideLocation);
		} else {
			this.dispatchEvent({type:"complete", location:this.getLocation()});
		}
	};

	p.getBranch = function(id) {
		return this[id];
	};

	p.addRedirect = function(path, newPath) {
		this.redirects[path] = newPath;
	};

	p.removeRedirect = function(path) {
		delete this.redirects[path];
	};

	p.destroy = function() {
		this._overrideLocation = null;
		this.branches = null;
		this._location = null;
		this.redirects = null;
		this.fragment = null;
		this.path = null;
		this.root = null;
		this.popStateHandlerMethod = null;
	};

	p.toString = function() {
		return "[Router name=" + this.name + " location=" + this.getLocation() + "]";
	};

}());


(function() {

	tsunami.RouterTransition = function(router, name, onComplete) {
		this.router = router;
		this.name = name;
		this.onComplete = onComplete;
	};

	var p = tsunami.RouterTransition.prototype;

	p.start = function() {
		if (this.branches.length > 0) {
			var nextTask;
			for (var i = this.tasks.length - 1; i > -1; i--) {
				var task = this.tasks[i];
				task.router = this.router;
				task.branches = this.branches.slice();
				if (nextTask) {
					task.onComplete = nextTask.start.bind(nextTask);
				} else {
					task.onComplete = this.tasksComplete.bind(this);
				}
				nextTask = task;
			}
			var firstTask = this.tasks[0];
			firstTask.start();
		} else {
			this.tasksComplete();
		}
	};

	p.tasksComplete = function() {
		this.onComplete();
	};

}());

(function() {

	tsunami.RouterTask = function(name, preload) {
		this.name = name;
		this.preload = preload;
	};

	var p = tsunami.RouterTask.prototype;

	p.start = function() {
		this.preloader = null;
		if (this.branches.length > 0) {
			if (this.preload) {
				this.assetList = new tsunami.AssetList();
				for (var i = 0; i < this.branches.length; i++) {
					var branch = this.branches[i];
					branch.progress = 0;
					branch.assetList = new tsunami.AssetList();
					this.assetList.add(branch);
				}
				this.preloader = this.router.preloader;
				if (this.preloader) {
					this.isPreloading = true;
					var promise = this.preloader.show();
					if (promise) {
						var startNextBranch = this.startNextBranch.bind(this);
						promise.then(function(obj) {
							startNextBranch();
						});
					} else {
						this.startNextBranch();
					}
					this.checkProgress();
				} else {
					this.startNextBranch();
				}
			} else {
				this.startNextBranch();
			}
		} else {
			this.allComplete();
		}
	};

	p.checkProgress = function() {
		if (this.branch) {
			this.branch.updateProgress();
		}
		this.preloader.setProgress(this.assetList.progress);
		if (this.isPreloading) {
			this.animationFrame = requestAnimationFrame(this.checkProgress.bind(this));
		}
	};

	p.startNextBranch = function() {
		this.branch = this.branches.shift();
		this.branch.taskName = this.name;
		this.branch.preload = this.preload;
		this.branch.router = this.router;
		this.branch.onComplete = this.branchComplete.bind(this);
		this.branch.startTask();
	};

	p.branchComplete = function() {
		if (this.branches.length > 0) {
			this.startNextBranch();
		} else {
			if (this.preloader) {
				this.isPreloading = false;
				//cancelAnimationFrame(this.animationFrame);
				var promise = this.preloader.hide();
				if (promise) {
					var callback = this.allComplete.bind(this);
					promise.then(function() {
						callback();
					})
				} else {
					this.allComplete();
				}
			} else {
				this.allComplete();
			}
		}
	};

	p.allComplete = function() {
		var method = this.onComplete;
		tsunami.promise.waitForFrames(2).then(function() {
			method();
		});
	}

}());

(function() {

	tsunami.BranchProxy = function(id, parent) {
		this.id = id;
		this.parent = parent;
	};

	var p = tsunami.BranchProxy.prototype;

	p.startTask = function() {
		if (!this.branch) {
			this.branch = this.parent.getBranch(this.id);
			if (!this.branch) {
				this.branch = {};
				//console.log("No branch '" + this.id + "' in '" + this.parent.id + "'");
			}
			this.branch.root = this.root;
			this.branch.branchID = this.id;
			this.branch.router = this.router;
			this.branch.path = this.path;
			this.branch.parent = this.parent.branch;
		}
		var method = this.branch[this.taskName];
		if (method) {
			method = method.bind(this.branch);
			var assetList = (this.preload)?this.assetList:null;
			var promise = method(assetList);
			if (promise) {
				promise.then(this.taskComplete.bind(this), this.taskError.bind(this));
			} else {
				this.taskComplete();
			}
		} else {
			this.taskComplete();
		}
	};

	p.updateProgress = function() {
		//console.log(this.id, "this.taskName", this.taskName, "progress", this.assetList.progress, this.assetList.assets.length);

		this.progress = this.assetList.progress;
	};

	p.taskError = function(obj) {
		this.taskComplete();
	};

	p.taskComplete = function(obj) {
		this.progress = 1;
		this.onComplete();
	};

	p.getBranch = function(id) {
		var branch;
		if (this.branch) {
			if (this.branch.getBranch) {
				branch = this.branch.getBranch(id);
			} else {
				console.log("The getBranch method isn't implemented by '" + this.id + "'");
			}
		} else {
			console.log("No branch '" + this.id + "'");
		}
		return branch;
	};

}());


(function() {

	tsunami.AssetList = function() {
		this.assets = [];
		Object.defineProperty(this, "progress", {
			get: function () {
				var progress = 0;
				var length = this.assets.length;
				for (var i = 0; i < this.assets.length; i++) {
					var promise = this.assets[i];
					if (promise.hasOwnProperty("progress")) {
						progress += promise.progress;
					} else {
						length--;
					}
				}
				if (length > 0) {
					progress = progress / length;
				} else {
					progress = 1;
				}
				return progress;
			}
		});
	};

	var p = tsunami.AssetList.prototype;

	p.add = function(value) {
		this.assets.push(value);
		return value;
	};

}());


tsunami = this.tsunami || {};

(function() {

	tsunami.Clock = function() {
		tsunami.EventDispatcher.call(this);
		this.index = 0;
		this.seconds = 0;
		this.allFrames = 0;
	};

	var p = tsunami.Clock.prototype = Object.create(tsunami.EventDispatcher.prototype);

	tsunami.Clock.TICK = "tick";
	tsunami.Clock.FPS = "fps";

	p.start = function() {
		this.isRunning = true;
		this.animationFrame();
		this.fpsTimeout = setTimeout(this.dispatchFrameSeconds.bind(this), 1000);
	};

	p.pause = function() {
		this.isRunning = false;
		clearTimeout(this.fpsTimeout);
	};

	p.animationFrame = function() {
		this.time = new Date();
		this.index++;
		this.dispatchEvent({type:tsunami.Clock.TICK});
		if (this.isRunning) {
			window.requestAnimationFrame(this.animationFrame.bind(this));
		}
	};

	p.dispatchFrameSeconds = function() {
		this.allFrames += this.index;
		this.seconds++;
		this.dispatchEvent({type:tsunami.Clock.FPS, frames:this.index, averageFrames:Math.round(this.allFrames / this.seconds * 10) / 10});
		this.index = 0;
		setTimeout(this.dispatchFrameSeconds.bind(this), 1000);
	};

	tsunami.clock = new tsunami.Clock();
	tsunami.clock.start();

}());


tsunami = this.tsunami || {};

tsunami.easing = {

	Back:{
		easeIn:function(t, b, c, d, s) {
			if (!s)
				s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		easeOut:function(t, b, c, d, s) {
			if (!s)
				s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		easeInOut:function(t, b, c, d, s) {
			if (!s)
				s = 1.70158;
			if ((t /= d / 2) < 1)
				return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
		}
	},

	Bounce:{
		easeOut:function(t, b, c, d) {
			if ((t /= d) < (1 / 2.75))
				return c * (7.5625 * t * t) + b;
			else if (t < (2 / 2.75))
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
			else if (t < (2.5 / 2.75))
				return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
			else
				return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
		},
		easeIn:function(t, b, c, d) {
			return c - tsunami.easing.Bounce.easeOut(d - t, 0, c, d) + b;
		},
		easeInOut:function(t, b, c, d) {
			if (t < d/2)
				return tsunami.easing.Bounce.easeIn(t * 2, 0, c, d) * 0.5 + b;
			else
				return tsunami.easing.Bounce.easeOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
		}
	},

	Circular:{
		easeIn:function(t, b, c, d) {
			return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		},
		easeOut:function(t, b, c, d) {
			return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
		},
		easeInOut:function(t, b, c, d) {
			if ((t /= d / 2) < 1)
				return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		}
	},

	Cubic:{
		easeIn:function(t, b, c, d) {
			return c * (t /= d) * t * t + b;
		},
		easeOut:function(t, b, c, d) {
			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		easeInOut:function(t, b, c, d) {
			if ((t /= d / 2) < 1)
				return c / 2 * t * t * t + b;

			return c / 2 * ((t -= 2) * t * t + 2) + b;
		}
	},

	Elastic:{
		easeIn:function(t, b, c, d, a, p) {
			if (t == 0)
				return b;
			if ((t /= d) == 1)
				return b + c;
			if (!p)
				p = d * 0.3;
			var s;
			if (!a || a < Math.abs(c)) {
				a = c;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(c / a);
			}
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		easeOut:function(t, b, c, d, a, p) {
			if (t == 0)
				return b;
			if ((t /= d) == 1)
				return b + c;
			if (!p)
				p = d * 0.3;
			var s;
			if (!a || a < Math.abs(c)) {
				a = c;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(c / a);
			}
			return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
		},
		easeInOut:function(t, b, c, d, a, p) {
			if (t == 0)
				return b;
			if ((t /= d / 2) == 2)
				return b + c;
			if (!p)
				p = d * (0.3 * 1.5);
			var s;
			if (!a || a < Math.abs(c)) {
				a = c;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(c / a);
			}
			if (t < 1) {
				return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) /p)) + b;
			}
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * 0.5 + c + b;
		}
	},

	Exponential:{
		easeIn:function(t, b, c, d) {
			return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		easeOut:function(t, b, c, d) {
			return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		},
		easeInOut:function(t, b, c, d) {
			if (t == 0)
				return b;

			if (t == d)
				return b + c;

			if ((t /= d / 2) < 1)
				return c / 2 * Math.pow(2, 10 * (t - 1)) + b;

			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},

	Linear:{
		easeIn:function(t, b, c, d) {
			return c * t / d + b;
		},
		easeOut:function(t, b, c, d) {
			return c * t / d + b;
		},
		easeInOut:function(t, b, c, d) {
			return c * t / d + b;
		}
	},

	Quadratic:{
		easeIn:function(t, b, c, d) {
			return c * (t /= d) * t + b;
		},
		easeOut:function(t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b;
		},
		easeInOut:function(t, b, c, d) {
			if ((t /= d / 2) < 1)
				return c / 2 * t * t + b;

			return -c / 2 * ((--t) * (t - 2) - 1) + b;
		}
	},

	Quartic:{
		easeIn:function(t, b, c, d) {
			return c * (t /= d) * t * t * t + b;
		},
		easeOut:function(t, b, c, d) {
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		easeInOut:function(t, b, c, d) {
			if ((t /= d / 2) < 1)
				return c / 2 * t * t * t * t + b;

			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		}
	},

	Quintic:{
		easeIn:function(t, b, c, d) {
			return c * (t /= d) * t * t * t * t + b;
		},
		easeOut:function(t, b, c, d) {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		easeInOut:function(t, b, c, d) {
			if ((t /= d / 2) < 1)
				return c / 2 * t * t * t * t * t + b;

			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		}
	},

	Sine:{
		easeIn:function(t, b, c, d) {
			return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
		},
		easeOut:function(t, b, c, d) {
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		},
		easeInOut:function(t, b, c, d) {
			return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		}
	}

};



tsunami = this.tsunami || {};

(function() {

	tsunami.Timeline = function(changeHandler, completeHandler) {
		tsunami.EventDispatcher.call(this);

		this.changeHandler = changeHandler;
		this.completeHandler = completeHandler;

		this.time = 0;

		this.timeTarget = this.time;
		this.timeRace = this.time;
		this.updateEase = 0.1;

		this.actions = [];
		this.tweens = [];

		this.minTimeReached = 0;
		this.maxTimeReached = 0;

		this.resetTweensOnScrub = false;

		this.tickHandler = this.tick.bind(this);
	};

	tsunami.Timeline.COMPLETE = "complete";
	tsunami.Timeline.CHANGE = "change";

	var p = tsunami.Timeline.prototype = Object.create(tsunami.EventDispatcher.prototype);

	p.start = function() {
		var timeline = this;
		var promise;
		if (Promise) {
			promise = new Promise(function (resolve, reject) {
				var timelineComplete = function (event) {
					timeline.removeEventListener(tsunami.Timeline.COMPLETE, timelineComplete);
					resolve(timeline);
				};
				timeline.addEventListener(tsunami.Timeline.COMPLETE, timelineComplete);
			});
		}
		this.clockStartTime = new Date();
		tsunami.clock.addEventListener("tick", this.tickHandler);
		this.setTime(0);
		return promise;
	};

	p.stop = function() {
		tsunami.clock.removeEventListener("tick", this.tickHandler);
	};

	p.tick = function(event) {
		this.setTime((tsunami.clock.time - this.clockStartTime) / 1000);
		var duration = this.getDuration();
		if (this.time >= duration) {
			this.stop();
			if (this.completeHandler) {
				this.completeHandler();
			}
			this.dispatchEvent({type:tsunami.Timeline.COMPLETE, target:this});
		}
	};

	p.getDuration = function() {
		var duration = 0;
		for (var i = 0; i < this.tweens.length; i++) {
			var tween = this.tweens[i];
			var tweenDuration = tween.startTime + tween.duration;
			duration = Math.max(duration, tweenDuration);
		}
		return duration;
	};

	p.getTime = function() {
		return this.time;
	};

	p.setTime = function(value) {
		var oldTime = this.time;
		if (oldTime == value) {
			return;
		}

		this.time = value;

		this.minTimeReached = Math.min(this.minTimeReached, value);
		this.maxTimeReached = Math.max(this.maxTimeReached, value);
		//console.log("minTimeReached", this.minTimeReached, "maxTimeReached", this.maxTimeReached);

		var min;
		var max;
		var direction;
		if (this.time > oldTime) {
			direction = tsunami.TimelineAction.FORWARDS;
			min = oldTime;
			max = value;
		}
		if (this.time < oldTime) {
			direction = tsunami.TimelineAction.BACKWARDS;
			min = value;
			max = oldTime;
		}

		//console.log("direction", direction);
		if (direction) {
			var selectedActions = [];

			if (direction == tsunami.TimelineAction.FORWARDS) {
				for (var i = 0; i < this.actions.length; i++) {
					var action = this.actions[i];
					if (action.direction == direction || action.direction == "both") {
						if (action.time > min && action.time <= max) {
							selectedActions.push(action);
						}
					}
				}
				selectedActions.sort(function(a, b){
					return a.time- b.time;
				});
			}
			if (direction == tsunami.TimelineAction.BACKWARDS) {
				for (var i = 0; i < this.actions.length; i++) {
					var action = this.actions[i];
					if (action.direction == direction || action.direction == "both") {
						if (action.time >= min && action.time < max) {
							selectedActions.push(action);
						}
					}
				}
				selectedActions.sort(function(a, b){
					return b.time-a.time;
				});
			}
			for (var j = 0; j < selectedActions.length; j++) {
				var selectedAction = selectedActions[j];
				selectedAction.count++;
				if (selectedAction.count >= selectedAction.repeat) {
					this.removeTime(selectedAction);
				}
				selectedAction.execute();
			}
		}

		for (var i = 0; i < this.tweens.length; i++) {
			var tween = this.tweens[i];
			var startTime = tween.startTime;
			//console.log("startTime", tween.startTime);

			var endTime = tween.startTime + tween.duration;
			if (value >= startTime && value <= endTime) {
				tween.setTime(value);
			} else if (direction == tsunami.TimelineAction.FORWARDS && value > endTime && tween.time != endTime && endTime >= this.minTimeReached && this.resetTweensOnScrub) {
				tween.setTime(endTime);
			} else if (direction == tsunami.TimelineAction.BACKWARDS && value < startTime && tween.time != startTime && this.maxTimeReached > startTime && this.resetTweensOnScrub) {
				tween.setTime(startTime);
			}
		}

		var changeEvent = {type:tsunami.Timeline.CHANGE, target:this};
		if (this.changeHandler) {
			this.changeHandler(changeEvent);
		}
		this.dispatchEvent(changeEvent);
	};

	p.addAction = function(action) {
		this.actions.push(action);
		if (action.time == this.time) {
			action.method();
		}
	};

	p.removeAction = function(action) {
		var array = [];
		for (var i = 0; i < this.actions.length; i++) {
			var oldAction = this.actions[i];
			if (oldAction != action) {
				array.push(oldAction);
			}
		}
		this.actions = array;
	};

	p.addTween = function(tween) {
		this.tweens.push(tween);
		var startTime = tween.startTime;
		var endTime = tween.startTime + tween.duration;
		if (this.time >= startTime && this.time <= endTime) {
			tween.setTime(this.time);
		}
	};

	p.removeTween = function(tween) {
		var array = [];
		for (var i = 0; i < this.tweens.length; i++) {
			var oldTween = this.tweens[i];
			if (oldTween != tween) {
				array.push(oldTween);
			}
		}
		this.tweens = array;
	};

	p.update = function() {
		this.timeRace = this.timeRace + (this.timeTarget - this.timeRace) * this.updateEase;
		this.setTime(Math.round(this.timeRace * 1000) / 1000);
	};

}());

(function() {

	tsunami.TimelineAction = function(method, time, direction, repeat) {
		this.method = method;
		this.time = time;
		if (!direction) {
			direction = tsunami.TimelineAction.FORWARDS;
		}
		this.direction = direction;
		if (isNaN(repeat)) {
			repeat = Infinity;
		}
		this.repeat = repeat;
		this.count = 0;
	};

	tsunami.TimelineAction.FORWARDS = "forwards";
	tsunami.TimelineAction.BACKWARDS = "backwards";
	tsunami.TimelineAction.BOTH = "both";

	var p = tsunami.TimelineAction.prototype;

	p.execute = function() {
		this.method();
	};

}());

tsunami = this.tsunami || {};

(function() {

	tsunami.TimeTween = function(startTime, duration, target, properties, methods, easing, changeHandler, completeHandler) {
		tsunami.EventDispatcher.call(this);
		this.startTime = startTime;
		this.duration = duration;
		this.target = target;
		this.properties = properties || [];
		this.methods = methods || [];
		this.easing = easing;
		this.changeHandler = changeHandler;
		this.completeHandler = completeHandler;
		this.time = this.startTime;
		this.timeTarget = this.startTime;
		this.updateEase = 0.1;
		this.tickHandler = this.tick.bind(this);
	};

	var p = tsunami.TimeTween.prototype = Object.create(tsunami.EventDispatcher.prototype);

	p.constructor = tsunami.TimeTween;

	var c = tsunami.TimeTween;

	c.COMPLETE = "complete";

	c.CHANGE = "change";

	p.start = function() {
		var tween = this;
		var promise;
		if (Promise) {
			promise = new Promise(function(resolve, reject) {
				var tweenComplete = function(event) {
					tween.removeEventListener(tsunami.TimeTween.COMPLETE, tweenComplete);
					resolve(tween);
				};
				tween.addEventListener(tsunami.TimeTween.COMPLETE, tweenComplete);
			});
		}
		this.clockStartTime = new Date();
		tsunami.clock.addEventListener(tsunami.Clock.TICK, this.tickHandler);
		this.setTime(0);
		return promise;
	};

	p.update = function() {
		this.setTime(this.time + (this.timeTarget - this.time) * this.updateEase);
	};

	p.stop = function() {
		tsunami.clock.removeEventListener(tsunami.Clock.TICK, this.tickHandler);
	};

	p.getTime = function() {
		return this.time;
	};

	p.setTime = function(value) {
		this.time = value;
		var time = Math.max(value - this.startTime, 0);
		time = Math.min(this.duration, time);
		for (var i in this.properties) {
			var array = this.properties[i];
			var tweened = this.easing(time, array[0], array[1], this.duration);
			this.target[i] = tweened;
		}
		for (var i in this.methods) {
			var array = this.methods[i];
			var tweened = this.easing(time, array[0], array[1], this.duration);
			this.target[i](tweened);
		}
		var changeEvent = {type:tsunami.TimeTween.CHANGE, target:this};
		if (this.changeHandler) {
			this.changeHandler(changeEvent);
		}
		this.dispatchEvent(changeEvent);
	};

	p.tick = function(event) {
		this.setTime((tsunami.clock.time - this.clockStartTime) / 1000);
		if (this.time >= this.startTime + this.duration) {
			this.stop();
			if (this.completeHandler) {
				this.completeHandler();
			}
			this.dispatchEvent({type:tsunami.TimeTween.COMPLETE, target:this});
		}
	};

}());

tsunami = this.tsunami || {};

(function() {

	tsunami.Tween = function(startTime, duration, target, properties, setters, easing, changeHandler, completeHandler) {
		tsunami.EventDispatcher.call(this);
		this.startTime = startTime;
		this.duration = duration;
		this.target = target;
		this.properties = properties || [];
		this.setters = setters || [];
		this.easing = easing;
		this.changeHandler = changeHandler;
		this.completeHandler = completeHandler;
		this.time = this.startTime;
		this.timeTarget = this.startTime;
		this.updateEase = 0.1;
		this.tickHandler = this.tick.bind(this);
	};

	var p = tsunami.Tween.prototype = Object.create(tsunami.EventDispatcher.prototype);

	p.constructor = tsunami.Tween;

	var c = tsunami.Tween;

	c.COMPLETE = "complete";

	c.CHANGE = "change";

	p.start = function() {
		var tween = this;
		var promise;
		if (Promise) {
			promise = new Promise(function (resolve, reject) {
				var tweenComplete = function (event) {
					tween.removeEventListener(tsunami.Tween.COMPLETE, tweenComplete);
					resolve(tween);
				};
				tween.addEventListener(tsunami.Tween.COMPLETE, tweenComplete);
			});
		}
		this.setTime(this.startTime);
		tsunami.clock.addEventListener(tsunami.Clock.TICK, this.tickHandler);
		return promise;
	};

	p.update = function() {
		this.setTime(this.time + (this.timeTarget - this.time) * this.updateEase);
	};

	p.stop = function() {
		tsunami.clock.removeEventListener(tsunami.Clock.TICK, this.tickHandler);
	};

	p.getTime = function() {
		return this.time;
	};

	p.setTime = function(value) {
		this.time = value;
		var frame = value - this.startTime;
		for (var i in this.properties) {
			var array = this.properties[i];
			var tweened = this.easing(frame, array[0], array[1], this.duration);
			this.target[i] = tweened;
		}
		for (var i in this.setters) {
			var array = this.setters[i];
			var tweened = this.easing(frame, array[0], array[1], this.duration);
			this.target[i](tweened);
		}
		var changeEvent = {type:tsunami.Tween.CHANGE, target:this};
		if (this.changeHandler) {
			this.changeHandler(changeEvent);
		}
		this.dispatchEvent(changeEvent);
	};

	p.tick = function() {
		this.setTime(this.time + 1);
		if (this.time >= this.startTime + this.duration) {
			this.stop();
			if (this.completeHandler) {
				this.completeHandler();
			}
			this.dispatchEvent({type:tsunami.Tween.COMPLETE, target:this});
		}
	};

}());

tsunami = this.tsunami || {};

(function() {

	tsunami.Data = function() {
		tsunami.EventDispatcher.call(this);
	};

	var p = tsunami.Data.prototype = Object.create(tsunami.EventDispatcher.prototype);

	p.constructor = tsunami.Data;

}());

tsunami = this.tsunami || {};

(function() {

	tsunami.Array = function() {
		tsunami.Data.call(this);

		this.length = new tsunami.Number(NaN);
		this._value = [];
		this.push.apply(this, arguments);
	};

	var c = tsunami.Array;

	c.shuffle = function(o) {
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	c.nodeListToArray = function(nodeList) {
		var array = new Array();
		for (var i = 0; i < nodeList.length; i++) {
			array.push(nodeList.item(i));
		}
		return array;
	};
	
	var p = c.prototype = Object.create(tsunami.Data.prototype);

	p.constructor = c;

	p.item = function(index) {
		return this._value[index];
	};
/*
	Object.defineProperty(p, 'length', {
		get: function() {
			return this._value.length;
		}
	});
*/
	Object.defineProperty(p, 'value', {
		get: function() {
			return this.getValue();
		},
		set: function(value) {
			this.setValue(value);
		}
	});

	p.setValue = function(value) {
		this._value = value;
		this.length.value = this._value.length;
		this.dispatchEvent({type:"change", value:this._value});
	};

	p.getValue = function() {
		return this._value;
	};

	p.indexOf = function(searchElement, fromIndex) {
		return this._value.indexOf(searchElement, fromIndex);
	};

	p.pop = function() {
		var element = this._value.pop();
		this.length.value = this._value.length;
		this.dispatchEvent({type:"remove", value:[element]});
		this.dispatchEvent({type:"change", value:this._value});
		return element;
	};

	p.push = function() {
		var length = this._value.push.apply(this._value, arguments);
		this.length.value = length;
		var added = [];
		for (var i = 0; i < arguments.length; i++) {
			added.push(arguments[i]);
		}
		if (added.length > 0) {
			this.dispatchEvent({type:"add", value:added});
			this.dispatchEvent({type:"change", value:this._value});
		}
		return length;
	};

	p.reverse = function() {
		this._value.reverse();
		this.dispatchEvent({type:"change", value:this._value});
	};

	p.shift = function() {
		var element = this._value.shift();
		this.length.value = this._value.length;
		this.dispatchEvent({type:"remove", value:[element]});
		this.dispatchEvent({type:"change", value:this._value});
		return element;
	};

	p.sort = function(compareFunction) {
		this._value.sort(compareFunction);
		this.dispatchEvent({type:"change", value:this._value});
	};

	p.splice = function() {
		var elements = this._value.splice.apply(this._value, arguments);
		var added = [];
		for (var i = 2; i < arguments.length; i++) {
			added.push(arguments[i]);
		}
		this.length.value = this._value.length;
		if (elements.length > 0) {
			this.dispatchEvent({type:"remove", value:elements});
		}
		if (added.length > 0) {
			this.dispatchEvent({type:"add", value:added});
		}
		if (elements.length > 0 || added.length > 0) {
			this.dispatchEvent({type:"change", value:this._value});
		}
		return elements;
	};

	p.unshift = function() {
		var length = this._value.unshift.apply(this._value, arguments);
		this.length.value = length;
		var added = [];
		for (var i = 0; i < arguments.length; i++) {
			added.push(arguments[i]);
		}
		if (added.length > 0) {
			this.dispatchEvent({type:"add", value:added});
			this.dispatchEvent({type:"change", value:this._value});
		}
		return length;
	};

	p.includes = function(element) {
		var index = this._value.indexOf(element);
		return (index != -1);
	};

	p.join = function() {
		return this._value.join.apply(this._value, arguments);
	};

	p.concat = function() {
		return this._value.concat.apply(this._value, arguments);
	};

	p.slice = function() {
		return this._value.slice.apply(this._value, arguments);
	};

	p.toString = function() {
		return this.getValue().toString();
	};

}());

tsunami = this.tsunami || {};

(function() {

	tsunami.Number = function(value, modifiers) {
		tsunami.Data.call(this);
		this.modifiers = modifiers || [];
		this.value = value;
	};

	var p = tsunami.Number.prototype = Object.create(tsunami.Data.prototype);

	p.constructor = tsunami.Number;

	Object.defineProperty(p, 'value', {
		get: function() {
			return this.getValue();
		},
		set: function(value) {
			this.setValue(value);
		}
	});

	p.getValue = function() {
		return this._value;
	};

	p.setValue = function(value) {
		for (var i = 0; i < this.modifiers.length; i++) {
			var modifier = this.modifiers[i];
			value = modifier.modify(value);
		}
		if (value != this._value) {
			this._value = eval(value);
			this.dispatchEvent({type:"change", value:this._value});
		}
	};

	p.add = function(value) {
		this.setValue(this._value + value);
	};

	p.subtract = function(value) {
		this.setValue(this._value - value);
	};

	p.toString = function() {
		return this.getValue().toString();
	};

	tsunami.Number.Max = function(maxValue) {
		this.maxValue = maxValue;
	};

	tsunami.Number.Max.prototype.modify = function(value) {
		return Math.min(value, this.maxValue);
	};

	tsunami.Number.Min = function(minValue) {
		this.minValue = minValue;
	};

	tsunami.Number.Min.prototype.modify = function(value) {
		return Math.max(value, this.minValue);
	};

}());

tsunami = this.tsunami || {};

(function() {

	tsunami.AverageNumber = function(numbers) {
		tsunami.Data.call(this);
		this.numberChangeBind = this.numberChangeHandler.bind(this);
		this._currentNumbers = [];
		if (!numbers) {
			numbers = new tsunami.Array();
		}
		this.numbers = numbers;
		this.numbers.addEventListener("change", this.arrayChange.bind(this));
		this.arrayChange();
	};

	var p = tsunami.AverageNumber.prototype = Object.create(tsunami.Data.prototype);

	p.constructor = tsunami.AverageNumber;

	Object.defineProperty(p, 'value', {
		get: function() {
			return this.getValue();
		}
	});

	p.arrayChange = function() {
		for (var i = 0; i < this._currentNumbers.length; i++) {
			var number = this._currentNumbers[i];
			number.removeEventListener("change", this.numberChangeBind);
		}
		this._currentNumbers = this.numbers.value;
		for (var i = 0; i < this._currentNumbers.length; i++) {
			var number = this._currentNumbers[i];
			number.addEventListener("change", this.numberChangeBind);
		}
		this.calculateAverage();
	};

	p.numberChangeHandler = function() {
		this.calculateAverage();
	};

	p.calculateAverage = function() {
		var total = 0;
		var array = this.numbers.value;
		for (var i = 0; i < array.length; i++) {
			var number = array[i];
			total += number.getValue();
		}
		this._value = total / Math.max(array.length, 1);
		this.dispatchEvent({type:"change", value:this._value});
	};

	p.getValue = function() {
		return this._value;
	};

	p.toString = function() {
		return this.getValue().toString();
	};

}());

(function() {

	tsunami.String = function(value) {
		tsunami.Data.call(this);

		this.value = value;
	};

	var c = tsunami.String;

	c.capitalize = function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	var p = c.prototype = Object.create(tsunami.Data.prototype);

	p.constructor = c;

	Object.defineProperty(p, 'value', {
		get: function() {
			return this.getValue();
		},
		set: function(value) {
			this.setValue(value);
		}
	});

	p.getValue = function() {
		return this._value;
	};

	p.setValue = function(value) {
		if (!value) {
			value = "";
		}
		if (value != this._value) {
			this._value = value.toString();
			this.dispatchEvent({type:"change", value:this._value});
		}
	};

	p.toString = function() {
		return this.getValue();
	};

}());




tsunami = this.tsunami || {};

(function() {

	tsunami.Boolean = function(value) {
		tsunami.Data.call(this);
		this.value = value;
	};

	var p = tsunami.Boolean.prototype = Object.create(tsunami.Data.prototype);

	p.constructor = tsunami.Boolean;

	Object.defineProperty(p, 'value', {
		get: function() {
			return this.getValue();
		},
		set: function(value) {
			this.setValue(value);
		}
	});

	p.getValue = function() {
		return this._value;
	};

	p.setValue = function(value) {
		value = eval(value);
		if (value != this._value) {
			this._value = value;
			this.dispatchEvent({type:"change", value:this._value});
		}
	};

	p.toString = function() {
		return this.getValue().toString();
	};

}());




tsunami = this.tsunami || {};
tsunami.geom = tsunami.geom || {};

(function() {

	tsunami.geom.Point = function(x, y) {
		this.x = (isNaN(x))?0:x;
		this.y = (isNaN(y))?0:y;
	};

    var c = tsunami.geom.Point;
    var p = tsunami.geom.Point.prototype;
	
	p.clone = function() {
		return new tsunami.geom.Point(this.x, this.y);
	};

	p.add = function(p) {
		var point = new tsunami.geom.Point();
		point.x = this.x + p.x;
		point.y = this.y + p.y;
		return point;
	};

	p.multiply = function(p) {
		var point = new tsunami.geom.Point();
		point.x = this.x * p.x;
		point.y = this.y * p.y;
		return point;
	};

	p.divide = function(p) {
		var point = new tsunami.geom.Point();
		point.x = this.x / p.x;
		point.y = this.y / p.y;
		return point;
	};

	p.equals = function(point) {
		return (this.x == point.x && this.y == point.y);
	};

	p.copyFrom = function(p) {
		this.x = p.x;
		this.y = p.y;
	};

	p.subtract = function(p) {
		var point = new tsunami.geom.Point();
		point.x = this.x - p.x;
		point.y = this.y - p.y;
		return point;
	};

	p.clamp = function(minX, maxX, minY, maxY) {
		this.clampX(minX, maxX);
		this.clampY(minY, maxY);
	};

	p.clampX = function(min, max) {
		this.x = Math.max(this.x, min);
		this.x = Math.min(this.x, max);
	};

	p.clampY = function(min, max) {
		this.y = Math.max(this.y, min);
		this.y = Math.min(this.y, max);
	};

	p.toString = function() {
		return "[Point" + " x=" + this.x + " y=" + this.y + "]";
	};

	c.distance = function(p1, p2) {
		return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
	};

	c.polar = function(len, radians) {
		return new tsunami.geom.Point(len * Math.cos(radians), len * Math.sin(radians));
	};
	
}());
tsunami = this.tsunami || {};
tsunami.geom = tsunami.geom || {};

(function() {

	tsunami.geom.Ratio = function() {
		this.constructor();
	};
	
	var c = tsunami.geom.Ratio;
	
	var p = tsunami.geom.Ratio.prototype;
	
	c.widthToHeight = function(rect) {
		return rect.width / rect.height;
	};
	
	c.heightToWidth = function(rect) {
		return rect.height / rect.width;
	};
	
	/*
	c.scale = function(rect, amount, snapToPixel) {
		return tsunami.geom.Ratio.defineRect(rect, rect.width * amount.decimalPercentage, rect.height * amount.decimalPercentage, snapToPixel);
	};
	*/
	
	c.scaleWidth = function(rect, height, snapToPixel) {
		return tsunami.geom.Ratio.defineRect(rect, height * tsunami.geom.Ratio.widthToHeight(rect), height, snapToPixel);
	};

	c.scaleHeight = function(rect, width, snapToPixel) {
		return tsunami.geom.Ratio.defineRect(rect, width, width * tsunami.geom.Ratio.heightToWidth(rect), snapToPixel);
	};
	
	c.scaleToFill = function(rect, bounds, snapToPixel) {
		var scaled = tsunami.geom.Ratio.scaleHeight(rect, bounds.width, snapToPixel);
		
		if (scaled.height < bounds.height) {
			scaled = tsunami.geom.Ratio.scaleWidth(rect, bounds.height, snapToPixel);
		}
		return scaled;
	};
	
	c.scaleToFit = function(rect, bounds, snapToPixel) {
		var scaled = tsunami.geom.Ratio.scaleHeight(rect, bounds.width, snapToPixel);
		
		if (scaled.height > bounds.height) {
			scaled = tsunami.geom.Ratio.scaleWidth(rect, bounds.height, snapToPixel);
		}
		scaled.x = (bounds.width - scaled.width) / 2;
		scaled.y = (bounds.height - scaled.height) / 2;
		return scaled;
	};
	
	c.defineRect = function(rect, width, height, snapToPixel) {
		var scaled = new tsunami.geom.Rectangle(0, 0, rect.width, rect.height);
		scaled.width = snapToPixel ? Math.round(width) : width;
		scaled.height = snapToPixel ? Math.round(height) : height;
		return scaled;
	};
	
}());
tsunami = this.tsunami || {};
tsunami.geom = tsunami.geom || {};

(function() {

	tsunami.geom.Rectangle = function(x, y, width, height) {
		this.x = (isNaN(x))?0:x;
		this.y = (isNaN(y))?0:y;
		this.width = (isNaN(width))?0:width;
		this.height = (isNaN(height))?0:height;
	};
	
	var p = tsunami.geom.Rectangle.prototype;

    p.containsPoint = function(point) {
		var hit = (point.x >= this.x && point.x <= this.x + this.width && point.y >= this.y && point.y <= this.y + this.height)?true:false;
		return hit;
    };

	p.intersects = function(rect) {
		return rect.x + rect.width > this.x && rect.y + rect.height > this.y && rect.x < this.x + this.width && rect.y < this.y + this.height;
	};

	p.intersect = function(b) {
		var a = this;
		var x = Math.max(a.x, b.x);
		var num1 = Math.min(a.x + a.width, b.x + b.width);
		var y = Math.max(a.y, b.y);
		var num2 = Math.min(a.y + a.height, b.y + b.height);
		var result;
		if (num1 >= x && num2 >= y) {
			result = new tsunami.geom.Rectangle(x, y, num1 - x, num2 - y);
		} else {
			result = new tsunami.geom.Rectangle();
		}
		return result;
	};
	
	p.equals = function(rect) {
		return (this.x == rect.x && this.y == rect.y && this.width == rect.width && this.height == rect.height);
	};

	p.clone = function(rect) {
		return new tsunami.geom.Rectangle(this.x, this.y, this.width, this.height);
	};

	p.copyFrom = function(rect) {
		this.x = rect.x;
		this.y = rect.y;
		this.width = rect.width;
		this.height = rect.height;
	};

	p.scale = function(x, y) {
		return new tsunami.geom.Rectangle(this.x, this.y, this.width * x, this.height * y);
	};

	p.getScaleToFill = function(rect) {
		var scale;
		var thisSize = this.width / this.height;
		var rectSize = rect.width / rect.height;
		if (thisSize > rectSize) {
			scale = rect.height / this.height;
		} else {
			scale = rect.width / this.width;
		}
		return scale;
	};

	p.getScaleToFit = function(rect) {
		var scale;
		var thisSize = this.width / this.height;
		var rectSize = rect.width / rect.height;
		if (thisSize > rectSize) {
			scale = rect.width / this.width;
		} else {
			scale = rect.height / this.height;
		}
		return scale;
	};

	Object.defineProperty(p, 'size', {
		get: function() {
			return this.getSize();
		},
		set: function(value) {
			this.setSize(value);
		}
	});

	p.getSize = function() {
		return new tsunami.geom.Point(this.width, this.height);
	};

	p.setSize = function(point) {
		this.width = point.x;
		this.height = point.y;
	};

	p.toString = function() {
		return "[Rectangle" + " x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
	};
	
}());
(function() {
	
	tsunami.geom.Vector3D = function(x, y, z) {
		this.constructor(x, y, z);
	};
	
	var c = tsunami.geom.Vector3D;
	var p = c.prototype;
	
	p.constructor = function(x, y, z) {
		if (isNaN(x)) x = 0;
		if (isNaN(y)) y = 0;
		if (isNaN(z)) z = 0;
		this.x = x;
		this.y = y;
		this.z = z;
	};
	
	p.clone = function() {
		return new tsunami.geom.Vector3D(this.x, this.y, this.z);
	};
	
	p.add = function(vector) {
		this.x += vector.x;
		this.y += vector.y;
		this.z += vector.z;
		return this;
	};
	
	p.multiply = function(vector) {
		this.x = this.x * vector.x;
		this.y = this.y * vector.y;
		this.z = this.z * vector.z;
		return this;
	};
	
	p.divide = function(vector) {
		this.x = this.x / vector.x;
		this.y = this.y / vector.y;
		this.z = this.z / vector.z;
		return this;
	};
	
	p.copyFrom = function(vector) {
		this.x = vector.x;
		this.y = vector.y;
		this.z = vector.z;
		return this;
	};
	
	p.subtract = function(v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;
	};
	
	p.toString = function() {
		return "[Vector3D" + " x=" + this.x + " y=" + this.y + " z=" + this.z + "]";
	};
	
	c.interpolate = function(v1, v2, position) {
		var x = (v1.x + v2.x) * position;
		var y = (v1.y + v2.y) * position;
		var z = (v1.z + v2.z) * position;
		return new tsunami.geom.Vector3D(x, y, z);
	};
	
	c.distance = function(v1, v2) {
		return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y) + (v1.z - v2.z) * (v1.z - v2.z));
	};
	
	c.polar = function(length, radians) {
		var vector = new tsunami.geom.Vector3D();
		vector.x = length * Math.cos(radians);
		vector.y = length * Math.sin(radians);
		return vector;
	};

	c.spherePoint = function(radius, radiansX, radiansY) {
		var xCoord2 = radius * Math.cos(radiansX);
		var yCoord2 = radius * Math.sin(radiansX);
		var xCoord = xCoord2 * Math.cos(radiansY);
		var yCoord = xCoord2 * Math.sin(radiansY);
		return new tsunami.geom.Vector3D(xCoord, yCoord2, yCoord);
	};

}());

(function() {

	var c = tsunami.canvas = {};

	c.patternFill = function(canvas, pattern) {
		var ctx = canvas.getContext("2d");
		var x = 0;
		var y = 0;
		while (y < canvas.height) {
			x = 0;
			while (x < canvas.width) {
				ctx.drawImage(pattern, x, y);
				x += pattern.width;
			}
			y += pattern.height;
		}
	};

	c.cloneImage = function(image, scaleX, scaleY, canvas) {
		if (isNaN(scaleX)) {
			scaleX = 1;
		}
		if (isNaN(scaleY)) {
			scaleY = 1;
		}
		if (canvas == null) {
			canvas = document.createElement("canvas");
		}
		canvas.width = image.width * scaleX;
		canvas.height = image.height * scaleY;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
		return canvas;
	};

}());
(function() {

	var c = tsunami.css = {};
	
	c.getRule = function(ruleName, deleteFlag) {
		if (document.styleSheets) {
			for (var i = 0; i < document.styleSheets.length; i++) {
				var styleSheet = document.styleSheets[i];
				var rules;
				try {
					rules = styleSheet.cssRules || styleSheet.rules;
				} catch(e) {

				}
				if (rules) {
					for (var j = 0; j < rules.length; j++) {
						var cssRule = rules[j];
						if (cssRule instanceof CSSStyleRule) {
							if (cssRule.selectorText == ruleName) {
								if (deleteFlag == 'delete') {
									if (styleSheet.cssRules) {
										styleSheet.deleteRule(j);
									} else {
										styleSheet.removeRule(j);
									}
									return true;
								} else {
									return cssRule;
								}
							}
						}
					}
				}
			}
		}
		return false;
	};

	c.killRule = function(ruleName) {
		return tsunami.css.getRule(ruleName,'delete');
	};

	c.addRule = function(ruleName) {
		if (document.styleSheets) {
			if (!tsunami.css.getRule(ruleName)) {
				if (document.styleSheets[0].addRule) {
					document.styleSheets[0].addRule(ruleName, null,0);
				} else {
					document.styleSheets[0].insertRule(ruleName+' { }', 0);
				}
			}
		}
		return tsunami.css.getRule(ruleName);
	};

}());
(function() {

	var c = tsunami.date = {};

	c.toUnixString = function(date) {
		return date.getFullYear() + "-" + tsunami.number.addLeadingZero(date.getMonth() + 1) + "-" + tsunami.number.addLeadingZero(date.getDate()) + " " + tsunami.number.addLeadingZero(date.getHours()) + ":" + tsunami.number.addLeadingZero(date.getMinutes()) + ":" + tsunami.number.addLeadingZero(date.getSeconds());
	};

	c.toUnixUTCString = function(date) {
		return date.getUTCFullYear() + "-" + tsunami.number.addLeadingZero(date.getUTCMonth() + 1) + "-" + tsunami.number.addLeadingZero(date.getUTCDate()) + " " + tsunami.number.addLeadingZero(date.getUTCHours()) + ":" + tsunami.number.addLeadingZero(date.getUTCMinutes()) + ":" + tsunami.number.addLeadingZero(date.getUTCSeconds());
	};

	c.addHours = function(date, hours) {
		date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
		return date;
	};

	c.addDays = function(date, days) {
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		return date;
	};

	c.months = {
		en:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		fr:["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
	};

	c.getMonth = function(date, language) {
		if (!language) {
			language = "en";
		}
		var month;
		switch(language) {
			case "en":
				month = tsunami.date.months[language][date.getMonth()];
				break;
		}
		return month;
	};

	c.getAge = function(birthDate) {
		var today = new Date();
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};

	c.treatAsUTC = function(date) {
		var result = new Date(date);
		result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
		return result;
	};

	c.minutesBetween = function(startDate, endDate) {
		var millisecondsPerMinute = 60 * 1000;
		return (tsunami.date.treatAsUTC(endDate) - tsunami.date.treatAsUTC(startDate)) / millisecondsPerMinute;
	};

	c.hoursBetween = function(startDate, endDate) {
		var millisecondsPerHour = 60 * 60 * 1000;
		return (tsunami.date.treatAsUTC(endDate) - tsunami.date.treatAsUTC(startDate)) / millisecondsPerHour;
	};

	c.daysBetween = function(startDate, endDate) {
		var millisecondsPerDay = 24 * 60 * 60 * 1000;
		return (tsunami.date.treatAsUTC(endDate) - tsunami.date.treatAsUTC(startDate)) / millisecondsPerDay;
	};

	c.weeksBetween = function(startDate, endDate) {
		var millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
		return (tsunami.date.treatAsUTC(endDate) - tsunami.date.treatAsUTC(startDate)) / millisecondsPerWeek;
	};

	c.monthsBetween = function(startDate, endDate) {
		var millisecondsPerMonth = 365 / 12  * 24 * 60 * 60 * 1000;
		return (tsunami.date.treatAsUTC(endDate) - tsunami.date.treatAsUTC(startDate)) / millisecondsPerMonth;
	};

	c.yearsBetween = function(startDate, endDate) {
		var millisecondsPerYear = 365 * 24 * 60 * 60 * 1000;
		return (tsunami.date.treatAsUTC(endDate) - tsunami.date.treatAsUTC(startDate)) / millisecondsPerYear;
	};

	c.getFamiliarTimeBetween = function(startDate, endDate) {
		var text = "";
		var yearsBetween = tsunami.date.yearsBetween(startDate, endDate);
		if (yearsBetween >= 1) {
			var yearsBetweenFloor = Math.floor(yearsBetween);
			if (yearsBetweenFloor > 1) {
				text = yearsBetweenFloor.toString() + " years ago";
			} else {
				text = yearsBetweenFloor.toString() + " year ago";
			}
		} else {
			var monthsBetween = tsunami.date.monthsBetween(startDate, endDate);
			if (monthsBetween >= 1) {
				var monthsBetweenFloor = Math.floor(monthsBetween);
				if (monthsBetweenFloor > 1) {
					text = monthsBetweenFloor.toString() + " months ago";
				} else {
					text = monthsBetweenFloor.toString() + " month ago";
				}
			} else {
				var weeksBetween = tsunami.date.weeksBetween(startDate, endDate);
				if (weeksBetween >= 1) {
					var weeksBetweenFloor = Math.floor(weeksBetween);
					if (weeksBetweenFloor > 1) {
						text = weeksBetweenFloor.toString() + " weeks ago";
					} else {
						text = weeksBetweenFloor.toString() + " week ago";
					}
				} else {
					var daysBetween = tsunami.date.daysBetween(startDate, endDate);
					if (daysBetween >= 1) {
						var daysBetweenFloor = Math.floor(daysBetween);
						if (daysBetweenFloor > 1) {
							text = daysBetweenFloor.toString() + " days ago";
						} else {
							text = daysBetweenFloor.toString() + " day ago";
						}
					} else {
						var hoursBetween = tsunami.date.hoursBetween(startDate, endDate);
						if (hoursBetween >= 1) {
							var hoursBetweenFloor = Math.floor(hoursBetween);
							if (hoursBetweenFloor > 1) {
								text = hoursBetweenFloor.toString() + " hours ago";
							} else {
								text = hoursBetweenFloor.toString() + " hour ago";
							}
						} else {
							var minutesBetween = tsunami.date.minutesBetween(startDate, endDate);
							if (minutesBetween > 1) {
								var minutesBetweenFloor = Math.floor(minutesBetween);
								if (minutesBetweenFloor > 1) {
									text = minutesBetweenFloor.toString() + " minutes ago";
								} else {
									text = minutesBetweenFloor.toString() + " minute ago";
								}
							} else {
								text = "Just now";
							}
						}
					}
				}
			}
		}
		return text;
	}

}());
tsunami = this.tsunami || {};
tsunami.utils = tsunami.utils || {};

(function() {

	tsunami.utils.Medias = function(medias) {
		tsunami.EventDispatcher.call(this);
		this.medias = medias || new Array();
	};

	tsunami.utils.Medias.CHANGE = "change";

	var p = tsunami.utils.Medias.prototype = Object.create(tsunami.EventDispatcher.prototype);

	p.constructor = tsunami.utils.Medias;

	p.mqlListener = function(event) {
		if (event.matches) {
			for (var i = 0; i < this.medias.length; i++) {
				var media = this.medias[i];
				if (media.mql.media == event.media) {
					this.mql = media.mql;
					this.data = media.data;
				}
			}
		}
		this.dispatchEvent({type:tsunami.utils.Medias.CHANGE});
	};
	
	p.matchMedia = function(media, data) {
		var mql = window.matchMedia(media);
		mql.addListener(this.mqlListener.bind(this));
		if (mql.matches) {
			this.mql = mql;
			this.data = data;
		}
		this.medias.push({
			mql:mql,
			data:data
		});
	};

}());




(function() {

	var c = tsunami.number = {};

	// Returns a random number between min (inclusive) and max (exclusive)
	c.getRandomArbitrary = function(min, max) {
		return Math.random() * (max - min) + min;
	};

	// Returns a random integer between min (included) and max (excluded)
	// Using Math.round() will give you a non-uniform distribution!
	c.getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	};

	// Returns a random integer between min (included) and max (included)
	// Using Math.round() will give you a non-uniform distribution!
	c.getRandomIntInclusive = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	/**
	 Creates a random number within the defined range.

	 @param min: The minimum value the random number can be.
	 @param min: The maximum value the random number can be.
	 @return Returns a random number within the range.
	 */
	c.randomWithinRange = function (min, max) {
		return min + (Math.random() * (max - min));
	};

	/**
	 Creates a random integer within the defined range.

	 @param min: The minimum value the random integer can be.
	 @param min: The maximum value the random integer can be.
	 @return Returns a random integer within the range.
	 */
	c.randomIntegerWithinRange = function(min, max) {
		return Math.floor(Math.random() * (1 + max - min) + min);
	};

	/**
	 Determines if the number is even.

	 @param value: A number to determine if it is divisible by <code>2</code>.
	 @return Returns <code>true</code> if the number is even; otherwise <code>false</code>.
	 @example
	 <code>
	 console.log(tsunami.number.isEven(7)); // Traces false
	 console.log(tsunami.number.isEven(12)); // Traces true
	 </code>
	 */
	c.isEven = function(value) {
		return (value & 1) == 0;
	};

	/**
	 Determines if the number is odd.

	 @param value: A number to determine if it is not divisible by <code>2</code>.
	 @return Returns <code>true</code> if the number is odd; otherwise <code>false</code>.
	 @example
	 <code>
	 console.log(tsunami.number.isOdd(7)); // Traces true
	 console.log(tsunami.number.isOdd(12)); // Traces false
	 </code>
	 */
	c.isOdd = function(value) {
		return !tsunami.number.isEven(value);
	};

	/**
	 Determines if the number is an integer.

	 @param value: A number to determine if it contains no decimal values.
	 @return Returns <code>true</code> if the number is an integer; otherwise <code>false</code>.
	 @example
	 <code>
	 console.log(tsunami.number.isInteger(13)); // Traces true
	 console.log(tsunami.number.isInteger(1.2345)); // Traces false
	 </code>
	 */
	c.isInteger = function (value) {
		return (value % 1) == 0;
	}

	/**
	 Determines if the number is prime.

	 @param value: A number to determine if it is only divisible by <code>1</code> and itself.
	 @return Returns <code>true</code> if the number is prime; otherwise <code>false</code>.
	 @example
	 <code>
	 console.log(tsunami.number.isPrime(13)); // Traces true
	 console.log(tsunami.number.isPrime(4)); // Traces false
	 </code>
	 */
	c.isPrime = function(value) {
		if (value == 1 || value == 2)
			return true;

		if (tsunami.number.isEven(value))
			return false;

		var s = Math.sqrt(value);
		for (var i = 3; i <= s; i++)
		if (value % i == 0)
			return false;

		return true;
	};

	/**
	 Rounds a number's decimal value to a specific place.

	 @param value: The number to round.
	 @param place: The decimal place to round.
	 @return Returns the value rounded to the defined place.
	 @example
	 <code>
	 console.log(tsunami.number.roundToPlace(3.14159, 2)); // Traces 3.14
	 console.log(tsunami.number.roundToPlace(3.14159, 3)); // Traces 3.142
	 </code>
	 */
	c.roundDecimalToPlace = function (value, place) {
		var p = Math.pow(10, place);

		return Math.round(value * p) / p;
	};

	/**
	 Determines if index is included within the collection length otherwise the index loops to the beginning or end of the range and continues.

	 @param index: Index to loop if needed.
	 @param length: The total elements in the collection.
	 @return A valid zero-based index.
	 @example
	 <code>
	 var colors:Array = new Array("Red", "Green", "Blue");

	 console.logcolors[tsunami.number.loopIndex(2, colors.length)]); // Traces Blue
	 console.logcolors[tsunami.number.loopIndex(4, colors.length)]); // Traces Green
	 console.logcolors[tsunami.number.loopIndex(-6, colors.length)]); // Traces Red
	 </code>
	 */
	c.loopIndex = function(index, length) {
		if (index < 0)
			index = length + index % length;

		if (index >= length)
			return index % length;

		return index;
	};

	/**
	 Determines if the value is included within a range.

	 @param value: Number to determine if it is included in the range.
	 @param firstValue: First value of the range.
	 @param secondValue: Second value of the range.
	 @return Returns <code>true</code> if the number falls within the range; otherwise <code>false</code>.
	 @usageNote The range values do not need to be in order.
	 @example
	 <code>
	 console.log(tsunami.number.isBetween(3, 0, 5)); // Traces true
	 console.log(tsunami.number.isBetween(7, 0, 5)); // Traces false
	 </code>
	 */
	c.isBetween = function(value, firstValue, secondValue) {
		return !(value < Math.min(firstValue, secondValue) || value > Math.max(firstValue, secondValue));
	};

	/**
	 Determines if value falls within a range; if not it is snapped to the nearest range value.

	 @param value: Number to determine if it is included in the range.
	 @param firstValue: First value of the range.
	 @param secondValue: Second value of the range.
	 @return Returns either the number as passed, or its value once snapped to nearest range value.
	 @usageNote The constraint values do not need to be in order.
	 @example
	 <code>
	 console.log(tsunami.number.constrain(3, 0, 5)); // Traces 3
	 console.log(tsunami.number.constrain(7, 0, 5)); // Traces 5
	 </code>
	 */
	c.constrain = function (value, firstValue, secondValue) {
		return Math.min(Math.max(value, Math.min(firstValue, secondValue)), Math.max(firstValue, secondValue));
	}

	/**
	 Creates evenly spaced numerical increments between two numbers.

	 @param begin: The starting value.
	 @param end: The ending value.
	 @param steps: The number of increments between the starting and ending values.
	 @return Returns an Array comprised of the increments between the two values.
	 @example
	 <code>
	 console.log(tsunami.number.createStepsBetween(0, 5, 4)); // Traces 1,2,3,4
	 console.log(tsunami.number.createStepsBetween(1, 3, 3)); // Traces 1.5,2,2.5
	 </code>
	 */
	c.createStepsBetween = function (begin, end, steps) {
		steps++;

		var i = 0;
		var stepsBetween = [];
		var increment = (end - begin) / steps;

		while (++i < steps)
			stepsBetween.push((i * increment) + begin);

		return stepsBetween;
	};

	/**
	 Determines a value between two specified values.

	 @param amount: The level of interpolation between the two values. If <code>0</code>, <code>begin</code> value is returned; if <code>1</code>, <code>end</code> value is returned.
	 @param begin: The starting value.
	 @param end: The ending value.
	 @example
	 <code>
	 console.log(tsunami.number.interpolate(0.5, 0, 10)); // Traces 5
	 </code>
	 */
	c.interpolate = function (amount, begin, end) {
		return begin + (end - begin) * amount;
	}

	/**
	 Determines a percentage of a value in a given range.

	 @param value: The value to be converted.
	 @param minimum: The lower value of the range.
	 @param maximum: The upper value of the range.
	 @example
	 <code>
	 console.log(tsunami.number.normalize(8, 4, 20).decimalPercentage); // Traces 0.25
	 </code>
	 */
	c.normalize = function (value, minimum, maximum) {
		return new Percent((value - minimum) / (maximum - minimum));
	}

	/**
	 Maps a value from one coordinate space to another.

	 @param value: Value from the input coordinate space to map to the output coordinate space.
	 @param min1: Starting value of the input coordinate space.
	 @param max1: Ending value of the input coordinate space.
	 @param min2: Starting value of the output coordinate space.
	 @param max2: Ending value of the output coordinate space.
	 @example
	 <code>
	 console.log(tsunami.number.map(0.75, 0, 1, 0, 100)); // Traces 75
	 </code>
	 */
	c.map = function (value, min1, max1, min2, max2) {
		return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
	};

	/**
	 Low pass filter alogrithm for easing a value toward a destination value. Works best for tweening values when no definite time duration exists and when the destination value changes.

	 If <code>(0.5 < n < 1)</code>, then the resulting values will overshoot (ping-pong) until they reach the destination value. When <code>n</code> is greater than 1, as its value increases, the time it takes to reach the destination also increases. A pleasing value for <code>n</code> is 5.

	 @param value: The current value.
	 @param dest: The destination value.
	 @param n: The slowdown factor.
	 @return The weighted average.
	 */
	c.getWeightedAverage = function (value, dest, n) {
		return value + (dest - value) / n;
	};

	/**
	 Formats a number as a string.

	 @param value: The number you wish to format.
	 @param kDelim: The character used to seperate thousands; defaults to <code>""</code>.
	 @param minLength: The minimum length of the number; defaults to <code>0 </code>.
	 @param fillChar: The leading character used to make the number the minimum length; defaults to <code>"0"</code>.
	 @return Returns the formatted number as a String.
	 @example
	 <code>
	 console.log(tsunami.number.format(1234567, ",", 8)); // Traces 01,234,567
	 </code>
	 */
	c.format = function (value, kDelim, minLength, fillChar) {
		if (!kDelim) {
			kDelim = ",";
		}
		if (isNaN(minLength)) {
			minLength = 0;
		}
		if (!fillChar) {
			fillChar = "0";
		}
		var remainder = value % 1;
		var num = Math.floor(value).toString();
		var len = num.length;

		if (minLength != 0 && minLength > len) {
			minLength -= len;

			var addChar = fillChar || '0';

			while (minLength--)
				num = addChar + num;
		}

		if (kDelim != null && num.length > 3) {
			var totalDelim  = Math.floor(num.length / 3);
			var totalRemain = num.length % 3;
			var numSplit   = num.split('');
			var i = -1;

			while (++i < totalDelim)
				numSplit.splice(totalRemain + (4 * i), 0, kDelim);

			if (totalRemain == 0)
				numSplit.shift();

			num = numSplit.join('');
		}

		if (remainder != 0)
			num += remainder.toString().substr(1);

		return num;
	};

	/**
	 Formats a number as a currency string.

	 @param value: The number you wish to format.
	 @param forceDecimals: If the number should always have two decimal places <code>true</code>, or only show decimals is there is a decimals value <code>false</code>; defaults to <code>true</code>.
	 @param kDelim: The character used to seperate thousands; defaults to <code>","</code>.
	 @return Returns the formatted number as a String.
	 @example
	 <code>
	 console.log(tsunami.number.formatCurrency(1234.5)); // Traces "1,234.50"
	 </code>
	 */
	c.formatCurrency = function(value, forceDecimals, kDelim) {
		if (forceDecimals == null) {
			forceDecimals = true;
		}
		if (!kDelim) {
			kDelim  = ",";
		}
		var remainder = value % 1;
		var currency = tsunami.number.format(Math.floor(value), kDelim);

		if (remainder != 0 || forceDecimals)
			currency += remainder.toFixed(2).substr(1);

		return currency;
	}

	/**
	 Finds the english ordinal suffix for the number given.

	 @param value: Number to find the ordinal suffix of.
	 @return Returns the suffix for the number, 2 characters.
	 @example
	 <code>
	 console.log32 + tsunami.number.getOrdinalSuffix(32)); // Traces 32nd
	 </code>
	 */
	c.getOrdinalSuffix = function (value) {
		if (value >= 10 && value <= 20)
			return 'th';

		if (value == 0)
			return '';

		switch (value % 10) {
			case 3 :
				return 'rd';
			case 2 :
				return 'nd';
			case 1 :
				return 'st';
			default :
				return 'th';
		}
	}

	/**
	 Adds a leading zero for numbers less than ten.

	 @param value: Number to add leading zero.
	 @return Number as a String; if the number was less than ten the number will have a leading zero.
	 @example
	 <code>
	 console.log(tsunami.number.addLeadingZero(7)); // Traces 07
	 console.log(tsunami.number.addLeadingZero(11)); // Traces 11
	 </code>
	 */
	c.addLeadingZero = function(value) {
		return (value < 10) ? '0' + value : value.toString();
	}

	/**
	 Spells the provided number.

	 @param value: Number to spell. Needs to be less than 999999999.
	 @return The number spelled out as a String.
	 @throws <code>Error</code> if <code>value</code> is greater than 999999999.
	 @example
	 <code>
	 console.log(tsunami.number.spell(0)); // Traces Zero
	 console.log(tsunami.number.spell(23)); // Traces Twenty-Three
	 console.log(tsunami.number.spell(2005678)); // Traces Two Million, Five Thousand, Six Hundred Seventy-Eight
	 </code>
	 */
	c.spell = function (value) {
		if (value > 999999999) {
			throw ('Value too large for this method.');
		}

		var onesSpellings = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
		var tensSpellings = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
		var spelling       = '';

		var millions = value / 1000000;
		value              %= 1000000;

		var thousands = value / 1000;
		value               %= 1000;

		var hundreds = value / 100;
		value              %= 100;

		var tens = value / 10;
		value          %= 10;

		var ones = value % 10;

		if (millions != 0) {
			spelling += (spelling.length == 0) ? '' : ', ';
			spelling += tsunami.number.spell(millions) + ' Million';
		}

		if (thousands != 0) {
			spelling += (spelling.length == 0) ? '' : ', ';
			spelling += tsunami.number.spell(thousands) + ' Thousand';
		}

		if (hundreds != 0) {
			spelling += (spelling.length == 0) ? '' : ', ';
			spelling += tsunami.number.spell(hundreds) + ' Hundred';
		}

		if (tens != 0 || ones != 0) {
			spelling += (spelling.length == 0) ? '' : ' ';

			if (tens < 2)
				spelling += onesSpellings[tens * 10 + ones];
			else {
				spelling += tensSpellings[tens];

				if (ones != 0)
					spelling += '-' + onesSpellings[ones];
			}
		}

		if (spelling.length == 0)
			return 'Zero';

		return spelling;
	};

	c.componentToHex = function(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	};

	c.rgbToHex = function(rgb) {
		return tsunami.number.componentToHex(rgb.r) + tsunami.number.componentToHex(rgb.g) + tsunami.number.componentToHex(rgb.b);
	};

	c.hexToRgb = function(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	};

}());

(function() {

	var c = tsunami.validation = {};

	c.email = function(emailAddress) {
		var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
		var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
		var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
		var sQuotedPair = '\\x5c[\\x00-\\x7f]';
		var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
		var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
		var sDomain_ref = sAtom;
		var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
		var sWord = '(' + sAtom + '|' + sQuotedString + ')';
		var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
		var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
		var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
		var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

		var reValidEmail = new RegExp(sValidEmail);

		if (reValidEmail.test(emailAddress)) {
			return true;
		}

		return false;
	};

}());
tsunami = this.tsunami || {};

(function() {

	tsunami.Attribute = function(element, attributeName, model, unit) {
		this.modelChangeBind = this.modelChange.bind(this);
		this.element = element;
		this.attributeName = attributeName;
		this.unit = unit;
		this.model = model;
	};

	var p = tsunami.Attribute.prototype;

	p.constructor = tsunami.Attribute;

	Object.defineProperty(p, 'model', {
		get: function() {
			return this.getModel();
		},
		set: function(value) {
			this.setModel(value);
		}
	});

	p.getModel = function() {
		return this._model;
	};

	p.setModel = function(value) {
		if (this._model) {
			if (this._model instanceof tsunami.Data) {
				this._model.removeEventListener("change", this.modelChangeBind);
			}
		}
		this._model = value;
		if (value) {
			if (value instanceof tsunami.Data) {
				value.addEventListener("change", this.modelChangeBind);
				this.modelChange();
			} else {
				this.updateValue(value);
			}
		} else {
			this.updateValue("");
		}
	};

	p.modelChange = function(event) {
		this.updateValue(this._model.value);
	};

	p.updateValue = function(value) {
		var string = value.toString();
		if (string && this.unit) {
			string += this.unit;
		}
		this.element.setAttribute(this.attributeName, string);
	};

}());




tsunami = this.tsunami || {};

(function () {

	tsunami.Element = function(prototype) {

		prototype.createdCallback = function() {
			this.debug = this.classList.contains("debug-this");
			this.styleManager = new tsunami.Style(this.style);
			this.modelChangeBind = this.modelChange.bind(this);
			this._scope = this;
		};

		Object.defineProperty(prototype, 'scope', {
			get: function() {
				return this.getScope();
			},
			set: function(value) {
				this.setScope(value);
			}
		});

		prototype.getScope = function() {
			return this._scope;
		};

		prototype.setScope = function(value) {
			this._scope = value;

			var model = this.getAttribute("data-model");
			if (model) {
				this.model = tsunami.evalProperty(model, value);
				this.removeAttribute("model");
			}

			this.attributesBinder = [];

			var removeAttributes = [];
			for (var i = 0; i < this.attributes.length; i++) {
				var attribute = this.attributes[i];
				if (attribute.name.indexOf("data-attr-") == 0) {
					var attr = attribute.name.split("data-attr-")[1];
					var attrModel = tsunami.evalProperty(attribute.value, value);
					removeAttributes.push(attribute.name);
					this.attributesBinder.push(new tsunami.Attribute(this, attr, attrModel, ""));
				}
			}

			for (var j = 0; j < removeAttributes.length; j++) {
				var attribute = removeAttributes[j];
				this.removeAttribute(attribute);
			}

		};

		Object.defineProperty(prototype, 'model', {
			get: function() {
				return this.getModel();
			},
			set: function(value) {
				this.setModel(value);
			}
		});

		prototype.getModel = function() {
			return this._model;
		};

		prototype.setModel = function(value) {
			if (this._model) {
				if (this._model instanceof tsunami.Data) {
					this._model.removeEventListener("change", this.modelChangeBind);
				}
			}
			this._model = value;
			if (value) {
				if (value instanceof tsunami.Data) {
					value.addEventListener("change", this.modelChangeBind);
					this.modelChange();
				} else {
					this.updateValue(value);
				}
			} else {

			}
		};

		prototype.modelChange = function(event) {
			this.updateValue(this._model.value);
		};

		prototype.updateValue = function(value) {

		};

		prototype.destroy = function() {
			this.model = null;
			this.styleManager.destroy();
			this.innerHTML = "";
			this.scope = null;
			if (this.parentNode) {
				this.parentNode.removeChild(this);
			}
		};

		return prototype;

	};

}());

(function() {

	tsunami.Button = function(prototype) {

		tsunami.Element(prototype);

		prototype.createdCallbackElement = prototype.createdCallback;

		prototype.createdCallback = function() {
			this.clickHandlerBind = this.clickHandler.bind(this);
			this.addEventListener("click", this.clickHandlerBind);
		};

		prototype.clickHandler = function(event) {
			this.onReleaseHandler(event);
		};

		prototype.onReleaseHandler = function(event) {
			if (this.onRelease) {
				this.onRelease(event);
			}
		};

		return prototype;

	};

}());

(function() {

	tsunami.RouterButton = function(prototype) {

		tsunami.Button(prototype);

		prototype.setScopeRouterButton = prototype.setScope;

		prototype.setScope = function(value) {
			this.setScopeRouterButton(value);

			var router = this.getAttribute("data-router");
			if (router) {
				this.router = tsunami.evalProperty(router, scope);
			}

			var pushState = this.getAttribute("data-pushstate");
			if (pushState) {
				this.pushState = eval(pushState);
			}
		};

		Object.defineProperty(prototype, 'router', {
			get: function() {
				return this.getRouter();
			},
			set: function(value) {
				this.setRouter(value);
			}
		});

		prototype.getRouter = function() {
			return this._router;
		};

		prototype.setRouter = function(value) {
			this._router = value;
		};

		prototype.clickHandler = function(event) {
			event.preventDefault();
			this.onReleaseHandler(event);
		};

		prototype.onReleaseHandlerButton = prototype.onReleaseHandler;

		prototype.onReleaseHandler = function(event) {
			this.onReleaseHandlerButton(event);

			if (this.router) {
				var path = this.getPath();
				if (path != undefined && path != null) {
					this.router.setLocation(path, this.pushState);
				}
			} else {
				console.log("The property 'router' is undefined in RouterButton", this);
			}
		};

		prototype.getPath = function() {
			return this.href || this.getAttribute("data-path");
		};

		return prototype;

	};

}());
tsunami = this.tsunami || {};

(function () {

	tsunami.DataBind = function(prototype) {

		tsunami.Element(prototype);

		prototype.setModelElement = prototype.setModel;

		prototype.setModel = function(value) {
			this.setModelElement(value);
			if (value) {
				if (this._model instanceof tsunami.Data) {
					this.modelChange();
				} else {
					this.innerHTML = this._model;
				}
			} else {
				this.innerHTML = "";
			}
		};

		prototype.modelChange = function(event) {
			this.innerHTML = this.model.value;
		};

		return prototype;

	};

}());

tsunami = this.tsunami || {};

(function () {

	tsunami.Input = function(prototype) {

		tsunami.Element(prototype);

		prototype.createdCallbackElement = prototype.createdCallback;

		prototype.createdCallback = function() {
			this.createdCallbackElement();

			this.inputBind = this.inputHandler.bind(this);
			this.addEventListener("input", this.inputBind);

			this.changeBind = this.changeHandler.bind(this);
			this.addEventListener("change", this.changeBind);
		};

		prototype.updateValue = function(value) {
			switch(this.type) {
				case "checkbox":
					this.checked = value;
					break;
				case "radio":
					var checked = (value == this.value);
					if (checked != this.checked) {
						this.checked = checked;
					}
					break;
				default:
					this.value = value;
					break;
			}
		};

		prototype.inputHandler = function(event) {
			if (this._model) {
				if (this._model instanceof tsunami.Data) {
					this._model.removeEventListener("change", this.modelChangeBind);
					this._model.value = this.value;
					this._model.addEventListener("change", this.modelChangeBind);
				}
			}
		};

		prototype.changeHandler = function(event) {
			if (this._model) {
				if (this._model instanceof tsunami.Data) {
					this._model.removeEventListener("change", this.modelChangeBind);
					switch(this.type) {
						case "checkbox":
							this._model.value = this.checked;
							break;
						case "radio":
							this._model.value = this.value;
							break;
						default:
							break;
					}
					this._model.addEventListener("change", this.modelChangeBind);
				}
			}
		};

		prototype.destroyElement = prototype.destroy;

		prototype.destroy = function() {
			this.removeEventListener("input", this.inputBind);
			this.removeEventListener("change", this.changeBind);
			this.destroyElement();
		};

		return prototype;

	};

}());

tsunami = this.tsunami || {};

(function () {

	tsunami.List = function(prototype) {

		tsunami.Element(prototype);

		prototype.createdCallbackElement = prototype.createdCallback;

		prototype.createdCallback = function() {
			this.createdCallbackElement();
			this._providerChangeBind = this._providerChange.bind(this);
			this.elements = [];
		};

		prototype.setScopeElement = prototype.setScope;

		prototype.setScope = function(value) {
			this.setScopeElement(value);

			var template = this.getAttribute("data-template");
			if (template) {
				this.template = tsunami.evalProperty(template, value);
			}

			var dataProvider = this.getAttribute("data-provider");
			if (dataProvider) {
				this.dataProvider = tsunami.evalProperty(dataProvider, value);
			}

		};

		Object.defineProperty(prototype, 'template', {
			get: function() {
				return this.getTemplate();
			},
			set: function(value) {
				this.setTemplate(value);
			}
		});

		prototype.getTemplate = function() {
			return this._template;
		};

		prototype.setTemplate = function(value) {
			this._template = value;
			this.dataProvider = this.dataProvider;
		};

		Object.defineProperty(prototype, 'dataProvider', {
			get: function() {
				return this.getDataProvider();
			},
			set: function(value) {
				this.setDataProvider(value);
			}
		});

		prototype.getDataProvider = function() {
			return this._provider;
		};

		prototype.setDataProvider = function(value) {
			if (this._provider) {
				if (this._provider instanceof tsunami.Array) {
					//this._provider.removeEventListener("add", this._providerChangeBind);
					//this._provider.removeEventListener("remove", this._providerChangeBind);
					this._provider.removeEventListener("change", this._providerChangeBind);
				}
			}
			this._removeElements();
			this._provider = value;
			if (this._provider) {
				if (this._provider instanceof tsunami.Array) {
					//this._provider.addEventListener("add", this._providerChangeBind);
					//this._provider.addEventListener("remove", this._providerChangeBind);
					this._provider.addEventListener("change", this._providerChangeBind);
					this._addElements(this._provider.value);
				} else {
					this._addElements(this._provider);
				}
			}
			this.model = this.model;
		};

		prototype._removeElements = function() {
			tsunami.destroyElements(this.elements);
			this.elements = [];
		};

		prototype._addElements = function(array) {
			for (var i = 0; i < array.length; i++) {
				var scope = {
					model:array[i],
					index:i,
					length:array.length,
					scope:this
				};
				var element = tsunami.importTemplate(this.template, scope);
				this.appendChild(element);
				this.elements.push(element);
			}
		};

		prototype._providerChange = function(event) {
			this._removeElements();
			this._addElements(this._provider.value);
		};

		prototype.destroyElement = prototype.destroy;

		prototype.destroy = function() {
			this.dataProvider = null;
			this.destroyElement();
		};

		return prototype;

	};

}());

(function() {

	tsunami.Noun = function(prototype) {

		tsunami.Element(prototype);

		prototype.createCallbackElement = prototype.createdCallback;

		prototype.createdCallback = function() {
			this.plural = this.querySelector(".plural");
			this.singular = this.querySelector(".singular");

			this.createCallbackElement();
		};

		prototype.updateValue = function(value) {
			this.plural.style.display = (value > 1)?"inline-block":"none";
			this.singular.style.display = (value < 2)?"inline-block":"none";
		};

	};

}());


tsunami = this.tsunami || {};

(function() {

	tsunami.Select = function(prototype) {

		tsunami.List(prototype);

		prototype.createdCallbackList = prototype.createdCallback;

		prototype.createdCallback = function() {
			this.createdCallbackList();
			this.inputBind = this.inputHandler.bind(this);
			this.addEventListener("input", this.inputBind);
		};

		prototype.updateValue = function(value) {
			this.value = value;
		};

		prototype.inputHandler = function(e) {
			if (this._model) {
				this._model.removeEventListener("change", this.modelChangeBind);
				this._model.value = this.value;
				this._model.addEventListener("change", this.modelChangeBind);
			}
		};

		prototype.destroyList = prototype.destroy;

		prototype.destroy = function() {
			this.removeEventListener("input", this.inputBind);
			this.destroyList();
		};

	};

}());


(function() {

	tsunami.Style = function(style) {

		this.style = style;

		this.units = new tsunami.StyleUnits();

		this._transform = "";
	};

	var p = tsunami.Style.prototype;

	Object.defineProperty(p, 'fontSize', {
		get: function() {
			return eval(this.style.fontSize.split(this.units.fontSize)[0]) || 0;
		},
		set: function(value) {
			this.style.fontSize = value + this.units.fontSize;
		}
	});

	Object.defineProperty(p, 'marginTop', {
		get: function() {
			return eval(this.style.marginTop.split(this.units.marginTop)[0]) || 0;
		},
		set: function(value) {
			this.style.marginTop = value + this.units.marginTop;
		}
	});

	Object.defineProperty(p, 'marginBottom', {
		get: function() {
			return eval(this.style.marginBottom.split(this.units.marginBottom)[0]) || 0;
		},
		set: function(value) {
			this.style.marginBottom = value + this.units.marginBottom;
		}
	});

	Object.defineProperty(p, 'marginRight', {
		get: function() {
			return eval(this.style.marginRight.split(this.units.marginRight)[0]) || 0;
		},
		set: function(value) {
			this.style.marginRight = value + this.units.marginRight;
		}
	});

	Object.defineProperty(p, 'marginLeft', {
		get: function() {
			return eval(this.style.marginLeft.split(this.units.marginLeft)[0]) || 0;
		},
		set: function(value) {
			this.style.marginLeft = value + this.units.marginLeft;
		}
	});

	Object.defineProperty(p, 'width', {
		get: function() {
			return eval(this.style.width.split(this.units.width)[0]) || 0;
		},
		set: function(value) {
			this.style.width = value + this.units.width;
		}
	});

	Object.defineProperty(p, 'height', {
		get: function() {
			return eval(this.style.height.split(this.units.height)[0]) || 0;
		},
		set: function(value) {
			this.style.height = value + this.units.height;
		}
	});

	Object.defineProperty(p, 'left', {
		get: function() {
			return eval(this.style.left.split(this.units.left)[0]) || 0;
		},
		set: function(value) {
			this.style.left = value + this.units.left;
		}
	});

	Object.defineProperty(p, 'top', {
		get: function() {
			return eval(this.style.top.split(this.units.top)[0]) || 0;
		},
		set: function(value) {
			this.style.top = value + this.units.top;
		}
	});

	Object.defineProperty(p, 'right', {
		get: function() {
			return eval(this.style.right.split(this.units.right)[0]) || 0;
		},
		set: function(value) {
			this.style.right = value + this.units.right;
		}
	});

	Object.defineProperty(p, 'bottom', {
		get: function() {
			return eval(this.style.bottom.split(this.units.bottom)[0]) || 0;
		},
		set: function(value) {
			this.style.bottom = value + this.units.bottom;
		}
	});

	Object.defineProperty(p, 'opacity', {
		get: function() {
			return (isNaN(this.style.opacity))?1:this.style.opacity;
		},
		set: function(value) {
			this.style.opacity = value;
		}
	});

	p.transformSpace = function() {
		return (this.transform)?" ":"";
	};

	Object.defineProperty(p, 'translateX', {
		get: function() {
			return (isNaN(this._translateX))?0:this._translateX;
		},
		set: function(value) {
			this._translateX = value;
			this._transform += this.transformSpace() + "translateX(" + value + this.units.translateX + ")";
		}
	});

	Object.defineProperty(p, 'translateY', {
		get: function() {
			return (isNaN(this._translateY))?0:this._translateY;
		},
		set: function(value) {
			this._translateY = value;
			this._transform += this.transformSpace() + "translateY(" + value + this.units.translateY + ")";
		}
	});

	Object.defineProperty(p, 'translateZ', {
		get: function() {
			return (isNaN(this._translateZ))?0:this._translateZ;
		},
		set: function(value) {
			this._translateZ = value;
			this._transform += this.transformSpace() + "translateZ(" + value + this.units.translateZ + ")";
		}
	});

	Object.defineProperty(p, 'scale', {
		get: function() {
			return this.scaleX;
		},
		set: function(value) {
			this.scaleX = value;
			this.scaleY = value;
		}
	});

	Object.defineProperty(p, 'scaleX', {
		get: function() {
			return (isNaN(this._scaleX))?1:this._scaleX;
		},
		set: function(value) {
			this._scaleX = value;
			this._transform += this.transformSpace() + "scaleX(" + value + ")";
		}
	});

	Object.defineProperty(p, 'scaleY', {
		get: function() {
			return (isNaN(this._scaleY))?1:this._scaleY;
		},
		set: function(value) {
			this._scaleY = value;
			this._transform += this.transformSpace() + "scaleY(" + value + ")";
		}
	});

	Object.defineProperty(p, 'scaleZ', {
		get: function() {
			return (isNaN(this._scaleZ))?1:this._scaleZ;
		},
		set: function(value) {
			this._scaleZ = value;
			this._transform += this.transformSpace() + "scaleZ(" + value + ")";
		}
	});

	Object.defineProperty(p, 'rotateX', {
		get: function() {
			return (isNaN(this._rotateX))?0:this._rotateX;
		},
		set: function(value) {
			this._rotateX = value;
			this._transform += this.transformSpace() + "rotateX(" + value + "deg)";
		}
	});

	Object.defineProperty(p, 'rotateY', {
		get: function() {
			return (isNaN(this._rotateY))?0:this._rotateY;
		},
		set: function(value) {
			this._rotateY = value;
			this._transform += this.transformSpace() + "rotateY(" + value + "deg)";
		}
	});

	Object.defineProperty(p, 'rotateZ', {
		get: function() {
			return (isNaN(this._rotateZ))?0:this._rotateZ;
		},
		set: function(value) {
			this._rotateZ = value;
			this._transform += this.transformSpace() + "rotateZ(" + value + "deg)";
		}
	});

	Object.defineProperty(p, 'rotate', {
		get: function() {
			return (isNaN(this._rotate))?0:this._rotate;
		},
		set: function(value) {
			this._rotate = value;
			this._transform += this.transformSpace() + "rotate(" + value + "deg)";
		}
	});

	Object.defineProperty(p, 'skewX', {
		get: function() {
			return (isNaN(this._skewX))?0:this._skewX;
		},
		set: function(value) {
			this._skewX = value;
			this._transform += this.transformSpace() + "skewX(" + value + "deg)";
		}
	});

	Object.defineProperty(p, 'skewY', {
		get: function() {
			return (isNaN(this._skewY))?0:this._skewY;
		},
		set: function(value) {
			this._skewY = value;
			this._transform += this.transformSpace() + "skewY(" + value + "deg)";
		}
	});

	p.updateTransform = function() {
		var style = this.style;
		var transform = this.getTransform();
		style.msTransform = transform;
		style.webkitTransform = transform;
		//style.oTransform = transform;
		style.transform = transform;
		this.setTransform("");
	};

	p.setTransform = function(value) {
		this._transform = value;
	};

	p.getTransform = function() {
		return this._transform;
	};

	p.destroy = function() {
		this.style = null;
	};

	tsunami.StyleUnits = function() {
		this.fontSize = "px";
		this.marginTop = "px";
		this.marginBottom = "px";
		this.marginRight = "px";
		this.marginLeft = "px";
		this.width = "px";
		this.height = "px";
		this.left = "px";
		this.top = "px";
		this.right = "px";
		this.bottom = "px";
		this.translateX = "px";
		this.translateY = "px";
		this.translateZ = "px";
	};

}());

(function() {

	tsunami.Switch = function(prototype) {

		tsunami.Element(prototype);

		prototype.createCallbackElement = prototype.createdCallback;

		prototype.createdCallback = function() {
			this.caseElements = {};

			this.defaultElement = this.querySelector(".default");

			this.hideElement(this.defaultElement);

			var cases = this.querySelectorAll(".case");
			for (var i = 0; i < cases.length; i++) {
				var caseElement = cases.item(i);
				var val = caseElement.getAttribute("data-value");
				if (val) {
					this.caseElements[val] = caseElement;
				}
				this.hideElement(caseElement);
			}

			this.createCallbackElement();
		};

		prototype.updateValue = function(value) {
			value = value.toString();

			this.hideElement(this.selectedElement);
			this.selectedElement = this.caseElements[value] || this.defaultElement;
			this.showElement(this.selectedElement);
		};

		prototype.hideElement = function(element) {
			if (element) {
				if (element.parentNode) {
					element.parentNode.removeChild(element);
				}
			}
		};

		prototype.showElement = function(element) {
			if (element) {
				this.appendChild(element);
			}
		};

	};

}());

