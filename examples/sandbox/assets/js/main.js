sandbox = this.sandbox || {};

(function () {

	sandbox.Button = function(prototype) {

		tsunami.RouterButton(prototype);

		prototype.createdCallbackRouterButton = prototype.createdCallback;

		prototype.createdCallback = function() {
			this.createdCallbackRouterButton();
			this.router = window.router;
			this.pushState = true;
		};

	};

}());



Mustache.escape = function(string) {
	return string;
};

tsunami.mustache = function(text, scope) {
	return Mustache.render(text, scope);
};

/*
//Use this for handlebars
tsunami.mustache = function(template, scope) {
	var text = Handlebars.compile(template)(scope);
	return text;
};
*/

this.router = new tsunami.Router();
this.router.path = location.origin + location.pathname;
this.router.fragment = "?";
this.router.history = new tsunami.History(this.router.path, this.router.fragment, tsunami.HistoryFallback.HASH);
this.router.addRedirect("", "shapes");
this.router.addRedirect("shapes", "shapes/circles/level1/level2");
this.router.addRedirect("circle5", "shapes/circles/level1/level2/level3/level4/level5");
this.router.addEventListener("locationChange", function(e) {
	//console.log("router locationChange", e.location);
});
this.router.addEventListener("complete", function(e) {
	console.log("router complete", e.target.getLocation());
});

var rootPromise = tsunami.load.html("assets/html/root.html");
var breadCrumbButtonPromise = tsunami.load.html("assets/html/breadcrumbButton.html");
Promise.all([rootPromise, breadCrumbButtonPromise]).then(function(assets) {
	this.templates = {
		breadcrumbButton:assets[1]
	};
	var root = tsunami.importTemplate(assets[0], this);
	document.body.appendChild(root);
	this.router.root = root;
	this.router.preloader = document.querySelector(".preloader");
	this.router.history.start();
});
