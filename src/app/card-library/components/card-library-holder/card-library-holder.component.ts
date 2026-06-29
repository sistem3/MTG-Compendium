import { Component, OnInit } from '@angular/core';
import { TitleCasePipe, NgClass } from '@angular/common';
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
import { SearchFilterComponent } from '../search-filter/search-filter.component';
// Interfaces
import { Card } from '../../interfaces/card.interface';
import { QueryConfig } from '../../interfaces/query-config.interface';
import { ColourConfig } from '../../interfaces/colour-config.interface';
import { FilterConfig } from '../../interfaces/filter-config.interface';
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
    CardFullDetailsComponent,
    SearchFilterComponent,
    NgClass
],
  templateUrl: './card-library-holder.component.html',
  styleUrl: './card-library-holder.component.css'
})
export class CardLibraryHolderComponent implements OnInit {

  mainTitle: string = 'Magic The Gathering: Compendium';
  loadingCards: boolean = false;
  cards: Array<Card> = [];
  cardsTotalCount: number = 0;
  searchTerm: string = '';
  colourQueryConfig: string = '';
  queryConfig: QueryConfig = this.queryConfigService.getBlankQuery();
  manaColourConfig: Array<ColourConfig> = this.cardService.getManaColourFilterConfig();
  searchDebounce: Subject<any> = new Subject();
  showCardDetails: boolean = false;
  tempFullCardDetails?: Card;
  paginationStart: number = 0;
  paginationPageSize: number = 175;
  showMoreFilters: boolean = true;
  availableFilterConfigs: Array<FilterConfig> = this.queryConfigService.getAvailableFilterConfigs();
  filterConfig: Array<FilterConfig> = [];

  constructor(private cardService: CardService,
              private queryConfigService: QueryConfigService) { }

  ngOnInit(): void {
    this.setupFilters();
    this.setupSearch();
    this.getCards(this.queryConfig);
  }

  setupSearch() {
    this.searchDebounce.asObservable()
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.resetPagination();
        this.queryConfig.q = this.searchTerm + ' ' + this.colourQueryConfig;
        this.getCards(this.queryConfig);
      });
  }

  setupFilters() {
    this.colourQueryConfig = 'c:';
    this.manaColourConfig.forEach(config => {
      if (config.isActive) {
        this.colourQueryConfig = this.colourQueryConfig + config.colourIdentity.toLowerCase();
      }
    });
    this.queryConfig.q = this.colourQueryConfig;
    this.filterConfig = [this.availableFilterConfigs[0], this.availableFilterConfigs[4]];
  }

  searchCards() {
    this.searchDebounce.next(null);
  }

  resetPagination() {
    this.queryConfig.page = 1;
    this.paginationStart = 0;
  }

  getCards(queryConfig: QueryConfig) {
    if (!this.loadingCards) {
      this.loadingCards = true;
      this.cardService.getCards(queryConfig).subscribe({
        next: (response: any) => {
          this.cards = response.data;
          this.cardsTotalCount = response.total_cards;
          this.loadingCards = false;
        },
        error: (error: any) => {
          console.log(error);
          this.cards = [];
          this.cardsTotalCount = 0;
          this.loadingCards = false;
        }
      });
    }
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
    this.tempFullCardDetails = undefined;
    this.tempFullCardDetails = card;
    this.showCardDetails = true;
  }

  handleFilterUpdate(filterUpdate: FilterConfig) {
    console.log(filterUpdate);
    console.log(this.queryConfig.q);
    if (filterUpdate.selected_value) {
      if (this.queryConfig.q.includes(filterUpdate.value)) {
        console.log('Update filter');
      } else {
        console.log('Add filter');
        this.resetPagination();
        this.queryConfig.q = this.queryConfig.q + ' ' + filterUpdate.value + filterUpdate.selected_value;
        this.getCards(this.queryConfig);
      }
    } else {
      console.log('Reset filter');
    }
  }

  handleRemoveFilter(filter: FilterConfig) {
    console.log('Find and remove this');
    console.log(filter);
  }

  toggleShowMoreFilters() {
    this.showMoreFilters = !this.showMoreFilters;
  }

}
