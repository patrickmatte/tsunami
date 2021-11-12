import UIComponent from '../../tsunami/components/UIComponent';
import Circles from './Circles';

export default class View extends UIComponent {
  constructor() {
    super(document.body);

    this.circles = new Circles();

    this.branches.circles = this.circles;
  }

  load() {
    console.log('view.load');
  }
  show() {
    console.log('view.show');
    return super.show();
  }
}
