import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
  {
    path: 'card-library',
    loadChildren: () => import('./card-library/card-library.module').then(m => m.CardLibraryModule)
  },
  {
    path: '',
    redirectTo: 'card-library/all',
    pathMatch: 'full'
  }
];
