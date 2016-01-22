tsunami = this.tsunami || {};

(function() {
	
	tsunami.TaskManager = function(tasks) {
		this.construct(tasks);
	};
	
	var p = tsunami.TaskManager.prototype = new tsunami.Task();

	p.constructTask = p.construct;

	p.construct = function(tasks) {
		this.constructTask();

		this.setTasks(tasks);
	};
	
	p.tasks = [];
	
	p.progressiveTasks = [];
	
	p.createdTasks = [];
	
	p.delayComplete = function() {
		this.createdTasks = [];
	};
	
	p.setTasks = function(value) {
		this.tasks = [];
		this.progressiveTasks = [];
		if (value) {
			for (var i = 0; i < value.length; i++) {
				this.addTask(value[i]);
			}
		}
		return this;
	};
	
	p.addTask = function(task) {
		if (task) {
			this.tasks.push(task);
			if (task.progressive) {
				this.progressiveTasks.push(task);
				this.progressive = true;
			}
			task.setDebug(this.getDebug());
		}
		return this;
	};
	
	p.addTaskAt = function(task, index) {
		if (task) {
			if (task.progressive) {
				this.progressiveTasks.push(task);
				this.progressive = true;
			}
			this.tasks.splice(index, 0, task);
			task.setDebug(this.getDebug());
		}
		return this;
	};
	
	p.contains = function(task) {
		return this.tasks.indexOf(task) != -1;
	};
	
	p.getTaskAt = function(index) {
		return this.tasks[index];
	};
	
	p.getTaskByName = function(name) {
		var taskFound;
		for (var i = 0; i < this.tasks.length; i++) {
			var task = this.tasks[i];
			if (task.name == name) {
				taskFound = task;
			}
		}
		return taskFound;
	};
	
	p.getTaskIndex = function(task) {
		return this.tasks.indexOf(task);
	};
	
	p.removeTask = function(task) {
		var index = this.getTaskIndex(task);
		if (index != -1) {
			this.removeTaskAt(index);
		}
		return this;
	};
	
	p.removeTaskAt = function(index) {
		var task = this.getTaskAt[index];
		this.tasks.splice(index, 1);
		var progressiveIndex = this.progressiveTasks.indexOf(task);
		if (progressiveIndex != -1) {
			this.progressiveTasks.splice(progressiveIndex, 1);
		}
		this.progressive = (this.progressiveTasks.length > 0);
		return this;
	};
	

	p.setTaskIndex = function(task, index) {
		var taskIndex = this.getTaskIndex(task);
		if (taskIndex != -1) {
			this.tasks.splice(index, 0, this.tasks[taskIndex]);
			this.tasks.splice(taskIndex, 1);
		}
	};
	
	p.swapTasksAt = function(index1, index2) {
		var temp = this.tasks[index1];
		this.tasks[index1] = this.tasks[index2];
		this.tasks[index2] = temp;
		return this;
	};

	p.getProgress = function() {
		var loadedProgress = 0;
		for (var i = 0; i < this.progressiveTasks.length; i++) {
			loadedProgress += this.progressiveTasks[i].getProgress();
		}
		var theValue = loadedProgress / Math.max(this.progressiveTasks.length, 1);
		if (this.debugPreload) {
			console.log("getProgress", theValue, "progressiveTasks.length", this.progressiveTasks.length);
		}
		return theValue;
	};

	p.setDebugTask = p.setDebug;
		
	p.setDebug = function(value) {
		this.setDebugTask(value);
		for (var i = 0; i < this.tasks.length; i++) {
			this.tasks[i].setDebug(value);
		}
	};

	p.destroyTask = p.destroy;

	p.destroy = function() {
		for (var i = 0; i < this.tasks.length; i++) {
			this.tasks[i].destroy();
		}
		this.task = null;
		this.progressiveTasks = null;
		this.createdTasks = null;

		this.destroyTask();
	};

}());



