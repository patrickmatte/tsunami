tsunami = this.tsunami || {};

(function () {

	tsunami.BranchImport = function(prototype) {

		tsunami.Element(prototype);

		prototype.createdCallbackElement = prototype.createdCallback;

		prototype.createdCallback = function() {
			this.createdCallbackElement();

			var branchSource = this.getAttribute("data-source");
			if (branchSource) {
				this.branchSource = branchSource;
			}
			var branchClass = this.getAttribute("data-class");
			if (branchClass) {
				this.branchClass = branchClass;
			}
		};

		prototype.load = function (assetList) {
			this.assetList = assetList;
			var scriptPromise = tsunami.load.script(this.branchSource);
			assetList.add(scriptPromise);

			var promise = scriptPromise.then(this.scriptLoaded.bind(this));
			return promise;
		};

		prototype.scriptLoaded = function (script) {
			this.script = script;
			var method = tsunami.evalProperty(this.branchClass, window);
			this.branch = new method(this);
			this.branch.root = this.root;
			this.branch.router = this.router;
			this.branch.path = this.path;
			this.branch.parent = this.parent;
			//this.branch.scope = this;

			var promise;
			var method = this.branch.load;
			if (method) {
				promise = this.branch.load(this.assetList);
				this.assetList = null;
			}
			return promise;
		};

		prototype.show = function () {
			var promise;
			if ("show" in this.branch) {
				promise = this.branch.show();
			}
			return promise;
		};

		prototype.hide = function () {
			var promise;
			if ("hide" in this.branch) {
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

		prototype.hideComplete = function () {
			this.branch = null;
			tsunami.removeElement(this.script);
			this.script = null;
		};
		
		prototype.getBranch = function (id) {
			return this.branch.getBranch(id);
		};

	};

}());