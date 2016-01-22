tsunami = this.tsunami || {};

(function() {

	tsunami.List = function(o) {

		o.construct = function() {
			var templateSelector = this.getAttribute("template");
			if (templateSelector) {
				var script = document.querySelector(templateSelector);
				this.template = script.text;
			}
			var array = eval(this.getAttribute("dataProvider"));
			if (array && this.template) {
				this.setDataProvider(array);
			}
		};

		o.getDataProvider = function() {
			return this._dataProvider;
		};

		o.setDataProvider = function(value) {
			this.innerHTML = "";
			this._dataProvider = value;
			for (var i = 0; i < value.length; i++) {
				var model = value[i];
				var object = tsunami.utils.createElement(this.template, this, "wrapper", model, i);
			}
		};

		o.construct();

		return o;

	};

}());

