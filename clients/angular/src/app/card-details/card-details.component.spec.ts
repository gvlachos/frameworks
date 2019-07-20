import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailsComponent } from './card-details.component';

const mockCard = {
  id: 'ace_of_clubs',
  name: 'ace of clubs',
  type: 'clubs',
};

describe('CardDetailsComponent', () => {
  let component: CardDetailsComponent;
  let fixture: ComponentFixture<CardDetailsComponent>;
  let titleService: Title;
  let route: ActivatedRoute;
  let router: Router;

  const mockActivatedRoute = {
    data: of({}),
    paramMap: of(convertToParamMap({ id: mockCard.id })),
  };

  const mockRouter = {
    navigate: () => {},
    getCurrentNavigation: () => {
      return {
        extras: {
          state: { card: mockCard },
        },
      };
    },
  };

  const mockTitle = {
    setTitle: () => {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: Title, useValue: mockTitle },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailsComponent);
    component = fixture.componentInstance;
    route = fixture.debugElement.injector.get(ActivatedRoute);
    router = fixture.debugElement.injector.get(Router);
    titleService = fixture.debugElement.injector.get(Title);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('initial display', () => {
    it('sets initial card data', () => {
      fixture.detectChanges();
      expect(component.card).toEqual(mockCard);
    });

    it('sets initial image URL', () => {
      fixture.detectChanges();
      expect(component.url).toEqual(`/deck/svg/${mockCard.id}.svg`);
    });
  });
});
