import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { By, Title } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { async, fakeAsync, flush, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiService } from '../../services/api.service';
import { CardListComponent } from './card-list.component';

import { mockCards } from '../../services/mock-cards.spec';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;
  let api: ApiService;
  let route: ActivatedRoute;
  let router: Router;
  let titleService: Title;
  let element;

  const mockApiService = {
    getCards: () => {},
  };

  const mockActivatedRoute = {
    data: null,
    queryParams: null,
  };

  const mockRouter = {
    navigate: () => {},
  };

  const mockTitle = {
    setTitle: () => {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [CardListComponent],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: Title, useValue: mockTitle },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    api = fixture.debugElement.injector.get(ApiService);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    router = fixture.debugElement.injector.get(Router);
    titleService = fixture.debugElement.injector.get(Title);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    const searchTerm = {
      type: null,
      name: null,
    };
    route.queryParams = of(searchTerm);

    route.data = of({
      title: '',
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('initial display', () => {
    it('makes a call to api.getCards', () => {
      spyOn(api, 'getCards').and.returnValue(of([]));

      const searchTerm = {
        type: null,
        name: null,
      };
      route.queryParams = of(searchTerm);
      route.data = of({
        title: '',
      });

      fixture.detectChanges();
      expect(api.getCards).toHaveBeenCalledTimes(1);
    });

    it('sets initial data', async(() => {
      spyOn(api, 'getCards').and.returnValue(of(mockCards));

      const searchTerm = {
        type: null,
        name: null,
      };
      route.queryParams = of(searchTerm);
      route.data = of({
        title: '',
      });

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.cards).toEqual(mockCards);
      });
    }));

    it('renders correct number of tbody rows', fakeAsync(() => {
      spyOn(api, 'getCards').and.returnValue(of(mockCards));

      const searchTerm = {
        type: null,
        name: null,
      };
      route.queryParams = of(searchTerm);
      route.data = of({
        title: '',
      });

      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      const rows = fixture.debugElement.queryAll(By.css('tr[app-card]'));
      expect(rows.length).toEqual(mockCards.length);
    }));

    it('get card detail', fakeAsync(() => {
      spyOn(api, 'getCards').and.returnValue(of(mockCards));
      spyOn(router, 'navigate');

      const searchTerm = {
        type: null,
        name: null,
      };
      route.queryParams = of(searchTerm);
      route.data = of({
        title: '',
      });

      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      const rows = fixture.debugElement.queryAll(By.css('tr[app-card]'));
      expect(rows.length).toEqual(mockCards.length);

      const card = rows[0].nativeElement;
      const url = `/card/${mockCards[0].id}`;
      card.click();

      expect(router.navigate).toHaveBeenCalledWith([url], {
        state: { card: mockCards[0] },
      });
    }));
  });

  describe('pagination', () => {
    beforeEach(() => {
      const searchTerm = {
        type: null,
        name: null,
      };
      route.queryParams = of(searchTerm);
      route.data = of({
        title: '',
      });
    });

    it('has cards', () => {
      spyOn(api, 'getCards').and.returnValue(of(mockCards));
      fixture.detectChanges();
      expect(component.hasPrevious).toEqual(false);
      expect(component.hasNext).toEqual(true);
      expect(component.page).toEqual(1);
      expect(component.getNextPage()).toEqual(2);
      expect(component.getPreviousPage()).toEqual(1);
    });
  });
});
