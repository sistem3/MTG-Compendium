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
      name: '',
      pageSize: 20,
      page: 1,
      colorIdentity: '',
      first: 0,
      gameFormat: 'Commander',
    }
  }
}
