import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardLibraryHolderComponent } from './components/card-library-holder/card-library-holder.component';

const routes: Routes = [
  {
    path: 'all',
    component: CardLibraryHolderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardLibraryRoutingModule { }
