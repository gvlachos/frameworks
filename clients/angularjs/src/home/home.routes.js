routes.$inject = ['$stateProvider'];

const homeState = {
  name: 'home',
  url: '/',
  component: 'home',
};

export default function routes($stateProvider) {
  $stateProvider.state(homeState);
}
