tsunami = this.tsunami || {};

(function() {

	tsunami.Data = function() {
		tsunami.EventDispatcher.call(this);
	};

	var p = tsunami.Data.prototype = Object.create(tsunami.EventDispatcher.prototype);

	p.constructor = tsunami.Data;

}());
