export default function homeController($state) {
  this.searchType = '';
  this.searchValue = '';
  this.nextState = '';

  this.search = function() {
    if (this.searchType === 'name') {
      $state.transitionTo('cardsNameLike', { name: this.searchValue });
    } else if (this.searchType === 'type') {
      $state.transitionTo('cardsTypeLike', { type: this.searchValue });
    }
  };
}
