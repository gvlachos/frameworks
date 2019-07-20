describe('Card Service', function() {
  const baseURL = `http://${window.__env__['HOST']}:${window.__env__['PORT']}/`;
  console.log('baseURL', baseURL);

  let cardService;
  let $httpBackend;
  let $exceptionHandler;

  beforeEach(angular.mock.module('serviceModule'));

  beforeEach(inject(function(_cardService_, _$httpBackend_, _$exceptionHandler_) {
    cardService = _cardService_;
    $httpBackend = _$httpBackend_;
    $exceptionHandler = _$exceptionHandler_;
  }));

  describe('check base URL', function() {
    it('cardService should exist', function() {
      expect(cardService).toBeDefined();
    });

    it('base URL should exist', function() {
      expect(cardService.getBaseUrl).toBeDefined();
    });

    it('should contain correct URL', function() {
      expect(cardService.getBaseUrl()).toEqual(baseURL);
    });
  });
});
