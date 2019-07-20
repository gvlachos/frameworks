routes.$inject = ['$stateProvider'];

const cardsState = {
  name: 'cards',
  url: '/cards',
  component: 'browser',
};

const cardsNameLike = {
  name: 'cardsNameLike',
  parent: 'cards',
  url: '/card-name-like/{name}',
};

const cardsTypeLike = {
  name: 'cardsTypeLike',
  parent: 'cards',
  url: '/card-type-like/{type}',
};

export default function routes($stateProvider) {
  $stateProvider.state(cardsState);
  $stateProvider.state(cardsNameLike);
  $stateProvider.state(cardsTypeLike);
}
