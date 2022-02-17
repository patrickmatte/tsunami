import BaseEvent from '../events';

export default class Clock extends EventTarget {
  constructor() {
    super();
    this.animationTime = NaN;
    this.time = 0;
    this.index = 0;
    this.seconds = 0;
    this.allFrames = 0;
    this.animationFrame = this.animationFrame.bind(this);
  }

  static get TICK() {
    return 'tick';
  }

  static get FPS() {
    return 'fps';
  }

  start() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    window.requestAnimationFrame(this.animationFrame);
    this.fpsTimeout = setTimeout(this.dispatchFrameSeconds.bind(this), 1000);
    return this;
  }

  pause() {
    this.isRunning = false;
    clearTimeout(this.fpsTimeout);
  }

  animationFrame(time) {
    if (isNaN(this.animationTime)) this.animationTime = time;
    const diff = time - this.animationTime;
    this.time += diff;
    this.animationTime = time;
    this.index++;
    const event = new BaseEvent(Clock.TICK, this.time);
    this.dispatchEvent(event);
    if (this.isRunning) {
      window.requestAnimationFrame(this.animationFrame);
    }
  }

  dispatchFrameSeconds() {
    this.allFrames += this.index;
    this.seconds++;
    const event = new BaseEvent(Clock.FPS, {
      frames: this.index,
      averageFrames: Math.round((this.allFrames / this.seconds) * 10) / 10,
    });
    this.dispatchEvent(event);
    this.index = 0;
    setTimeout(this.dispatchFrameSeconds.bind(this), 1000);
  }
}

let clock = new Clock().start();

export function getClock() {
  return clock;
}
