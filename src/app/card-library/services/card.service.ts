import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// Interfaces
import { Card } from '../interfaces/card.interface';
import { ColourConfig } from '../interfaces/colour-config.interface';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseUrl: string = 'https://api.scryfall.com/';

  constructor(private http: HttpClient) { }

  getCards(queryConfig: any): Observable<any> {
    const queryParams = new HttpParams({fromObject: queryConfig}).toString();
    return this.http.get(this.baseUrl + 'cards/search?' + queryParams);
  }

  getManaColourFilterConfig(): Array<ColourConfig> {
    return [
      {
        isActive: true,
        colour: 'white',
        colourIdentity: 'W'
      },
      {
        isActive: false,
        colour: 'blue',
        colourIdentity: 'U'
      },
      {
        isActive: false,
        colour: 'red',
        colourIdentity: 'R'
      },
      {
        isActive: false,
        colour: 'green',
        colourIdentity: 'G'
      },
      {
        isActive: false,
        colour: 'black',
        colourIdentity: 'B'
      }
    ]
  }

  getBlankCard(): Card {
    return {
      id: '',
      name: '',
      artist: '',
      legalities: {},
      power: '',
      toughness: '',
      layout: '',
      cmc: 0,
      rarity: '',
      colors: [],
      color_identity: [],
      image_uris: {},
      mana_cost: '',
      oracle_text: '',
      type_line: '',
      flavor_text: '',
      set_name: '',
    };
  }
}
