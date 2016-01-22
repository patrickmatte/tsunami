tsunami = this.tsunami || {};

(function() {
	
	tsunami.Method = function(method, args, delay) {
		this.construct(method, args, delay);
	}

	var p = tsunami.Method.prototype = new tsunami.Task();

	p.constructTask = p.construct;

	p.construct = function(method, args, delay) {
		this.constructTask(delay);
		this.method = method;
		this.args = args;
	}

	p.delayComplete = function() {
		this.result = this.method.apply(null, this.args);
		this.taskCompleted();
	}
	
	p.destroyTask = p.destroy;
	
	p.destroy = function() {
		this.result = null;
		this.method = null;
		this.args = null;
		this.destroyTask();
	}
	
	p.toString = function() {
		return "[Method" + " name=" + this.name + "]";
	}
	
}());



