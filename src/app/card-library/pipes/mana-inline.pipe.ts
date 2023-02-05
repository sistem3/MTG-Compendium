import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'manaInline'
})
export class ManaInlinePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const manaRegExp = /{(.*?)}/g;
    const spanOpener = '<span class="mana-icon-holder extra-small is-active">';
    if (value) {
      return value.replace(manaRegExp, (match, key) => {
        let returnedString = '';
        switch (key) {
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
              '<span class="mana-icon icon-' + key + '"></span></span>';
            break;
        }
        return returnedString;
      });
    }
    return value;
  }

}
