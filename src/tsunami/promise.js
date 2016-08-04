tsunami = this.tsunami || {};
tsunami.promise = tsunami.promise || {};


tsunami.promise.eventListener = function(dispatcher, eventName, stopPropagation, stopImmediatePropagation, preventDefault) {

	var promise = new Promise(function(resolve, reject) {

		var eventHandler = function(event) {
			console.log(event);
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
