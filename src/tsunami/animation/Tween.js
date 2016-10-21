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
