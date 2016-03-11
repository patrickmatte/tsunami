(function () {

	sandbox.Shapes = function(element, scope) {
		tsunami.Branch.call(this, element, scope);
	};

	var p = sandbox.Shapes.prototype = Object.create(tsunami.Branch.prototype);

	p.constructor = sandbox.Shapes;

	p.load = function(assetList) {
		var script = tsunami.load.script("assets/shapesMoreCode.js");
		assetList.add(script);

		var styleSheet = tsunami.load.styleSheet("assets/shapes.css");
		assetList.add(styleSheet);

		var templates = tsunami.load.htmlTemplates("assets/shapes.html");
		assetList.add(templates);

		var promise = Promise.all([script, templates, styleSheet]);

		return promise.then(this.templatesLoaded.bind(this));
	};

	p.templatesLoaded = function(arguments) {
		this.script = arguments[0];
		this.templates = arguments[1];
		this.styleSheet = arguments[2];

		sandbox.ShapeImage.urls = this.root.model.images.slice();

		this.elements = tsunami.append(this.templates.main, this.element, this);
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
		tsunami.remove(this.elements);
		this.script = null;
		this.templates = null;
		this.styleSheet = null;
		this.elements = null;
	};

	p.testClick = function() {
		console.log("testClick", this);
	};

}());