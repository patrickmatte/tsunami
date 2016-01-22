(function() {

	tsunami.Conditional = function(o) {

		o.construct = function() {
			this.data = eval(this.getAttribute("data"));
			if (this.data.isData) {
				this.data.addEventListener("change", this.dataChange.bind(this));
			}
			this.dataChange(null);
		};

		o.dataChange = function(event) {
			var dataValue = (this.data.isData)?this.data.isData.getValue():this.data;
			var children = this.childNodes;
			for (var i = 0; i < children.length; i++) {
				var display = "none";
				var child = children.item(i);
				if (child.className) {
					if (child.className.indexOf(dataValue) != -1) {
						display = "visible";
					}
				}
				if (child.style) {
					child.style.display = display;
				}
			}
		};

		o.construct();

		return o;

	}

}());

