import UIComponent from '../../tsunami/components/UIComponent';
import Circle from './Circle';

export default class Circles extends UIComponent {
  constructor() {
    super();
    this.element = document.createElement('div');
    this.element.className = 'circles';

    this.branches['*'] = new Circle();
  }

  show(branch) {
    branch.parent.appendChild(this.element);
    return super.show();
  }

  hide(branch) {
    return super.hide().then(() => {
      branch.parent.removeChild(this.element);
    });
  }
}
