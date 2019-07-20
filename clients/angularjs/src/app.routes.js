routes.$inject = ['$urlRouterProvider', '$locationProvider'];

export default function routes($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
}
