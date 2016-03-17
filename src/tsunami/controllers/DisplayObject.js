(function() {

	tsunami.HTMLElement = function(element, scope) {
		tsunami.EventDispatcher.call(this);
		this.element = element;
		this.scope = scope;
		this.style = new tsunami.Style(element);
	};

	var p = tsunami.HTMLElement.prototype = Object.create(tsunami.EventDispatcher.prototype);

	p.constructor = tsunami.HTMLElement;

	p.destroy = function() {
		this.style.destroy();
		for (var i = 0; i < this.element.childNodes.length; i++) {
			var element = this.element.childNodes.item(i);
			if (element.controller) {
				if (element.controller.destroy) {
					try {
						element.controller.destroy();
					} catch(e) {
					}
				}
			}
			element.innerHTML = null;
		}
		this.element.innerHTML = "";
		this.element = null;
		this.scope = null;
		tsunami.EventDispatcher.prototype.destroy.call(this);
	};

}());
