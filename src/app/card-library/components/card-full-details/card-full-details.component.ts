import { Component, Input } from '@angular/core';
// Interfaces
import { Card } from '../../interfaces/card.interface';
// Services
import { CardService } from '../../services/card.service';
// Pipes
import { ColorIdentityPipe } from '../../pipes/color-identity.pipe';
import { ManaCostPipe } from '../../pipes/mana-cost.pipe';

@Component({
  selector: 'app-card-full-details',
  imports: [ColorIdentityPipe, ManaCostPipe],
  templateUrl: './card-full-details.component.html'
})
export class CardFullDetailsComponent {

  @Input() cardDetails: Card = this.cardService.getBlankCard();

  constructor(private cardService: CardService) { }

}
