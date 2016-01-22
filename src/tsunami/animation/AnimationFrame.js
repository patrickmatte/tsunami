(function() {

	tsunami.AnimationFrame = function(dispatchFramesPerSeconds) {
		this.construct(dispatchFramesPerSeconds);
	}

	var p = tsunami.AnimationFrame.prototype = new tsunami.EventDispatcher();

	tsunami.AnimationFrame.FRAME = "frame";
	tsunami.AnimationFrame.FPS = "fps";

	p.constructEventDispatcher = p.construct;

	p.construct = function(dispatchFramesPerSeconds) {
		this.index = 0;
		this.seconds = 0;
		this.allFrames = 0;
		this.animationFrame();
		if (dispatchFramesPerSeconds) {
			setTimeout(this.dispatchFrameSeconds.bind(this), 1000);
		}
	}

	p.animationFrame = function() {
		this.index++;
		this.dispatchEvent({type:tsunami.AnimationFrame.FRAME});
		window.requestAnimationFrame(this.animationFrame.bind(this));
	}

	p.dispatchFrameSeconds = function() {
		this.allFrames += this.index;
		this.seconds++;
		this.dispatchEvent({type:tsunami.AnimationFrame.FPS, frames:this.index, averageFrames:Math.round(this.allFrames / this.seconds * 10) / 10});
		this.index = 0;
		setTimeout(this.dispatchFrameSeconds.bind(this), 1000);
	}


}());





