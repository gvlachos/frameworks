import './card-detail.scss';

import cardDetailTemplate from './card-detail.html';
import cardDetailController from './card-detail.controller.js';

export default function cardDetailComponent() {
  return {
    controller: ['$uibModal', 'cardService', cardDetailController],
    controllerAs: 'cardDetail',
    template: cardDetailTemplate,
  };
}
