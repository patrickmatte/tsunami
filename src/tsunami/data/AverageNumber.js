tsunami = this.tsunami || {};

(function() {

	tsunami.AverageNumber = function(numbers) {
		tsunami.Model.call(this);
		this.numberChangeBind = this.numberChangeHandler.bind(this);
		this._currentNumbers = [];
		if (!numbers) {
			numbers = new tsunami.Array();
		}
		this.numbers = numbers;
		this.numbers.addEventListener("change", this.arrayChange.bind(this));
		this.arrayChange();
	};

	var p = tsunami.AverageNumber.prototype = Object.create(tsunami.Model.prototype);

	p.constructor = tsunami.AverageNumber;

	Object.defineProperty(p, 'value', {
		get: function() {
			return this.getValue();
		}
	});

	p.arrayChange = function() {
		for (var i = 0; i < this._currentNumbers.length; i++) {
			var number = this._currentNumbers[i];
			number.removeEventListener("change", this.numberChangeBind);
		}
		this._currentNumbers = this.numbers.value;
		for (var i = 0; i < this._currentNumbers.length; i++) {
			var number = this._currentNumbers[i];
			number.addEventListener("change", this.numberChangeBind);
		}
		this.calculateAverage();
	};

	p.numberChangeHandler = function() {
		this.calculateAverage();
	};

	p.calculateAverage = function() {
		var total = 0;
		var array = this.numbers.value;
		for (var i = 0; i < array.length; i++) {
			var number = array[i];
			total += number.getValue();
		}
		this._value = total / Math.max(array.length, 1);
		this.dispatchEvent({type:"change", value:this._value});
	};

	p.getValue = function() {
		return this._value;
	};

	p.toString = function() {
		return this.getValue().toString();
	};

}());
