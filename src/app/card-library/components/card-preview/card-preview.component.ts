import { Component, Input, Output, EventEmitter } from '@angular/core';
// Interfaces
import { Card } from '../../interfaces/card.interface';
// Services
import { CardService } from '../../services/card.service';
import { ManaCostPipe } from '../../pipes/mana-cost.pipe';

@Component({
  selector: 'app-card-preview',
  imports: [ManaCostPipe],
  templateUrl: './card-preview.component.html',
  styleUrl: './card-preview.component.css'
})
export class CardPreviewComponent {

  @Input() cardDetails: Card = this.cardService.getBlankCard();
  @Output() displayFullDetails: EventEmitter<Card> = new EventEmitter<Card>();

  constructor(private cardService: CardService) { }

  emitFullDetails(card: Card) {
    this.displayFullDetails.emit(card);
  }

}
