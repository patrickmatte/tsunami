(function() {

	tsunami.SingularPlural = function(o) {

		o.construct = function() {
			this.number = eval(this.innerHTML);
			this.number.addEventListener("change", this.numberChange.bind(this));
			this.numberChange(null);
		};

		o.numberChange = function(event) {
			if (this.number.getValue() > 1){
				this.innerHTML = this.getAttribute("plural");
			} else {
				this.innerHTML = this.getAttribute("singular");
			}
		};

		o.construct();

		return o;

	};

}());

