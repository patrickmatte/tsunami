Forms = function() {

	var o = document.body;

	tsunami.BranchWrapper(o);

	o.load = function(assetList) {
		var styleSheet = tsunami.load.styleSheet("assets/forms.css");
		assetList.add(styleSheet);

		var templates = tsunami.load.htmlTemplates("assets/forms.html");
		assetList.add(templates);

		var promise = Promise.all([templates, styleSheet]);

		return promise.then(this.templatesLoaded.bind(this));
	};

	o.templatesLoaded = function(arguments) {
		this.templates = arguments[0];
		this.styleSheet = arguments[1];

		this.window = window;

		this.elements = tsunami.insertBefore(this.templates.forms, this.querySelector(".preloader"), this);

		return tsunami.promise.timeout(0.001);
	};

	o.show = function() {
		document.querySelector(".myStringSetter").addEventListener("click", function() {
			window.model.myString.value = "yo";
		});

		document.querySelector(".myNumberSetter").addEventListener("click", function() {
			window.model.myNumber.value = 100;
		});

		document.querySelector(".myRangeSetter").addEventListener("click", function() {
			window.model.myRange.value = 10;
		});

		document.querySelector(".myCheckboxSetter").addEventListener("click", function() {
			window.model.myCheckbox.value = !window.model.myCheckbox.value;
		});

		document.querySelector(".myRadioSetter").addEventListener("click", function() {
			window.model.myCarMaker.value = "audi";
		});

		document.querySelector(".mySelectValueSetter").addEventListener("click", function() {
			window.model.myCarMaker.value = "audi";
		});
	};

	o.hide = function() {
		tsunami.removeElements(this.elements);
		this.elements = null;
	};

	return o;

};

