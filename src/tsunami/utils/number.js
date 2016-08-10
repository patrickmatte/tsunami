(function() {

	var c = tsunami.number = {};

	// Returns a random number between min (inclusive) and max (exclusive)
	c.getRandomArbitrary = function(min, max) {
		return Math.random() * (max - min) + min;
	};

	// Returns a random integer between min (included) and max (excluded)
	// Using Math.round() will give you a non-uniform distribution!
	c.getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	};

	// Returns a random integer between min (included) and max (included)
	// Using Math.round() will give you a non-uniform distribution!
	c.getRandomIntInclusive = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	/**
	 Creates a random number within the defined range.

	 @param min: The minimum value the random number can be.
	 @param min: The maximum value the random number can be.
	 @return Returns a random number within the range.
	 */
	c.randomWithinRange = function (min, max) {
		return min + (Math.random() * (max - min));
	};

	/**
	 Creates a random integer within the defined range.

	 @param min: The minimum value the random integer can be.
	 @param min: The maximum value the random integer can be.
	 @return Returns a random integer within the range.
	 */
	c.randomIntegerWithinRange = function(min, max) {
		return Math.floor(Math.random() * (1 + max - min) + min);
	};

	/**
	 Determines if the number is even.

	 @param value: A number to determine if it is divisible by <code>2</code>.
	 @return Returns <code>true</code> if the number is even; otherwise <code>false</code>.
	 @example
	 <code>
	 console.log(tsunami.number.isEven(7)); // Traces false
	 console.log(tsunami.number.isEven(12)); // Traces true
	 </code>
	 */
	c.isEven = function(value) {
		return (value & 1) == 0;
	};

	/**
	 Determines if the number is odd.

	 @param value: A number to determine if it is not divisible by <code>2</code>.
	 @return Returns <code>true</code> if the number is odd; otherwise <code>false</code>.
	 @example
	 <code>
	 console.log(tsunami.number.isOdd(7)); // Traces true
	 console.log(tsunami.number.isOdd(12)); // Traces false
	 </code>
	 */
	c.isOdd = function(value) {
		return !tsunami.number.isEven(value);
	};

	/**
	 Determines if the number is an integer.

	 @param value: A number to determine if it contains no decimal values.
	 @return Returns <code>true</code> if the number is an integer; otherwise <code>false</code>.
	 @example
	 <code>
	 console.log(tsunami.number.isInteger(13)); // Traces true
	 console.log(tsunami.number.isInteger(1.2345)); // Traces false
	 </code>
	 */
	c.isInteger = function (value) {
		return (value % 1) == 0;
	}

	/**
	 Determines if the number is prime.

	 @param value: A number to determine if it is only divisible by <code>1</code> and itself.
	 @return Returns <code>true</code> if the number is prime; otherwise <code>false</code>.
	 @example
	 <code>
	 console.log(tsunami.number.isPrime(13)); // Traces true
	 console.log(tsunami.number.isPrime(4)); // Traces false
	 </code>
	 */
	c.isPrime = function(value) {
		if (value == 1 || value == 2)
			return true;

		if (tsunami.number.isEven(value))
			return false;

		var s = Math.sqrt(value);
		for (var i = 3; i <= s; i++)
		if (value % i == 0)
			return false;

		return true;
	};

	/**
	 Rounds a number's decimal value to a specific place.

	 @param value: The number to round.
	 @param place: The decimal place to round.
	 @return Returns the value rounded to the defined place.
	 @example
	 <code>
	 console.log(tsunami.number.roundToPlace(3.14159, 2)); // Traces 3.14
	 console.log(tsunami.number.roundToPlace(3.14159, 3)); // Traces 3.142
	 </code>
	 */
	c.roundDecimalToPlace = function (value, place) {
		var p = Math.pow(10, place);

		return Math.round(value * p) / p;
	};

	/**
	 Determines if index is included within the collection length otherwise the index loops to the beginning or end of the range and continues.

	 @param index: Index to loop if needed.
	 @param length: The total elements in the collection.
	 @return A valid zero-based index.
	 @example
	 <code>
	 var colors:Array = new Array("Red", "Green", "Blue");

	 console.logcolors[tsunami.number.loopIndex(2, colors.length)]); // Traces Blue
	 console.logcolors[tsunami.number.loopIndex(4, colors.length)]); // Traces Green
	 console.logcolors[tsunami.number.loopIndex(-6, colors.length)]); // Traces Red
	 </code>
	 */
	c.loopIndex = function(index, length) {
		if (index < 0)
			index = length + index % length;

		if (index >= length)
			return index % length;

		return index;
	};

	/**
	 Determines if the value is included within a range.

	 @param value: Number to determine if it is included in the range.
	 @param firstValue: First value of the range.
	 @param secondValue: Second value of the range.
	 @return Returns <code>true</code> if the number falls within the range; otherwise <code>false</code>.
	 @usageNote The range values do not need to be in order.
	 @example
	 <code>
	 console.log(tsunami.number.isBetween(3, 0, 5)); // Traces true
	 console.log(tsunami.number.isBetween(7, 0, 5)); // Traces false
	 </code>
	 */
	c.isBetween = function(value, firstValue, secondValue) {
		return !(value < Math.min(firstValue, secondValue) || value > Math.max(firstValue, secondValue));
	};

	/**
	 Determines if value falls within a range; if not it is snapped to the nearest range value.

	 @param value: Number to determine if it is included in the range.
	 @param firstValue: First value of the range.
	 @param secondValue: Second value of the range.
	 @return Returns either the number as passed, or its value once snapped to nearest range value.
	 @usageNote The constraint values do not need to be in order.
	 @example
	 <code>
	 console.log(tsunami.number.constrain(3, 0, 5)); // Traces 3
	 console.log(tsunami.number.constrain(7, 0, 5)); // Traces 5
	 </code>
	 */
	c.constrain = function (value, firstValue, secondValue) {
		return Math.min(Math.max(value, Math.min(firstValue, secondValue)), Math.max(firstValue, secondValue));
	}

	/**
	 Creates evenly spaced numerical increments between two numbers.

	 @param begin: The starting value.
	 @param end: The ending value.
	 @param steps: The number of increments between the starting and ending values.
	 @return Returns an Array comprised of the increments between the two values.
	 @example
	 <code>
	 console.log(tsunami.number.createStepsBetween(0, 5, 4)); // Traces 1,2,3,4
	 console.log(tsunami.number.createStepsBetween(1, 3, 3)); // Traces 1.5,2,2.5
	 </code>
	 */
	c.createStepsBetween = function (begin, end, steps) {
		steps++;

		var i = 0;
		var stepsBetween = [];
		var increment = (end - begin) / steps;

		while (++i < steps)
			stepsBetween.push((i * increment) + begin);

		return stepsBetween;
	};

	/**
	 Determines a value between two specified values.

	 @param amount: The level of interpolation between the two values. If <code>0</code>, <code>begin</code> value is returned; if <code>1</code>, <code>end</code> value is returned.
	 @param begin: The starting value.
	 @param end: The ending value.
	 @example
	 <code>
	 console.log(tsunami.number.interpolate(0.5, 0, 10)); // Traces 5
	 </code>
	 */
	c.interpolate = function (amount, begin, end) {
		return begin + (end - begin) * amount;
	}

	/**
	 Determines a percentage of a value in a given range.

	 @param value: The value to be converted.
	 @param minimum: The lower value of the range.
	 @param maximum: The upper value of the range.
	 @example
	 <code>
	 console.log(tsunami.number.normalize(8, 4, 20).decimalPercentage); // Traces 0.25
	 </code>
	 */
	c.normalize = function (value, minimum, maximum) {
		return new Percent((value - minimum) / (maximum - minimum));
	}

	/**
	 Maps a value from one coordinate space to another.

	 @param value: Value from the input coordinate space to map to the output coordinate space.
	 @param min1: Starting value of the input coordinate space.
	 @param max1: Ending value of the input coordinate space.
	 @param min2: Starting value of the output coordinate space.
	 @param max2: Ending value of the output coordinate space.
	 @example
	 <code>
	 console.log(tsunami.number.map(0.75, 0, 1, 0, 100)); // Traces 75
	 </code>
	 */
	c.map = function (value, min1, max1, min2, max2) {
		return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
	};

	/**
	 Low pass filter alogrithm for easing a value toward a destination value. Works best for tweening values when no definite time duration exists and when the destination value changes.

	 If <code>(0.5 < n < 1)</code>, then the resulting values will overshoot (ping-pong) until they reach the destination value. When <code>n</code> is greater than 1, as its value increases, the time it takes to reach the destination also increases. A pleasing value for <code>n</code> is 5.

	 @param value: The current value.
	 @param dest: The destination value.
	 @param n: The slowdown factor.
	 @return The weighted average.
	 */
	c.getWeightedAverage = function (value, dest, n) {
		return value + (dest - value) / n;
	};

	/**
	 Formats a number as a string.

	 @param value: The number you wish to format.
	 @param kDelim: The character used to seperate thousands; defaults to <code>""</code>.
	 @param minLength: The minimum length of the number; defaults to <code>0 </code>.
	 @param fillChar: The leading character used to make the number the minimum length; defaults to <code>"0"</code>.
	 @return Returns the formatted number as a String.
	 @example
	 <code>
	 console.log(tsunami.number.format(1234567, ",", 8)); // Traces 01,234,567
	 </code>
	 */
	c.format = function (value, kDelim, minLength, fillChar) {
		if (!kDelim) {
			kDelim = ",";
		}
		if (isNaN(minLength)) {
			minLength = 0;
		}
		if (!fillChar) {
			fillChar = "0";
		}
		var remainder = value % 1;
		var num = Math.floor(value).toString();
		var len = num.length;

		if (minLength != 0 && minLength > len) {
			minLength -= len;

			var addChar = fillChar || '0';

			while (minLength--)
				num = addChar + num;
		}

		if (kDelim != null && num.length > 3) {
			var totalDelim  = Math.floor(num.length / 3);
			var totalRemain = num.length % 3;
			var numSplit   = num.split('');
			var i = -1;

			while (++i < totalDelim)
				numSplit.splice(totalRemain + (4 * i), 0, kDelim);

			if (totalRemain == 0)
				numSplit.shift();

			num = numSplit.join('');
		}

		if (remainder != 0)
			num += remainder.toString().substr(1);

		return num;
	};

	/**
	 Formats a number as a currency string.

	 @param value: The number you wish to format.
	 @param forceDecimals: If the number should always have two decimal places <code>true</code>, or only show decimals is there is a decimals value <code>false</code>; defaults to <code>true</code>.
	 @param kDelim: The character used to seperate thousands; defaults to <code>","</code>.
	 @return Returns the formatted number as a String.
	 @example
	 <code>
	 console.log(tsunami.number.formatCurrency(1234.5)); // Traces "1,234.50"
	 </code>
	 */
	c.formatCurrency = function(value, forceDecimals, kDelim) {
		if (forceDecimals == null) {
			forceDecimals = true;
		}
		if (!kDelim) {
			kDelim  = ",";
		}
		var remainder = value % 1;
		var currency = tsunami.number.format(Math.floor(value), kDelim);

		if (remainder != 0 || forceDecimals)
			currency += remainder.toFixed(2).substr(1);

		return currency;
	}

	/**
	 Finds the english ordinal suffix for the number given.

	 @param value: Number to find the ordinal suffix of.
	 @return Returns the suffix for the number, 2 characters.
	 @example
	 <code>
	 console.log32 + tsunami.number.getOrdinalSuffix(32)); // Traces 32nd
	 </code>
	 */
	c.getOrdinalSuffix = function (value) {
		if (value >= 10 && value <= 20)
			return 'th';

		if (value == 0)
			return '';

		switch (value % 10) {
			case 3 :
				return 'rd';
			case 2 :
				return 'nd';
			case 1 :
				return 'st';
			default :
				return 'th';
		}
	}

	/**
	 Adds a leading zero for numbers less than ten.

	 @param value: Number to add leading zero.
	 @return Number as a String; if the number was less than ten the number will have a leading zero.
	 @example
	 <code>
	 console.log(tsunami.number.addLeadingZero(7)); // Traces 07
	 console.log(tsunami.number.addLeadingZero(11)); // Traces 11
	 </code>
	 */
	c.addLeadingZero = function(value) {
		return (value < 10) ? '0' + value : value.toString();
	}

	/**
	 Spells the provided number.

	 @param value: Number to spell. Needs to be less than 999999999.
	 @return The number spelled out as a String.
	 @throws <code>Error</code> if <code>value</code> is greater than 999999999.
	 @example
	 <code>
	 console.log(tsunami.number.spell(0)); // Traces Zero
	 console.log(tsunami.number.spell(23)); // Traces Twenty-Three
	 console.log(tsunami.number.spell(2005678)); // Traces Two Million, Five Thousand, Six Hundred Seventy-Eight
	 </code>
	 */
	c.spell = function (value) {
		if (value > 999999999) {
			throw ('Value too large for this method.');
		}

		var onesSpellings = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
		var tensSpellings = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
		var spelling       = '';

		var millions = value / 1000000;
		value              %= 1000000;

		var thousands = value / 1000;
		value               %= 1000;

		var hundreds = value / 100;
		value              %= 100;

		var tens = value / 10;
		value          %= 10;

		var ones = value % 10;

		if (millions != 0) {
			spelling += (spelling.length == 0) ? '' : ', ';
			spelling += tsunami.number.spell(millions) + ' Million';
		}

		if (thousands != 0) {
			spelling += (spelling.length == 0) ? '' : ', ';
			spelling += tsunami.number.spell(thousands) + ' Thousand';
		}

		if (hundreds != 0) {
			spelling += (spelling.length == 0) ? '' : ', ';
			spelling += tsunami.number.spell(hundreds) + ' Hundred';
		}

		if (tens != 0 || ones != 0) {
			spelling += (spelling.length == 0) ? '' : ' ';

			if (tens < 2)
				spelling += onesSpellings[tens * 10 + ones];
			else {
				spelling += tensSpellings[tens];

				if (ones != 0)
					spelling += '-' + onesSpellings[ones];
			}
		}

		if (spelling.length == 0)
			return 'Zero';

		return spelling;
	};

	c.componentToHex = function(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	};

	c.rgbToHex = function(rgb) {
		return tsunami.number.componentToHex(rgb.r) + tsunami.number.componentToHex(rgb.g) + tsunami.number.componentToHex(rgb.b);
	};

	c.hexToRgb = function(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	};

}());
