tsunami = this.tsunami || {};

(function() {

	tsunami.EventDispatcher = function() {
		this.construct();
	};

	var p = tsunami.EventDispatcher.prototype;

	p.construct = function() {
		this.listeners = [];
		this._debug = false;
	};

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
		var listeners = this.listeners;
		for (var i = 0 ; i < listeners.length; i++) {
			var listener = listeners[i];
			if (listener.type == event.type) {
				listener.func(event);
			}
		}
	};

	p.destroy = function() {
		this.listeners = [];
	};

}());