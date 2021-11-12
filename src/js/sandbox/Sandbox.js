import Model from './model/model';
import Router from '../tsunami/Router';
import View from './view/View';

export const model = new Model();
export let view;
export const controller = new Router();

export default function Sandbox() {
  view = new View();
  controller.root = view;
  controller.location = 'circles/808080/ff0000/ff00ff/00ffff';
}

window.Sandbox = Sandbox;
