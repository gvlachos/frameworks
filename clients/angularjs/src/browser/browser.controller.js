export default function browserController($stateParams, cardService) {
  this.title = 'Simple Deck Browser';
  this.search = { name: '' };

  this.searchCard = function() {
    cardService.cardSearch.onNext(this.search);
  };
}
