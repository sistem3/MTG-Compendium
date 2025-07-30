import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { TitleCasePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
// Prime
import { FormsModule } from '@angular/forms';
import { DataView } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
// Components
import { CardPreviewComponent } from '../card-preview/card-preview.component';
import { CardFullDetailsComponent } from '../card-full-details/card-full-details.component';
// Interfaces
import { Card } from '../../interfaces/card.interface';
import { QueryConfig } from '../../interfaces/query-config.interface';
import { ColourConfig } from '../../interfaces/colour-config.interface';
// Services
import { CardService } from '../../services/card.service';
import { QueryConfigService } from '../../services/query-config.service';

@Component({
  selector: 'app-card-library-holder',
  imports: [
    FormsModule,
    InputTextModule,
    DialogModule,
    TooltipModule,
    DataView,
    TitleCasePipe,
    CardPreviewComponent,
    CardFullDetailsComponent],
  templateUrl: './card-library-holder.component.html',
  styleUrl: './card-library-holder.component.css'
})
export class CardLibraryHolderComponent implements OnInit {

  mainTitle: string = 'Magic The Gathering: Compendium';
  loadingCards: boolean = true;
  cards: Array<Card> = [];
  cardsTotalCount: number = 0;
  searchTerm: string = '';
  colourQueryConfig: string = '';
  queryConfig: QueryConfig = this.queryConfigService.getBlankQuery();
  availableGameFormats: Array<string> = this.queryConfigService.getFormatOptions();
  manaColourConfig: Array<ColourConfig> = this.cardService.getManaColourFilterConfig();
  searchDebounce: Subject<any> = new Subject();
  showCardDetails: boolean = false;
  tempFullCardDetails: any;
  paginationStart: number = 0;
  paginationPageSize: number = 175;

  constructor(private cardService: CardService,
              private queryConfigService: QueryConfigService) { }

  ngOnInit(): void {
    this.colourQueryConfig = ' c:';
    this.manaColourConfig.forEach(config => {
      if (config.isActive) {
        this.colourQueryConfig = this.colourQueryConfig + config.colourIdentity.toLowerCase();
      }
    });
    this.queryConfig.q = this.colourQueryConfig;
    this.setupSearch();
    this.getCards(this.queryConfig);
  }

  setupSearch() {
    this.searchDebounce.asObservable()
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.queryConfig.page = 1;
        this.paginationStart = 0;
        this.queryConfig.q = this.searchTerm + this.colourQueryConfig;
        this.getCards(this.queryConfig);
      });
  }

  searchCards() {
    this.searchDebounce.next(null);
  }

  getCards(queryConfig: QueryConfig) {
    this.loadingCards = true;
    this.cardService.getCards(queryConfig).subscribe((response: any) => {
      this.cards = response.data;
      this.cardsTotalCount = response.total_cards;
      this.loadingCards = false;
    });
  }

  loadMoreCards(event: any) {
    const pageCheck = (event.first / this.paginationPageSize) + 1;
    if (pageCheck > 1 || (this.queryConfig.page > pageCheck)) {
      this.queryConfig.page = pageCheck;
      this.paginationStart = event.first;
      this.getCards(this.queryConfig);
    }
  }

  updateManaColourFilter(colour: ColourConfig) {
    colour.isActive = !colour.isActive;
    let updatedFilters = '';
    this.manaColourConfig.forEach((config, index) => {
      if (config.isActive) {
        updatedFilters = updatedFilters +
          config.colourIdentity.toLowerCase() + (index === this.manaColourConfig.length -1 ? '' : ',');
      }
    });
    this.colourQueryConfig = ' c:' + updatedFilters;
    this.queryConfig.q = this.searchTerm + this.colourQueryConfig;
    this.queryConfig.page = 1;
    this.paginationStart = 0;
    this.getCards(this.queryConfig);
  }

  handleFullDetailsDisplay(card: Card) {
    this.tempFullCardDetails = null;
    this.tempFullCardDetails = card;
    this.showCardDetails = true;
  }

}
