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
    switch (item) {
      case 'W':
        returnedString = returnedString + spanOpener +
          '<span class="mana-icon white"></span></span>';
        break;
      case 'U':
        returnedString = returnedString + spanOpener +
          '<span class="mana-icon blue"></span></span>';
        break;
      case 'R':
        returnedString = returnedString + spanOpener +
          '<span class="mana-icon red"></span></span>';
        break;
      case 'G':
        returnedString = returnedString + spanOpener +
          '<span class="mana-icon green"></span></span>';
        break;
      case 'B':
        returnedString = returnedString + spanOpener +
          '<span class="mana-icon black"></span></span>';
        break;
      default:
        returnedString = returnedString + spanOpener +
          '<span class="mana-icon icon-' + item + '"></span></span>';
        break;
    }
    return returnedString;
  }

}
