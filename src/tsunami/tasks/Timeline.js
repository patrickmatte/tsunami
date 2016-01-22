tsunami = this.tsunami || {};

(function() {

	tsunami.Timeline = function() {
		this._position = -Infinity;
		this.frames = [];

		this.tasksToDo = [];
		this.currentTask = null;

		this.isWorking = false;
	}

	tsunami.Timeline.FORWARDS = "forwards";
	tsunami.Timeline.BACKWARDS = "backwards";
	tsunami.Timeline.BOTH = "both";

	var p = tsunami.Timeline.prototype;

	p.addFrame = function(frame) {
		this.frames.push(frame);
	}

	p.removeFrame = function(frame) {
		var array = [];
		for (var i = 0; i < this.frames.length; i++) {
			var oldFrame = this.frames[i];
			if (oldFrame != frame) {
				array.push(oldFrame);
			}
		}
		this.frames = array;
	}

	p.getPosition = function() {
		return this._position;
	}

	p.setPosition = function(value) {
		var oldPosition = this._position;
		this._position = value;

		var min = Math.min(oldPosition, value);
		var max = Math.max(oldPosition, value);

		var direction;
		if (value > oldPosition) {
			direction = tsunami.Timeline.FORWARDS;
		}
		if (value < oldPosition) {
			direction = tsunami.Timeline.BACKWARDS;
		}
		if (direction) {
			var selectedFrames = [];
			for (var i = 0; i < this.frames.length; i++) {
				var frame = this.frames[i];
				if (frame.position >= min && frame.position <= max) {
					if (frame.direction == direction || frame.direction == "both") {
						selectedFrames.push(frame);
					}
				}
			}

			if (direction == tsunami.Timeline.FORWARDS) {
				selectedFrames.sort(function(a, b){return a.position- b.position});
			}
			if (direction == tsunami.Timeline.BACKWARDS) {
				selectedFrames.sort(function(a, b){return b.position-a.position});
			}
			for (var j = 0; j < selectedFrames.length; j++) {
				var selectedFrame = selectedFrames[j];
				selectedFrame.count++;
				if (selectedFrame.count >= selectedFrame.repeat) {
					this.removeFrame(selectedFrame);
				}
				var taskToDo = selectedFrame.task;
				this.tasksToDo.push(taskToDo);
			}
			this.work();
		}
	}

	p.work = function() {
		if (!this.isWorking && this.tasksToDo.length > 0) {
			this.isWorking = true;
			this.currentTask = this.tasksToDo.shift();
			this.currentTask.onComplete = this.taskComplete.bind(this);
			this.currentTask.start();
		}
	}

	p.taskComplete = function(event) {
		this.isWorking = false;
		this.work();
	}

}());


(function() {

	tsunami.TimelineFrame = function(task, position, direction, repeat) {
		this.task = task;
		this.position = position;
		this.direction = direction;
		this.repeat = repeat;
		this.count = 0;
	}

}());