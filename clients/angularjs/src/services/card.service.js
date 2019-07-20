export default function cardService($http) {
  const baseURL = CARD_DATA_URL;

  // RxJS Subject variables (use the Observable pattern)

  // notify the cards list when cards are loaded
  this.cardsChanged = new Rx.Subject();
  // notify the card details component when
  // a card is selected from the list
  this.cardSelected = new Rx.Subject();

  this.cardSearch = new Rx.Subject();

  this.getBaseUrl = function() {
    return baseURL;
  };

  this.loadCards = function() {
    const url = baseURL + 'deck';
    const promise = $http.get(url);
    promise.then(result => {
      this.cardsChanged.onNext({ result: result.data });
    });
    promise.catch(error => this.cardsChanged.onNext({ error: error }));
  };

  this.loadCardsWithNameLike = function(name) {
    const url = `${baseURL}deck?name_like=${name}`;
    const promise = $http.get(url);
    promise.then(result => {
      this.cardsChanged.onNext({ result: result.data });
    });
    promise.catch(error => this.cardsChanged.onNext({ error: error }));
  };

  this.loadCardsWithType = function(type) {
    const url = `${baseURL}deck?type=${type}`;
    const promise = $http.get(url);
    promise.then(result => {
      this.cardsChanged.onNext({ result: result.data });
    });
    promise.catch(error => this.cardsChanged.onNext({ error: error }));
  };

  this.loadCard = function(withTitle) {
    const url = baseURL + 'deck/' + withTitle;
    return $http.get(url);
  };
}
