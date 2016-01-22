tsunami = this.tsunami || {};

(function() {
	
	tsunami.Task = function(delay) {
		this.construct(delay);
	};
	
	var p = tsunami.Task.prototype = new tsunami.EventDispatcher();

	p.constructEventDispatcher = p.construct;

	p.construct = function(delay) {
		this.constructEventDispatcher();
		this.delay = delay;
	};

	p.onProgress = function(event){};
	
	p._progress = 0;

	p.name = "unnamed";
	
	p.delay = null;
	
	p.progressive = false;

	p.start = function() {
		this._progress = 0;
		if (this.getDebug()) {
			console.log("task " + this.name + " start", this);
		}
		if (!isNaN(this.delay)) {
			setTimeout(this.delayComplete.bind(this), this.delay * 1000);
		} else {
			this.delayComplete();
		}
	};
	
	p.delayComplete = function() {

	};
	
	p.taskCompleted = function() {
		if (this.getDebug()) {
			console.log("task " + this.name + " end", this);
		}
		this._progress = 1;
		if (this.onComplete) {
			this.onComplete({target:this, currentTarget:this});
		}
	};

	p.destroyEventDispatcher = p.destroy;

	p.destroy = function() {
		this.destroyEventDispatcher();
		this.onComplete = null;
	};
	
	p.getProgress = function() {
		return this._progress;
	};

	p.getDebug = function() {
		return this._debug;
	};

	p.setDebug = function(value) {
		this._debug = value;
	};
	
	p.toString = function() {
		return "[Task" + " name=" + this.name + "]";
	};
	
}());



