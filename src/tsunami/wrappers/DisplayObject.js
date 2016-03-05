(function() {

	tsunami.DisplayObject = function(element, scope) {
		this.element = element;
		this.style = new tsunami.Style(element);
	};

	var p = tsunami.DisplayObject.prototype;

}());
