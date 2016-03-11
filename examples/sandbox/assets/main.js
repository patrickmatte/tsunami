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
	return template(scope);
};

router = new tsunami.Router();
router.path = location.origin + location.pathname;
router.fragment = "?";
router.redirect("", "shapes");
router.redirect("shapes", "shapes/circle1/circle2");
router.redirect("circle3", "shapes/circle1/circle2/circle3");

var text = document.querySelector("#root-template").text;
var template = tsunami.compileTemplate(text);
tsunami.append(template, document.body, this);

router.root = document.querySelector(".root").controller;
router.preloader = document.querySelector(".preloader").controller;

router.addEventListener("locationChange", function(e) {
	//console.log("router locationChange", e.location);
});
router.addEventListener("complete", function() {
	console.log("router complete", router.getLocation());
});
//tsunami.applyWrapperAttribute(document.body, "data-wrapper", this);

router.history = new tsunami.History(router.path, router.fragment, tsunami.HistoryFallback.HASH);
router.history.start();
