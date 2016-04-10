tsunami = this.tsunami || {};

(function() {

	tsunami.Clock = function() {
		tsunami.EventDispatcher.call(this);
		this.index = 0;
		this.seconds = 0;
		this.allFrames = 0;
	};

	var p = tsunami.Clock.prototype = Object.create(tsunami.EventDispatcher.prototype);

	tsunami.Clock.TICK = "tick";
	tsunami.Clock.FPS = "fps";

	p.start = function() {
		this.isRunning = true;
		this.animationFrame();
		this.fpsTimeout = setTimeout(this.dispatchFrameSeconds.bind(this), 1000);
	};

	p.pause = function() {
		this.isRunning = false;
		clearTimeout(this.fpsTimeout);
	};

	p.animationFrame = function() {
		this.time = new Date();
		this.index++;
		this.dispatchEvent({type:tsunami.Clock.TICK});
		if (this.isRunning) {
			window.requestAnimationFrame(this.animationFrame.bind(this));
		}
	};

	p.dispatchFrameSeconds = function() {
		this.allFrames += this.index;
		this.seconds++;
		this.dispatchEvent({type:tsunami.Clock.FPS, frames:this.index, averageFrames:Math.round(this.allFrames / this.seconds * 10) / 10});
		this.index = 0;
		setTimeout(this.dispatchFrameSeconds.bind(this), 1000);
	};

	tsunami.clock = new tsunami.Clock();
	tsunami.clock.start();

}());

