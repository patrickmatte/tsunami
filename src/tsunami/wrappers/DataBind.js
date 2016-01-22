tsunami = this.tsunami || {};

(function() {

	tsunami.DataBind = function(o) {

		o.construct = function() {
			this.model = eval(this.innerHTML);
			if (this.model.isData) {
				this.model.addEventListener("change", this.modelChange.bind(this));
				this.modelChange(null);
			} else {
				this.innerHTML = this.model;
			}
		}

		o.modelChange = function(event) {
			this.innerHTML = this.model.getValue();
		}

		o.construct();

		return o;

	}

}());

