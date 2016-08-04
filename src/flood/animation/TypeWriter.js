(function() {

	tsunami.TypeWriter = function(container, duration, delay, ease) {
		this.construct(container, duration, delay, ease);
	};

	var p = tsunami.TypeWriter.prototype = new tsunami.EventDispatcher();

	p.constructTask = p.construct;

	p.construct = function(container, duration, delay, ease) {
		this.constructTask();

		this.container = container;
		if (isNaN(duration)) {
			duration = 1;
		}
		this.duration = duration;

		if(isNaN(delay)) {
			delay = 0;
		}
		this.delay = delay;

		if (!ease) {
			ease = Quadratic.easeInOut;
		}

		this._index = 0;

		this.segments = [];
		var text = this.container.innerHTML;
		var split = text.split("<sup>");
		this.segments.push(new TypeWriterString(split.shift()));

		for (var i = 0; i < split.length; i++) {
			var string = split[i];
			var sup = new TypeWriterSup();
			this.segments.push(sup);
			var excess = sup.parse(string);
			if (excess) {
				this.segments.push(excess);
			}
		}

		this.container.innerHTML = "";
	};

	p.delayComplete = function() {
		this.tween = TweenLite.fromTo(this, this.duration, {setIndex:0}, {setIndex:this.getLength(), ease:Linear.easeInOut, onComplete:this.taskCompleted.bind(this)});
	};

	p.getLength = function() {
		var length = 0;
		for (var i = 0; i < this.segments.length; i++) {
			length += this.segments[i].getLength();
		}
		return length;
	};

	p.getIndex = function() {
		return this._index;
	};

	p.setIndex = function(value) {
		this._index = value;
		this.container.innerHTML = this.getText(Math.round(value));
	};

	p.getText = function(textLength) {
		var filled = 0;
		var text = "";
		var i = 0;
		while (filled < textLength) {
			var neededLength = textLength - filled;
			text += this.segments[i].getText(neededLength);
			filled += this.segments[i].getLength();
			i++;
		}
		if (text.charAt(text.length - 1) == " ") {
			text.substr(0, text.length - 1);
			text += "&nbsp;";
		}
		return text;
	};

}());

(function() {

	TypeWriterSup = function() {
	};

	var p = TypeWriterSup.prototype;

	p.parse = function(text) {
		var index = text.indexOf("</sup>");
		this.text = text.substr(0, index);
		var excess = text.substr(index + 6);
		var string;
		if (excess) {
			if (excess.length > 0) {
				string = new TypeWriterString(excess);
			}
		}
		return string;
	};

	p.getText = function(length) {
		return "<sup>" + this.text.substr(0, Math.min(length, this.text.length)) + "</sup>";
	};

	p.getLength = function() {
		return this.text.length;
	};

}());

(function() {

	TypeWriterString = function(text) {
		this.text = text;
	};

	var p = TypeWriterString.prototype;

	p.getText = function(length) {
		return this.text.substr(0, Math.min(length, this.text.length));
	};

	p.getLength = function() {
		return this.text.length;
	};

}());




