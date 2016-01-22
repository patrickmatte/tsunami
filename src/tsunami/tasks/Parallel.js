tsunami = this.tsunami || {};

(function() {
	
	tsunami.Parallel = function(tasks) {
		this.construct(tasks);
	};
	
	var p = tsunami.Parallel.prototype = new tsunami.TaskManager();

	p.constructTaskManager = p.construct;

	p.construct = function(tasks) {
		this.constructTaskManager(tasks);

		this.name = "parallel";
	};
	
	p.delayCompleteTaskManager = p.delayComplete;
	
	p.delayComplete = function() {
		this.delayCompleteTaskManager();
		if (this.tasks.length > 0) {
			for (var i = 0; i < this.tasks.length; i++) {
				var task = this.tasks[i];
				task.onComplete = this.onCompleteTask.bind(this);
				task.start();
			}
		} else {
			this.taskCompleted();
		}		
	};
	
	p.onCompleteTask = function(event) {
		var task = event.target;
		this.createdTasks.push(task);
		if (this.createdTasks.length == this.tasks.length) {
			this.taskCompleted();
		}
	};
	
	p.toString = function() {
		return "[Parallel" + " name=" + this.name + "]";
	};
	
}());



