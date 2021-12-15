import Router from '../tsunami/Router';
import Circle from './Circle';

export let router;

function buttonClick(e) {
  router.location = e.currentTarget.getAttribute('data-path');
}

function addButtons() {
  const urls = [
    '009DAE/F58840/B85252/EADEDE',
    '009DAE/FFCC1D/CD1818/E8E8CC',
    '009DAE/FFCC1D/116530/FC997C',
    '009DAE/FFCC1D/116530/B000B9',
    '142F43/FFAB4C/FF5F7E/B000B9',
  ];
  const buttons = document.createElement('div');
  buttons.classList.add('buttons');
  document.body.appendChild(buttons);
  urls.forEach((url) => {
    const div = document.createElement('div');
    div.classList.add('button');
    buttons.appendChild(div);

    const button = document.createElement('button');
    button.textContent = url;
    button.setAttribute('data-path', url);
    button.addEventListener('click', buttonClick);
    div.appendChild(button);
  });
}

export default function Sandbox() {
  addButtons();

  const controller = {
    element: document.body,
    getBranch: () => {
      return new Circle();
    },
  };
  router = new Router(controller);
  router.location = '142F43/FFAB4C/FF5F7E/B000B9';
}

window.Sandbox = Sandbox;
