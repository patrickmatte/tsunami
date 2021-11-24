import { awaitAnimationFrame, awaitTimeout } from '../tsunami/await';

export default class Circle {
  constructor(element) {
    if (!element) {
      element = document.createElement('div');
    }
    this.element = element;
    this.element.className = 'circle';
  }

  getBranch() {
    return new Circle();
  }

  show(branch) {
    branch.parent.element.appendChild(this.element);
    this.element.style.backgroundColor = '#' + branch.slug;
    const promise1 = awaitAnimationFrame(2);
    return promise1.then(() => {
      this.element.setAttribute('data-state', 'show');
      return awaitTimeout(0.5);
    });
  }

  hide(branch) {
    this.element.setAttribute('data-state', 'hide');
    return awaitTimeout(0.5).then(() => {
      branch.parent.element.removeChild(this.element);
    });
  }
}
