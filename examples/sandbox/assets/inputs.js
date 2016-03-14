(function () {

	sandbox.Inputs = function(element, scope) {
		tsunami.BranchModules.call(this, element, scope);
		this.assets.styles.push("assets/inputs.css");
		this.assets.templates.push("assets/inputs.html");
	};

	var p = sandbox.Inputs.prototype = Object.create(tsunami.BranchModules.prototype);

	p.constructor = sandbox.Inputs;

	p.loadComplete = function(assets) {
		tsunami.BranchModules.prototype.loadComplete.call(this, assets);
		this.elements = tsunami.append(this.templates.inputs, this.element, this);
	};

	p.show = function() {
		var model = this.root.model;

		this.element.querySelector(".myStringSetter").addEventListener("click", function() {
			model.myString.value = "yo";
		});

		this.element.querySelector(".myNumberSetter").addEventListener("click", function() {
			model.myNumber.value = 100;
		});

		this.element.querySelector(".myRangeSetter").addEventListener("click", function() {
			model.myRange.value = 10;
		});

		this.element.querySelector(".myCheckboxSetter").addEventListener("click", function() {
			model.myCheckbox.value = !model.myCheckbox.value;
		});

		this.element.querySelector(".myRadioSetter").addEventListener("click", function() {
			model.myCarMaker.value = "audi";
		});

		this.element.querySelector(".mySelectValueSetter").addEventListener("click", function() {
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
		tsunami.destroyElements(this.elements);
		tsunami.removeElements(this.elements);
		return tsunami.BranchModules.prototype.hide.call(this);
	};

}());
