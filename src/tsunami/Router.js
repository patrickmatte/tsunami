tsunami = this.tsunami || {};

(function() {

	tsunami.Router = function(root) {
		this.construct(root);
	};

	var p = tsunami.Router.prototype = new tsunami.EventDispatcher();

	p.constructEventDispatcher = p.construct;

	p.construct = function(root) {
		this.constructEventDispatcher();

		this._overrideLocation = null;
		this.branches = [];
		this._location = "";
		this.forwards = {};
		this.fragment = "";
		this.path = "";
		this.root = root;
		this.popStateHandlerMethod = this.popStateHandler.bind(this);

		this.show = new tsunami.RouterTransition(this, "show", this._showComplete.bind(this));
		this.show.tasks = [
			new tsunami.RouterTask("load", true),
			new tsunami.RouterTask("show", false)
		];
		this.hide = new tsunami.RouterTransition(this, "hide", this._hideComplete.bind(this));
		this.hide.tasks = [
			new tsunami.RouterTask("hide", false)
		];
		this.defaultLocation = "";
	};

	p.getHistory = function() {
		return this._history;
	};

	p.setHistory = function(value) {
		if (this._history) {
			this._history.removeEventListener("popstate", this.popStateHandlerMethod);
		}
		this._history = value;
		if (this._history) {
			this._history.addEventListener("popstate", this.popStateHandlerMethod);
		}
	};

	p.popStateHandler = function(event) {
		//console.log("popStateHandler", event.state);
		if (event.state) {
			var path = event.state.path;
			this.setLocation(path, false);
		} else {
			this.setLocation(this.path, false);
		}
	};

	p.getLocation = function() {
		return this._getBranchPath(this.branches[this.branches.length - 1]);
	};

	p.setLocation = function(value, pushState) {
		if (this._debug) {
			console.log("setLocation", value);
		}

		if (value == this.getLocation() && this.hasLocation) {
			return;
		}
		var path = value.substr(this.path.length + this.fragment.length);
		if (path.indexOf("&" != -1)) {
			path = path.split("&")[0];
		}
		var forward = this.forwards[path];
		path = forward || path;

		this._gotoLocation(path);
		if (this._history && pushState) {
			this._history.pushState({path:value}, "", value);
		}
	};

	p._getBranchPath = function(branch) {
		var pathArray = [];
		if (branch) {
			while(branch.id != "root") {
				pathArray.unshift(branch.id);
				branch = branch.parent;
			}
		}
		var locationPath = this.path;
		if (pathArray.length > 0) {
			locationPath += this.fragment + pathArray.join("/");
		}
		return locationPath;
	};

	p._gotoLocation = function(value) {
		if (this._debug) {
			console.log("_gotoLocation", value);
		}
		if (value == "") {
			value = this.defaultLocation;
		}
		this.dispatchEvent({type:"locationChange", location:value});
		this.hasLocation = true;
		this._overrideLocation = null;
		if (this._inTransition) {
			this._overrideLocation = value;
		} else {
			//this._overrideLocation = null;

			this._nextLocation = "root";
			if (value != "") {
				this._nextLocation += "/" + value;
			}
			if (this._debug) {
				console.log("_nextLocation", this._nextLocation);
			}
			this._inTransition = true;
			this._startTransitions();
		}
	};

	p._startTransitions = function() {
		var nextLocationArray = this._nextLocation.split("/");
		var breakIndex = -1;
		for (var i = 0; i < this.branches.length; i++) {
			var branchId = this.branches[i].id;
			var nextBranchId = nextLocationArray[i];
			if (branchId == nextBranchId) {
				breakIndex = i;
			}
		}
		this.hide.branches = this.branches.splice(breakIndex + 1).reverse();
		var parent = this;
		if (this.branches.length > 0) {
			parent = this.branches[this.branches.length - 1];
		}
		var newBranches = [];
		for (var i = breakIndex + 1; i < nextLocationArray.length; i++) {
			var branch = new tsunami.BranchProxy(nextLocationArray[i], parent);
			branch.root = this.root;
			branch.path = this._getBranchPath(branch);
			parent = branch;
			newBranches.push(branch);
		}
		this.show.branches = newBranches;
		this.hide.start();
	};

	p._hideComplete = function(event) {
		if (this._overrideLocation) {
			this._inTransition = false;
			this._gotoLocation(this._overrideLocation);
		} else {
			this.show.start();
		}
	};

	p._showComplete = function(event) {
		this._inTransition = false;
		this.branches = this.branches.concat(this.show.branches);
		this.dispatchEvent({type:"complete"});
		if (this._overrideLocation) {
			this._gotoLocation(this._overrideLocation);
		}
	};

	p._startPreload = function(task) {
		this._currentTask = task;
		//this._currentTask.debugPreload = true;
		this.preloader.setProgress(0);
		this._isMonitoringProgress = true;
		this._updatePreloader();
	};

	p._updatePreloader = function() {
		if (this._isMonitoringProgress) {
			var progress = this._currentTask.getProgress();
			this.preloader.setProgress(progress);
			window.requestAnimationFrame(this._updatePreloader.bind(this));
		}
	};

	p._endPreload = function(task) {
		this._currentTask = null;
		this.preloader.setProgress(1);
		this._isMonitoringProgress = false;
	};

	p.getBranch = function(id) {
		return this[id];
	};

	p.forward = function(path, newPath) {
		this.forwards[path] = newPath;
	};

	p.destroy = function() {
		this._overrideLocation = null;
		this.branches = null;
		this._location = null;
		this.forwards = null;
		this.fragment = null;
		this.path = null;
		this.root = null;
		this.popStateHandlerMethod = null;
	};

	p.toString = function() {
		return "[Router name=" + this.name + " location=" + this.getLocation() + "]";
	};

}());


(function() {

	tsunami.RouterTransition = function(router, name, onComplete) {
		this.router = router;
		this.name = name;
		this.onComplete = onComplete;
	};

	var p = tsunami.RouterTransition.prototype;

	p.start = function() {
		if (this.branches.length > 0) {
			var nextTask;
			for (var i = this.tasks.length - 1; i > -1; i--) {
				var task = this.tasks[i];
				task.router = this.router;
				task.branches = this.branches.slice();
				if (nextTask) {
					task.onComplete = nextTask.start.bind(nextTask);
				} else {
					task.onComplete = this.tasksComplete.bind(this);
				}
				nextTask = task;
			}
			var firstTask = this.tasks[0];
			firstTask.start();
		} else {
			this.tasksComplete();
		}
	};

	p.tasksComplete = function() {
		this.onComplete();
	};

}());

(function() {

	tsunami.RouterTask = function(name, preload) {
		this.name = name;
		this.preload = preload;
	};

	var p = tsunami.RouterTask.prototype;

	p.start = function() {
		this.preloader = null;
		if (this.branches.length > 0) {
			if (this.preload) {
				this.assetList = new tsunami.AssetList();
				for (var i = 0; i < this.branches.length; i++) {
					var branch = this.branches[i];
					branch.progress = 0;
					branch.assetList = new tsunami.AssetList();
					this.assetList.add(branch);
				}
				this.preloader = this.router.preloader;
				if (this.preloader) {
					this.isPreloading = true;
					var promise = this.preloader.show();
					if (promise) {
						var startNextBranch = this.startNextBranch.bind(this);
						promise.then(function(obj) {
							startNextBranch();
						});
					} else {
						this.startNextBranch();
					}
					this.checkProgress();
				} else {
					this.startNextBranch();
				}
			} else {
				this.startNextBranch();
			}
		} else {
			this.onComplete();
		}
	};

	p.checkProgress = function() {
		if (this.branch) {
			this.branch.updateProgress();
		}
		this.preloader.setProgress(this.assetList.progress);
		if (this.isPreloading) {
			this.animationFrame = requestAnimationFrame(this.checkProgress.bind(this));
		}
	};

	p.startNextBranch = function() {
		this.branch = this.branches.shift();
		this.branch.taskName = this.name;
		this.branch.preload = this.preload;
		this.branch.router = this.router;
		this.branch.onComplete = this.branchComplete.bind(this);
		this.branch.startTask();
	};

	p.branchComplete = function() {
		if (this.branches.length > 0) {
			this.startNextBranch();
		} else {
			if (this.preloader) {
				this.isPreloading = false;
				//cancelAnimationFrame(this.animationFrame);
				var promise = this.preloader.hide();
				if (promise) {
					var onComplete = this.onComplete.bind(this);
					promise.then(function() {
						onComplete();
					})
				} else {
					this.onComplete();
				}
			} else {
				this.onComplete();
			}
		}
	};

}());

(function() {

	tsunami.BranchProxy = function(id, parent) {
		this.id = id;
		this.parent = parent;
	};

	var p = tsunami.BranchProxy.prototype;

	p.startTask = function() {
		if (!this.branch) {
			this.branch = this.parent.getBranch(this.id);
			if (!this.branch) {
				this.branch = {};
			}
			this.branch.root = this.root;
			this.branch.path = this.path;
			this.branch.parent = this.parent;
		}
		var method = this.branch[this.taskName];
		if (method) {
			method = method.bind(this.branch);
			var assetList = (this.preload)?this.assetList:null;
			var promise = method(assetList);
			if (promise) {
				promise.then(this.taskComplete.bind(this), this.taskError.bind(this));
			} else {
				this.taskComplete();
			}
		} else {
			this.taskComplete();
		}
	};

	p.updateProgress = function() {
		this.progress = this.assetList.progress;
	};

	p.taskError = function(obj) {
		this.taskComplete();
	};

	p.taskComplete = function(obj) {
		this.progress = 1;
		this.onComplete();
	};

	p.getBranch = function(id) {
		return this.branch.getBranch(id);
	};

}());


(function() {

	tsunami.AssetList = function() {
		this.assets = [];
		Object.defineProperty(this, "progress", {
			get: function () {
				var progress = 0;
				var length = this.assets.length;
				for (var i = 0; i < this.assets.length; i++) {
					var promise = this.assets[i];
					if (promise.hasOwnProperty("progress")) {
						progress += promise.progress;
					} else {
						length--;
					}
				}
				if (length > 0) {
					progress = progress / length;
				} else {
					progress = 1;
				}
				return progress;
			}
		});
	};

	var p = tsunami.AssetList.prototype;

	p.add = function(value) {
		this.assets.push(value);
	};

}());

