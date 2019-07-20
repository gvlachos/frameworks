import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Card } from '../card/card';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit, OnDestroy {
  url: string = null;
  card: Card = null;
  paramsSubscription: Subscription = null;
  routeSubscription: Subscription = null;

  constructor(private titleService: Title, private router: Router, private route: ActivatedRoute) {
    // console.log('getCurrentNavigation', this.router.getCurrentNavigation());
    const { extras } = this.router.getCurrentNavigation();
    const { state = {} } = extras;
    // TODO: retrieve card from server if not in state
    this.card = state.card || {};
  }

  ngOnInit() {
    this.routeSubscription = this.route.data.subscribe(data => {
      this.titleService.setTitle(data.title);
    });
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      this.url = `/deck/svg/${params.get('id')}.svg`;
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
