import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
// Interfaces
import { Card } from '../../interfaces/card.interface';
// Services
import { CardService } from '../../services/card.service';
import { ManaCostPipe } from '../../pipes/mana-cost.pipe';

@Component({
  selector: 'app-card-preview',
  standalone: true,
  imports: [NgFor, NgIf, ManaCostPipe],
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
