tsunami = this.tsunami || {};

(function() {
	
	tsunami.Series = function(tasks) {
		this.construct(tasks);
	};
	
	var p = tsunami.Series.prototype = new tsunami.TaskManager();
	
	p.constructTaskManager = p.construct;
	
	p.construct = function(tasks) {
		this.constructTaskManager(tasks);

		this.name = "series";
	};
	
	p.delayCompleteTaskManager = p.delayComplete;
	
	p.delayComplete = function() {
		this.delayCompleteTaskManager();
		if (this.tasks.length > 0) {
			this.createTask();
		} else {
			this.taskCompleted();
		}
	};
	
	p.createTask = function() {
		var index = this.createdTasks.length;
		var task = this.tasks[index];
		task.onComplete = this.onCompleteTask.bind(this);
		task.start();
	};
	
	p.onCompleteTask = function(event) {
		var task = event.target;
		task.onComplete = function(){};
		this.createdTasks.push(task);
		if (this.createdTasks.length == this.tasks.length) {
			this.taskCompleted();
		} else {
			this.createTask();
		}
	};
	
	p.toString = function() {
		return "[Series" + " name=" + this.name + "]";
	};
	
}());



