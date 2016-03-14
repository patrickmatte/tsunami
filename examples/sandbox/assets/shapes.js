(function () {

	sandbox.Shapes = function(element, scope) {
		tsunami.BranchModules.call(this, element, scope);
		this.assets.scripts.push("assets/shapesMoreCode.js");
		this.assets.styles.push("assets/shapes.css");
		this.assets.templates.push("assets/shapes.html");
	};

	var p = sandbox.Shapes.prototype = Object.create(tsunami.BranchModules.prototype);

	p.constructor = sandbox.Shapes;

	p.loadComplete = function(assets) {
		tsunami.BranchModules.prototype.loadComplete.call(this, assets);
		sandbox.ShapeImage.urls = this.root.model.images.slice();
		this.elements = tsunami.append(this.templates.shapes, this.element, this);
	};

	p.show = function() {
		var transition = tsunami.promise.transition(this.element, ["opacity"]);
		this.element.classList.add("visible");
		return transition;
	};

	p.hide = function() {
		var transition = tsunami.promise.transition(this.element, ["opacity"]);
		this.element.classList.remove("visible");
		return transition.then(this.hideComplete.bind(this));
	};

	p.hideComplete = function() {
		tsunami.destroyElements(this.elements);
		tsunami.removeElements(this.elements);
		this.elements = null;
		return tsunami.BranchModules.prototype.hide.call(this);
	};

	p.testClick = function() {
		console.log("testClick", this);
	};

}());