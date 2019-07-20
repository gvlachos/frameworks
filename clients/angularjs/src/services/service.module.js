import cardService from './card.service';
export default angular.module('serviceModule', []).service('cardService', ['$http', cardService]);
