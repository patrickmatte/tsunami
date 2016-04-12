(function () {

	sandbox.Inputs = function(prototype) {

		tsunami.BranchModules(prototype);

		prototype.createdCallbackBranchModules = prototype.createdCallback;

		prototype.createdCallback = function() {
			this.createdCallbackBranchModules();
			this.assets.styles.push("assets/css/inputs.css");
			this.assets.templates.push("assets/html/inputs.html");
		};

		prototype.loadCompleteBranchModules = prototype.loadComplete;

		prototype.loadComplete = function(assets) {
			this.loadCompleteBranchModules(assets);
			this.templateElements = tsunami.appendTemplate("inputs-template", this, this);
		};

		prototype.show = function() {
			var transition = tsunami.promise.transition(this, ["opacity"]);
			this.classList.add("visible");
			return transition;
		};

		prototype.hideBranchModules = prototype.hide;

		prototype.hide = function() {
			var transition = tsunami.promise.transition(this, ["opacity"]);
			this.classList.remove("visible");
			return transition.then(this.hideComplete.bind(this));
		};

		prototype.hideComplete = function() {
			tsunami.destroyElements(this.templateElements);
			this.templateElements = null;
			this.hideBranchModules();
		};

		prototype.getBranch = function(id) {
			return this.querySelector("." + id);
		};

	};

}());
