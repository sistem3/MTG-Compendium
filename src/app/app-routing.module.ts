import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
