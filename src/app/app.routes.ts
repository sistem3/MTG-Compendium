import { Routes } from '@angular/router';
import { CardLibraryHolderComponent } from './card-library/components/card-library-holder/card-library-holder.component';

export const mainRoutes: Routes = [
  {
    path: 'card-library/all',
    component: CardLibraryHolderComponent
  },
  {
    path: '',
    redirectTo: 'card-library/all',
    pathMatch: 'full'
  }
];
