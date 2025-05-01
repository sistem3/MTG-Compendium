import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorIdentity',
  standalone: true,
})
export class ColorIdentityPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let returnedString = '';
    const spanOpener = '<span class="mana-icon-holder small is-active">';
    switch (value) {
      case 'W':
        returnedString = spanOpener +
          '<span class="mana-icon white"></span></span>';
        break;
      case 'U':
        returnedString = spanOpener +
          '<span class="mana-icon blue"></span></span>';
        break;
      case 'R':
        returnedString = spanOpener +
          '<span class="mana-icon red"></span></span>';
        break;
      case 'G':
        returnedString = spanOpener +
          '<span class="mana-icon green"></span></span>';
        break;
      case 'B':
        returnedString = spanOpener +
          '<span class="mana-icon black"></span></span>';
        break;
    }
    return returnedString;
  }

}
