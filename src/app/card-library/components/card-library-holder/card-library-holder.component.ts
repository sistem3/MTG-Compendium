import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
// Interfaces
import { Card } from '../../interfaces/card.interface';
import { ColourConfig } from '../../interfaces/colour-config.interface';
import { QueryConfig } from '../../interfaces/query-config.interface';
// Services
import { CardService } from '../../services/card.service';
import { QueryConfigService } from '../../services/query-config.service';

@Component({
  selector: 'app-card-library-holder',
  templateUrl: './card-library-holder.component.html'
})
export class CardLibraryHolderComponent implements OnInit {

  mainTitle: string = 'Magic The Gathering: Compendium';
  loadingCards: boolean = true;
  cards: Array<Card> = [];
  cardsTotalCount: number = 0;
  searchTerm: string = '';
  queryConfig: QueryConfig = this.queryConfigService.getBlankQuery();
  availableGameFormats: Array<string> = this.queryConfigService.getFormatOptions();
  manaColourConfig: Array<ColourConfig> = this.cardService.getManaColourFilterConfig();
  searchDebounce: Subject<any> = new Subject();
  showCardDetails: boolean = false;
  tempFullCardDetails: any;

  constructor(private cardService: CardService,
              private queryConfigService: QueryConfigService) { }

  ngOnInit(): void {
    this.setupSearch();
    this.getCards(this.queryConfig);
  }

  setupSearch() {
    this.searchDebounce.asObservable()
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.queryConfig.page = 1;
        this.queryConfig.first = 0;
        this.queryConfig.name = this.searchTerm;
        this.getCards(this.queryConfig);
      });
  }

  searchCards() {
    this.searchDebounce.next(null);
  }

  getCards(queryConfig: QueryConfig) {
    this.loadingCards = true;
    this.cardService.getCards(queryConfig).subscribe((data: HttpResponse<any>) => {
      this.cards = data.body.cards;
      const responseTotalCount = data.headers.get('total-count');
      this.cardsTotalCount = parseFloat(responseTotalCount ? responseTotalCount : '0');
      this.loadingCards = false;
    });
  }

  loadMoreCards(event: any) {
    const pageCheck =  (event.first / this.queryConfig.pageSize) + 1;
    if (pageCheck > 1 || (this.queryConfig.page > pageCheck)) {
      this.queryConfig.page = pageCheck;
      this.queryConfig.first = event.first;
      this.getCards(this.queryConfig);
    }
  }

  updateManaColourFilter(colour: ColourConfig) {
    colour.isActive = !colour.isActive;
    let updatedFilters = '';
    this.manaColourConfig.forEach((config, index) => {
      if (config.isActive) {
        updatedFilters = updatedFilters +
          config.colourIdentity + (index === this.manaColourConfig.length -1 ? '' : '|');
      }
    });
    this.queryConfig.colors = updatedFilters;
    this.queryConfig.page = 1;
    this.queryConfig.first = 0;
    this.getCards(this.queryConfig);
  }

  handleFullDetailsDisplay(card: Card) {
    this.tempFullCardDetails = null;
    this.tempFullCardDetails = card;
    this.showCardDetails = true;
  }

}
