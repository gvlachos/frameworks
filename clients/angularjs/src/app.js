import angular from 'angular';
import rx from 'rx-angular';
import ngAnimate from 'angular-animate';
import uiRouter from '@uirouter/angularjs';
import * as uiBootstrap from 'ui-bootstrap4';

import './app.scss';

import './common/common.module';
import './services/service.module';

import './home/home.module';
import './browser/browser.module';

import routes from './app.routes';
import home from './home/home.routes';
import browser from './browser/browser.routes';

angular
  .module('app', [
    'rx',
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'commonModule',
    'serviceModule',
    'homeModule',
    'browserModule',
  ])
  .config(routes)
  .config(home)
  .config(browser);
