sandbox = this.sandbox || {};

(function () {

	sandbox.Button = function(element, scope) {
		tsunami.RouterButton.call(this, element, scope);

		this.router = window.router;
		this.pushState = true;
	};

	var p = sandbox.Button.prototype = Object.create(tsunami.RouterButton.prototype);

	p.constructor = sandbox.Button;

}());

Mustache.escape = function(string) {
	return string;
};
/*
tsunami.mustacheParse = function(text) {
	var token = Mustache.parse(text);
	return text;
};

tsunami.mustacheRender = function(text, scope) {
	return Mustache.render(text, scope);
};
*/

tsunami.compileTemplate = function(text) {
	return Handlebars.compile(text);
};

tsunami.renderTemplate = function(template, scope) {
	var text = template(scope);
	return text;
};

router = new tsunami.Router();
router.path = location.origin + location.pathname;
router.fragment = "?";
this.router.history = new tsunami.History(this.router.path, this.router.fragment, tsunami.HistoryFallback.HASH);
router.redirect("", "shapes");
router.redirect("shapes", "shapes/circles/level1/level2");
router.redirect("circle5", "shapes/circles/level1/level2/level3/level4/level5");
router.addEventListener("locationChange", function(e) {
	//console.log("router locationChange", e.location);
});
router.addEventListener("complete", function(e) {
	console.log("router complete", router.getLocation());
});

tsunami.load.templates("assets/root.html").then(function(templates) {
	this.templates = templates;
	tsunami.append(this.templates.root, document.body, this);
	this.router.root = document.querySelector(".root").controller;
	this.router.preloader = document.querySelector(".preloader").controller;
	this.router.history.start();
});
