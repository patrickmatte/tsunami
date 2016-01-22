tsunami = this.tsunami || {};

(function() {

	tsunami.EventListener = function(dispatcher, eventName, stopPropagation, stopImmediatePropagation, preventDefault) {
		this.construct(dispatcher, eventName, stopPropagation, stopImmediatePropagation, preventDefault);
	}

	var p = tsunami.EventListener.prototype = new tsunami.Task();

	p.constructTask = p.construct;

	p.construct = function(dispatcher, eventName, stopPropagation, stopImmediatePropagation, preventDefault) {
		this.constructTask();
		this.dispatcher = dispatcher;
		this.eventName = eventName;
		this.stopPropagation = stopPropagation;
		this.stopImmediatePropagation = stopImmediatePropagation;
		this.preventDefault = preventDefault;
		this.eventHandlerMethod = this.eventHandler.bind(this);
	}

	p.startTask = p.start;

	p.start = function() {
		this.dispatcher.addEventListener(this.eventName, this.eventHandlerMethod);
	}

	p.eventHandler = function(event) {
		if (this.stopPropagation) {
			event.stopPropagation();
		}
		if (this.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		}
		if (this.preventDefault) {
			event.preventDefault();
		}
		this.dispatcher.removeEventListener(this.eventName, this.eventHandlerMethod);
		this.taskCompleted();
	}

	p.destroyTask = p.destroy;

	p.destroy = function() {
		this.dispatcher = null;
		this.eventName = null;
		this.eventHandlerMethod = null;
		this.stopPropagation = null;
		this.stopImmediatePropagation = null;
		this.preventDefault = null;
		this.destroyTask();
	}

	p.toString = function() {
		return "[EventListener" + " name" + this.name + "]";
	}

}());



