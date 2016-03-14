(function() {

	tsunami.DisplayObject = function(element, scope) {
		tsunami.EventDispatcher.call(this);
		this.element = element;
		this.scope = scope;
		this.style = new tsunami.Style(element);
	};

	var p = tsunami.DisplayObject.prototype = Object.create(tsunami.EventDispatcher.prototype);

	p.constructor = tsunami.DisplayObject;

	p.destroy = function() {
		this.style.destroy();
		tsunami.destroyElements(this.element.childNodes);
		tsunami.removeElements(this.element.childNodes);
		this.element.innerHTML = "";
		this.element = null;
		this.scope = null;
		tsunami.EventDispatcher.prototype.destroy.call(this);
	};

}());
