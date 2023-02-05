import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'manaCost'
})
export class ManaCostPipe implements PipeTransform {

  transform(value: string, type: string): unknown {
    if (value && type) {
      let returnedString = '';
      if (type === 'cost') {
        const manaList = value.replace(/[{]/g, '')
          .replace(/[}]/g, ',').slice(0, -1).split(',');
        const spanOpener = '<span class="mana-icon-holder small is-active">';
        manaList.forEach(item => {
          returnedString = this.getManaTemplate(item, spanOpener, returnedString);
        });
      }
      if (type === 'inline') {
        const manaRegExp = /{(.*?)}/g;
        const spanOpener = '<span class="mana-icon-holder extra-small is-active">';
        returnedString = value.replace(manaRegExp, (match, key) => {
          return this.getManaTemplate(key, spanOpener, returnedString);
        });
      }
      return returnedString;
    } else {
      return value;
    }
  }

  getManaTemplate(item: string, spanOpener: string, returnedString: string) {
    let iconTemplate;
    switch (item) {
      case 'W':
        iconTemplate = '<span class="mana-icon white"></span></span>';
        break;
      case 'U':
        iconTemplate = '<span class="mana-icon blue"></span></span>';
        break;
      case 'R':
        iconTemplate = '<span class="mana-icon red"></span></span>';
        break;
      case 'G':
        iconTemplate = '<span class="mana-icon green"></span></span>';
        break;
      case 'B':
        iconTemplate = '<span class="mana-icon black"></span></span>';
        break;
      case 'W/U':
        iconTemplate = '<span class="mana-icon white-blue"></span></span>';
        break;
      case 'W/B':
        iconTemplate = '<span class="mana-icon white-black"></span></span>';
        break;
      case 'U/B':
        iconTemplate = '<span class="mana-icon blue-black"></span></span>';
        break;
      case 'U/R':
        iconTemplate = '<span class="mana-icon blue-red"></span></span>';
        break;
      case 'B/R':
        iconTemplate = '<span class="mana-icon black-red"></span></span>';
        break;
      case 'B/G':
        iconTemplate = '<span class="mana-icon black-green"></span></span>';
        break;
      case 'R/W':
        iconTemplate = '<span class="mana-icon red-white"></span></span>';
        break;
      case 'R/G':
        iconTemplate = '<span class="mana-icon red-green"></span></span>';
        break;
      case 'G/W':
        iconTemplate = '<span class="mana-icon green-white"></span></span>';
        break;
      case 'G/B':
        iconTemplate = '<span class="mana-icon green-blue"></span></span>';
        break;
      default:
        iconTemplate = '<span class="mana-icon icon-' + item + '"></span></span>';
        break;
    }
    returnedString = returnedString + spanOpener + iconTemplate;
    return returnedString;
  }

}
