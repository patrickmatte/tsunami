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
		var promise = new Promise(function(resolve, reject) {
			var tweenComplete = function(event) {
				tween.removeEventListener(tsunami.TimeTween.COMPLETE, tweenComplete);
				resolve(tween);
			};
			tween.addEventListener(tsunami.TimeTween.COMPLETE, tweenComplete);
		});
		this.clockStartTime = tsunami.clock.time;
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
