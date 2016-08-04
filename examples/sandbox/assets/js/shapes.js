(function () {

	sandbox.Shapes = function() {
		tsunami.Branch.call(this, "shapes");
		this.assets = {
			scripts: [
				"assets/js/shapesMoreCode.js"
			],
			styles: [
				"assets/css/shapes.css"
			],
			templates: [
				"assets/html/shapes.html"
			]
		};
	};

	var prototype = sandbox.Shapes.prototype = Object.create(tsunami.Branch.prototype);

	prototype.constructor = sandbox.Shapes;

	prototype.loadComplete = function(assets) {
		tsunami.Branch.prototype.loadComplete.call(this, assets);
		this.element = tsunami.importTemplate(this.templates[0], this);
		this.parent.querySelector(".content").appendChild(this.element);
	};

	prototype.show = function() {
		var transition = tsunami.promise.transition(this.element, ["opacity"]);
		this.element.classList.add("visible");
		return transition;
	};

	prototype.hide = function() {
		var transition = tsunami.promise.transition(this.element, ["opacity"]);
		this.element.classList.remove("visible");
		return transition.then(this.hideComplete.bind(this));
	};

	prototype.hideComplete = function() {
		tsunami.destroyElement(this.element);
		this.element = null;
		return tsunami.Branch.prototype.hide.call(this);
	};

	prototype.getBranch = function(id) {
		return this.element.querySelector("." + id);
	};

	prototype.testClick = function() {
		console.log("testClick is working");
	};

}());