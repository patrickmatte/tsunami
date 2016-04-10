(function () {

	sandbox.Shapes = function(element) {
		this.createdCallback();
		this.element = element;
		this.assets.scripts.push("assets/js/shapesMoreCode.js");
		this.assets.styles.push("assets/css/shapes.css");
		this.assets.templates.push("assets/html/shapes.html");
	};

	var prototype = sandbox.Shapes.prototype;

	tsunami.BranchModules(prototype);

	prototype.loadCompleteBranchModules = prototype.loadComplete;

	prototype.loadComplete = function(assets) {
		this.loadCompleteBranchModules(assets);

		sandbox.ShapeImage.urls = this.root.model.images.slice();
		this.templateElements = tsunami.appendTemplate("shapes", this.element, this);
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

	prototype.testClick = function() {
		console.log("testClick is working");
	};

	prototype.getBranch = function(id) {
		return this.element.querySelector("." + id);
	};

}());