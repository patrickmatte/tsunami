(function () {

	sandbox.Inputs = function(element, scope) {
		tsunami.Branch.call(this, element, scope);
	};

	var p = sandbox.Inputs.prototype = Object.create(tsunami.Branch.prototype);

	p.constructor = sandbox.Inputs;

	p.load = function(assetList) {
		var styleSheet = tsunami.load.styleSheet("assets/inputs.css");
		assetList.add(styleSheet);

		var templates = tsunami.load.htmlTemplates("assets/inputs.html");
		assetList.add(templates);

		var promise = Promise.all([templates, styleSheet]);

		return promise.then(this.templatesLoaded.bind(this));
	};

	p.templatesLoaded = function(args) {
		this.templates = args[0];
		this.styleSheet = args[1];

		this.elements = tsunami.append(this.templates.inputs, this.element, this);
	};

	p.show = function() {
		var model = this.root.model;
		document.querySelector(".myStringSetter").addEventListener("click", function() {
			model.myString.value = "yo";
		});

		document.querySelector(".myNumberSetter").addEventListener("click", function() {
			model.myNumber.value = 100;
		});

		document.querySelector(".myRangeSetter").addEventListener("click", function() {
			model.myRange.value = 10;
		});

		document.querySelector(".myCheckboxSetter").addEventListener("click", function() {
			model.myCheckbox.value = !model.myCheckbox.value;
		});

		document.querySelector(".myRadioSetter").addEventListener("click", function() {
			model.myCarMaker.value = "audi";
		});

		document.querySelector(".mySelectValueSetter").addEventListener("click", function() {
			model.myCarMaker.value = "audi";
		});

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
		this.elements = null;
	};

}());
