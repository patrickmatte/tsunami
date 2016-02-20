var app = {};

app.Root = function() {

	var o = document.body;

	tsunami.BranchWrapper(o);

	o.load = function(assetList) {
		var script = tsunami.load.script("assets/main.js");
		assetList.add(script);

		var templates = tsunami.load.htmlTemplates("assets/main.html");
		assetList.add(templates);

		var promise = Promise.all([script, templates]);

		return promise.then(this.templateLoaded.bind(this));
	};

	o.templateLoaded = function(arguments) {
		this.script = arguments[0];
		this.templates = arguments[1];

		var children = tsunami.insertHTML(this.templates.main, this, this.querySelector(".preloader"));

		return tsunami.promise.timeout(0.001);
	};

	o.show = function() {

		document.querySelector(".myStringSetter").addEventListener("click", function() {
			window.model.myString.value = "yo";
		});
		document.querySelector(".myInputText").addEventListener("click", function() {
			document.querySelector(".myStringInput").value = "value set with button";
		});

		document.querySelector(".myRadioSetter").addEventListener("click", function() {
			window.model.myRadio.value = "option3";
		});
		document.querySelector(".radioChecker").addEventListener("click", function() {
			var radios = document.querySelectorAll("input[type=radio]");
			radios.item(1).checked = true;
		});

		document.querySelector(".myCheckboxSetter").addEventListener("click", function() {
			window.model.myCheckbox.value = !window.model.myCheckbox.value;
		});
		document.querySelector(".checkboxChecker").addEventListener("click", function() {
			var checkbox = document.querySelector("input[type=checkbox]");
			checkbox.checked = true;
		});

		document.querySelector(".myNumberSetter").addEventListener("click", function() {
			window.model.myNumber.value = 100;
		});
		document.querySelector(".numberSetter").addEventListener("click", function() {
			var number = document.querySelector("input[type=number]");
			number.value = 50;
		});

		document.querySelector(".myRangeSetter").addEventListener("click", function() {
			window.model.myRange.value = 10;
		});
		document.querySelector(".rangeSetter").addEventListener("click", function() {
			var number = document.querySelector("input[type=range]");
			number.value = 15;
		});

	};

	return o;

};

