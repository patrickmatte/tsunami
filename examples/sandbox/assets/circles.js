Circles = function() {

	var o = document.body;

	tsunami.BranchWrapper(o);

	o.load = function(assetList) {
		var script = tsunami.load.script("assets/circlesMoreCode.js");
		assetList.add(script);

		var styleSheet = tsunami.load.styleSheet("assets/circles.css");
		assetList.add(styleSheet);

		var templates = tsunami.load.htmlTemplates("assets/circles.html");
		assetList.add(templates);

		var promise = Promise.all([script, templates, styleSheet]);

		return promise.then(this.templatesLoaded.bind(this));
	};

	o.templatesLoaded = function(arguments) {
		this.script = arguments[0];
		this.templates = arguments[1];
		this.styleSheet = arguments[2];

		this.window = window;

		this.elements = tsunami.insertBefore(this.templates.circles, this.querySelector(".preloader"), this);

		return tsunami.promise.timeout(0.001);
	};

	o.show = function() {

	};

	o.hide = function() {
		tsunami.removeElements(this.elements);
		this.elements = null;
	};

	return o;

};

