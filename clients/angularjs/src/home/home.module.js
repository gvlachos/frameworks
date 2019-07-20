import homeComponent from './home.component';

const homeModule = angular.module('homeModule', []);

homeModule.component('home', homeComponent());

export default homeModule;
