tsunami = this.tsunami || {};
tsunami.promise = tsunami.promise || {};


tsunami.promise.eventListener = function(dispatcher, eventName, stopPropagation, stopImmediatePropagation, preventDefault, ignoreChildEventBubbling) {

	var promise = new Promise(function(resolve, reject) {

		var eventHandler = function(event) {
			event.stopPropagation();
			if (ignoreChildEventBubbling && event.target != dispatcher) {
				return;
			}
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

tsunami.promise.transition = function(dispatcher) {

	return tsunami.promise.eventListener(dispatcher, tsunami.events.transitionend, true, false, false, true);

};

tsunami.promise.animation = function(dispatcher) {

	return tsunami.promise.eventListener(dispatcher, tsunami.events.animationend, true, false, false, true);

};

tsunami.promise.timeout = function(seconds) {

	var promise = new Promise(function(resolve, reject){

		var timeoutComplete = function(){
			resolve();
		};

		setTimeout(timeoutComplete, seconds * 1000);

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