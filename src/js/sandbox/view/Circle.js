import UIComponent from '../../tsunami/components/UIComponent';

export default class Circle extends UIComponent {
  constructor() {
    super();
    this.element = document.createElement('div');
    this.element.className = 'circle';
  }

  getBranch() {
    return new Circle();
  }

  show(branch) {
    console.log('branch', branch.parent);
    branch.parent.appendChild(this.element);
    this.element.style.backgroundColor = '#' + branch.slug;
    return super.show();
  }

  hide(branch) {
    return super.hide().then(() => {
      branch.parent.removeChild(this.element);
    });
  }
}
