export default function cardDetailController($uibModal, cardService) {
  this.card = null;
  this.cardsLoaded = false;
  this.show = false;

  this.$onInit = function() {
    this.cardsChangedSubscription = cardService.cardsChanged.subscribe(data => {
      if (typeof data.error === 'undefined' && data.result && data.result.length > 0) {
        this.cardsLoaded = true;
      } else {
        console.warn('No data received', data.error);
      }
    });

    this.cardSelectedSubscription = cardService.cardSelected.subscribe(card => {
      this.card = card;
      this.cardImageUrl = cardService.getBaseUrl() + 'deck/png/' + encodeURI(this.card.id) + '.png';
      this.show = true;
    });
  };

  this.$onDestroy = function() {
    this.cardsChangedSubscription.dispose();
    this.cardSelectedSubscription.dispose();
  };

  this.showLarge = function() {
    const name = this.card.name;
    const url = this.cardImageUrl;

    const modalInstance = $uibModal.open({
      animation: true,
      component: 'imagePopup',
      resolve: {
        imageName: () => name,
        imageUrl: () => url,
      },
    });

    // ignore any return values from the popup
    modalInstance.result.then(function() {}, function() {});
  };

  // this.unsub = function () {
  //     console.log(this.cardsChangedSubscription, this.cardSelectedSubscription);
  //     this.cardsChangedSubscription.dispose();
  //     this.cardSelectedSubscription.dispose();
  // }
}
