import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'manaCost'
})
export class ManaCostPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const manaList = value.replace(/[{]/g, '')
      .replace(/[}]/g, ',').slice(0, -1).split(',');
    let returnedString = '';
    const spanOpener = '<span class="mana-icon-holder small is-active">';
    manaList.forEach(item => {
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
    });
    return returnedString;
  }

}
