tsunami = this.tsunami || {};

(function() {

	tsunami.Model = function() {
		tsunami.EventDispatcher.call(this);
	};

	var p = tsunami.Model.prototype = Object.create(tsunami.EventDispatcher.prototype);

	p.constructor = tsunami.Model;

}());
