(function() {

	tsunami.DisplayObject = function(element) {
		this.style = new tsunami.Style(element);
	};

	var p = tsunami.DisplayObject.prototype;

	p.parseElement = function(element, scope) {
		this.element = element;
		this.style.element = element;
	};


}());
