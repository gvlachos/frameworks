import './home.scss';

import homeTemplate from './home.html';
import homeController from './home.controller.js';

export default function homeComponent() {
  return {
    controller: ['$state', homeController],
    controllerAs: 'home',
    template: homeTemplate,
  };
}
