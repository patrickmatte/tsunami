tsunami = this.tsunami || {};

(function() {

	tsunami.Router = function(root) {
		tsunami.EventDispatcher.call(this);

		this._overrideLocation = null;
		this.branches = new tsunami.Array();
		this._location = "";
		this.redirects = {};
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

	var p = tsunami.Router.prototype = Object.create(tsunami.EventDispatcher.prototype);

	p.constructor = tsunami.Router;

	Object.defineProperty(p, 'history', {
		get: function() {
			return this._history;
		},
		set: function(value) {
			if (this._history) {
				this._history.removeEventListener("popstate", this.popStateHandlerMethod);
			}
			this._history = value;
			if (this._history) {
				this._history.addEventListener("popstate", this.popStateHandlerMethod);
			}
		}
	});

	p.popStateHandler = function(event) {
		if (event.state) {
			var path = event.state.path;
			this.setLocation(path, false);
		} else {
			this.setLocation(this.path, false);
		}
	};

	p.getLocation = function() {
		return this._getBranchPath(this.branches.item(this.branches.value.length - 1));
	};

	p.setLocation = function(value, pushState) {
		if (this._debug) {
			console.log("setLocation", value);
		}

		if (value == this.getLocation() && this.hasLocation) {
			return;
		}
		var path = value.substr(this.path.length + this.fragment.length);

		var hashes = path.split("&");

		this.parameters = {};
		for (var i = 0; i < hashes.length; i++) {
			var string = hashes[i];
			var equalIndex = string.indexOf("=");
			if (equalIndex != -1) {
				var hash = [];
				hash[0] = string.substr(0, equalIndex);
				hash[1] = string.substr(equalIndex + 1);
				this.parameters[hash[0]] = hash[1];
			}
		}

		path = hashes[0];

		// remove slash if it is the last character, we don't need blank pages.
		var lastChar = path.charAt(path.length - 1);
		while (lastChar == "/") {
			path = path.substr(0, path.length - 1);
			lastChar = path.charAt(path.length - 1);
		}

		path = this._applyRedirect(path);
		this._gotoLocation(path);
		if (this._history && pushState) {
			this._history.pushState({path:value}, "", value);
		}
	};

	p._applyRedirect = function(path) {
		var redirect = this.redirects[path];
		var newPath = redirect || path;
		if (newPath != path) {
			newPath = this._applyRedirect(newPath);
		}
		return newPath;
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
		var currentLocationArray = this.branches.value.map(function(item) {
			return item.id;
		});
		var nextLocationArray = this._nextLocation.split("/");
		var breakIndex = -1;
		for (var i = 0; i < currentLocationArray.length; i++) {
			var branchId = currentLocationArray.slice(0, i + 1).join("/");
			var nextBranchId = nextLocationArray.slice(0, i + 1).join("/")
			if (branchId == nextBranchId) {
				breakIndex = i;
			}
		}
		this.hide.branches = this.branches.splice(breakIndex + 1).reverse();
		var parent = this;
		if (this.branches.value.length > 0) {
			parent = this.branches.value[this.branches.value.length - 1];
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
			this.branches.push.apply(this.branches, this.show.branches);
			this.show.start();
		}
	};

	p._showComplete = function(event) {
		this._inTransition = false;
		this.dispatchEvent({type:"complete"});
		if (this._overrideLocation) {
			this._gotoLocation(this._overrideLocation);
		}
	};

	p.getBranch = function(id) {
		return this[id];
	};

	p.addRedirect = function(path, newPath) {
		this.redirects[path] = newPath;
	};

	p.removeRedirect = function(path) {
		delete this.redirects[path];
	};

	p.destroy = function() {
		this._overrideLocation = null;
		this.branches = null;
		this._location = null;
		this.redirects = null;
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
			this.allComplete();
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
					var callback = this.allComplete.bind(this);
					promise.then(function() {
						callback();
					})
				} else {
					this.allComplete();
				}
			} else {
				this.allComplete();
			}
		}
	};

	p.allComplete = function() {
		var method = this.onComplete;
		tsunami.promise.waitForFrames(2).then(function() {
			method();
		});
	}

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
				console.log("No branch '" + this.id + "' in '" + this.parent.id + "'");
			}
			this.branch.root = this.root;
			this.branch.router = this.router;
			this.branch.path = this.path;
			this.branch.parent = this.parent.branch;
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
		//console.log(this.id, "this.taskName", this.taskName, "progress", this.assetList.progress, this.assetList.assets.length);

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
		var branch;
		if (this.branch) {
			if (this.branch.getBranch) {
				branch = this.branch.getBranch(id);
			} else {
				console.log("The getBranch method isn't implemented by '" + this.id + "'");
			}
		} else {
			console.log("No branch '" + this.id + "'");
		}
		return branch;
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
		return value;
	};

}());

