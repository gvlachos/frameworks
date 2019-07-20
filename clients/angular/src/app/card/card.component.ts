import { Component, Input, OnInit } from '@angular/core';

import { Card } from '../card/card';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-card]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card;
  constructor() {}
  ngOnInit() {}

  getCardImageUrl(card: Card) {
    return `/deck/svg/${card.id}.svg`;
  }
}

// a component selector is used instead of element
// (style 05-03 https://angular.io/guide/styleguide#style-05-03)
// since the card augements the row for the card list table
