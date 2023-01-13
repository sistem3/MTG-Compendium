import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
// Interfaces
import { Card } from '../interfaces/card.interface';
import { ColourConfig } from '../interfaces/colour-config.interface';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  getCards(queryConfig: any): Observable<any> {
    const queryParams = new HttpParams({fromObject: queryConfig}).toString();
    return this.http.get(environment.mtgAPIBaseURL + 'cards?' + queryParams, {observe: 'response'});
  }

  getManaColourFilterConfig(): Array<ColourConfig> {
    return [
      {
        isActive: true,
        colour: 'white',
        colourIdentity: 'W'
      },
      {
        isActive: true,
        colour: 'blue',
        colourIdentity: 'U'
      },
      {
        isActive: true,
        colour: 'red',
        colourIdentity: 'R'
      },
      {
        isActive: true,
        colour: 'green',
        colourIdentity: 'G'
      },
      {
        isActive: true,
        colour: 'black',
        colourIdentity: 'B'
      }
    ]
  }

  getBlankCard(): Card {
    return {
      id: '',
      name: '',
      manaCost: '',
      cmc: 0,
      colors: [],
      colorIdentity: [],
      type: '',
      types: [],
      subtypes: [],
      flavor: '',
      rarity: '',
      set: '',
      setName: '',
      text: '',
      artist: '',
      number: '',
      power: '',
      toughness: '',
      layout: '',
      multiverseid: '',
      imageUrl: '',
      variations: [],
      foreignNames: [],
      printings: [],
      originalText: '',
      originalType: '',
      legalities: []
    };
  }
}
