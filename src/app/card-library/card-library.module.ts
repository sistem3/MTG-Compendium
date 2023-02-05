import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Prime NG Modules
import { DataViewModule } from 'primeng/dataview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
// Routing Module
import { CardLibraryRoutingModule } from './card-library-routing.module';
// Components
import { CardLibraryHolderComponent } from './components/card-library-holder/card-library-holder.component';
import { CardPreviewComponent } from './components/card-preview/card-preview.component';
import { CardFullDetailsComponent } from './components/card-full-details/card-full-details.component';
// Pipes
import { ManaCostPipe } from './pipes/mana-cost.pipe';
import { ColorIdentityPipe } from './pipes/color-identity.pipe';

@NgModule({
  declarations: [
    CardLibraryHolderComponent,
    CardPreviewComponent,
    CardFullDetailsComponent,
    ColorIdentityPipe,
    ManaCostPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardLibraryRoutingModule,
    DataViewModule,
    ProgressSpinnerModule,
    InputTextModule,
    TooltipModule,
    ToastModule,
    DialogModule
  ]
})
export class CardLibraryModule { }
