tsunami = this.tsunami || {};

(function() {

	tsunami.Tween = function(startFrame, duration, target, properties, setters, easing, changeHandler, completeHandler) {
		tsunami.EventDispatcher.call(this);
		this.startFrame = startFrame;
		this.duration = duration;
		this.target = target;
		this.properties = properties || [];
		this.setters = setters || [];
		this.easing = easing;
		this.changeHandler = changeHandler;
		this.completeHandler = completeHandler;
		this.currentFrame = this.startFrame;
		this.currentFrameTarget = this.startFrame;
		this.updateEase = 0.1;
		this.tickHandler = this.tick.bind(this);
	};

	var p = tsunami.Tween.prototype = Object.create(tsunami.EventDispatcher.prototype);

	var c = tsunami.Tween;

	c.COMPLETE = "complete";

	c.CHANGE = "change";

	c.clock = new tsunami.EventDispatcher();

	c.clock.tick = function() {
		tsunami.Tween.clock.dispatchEvent({type:"tick"});
	};

	p.start = function() {
		this.setCurrentFrame(this.startFrame);
		tsunami.Tween.clock.addEventListener("tick", this.tickHandler);
	};

	p.update = function() {
		this.setCurrentFrame(this.currentFrame + (this.currentFrameTarget - this.currentFrame) * this.updateEase);
	};

	p.stop = function() {
		tsunami.Tween.clock.removeEventListener("tick", this.tickHandler);
	};

	p.getCurrentFrame = function() {
		return this.currentFrame;
	};

	p.setCurrentFrame = function(value) {
		this.currentFrame = value;
		var frame = value - this.startFrame;
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
		this.setCurrentFrame(this.currentFrame + 1);
		if (this.currentFrame >= this.startFrame + this.duration) {
			this.stop();
			if (this.completeHandler) {
				this.completeHandler();
			}
			this.dispatchEvent({type:tsunami.Tween.COMPLETE, target:this});
			this.taskCompleted();
		}
	};

}());