tsunami = this.tsunami || {};

(function() {

	tsunami.Delay = function(delay) {
		this.construct(delay);
	}

	var p = tsunami.Delay.prototype = new tsunami.Task();

	p.delayComplete = function() {
		this.taskCompleted();
	};

	p.toString = function() {
		return "[Delay" + " name=" + this.name + "]";
	}

}());



