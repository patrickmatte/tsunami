tsunami = this.tsunami || {};

(function() {

	tsunami.GSAP = function(method, args) {
		this.construct(method, args);
	}

	var p = tsunami.GSAP.prototype = new tsunami.Method();

	p.delayComplete = function() {
		this.result = this.method.apply(null, this.args);
		this.result.eventCallback("onComplete", this.onCompleteHandler.bind(this));
	}

	p.onCompleteHandler = function() {
		this.taskCompleted();
	}

	p.toString = function() {
		return "[GSAP" + " name=" + this.name + "]";
	}

}());



