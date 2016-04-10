(function () {

	sandbox.Inputs = function(element) {
		this.createdCallback();
		this.element = element;
		this.assets.styles.push("assets/css/inputs.css");
		this.assets.templates.push("assets/html/inputs.html");
	};

	var prototype = sandbox.Inputs.prototype;

	tsunami.BranchModules(prototype);

	prototype.loadCompleteBranchModules = prototype.loadComplete;

	prototype.loadComplete = function(assets) {
		this.loadCompleteBranchModules(assets);
		this.templateElements = tsunami.appendTemplate("inputs", this.element, this);
	};

	prototype.show = function() {
		var transition = tsunami.promise.transition(this.element, ["opacity"]);
		this.element.classList.add("visible");
		return transition;
	};

	prototype.hideBranchModules = prototype.hide;

	prototype.hide = function() {
		var transition = tsunami.promise.transition(this.element, ["opacity"]);
		this.element.classList.remove("visible");
		return transition.then(this.hideComplete.bind(this));
	};

	prototype.hideComplete = function() {
		tsunami.destroyElements(this.templateElements);
		this.templateElements = null;
		this.hideBranchModules();
	};

	prototype.getBranch = function(id) {
		return this.element.querySelector("." + id);
	};

}());
