import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { trigger, sequence, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Title } from '@angular/platform-browser';

import { ApiService, SearchTerm } from '../../services/api.service';
import { Card } from '../card/card';

const rowsAnimation = trigger('rowsAnimation', [
  transition('void => *', [
    style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
    sequence([
      animate('.35s ease', style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none' })),
      animate('.35s ease', style({ height: '*', opacity: 1, transform: 'translateX(0)' })),
    ]),
  ]),
]);

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  animations: [rowsAnimation],
})
export class CardListComponent implements OnInit, OnDestroy {
  cards: Array<Card> = [];
  displayFooter = false;
  hasPrevious = false;
  hasNext = false;
  // apiCardsSubscription: Subscription = null;
  routeDataSubscription: Subscription = null;
  routeQueryParamsSubscription: Subscription = null;
  searchTerm: SearchTerm = {
    type: null,
    name: null,
  };
  page = 1;
  limit = 5;
  animationCount = 0;

  constructor(
    private titleService: Title,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.routeDataSubscription = this.route.data.subscribe(data => {
      this.titleService.setTitle(data.title);
    });

    this.routeQueryParamsSubscription = this.route.queryParams.subscribe(queryParams => {
      this.searchTerm.type = queryParams.type;
      this.getCards(1);
    });
  }

  ngOnDestroy() {
    this.routeDataSubscription.unsubscribe();
    this.routeQueryParamsSubscription.unsubscribe();
  }

  // NOTE:
  // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
  // Promise.resolve fixes ExpressionChangedAfterItHasBeenCheckedError

  showFooter() {
    Promise.resolve(null).then(() => (this.displayFooter = true));
  }

  hideFooter() {
    Promise.resolve(null).then(() => (this.displayFooter = false));
  }

  onAnimationStartEvent(event) {
    if (this.animationCount === 0) {
      this.hideFooter();
    }
    this.animationCount += 1;
  }

  onAnimationDoneEvent(event) {
    this.animationCount -= 1;
    if (this.animationCount === 0) {
      this.showFooter();
    }
  }

  getNextPage() {
    return this.page + 1;
  }

  getPreviousPage() {
    return this.page > 1 ? this.page - 1 : 1;
  }

  getCards(page = 1) {
    // this.apiCardsSubscription = this.api.getCards(this.page, this.limit).subscribe(
    this.api
      .getCards(this.searchTerm, page, this.limit)
      .pipe(take(1)) // take(1) will unsubscribe after 1 result received
      .subscribe(
        res => {
          if (res.length > 0) {
            this.cards = res;
            this.hasPrevious = page > 1 ? true : false;
            this.hasNext = true;
            this.page = page;
          } else {
            this.hasNext = false;
          }
        },
        err => {
          console.log(err);
        },
      );
  }

  goToDetails(card: Card) {
    const { id } = card;
    const route = `/card/${id}`;
    const navigationExtras: NavigationExtras = {
      state: { card },
    };
    this.router.navigate([route], navigationExtras);
    return route;
  }
}
