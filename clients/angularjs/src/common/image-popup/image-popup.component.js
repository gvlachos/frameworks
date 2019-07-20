import './image-popup.scss';

import template from './image-popup.html';
import imagePopupController from './image-popup.controller.js';

const bindings = {
  resolve: '<',
  close: '&',
  dismiss: '&',
};

export default function imagePopupComponent() {
  return {
    controller: [imagePopupController],
    controllerAs: 'imagePopup',
    template,
    bindings,
  };
}
