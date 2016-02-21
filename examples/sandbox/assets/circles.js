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

		return promise.then(this.templateLoaded.bind(this));
	};

	o.templateLoaded = function(arguments) {
		this.script = arguments[0];
		this.templates = arguments[1];
		this.styleSheet = arguments[2];

		this.window = window;

		this.circles = tsunami.insertBefore(this.templates.circles, this.querySelector(".preloader"), this);

		return tsunami.promise.timeout(0.001);
	};

	o.show = function() {
		document.querySelector(".myStringSetter").addEventListener("click", function() {
			window.model.myString.value = "yo";
		});

		document.querySelector(".myRadioSetter").addEventListener("click", function() {
			window.model.myRadio.value = "audi";
		});

		document.querySelector(".myCheckboxSetter").addEventListener("click", function() {
			window.model.myCheckbox.value = !window.model.myCheckbox.value;
		});

		document.querySelector(".myNumberSetter").addEventListener("click", function() {
			window.model.myNumber.value = 100;
		});

		document.querySelector(".myRangeSetter").addEventListener("click", function() {
			window.model.myRange.value = 10;
		});

		document.querySelector(".mySelectValueSetter").addEventListener("click", function() {
			window.model.mySelectValue.value = "saab";
		});


	};

	o.hide = function() {
		for (var i = 0; i < this.circles.length; i++) {
			var element = this.circles[i];
			element.parentNode.removeChild(element);
		}
		this.circles = null;

	};

	return o;

};

