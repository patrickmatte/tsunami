tsunami = this.tsunami || {};

(function() {

	tsunami.Model = function() {
		this.construct();
	};

	var p = tsunami.Model.prototype = new tsunami.EventDispatcher();

	p.constructor = tsunami.Model;

	p.constructEventDispatcher = p.construct;

	p.construct = function(array) {
		this.constructEventDispatcher();
	};

}());
