import { Component, OnInit, Input } from '@angular/core';
// Interfaces
import { Card } from '../../interfaces/card.interface';
// Services
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-full-details',
  templateUrl: './card-full-details.component.html'
})
export class CardFullDetailsComponent implements OnInit {

  @Input() cardDetails: Card = this.cardService.getBlankCard();

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
  }

}
