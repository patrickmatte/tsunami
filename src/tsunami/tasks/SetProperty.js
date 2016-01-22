tsunami = this.tsunami || {};

(function() {

	tsunami.SetProperty = function(target, propertyName, value, delay) {
		this.construct(target, propertyName, value, delay);
	};

	var p = tsunami.SetProperty.prototype = new tsunami.Task();

	p.constructTask = p.construct;

	p.construct = function(target, propertyName, value, delay) {
		this.constructTask();
		this.target = target;
		this.propertyName = propertyName;
		this.value = value;
		this.delay = delay;
	};

	p.delayComplete = function() {
		this.target[this.propertyName] = this.value;
		this.taskCompleted();
	};

	p.destroyTask = p.destroy;

	p.destroy = function() {
		this.target = null;
		this.propertyName = null;
		this.value = null;
		this.destroyTask();
	};

	p.toString = function() {
		return "[Property" + " name=" + this.name + "]";
	};

}());



