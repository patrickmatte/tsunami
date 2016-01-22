tsunami = this.tsunami || {};

(function() {

	tsunami.Number = function(value) {
		this.construct(value);
	};

	var p = tsunami.Number.prototype = new tsunami.EventDispatcher();

	p.constructEventDispatcher = p.construct;

	p.construct = function(value) {
		this.constructEventDispatcher();

		this.isData = true;

		this._value = value;
	};

	p.setValue = function(value) {
		if (value != this._value) {
			this._value = value;
			this.dispatchEvent({type:"change", value:this._value});
		}
	};

	p.add = function(value) {
		this.setValue(this._value + value);
	};

	p.subtract = function(value) {
		this.setValue(this._value - value);
	};

	p.getValue = function() {
		return this._value;
	};

}());



