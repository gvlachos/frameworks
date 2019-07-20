import browserComponent from './browser.component';
import cardListComponent from './card-list/card-list.component';
import cardDetailComponent from './card-detail/card-detail.component';

const browserModule = angular.module('browserModule', []);

browserModule.component('browser', browserComponent());
browserModule.component('cardList', cardListComponent());
browserModule.component('cardDetail', cardDetailComponent());

export default browserModule;
