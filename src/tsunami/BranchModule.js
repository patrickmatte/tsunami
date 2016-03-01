tsunami = this.tsunami || {};

(function () {

	tsunami.BranchModule = function(id, scriptPath, branchMethod) {
		tsunami.Branch.call(this, id);
		this.id = id;
		this.scriptPath = scriptPath;
		this.branchMethod = branchMethod;
	};

	var p = tsunami.BranchModule.prototype = Object.create(tsunami.Branch.prototype);

	p.constructor = tsunami.BranchModule;

	p.load = function(assetList) {
		this.assetList = assetList;
		var scriptPromise = tsunami.load.script(this.scriptPath);
		assetList.add(scriptPromise);

		var promise = scriptPromise.then(this.scriptLoaded.bind(this));
		return promise;
	};

	p.scriptLoaded = function(script) {
		this.script = script;

		var method = tsunami.evalProperty(this.branchMethod, window);
		this.branch = method();
		this.branch.root = this.root;
		this.branch.router = this.router;
		this.branch.path = this.path;
		this.branch.parent = this.parent;

		var promise;
		var method = this.branch.load;
		if (method) {
			promise = this.branch.load(this.assetList);
			this.assetList = null;
		}
		return promise;
	};

	p.show = function() {
		var promise;
		var method = this.branch.show;
		if (method) {
			promise = this.branch.show();
		}
		return promise;
	};

	p.hide = function() {
		var promise;
		var method = this.branch.hide;
		if (method) {
			promise = this.branch.hide();
		}
		var completePromise;
		if (promise) {
			completePromise = promise.then(this.hideComplete.bind(this));
		} else {
			this.hideComplete();
		}
		return completePromise;
	};

	p.hideComplete = function() {
		this.script.parentNode.removeChild(this.script);
		this.script = null;
		this.branch = null;
	};

	p.getBranch = function(id) {
		return this.branch.getBranch(id);
	};

}());