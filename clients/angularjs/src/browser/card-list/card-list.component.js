import './card-list.scss';
import cardListTemplate from './card-list.html';
import { cardListController } from './card-list.controller.js';

export default function cardListComponent() {
	return {
		controller: ['$stateParams', '$timeout', 'cardService', cardListController],
		controllerAs: 'cardList',
		template: cardListTemplate
	}
}