Preloader = function(o) {
	/*
	 o.show = function() {
	 console.log("Preloader.show");
	 var transition = tsunami.promise.transition(this);
	 this.classList.add("visible");
	 return transition;
	 };

	 o.hide = function() {
	 console.log("Preloader.hide");
	 var transition = tsunami.promise.transition(this);
	 this.classList.remove("visible");
	 return transition;
	 };
	 */
	o.show = function() {
		this.classList.add("visible");
	};

	o.hide = function() {
		this.classList.remove("visible");
	};

	o.setProgress = function(value) {
		var progressbar = this.querySelector(".progressbar");
		progressbar.setScaleX(value);
		progressbar.updateTransform();
	};

	o.setProgress(0);

	return o;

};

model = {
	myString:new tsunami.String("test"),
	myRadio:new tsunami.String("option2"),
	myCheckbox:new tsunami.Boolean(false),
	myNumber:new tsunami.Number(5),
	myRange:new tsunami.Number(25)
};

Mustache.escape = function(string) {
	return string;
};

tsunami.mustacheRender = function(text, scope) {
	var rendered = Mustache.render(text, scope);
	return rendered;
};

tsunami.applyWrapperAttribute(document.body, "wrapper");
router = new tsunami.Router();
router.path = location.origin + location.pathname;
router.redirect("", "test/circle1/circle2");
router.redirect("circle3", "test/circle1/circle2/circle3");
router.fragment = "?";
router.root = new tsunami.Branch("root");
router.root.branches.push(new tsunami.BranchModule("test", "assets/root.js", "app.Root"));
router.setHistory(tsunami.history);
router.addEventListener("locationChange", function(e) {
	console.log("router locationChange", e.location);
});
router.addEventListener("complete", function() {
	console.log("router complete", router.getLocation());
});
router.preloader = document.querySelector(".preloader");
tsunami.history.fallback = tsunami.HistoryFallback.HASH;
tsunami.history.start(router.path, router.fragment);
