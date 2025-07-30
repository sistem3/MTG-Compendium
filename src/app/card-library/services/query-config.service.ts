import { Injectable } from '@angular/core';

import { QueryConfig } from '../interfaces/query-config.interface';

@Injectable({
  providedIn: 'root'
})
export class QueryConfigService {

  constructor() { }

  getFormatOptions(): Array<string> {
    return [
      'Commander',
      'Standard',
      'Legacy'
    ]
  }

  getBlankQuery(): QueryConfig {
    return {
      include_variations: false,
      unique: 'card',
      order: 'released',
      q: '',
      page: 1
    }
  }
}
