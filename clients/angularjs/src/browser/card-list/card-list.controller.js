function cardListController($stateParams, $timeout, cardService) {
    this.searchFromServerByName = '';
    this.searchFromServerByType = '';

    this.cards = [];
    this.cardsDisplayed = [];
    this.currentPage = 1;
    this.cardsPerPage = 6;
    this.cardSelectedId = -1;
    this.search = {name: ''};

    this.$onInit = function (){
        this.cardsChangedSubscription = cardService.cardsChanged.subscribe(data => {
            if (typeof(data.error) === 'undefined' && data.result) {
                // use $timeout to ensure that Angular is notified
                // of the change (a $scope.$apply runs at the end of $timeout)
                // in the case this falls outside the digest cycle.
                // Note: there is the case when running a local server
                // that the callback will be fast enough so that it falls
                // within the same digest cycle. In this case an error
                // will be thrown if we tried to call $scope.$apply
                $timeout(() => {
                    this.cards = data.result;
                    this.totalItems = this.cards.length;
                });
            } else {
                console.warn('No data received', data.error);
            }
        });

        this.cardSearchSubscription = cardService.cardSearch.subscribe(data => {
            this.currentPage = 1;
            this.search = data;
        });

        if ($stateParams.name) {
            this.searchFromServerByName = $stateParams.name;
            cardService.loadCardsWithNameLike($stateParams.name);
        } else if ($stateParams.type) {
            this.searchFromServerByType = $stateParams.type;
            cardService.loadCardsWithType($stateParams.type);
        } else {
            cardService.loadCards();
        }
    }

    this.$onDestroy = function (){
        this.cardsChangedSubscription.dispose();
        this.cardSearchSubscription.dispose();
    }

    this.showCardDetails = function(id) {
        const card = this.cards.find(card => card.id === id);
        cardService.cardSelected.onNext(card);
        this.cardSelectedId = id;
    }

    this.isSelected = function(id) {
        return this.cardSelectedId === id;
    }
}

export { cardListController }