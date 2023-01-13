import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// Interfaces
import { Card } from '../../interfaces/card.interface';
// Services
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html'
})
export class CardPreviewComponent implements OnInit {

  @Input() cardDetails: Card = this.cardService.getBlankCard();
  @Output() displayFullDetails: EventEmitter<Card> = new EventEmitter<Card>();

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
  }

  emitFullDetails(card: Card) {
    this.displayFullDetails.emit(card);
  }

}
