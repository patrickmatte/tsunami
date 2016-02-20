(function() {

	tsunami.Clock = function() {
		this.construct();
	};

	var p = tsunami.Clock.prototype = new tsunami.EventDispatcher();

	tsunami.Clock.TICK = "frame";
	tsunami.Clock.FPS = "fps";

	p.constructEventDispatcher = p.construct;

	p.construct = function() {
		this.index = 0;
		this.seconds = 0;
		this.allFrames = 0;
	};

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

}());





