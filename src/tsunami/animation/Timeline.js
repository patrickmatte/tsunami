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
