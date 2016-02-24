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
		progressbar.styler.scaleX = value;
		progressbar.styler.updateTransform();
	};

	o.setProgress(0);

	return o;

};

AppButton = function(o) {

	o.router = window.router;
	o.pushState = true;

	tsunami.RouterButton(o);

	return o;
};

model = {
	myString:new tsunami.String("test"),
	myCheckbox:new tsunami.Boolean(true),
	myNumber:new tsunami.Number(5),
	myRange:new tsunami.Number(25),
	carMakers:new tsunami.Array(
		{value:"volvo", title:"Volvo"},
		{value:"saab", title:"Saab"},
		{value:"mercedes", title:"Mercedes"},
		{value:"audi", title:"Audi"}
	),
	myCarMaker:new tsunami.String()
};

model.myCarMaker.value = model.carMakers.value[2].value;
model.defaultCarMaker = model.carMakers.value[3].value;

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
tsunami.mustacheParse = function(text) {
	var template = Handlebars.compile(text);
	return template;
};

tsunami.mustacheRender = function(template, scope) {
	return template(scope);
};

router = new tsunami.Router();
tsunami.applyWrapperAttribute(document.body, "data-wrapper", this);
router.path = location.origin + location.pathname;
router.redirect("", "circles");
router.redirect("circles", "circles/circle1/circle2");
router.redirect("circle3", "circles/circle1/circle2/circle3");
router.fragment = "?";
router.root = new tsunami.Branch("root");
router.root.branches.push(new tsunami.BranchModule("circles", "assets/circles.js", "Circles"));
router.root.branches.push(new tsunami.BranchModule("forms", "assets/forms.js", "Forms"));
router.setHistory(tsunami.history);
router.addEventListener("locationChange", function(e) {
	//console.log("router locationChange", e.location);
});
router.addEventListener("complete", function() {
	console.log("router complete", router.getLocation());
});
router.preloader = document.querySelector(".preloader");
tsunami.history.fallback = tsunami.HistoryFallback.HASH;
tsunami.history.start(router.path, router.fragment);
