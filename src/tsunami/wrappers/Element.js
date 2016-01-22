(function() {

	tsunami.Element = function(p) {

		p.construct = function() {
		};

		p.hasClass = function (className) {
			return this.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
		};

		p.addClass = function (className) {
			if (!this.hasClass(className)) this.className += " " + className;
		};

		p.removeClass = function (className) {
			if (this.hasClass(className)) {
				var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
				this.className = this.className.replace(reg," ");
			}
		};

		p.replaceClass = function (oldClass, newClass) {
			this.removeClass(oldClass);
			this.addClass(newClass);
		};

		p.getSelector = function(selector) {
			return this.querySelectorAll(selector)[0];
		};

		p.construct();

		return p;

	}

}());

