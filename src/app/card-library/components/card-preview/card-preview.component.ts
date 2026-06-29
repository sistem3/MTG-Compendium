import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
// Interfaces
import { Card } from '../../interfaces/card.interface';
// Services
import { CardService } from '../../services/card.service';
import { ManaCostPipe } from '../../pipes/mana-cost.pipe';

@Component({
  selector: 'app-card-preview',
  imports: [ManaCostPipe],
  templateUrl: './card-preview.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './card-preview.component.css'
})
export class CardPreviewComponent {

  cardDetails = input.required<Card>();
  displayFullDetails = output<Card>();

  constructor(private cardService: CardService) { }

  emitFullDetails(card: Card) {
    this.displayFullDetails.emit(card);
  }

}
