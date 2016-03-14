tsunami = this.tsunami || {};

(function () {

	tsunami.BranchImport = function(element, scope) {
		tsunami.Branch.call(this, element, scope);
		var branchSource = this.element.getAttribute("data-source");
		if (branchSource) {
			this.branchSource = branchSource;
		}
		var branchClass = this.element.getAttribute("data-class");
		if (branchClass) {
			this.branchClass = branchClass;
		}
	};

	var p = tsunami.BranchImport.prototype = Object.create(tsunami.Branch.prototype);

	p.constructor = tsunami.BranchImport;

	p.load = function(assetList) {
		this.assetList = assetList;
		var scriptPromise = tsunami.load.script(this.branchSource);
		assetList.add(scriptPromise);

		var promise = scriptPromise.then(this.scriptLoaded.bind(this));
		return promise;
	};

	p.scriptLoaded = function(script) {
		this.script = script;
		var method = tsunami.evalProperty(this.branchClass, window);
		this.branch = new method(this.element, this.scope);
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
		this.branch.destroy();
		this.branch = null;
		tsunami.removeElement(this.script);
		this.script = null;
	};

	p.getBranch = function(id) {
		return this.branch.getBranch(id);
	};

}());