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
				this.model = array;
			}
			this.elements = [];
		};

		Object.defineProperty(o, 'model', {
			get: function() {
				return this.getModel();
			},
			set: function(value) {
				this.setModel(value);
			}
		});

		o.getModel = function() {
			return this._model;
		};

		o.setModel = function(value) {
			for (var i = 0; i < this.elements.length; i++) {
				var oldElement = this.elements[i];
				oldElement.model = null;
				if (oldElement.parentNode) {
					oldElement.parentNode.removeChild(oldElement);
				}
			}
			this._model = value;
			this.elements = [];
			for (var i = 0; i < value.length; i++) {
				var model = value[i];
				var element = tsunami.utils.createElement(this.template, this, "wrapper", model, i);
				this.elements.push(element);
			}
		};

		o.construct();

		return o;

	};

}());

