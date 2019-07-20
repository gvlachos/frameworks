import imagePopupComponent from './image-popup/image-popup.component';

const commonModule = angular.module('commonModule', []);

commonModule.component('imagePopup', imagePopupComponent());

export default commonModule;
