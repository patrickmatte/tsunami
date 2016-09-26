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



/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
 * @version   3.2.1
 */

(function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function e(t){return"function"==typeof t}function n(t){G=t}function r(t){Q=t}function o(){return function(){process.nextTick(a)}}function i(){return function(){B(a)}}function s(){var t=0,e=new X(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){t.port2.postMessage(0)}}function c(){return function(){setTimeout(a,1)}}function a(){for(var t=0;J>t;t+=2){var e=tt[t],n=tt[t+1];e(n),tt[t]=void 0,tt[t+1]=void 0}J=0}function f(){try{var t=require,e=t("vertx");return B=e.runOnLoop||e.runOnContext,i()}catch(n){return c()}}function l(t,e){var n=this,r=new this.constructor(p);void 0===r[rt]&&k(r);var o=n._state;if(o){var i=arguments[o-1];Q(function(){x(o,r,i,n._result)})}else E(n,r,t,e);return r}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return g(n,t),n}function p(){}function _(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function v(t){try{return t.then}catch(e){return ut.error=e,ut}}function y(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function m(t,e,n){Q(function(t){var r=!1,o=y(n,e,function(n){r||(r=!0,e!==n?g(t,n):S(t,n))},function(e){r||(r=!0,j(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,j(t,o))},t)}function b(t,e){e._state===it?S(t,e._result):e._state===st?j(t,e._result):E(e,void 0,function(e){g(t,e)},function(e){j(t,e)})}function w(t,n,r){n.constructor===t.constructor&&r===et&&constructor.resolve===nt?b(t,n):r===ut?j(t,ut.error):void 0===r?S(t,n):e(r)?m(t,n,r):S(t,n)}function g(e,n){e===n?j(e,_()):t(n)?w(e,n,v(n)):S(e,n)}function A(t){t._onerror&&t._onerror(t._result),T(t)}function S(t,e){t._state===ot&&(t._result=e,t._state=it,0!==t._subscribers.length&&Q(T,t))}function j(t,e){t._state===ot&&(t._state=st,t._result=e,Q(A,t))}function E(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+it]=n,o[i+st]=r,0===i&&t._state&&Q(T,t)}function T(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r,o,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?x(n,r,o,i):o(i);t._subscribers.length=0}}function M(){this.error=null}function P(t,e){try{return t(e)}catch(n){return ct.error=n,ct}}function x(t,n,r,o){var i,s,u,c,a=e(r);if(a){if(i=P(r,o),i===ct?(c=!0,s=i.error,i=null):u=!0,n===i)return void j(n,d())}else i=o,u=!0;n._state!==ot||(a&&u?g(n,i):c?j(n,s):t===it?S(n,i):t===st&&j(n,i))}function C(t,e){try{e(function(e){g(t,e)},function(e){j(t,e)})}catch(n){j(t,n)}}function O(){return at++}function k(t){t[rt]=at++,t._state=void 0,t._result=void 0,t._subscribers=[]}function Y(t){return new _t(this,t).promise}function q(t){var e=this;return new e(I(t)?function(n,r){for(var o=t.length,i=0;o>i;i++)e.resolve(t[i]).then(n,r)}:function(t,e){e(new TypeError("You must pass an array to race."))})}function F(t){var e=this,n=new e(p);return j(n,t),n}function D(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function K(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function L(t){this[rt]=O(),this._result=this._state=void 0,this._subscribers=[],p!==t&&("function"!=typeof t&&D(),this instanceof L?C(this,t):K())}function N(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[rt]||k(this.promise),Array.isArray(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&S(this.promise,this._result))):j(this.promise,U())}function U(){return new Error("Array Methods must be provided an Array")}function W(){var t;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;(!n||"[object Promise]"!==Object.prototype.toString.call(n.resolve())||n.cast)&&(t.Promise=pt)}var z;z=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var B,G,H,I=z,J=0,Q=function(t,e){tt[J]=t,tt[J+1]=e,J+=2,2===J&&(G?G(a):H())},R="undefined"!=typeof window?window:void 0,V=R||{},X=V.MutationObserver||V.WebKitMutationObserver,Z="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),$="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,tt=new Array(1e3);H=Z?o():X?s():$?u():void 0===R&&"function"==typeof require?f():c();var et=l,nt=h,rt=Math.random().toString(36).substring(16),ot=void 0,it=1,st=2,ut=new M,ct=new M,at=0,ft=Y,lt=q,ht=F,pt=L;L.all=ft,L.race=lt,L.resolve=nt,L.reject=ht,L._setScheduler=n,L._setAsap=r,L._asap=Q,L.prototype={constructor:L,then:et,"catch":function(t){return this.then(null,t)}};var _t=N;N.prototype._enumerate=function(){for(var t=this.length,e=this._input,n=0;this._state===ot&&t>n;n++)this._eachEntry(e[n],n)},N.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===nt){var o=v(t);if(o===et&&t._state!==ot)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===pt){var i=new n(p);w(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){e(t)}),e)}else this._willSettleAt(r(t),e)},N.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===ot&&(this._remaining--,t===st?j(r,n):this._result[e]=n),0===this._remaining&&S(r,this._result)},N.prototype._willSettleAt=function(t,e){var n=this;E(t,void 0,function(t){n._settledAt(it,e,t)},function(t){n._settledAt(st,e,t)})};var dt=W,vt={Promise:pt,polyfill:dt};"function"==typeof define&&define.amd?define(function(){return vt}):"undefined"!=typeof module&&module.exports?module.exports=vt:"undefined"!=typeof this&&(this.ES6Promise=vt),dt()}).call(this);

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

