import { ApiService } from './api.service';
import { mockCards } from './mock-cards.spec';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  const httpSpy = jasmine.createSpyObj('http', ['get']);

  beforeEach(() => {
    service = new ApiService(httpSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCards', () => {
    it('should return list of cards', done => {
      const mockResponse = of(mockCards);

      httpSpy.get.and.returnValue(mockResponse);

      service
        .getCards({ type: '', name: '' })
        .toPromise()
        .then(data => {
          expect(httpSpy.get).toHaveBeenCalledWith('/deck?_page=1&_limit=5');
          expect(data).toEqual(mockCards);
          done();
        });
    });
  });

  describe('getCards', () => {
    it('should return list of cards of type and name provided', done => {
      const mockResponse = of(mockCards);

      httpSpy.get.and.returnValue(mockResponse);

      service
        .getCards({ type: 'clubs', name: 'ace' })
        .toPromise()
        .then(data => {
          expect(httpSpy.get).toHaveBeenCalledWith('/deck?type=clubs&name_like=ace&_page=1&_limit=5');
          expect(data).toEqual(mockCards);
          done();
        });
    });
  });
});
