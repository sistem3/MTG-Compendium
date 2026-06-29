import { Injectable } from '@angular/core';
// Interfaces
import { QueryConfig } from '../interfaces/query-config.interface';
import { FilterConfig } from '../interfaces/filter-config.interface';

@Injectable({
  providedIn: 'root'
})
export class QueryConfigService {

  constructor() { }

  getAvailableFilterConfigs(): Array<FilterConfig> {
    return [
      {label: 'Type', value: 't:', input_type: 'text', options: undefined},
      {label: 'Order By', value: 'released', input_type: 'select', 
        options: ['artist', 'cmc', 'power', 'toughness', 'set', 'name']},
      {label: 'Card Text', value: 'o:', input_type: 'text', options: undefined},
      {label: 'Keyword', value: 'kw:', input_type: 'text', options: undefined},
      {label: 'Rarity', value: 'r:', input_type: 'select', 
        options: ['common', 'uncommon', 'rare', 'special', 'mythic', 'bonus']},
      {label: 'Format', value: 'f:', input_type: 'select', 
        options: ['standard', 'future', 'historic', 'timeless', 'gladiator', 'pioneer', 'modern', 'legacy', 'pauper', 
          'vintage', 'penny', 'commander', 'oathbreaker', 'standardbrawl', 'brawl', 'alchemy', 'paupercommander', 
          'duel', 'oldschool', 'premodern', 'predh']},
      {label: 'Game', value: 'game:', input_type: 'select', options: ['paper', 'mtgo', 'arena']}
    ]
  }

  getBlankQuery(): QueryConfig {
    return {
      include_variations: false,
      unique: 'card',
      order: this.getAvailableFilterConfigs()[1].value,
      q: '',
      page: 1
    }
  }
}
