import './browser.scss';

import browserTemplate from './browser.html';
import browserController from './browser.controller.js';

export default function browserComponent() {
  return {
    controller: ['$stateParams', 'cardService', browserController],
    controllerAs: 'browser',
    template: browserTemplate,
  };
}
