import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardListComponent } from './card-list/card-list.component';
import { CardDetailsComponent } from './card-details/card-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cards',
    pathMatch: 'full',
  },
  {
    path: 'cards',
    component: CardListComponent,
    data: { title: 'Card List' },
  },
  {
    path: 'card/:id',
    component: CardDetailsComponent,
    data: { title: 'Card Details' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
