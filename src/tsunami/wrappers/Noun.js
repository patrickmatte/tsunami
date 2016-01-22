(function() {

	tsunami.Noun = function(el) {

		el.construct = function() {
			this.number = eval(this.innerHTML);
			this.number.addEventListener("change", this.numberChange.bind(this));
			this.numberChange(null);
		};

		el.numberChange = function(event) {
			if (this.number.getValue() > 1){
				this.innerHTML = this.getAttribute("plural");
			} else {
				this.innerHTML = this.getAttribute("singular");
			}
		};

		el.construct();

		return el;

	}

}());

