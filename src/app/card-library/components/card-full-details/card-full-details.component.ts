import { Component, OnInit, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
// Interfaces
import { Card } from '../../interfaces/card.interface';
// Services
import { CardService } from '../../services/card.service';
// Pipes
import { ColorIdentityPipe } from '../../pipes/color-identity.pipe';
import { ManaCostPipe } from '../../pipes/mana-cost.pipe';

@Component({
  selector: 'app-card-full-details',
  standalone: true,
  imports: [NgFor, NgIf, ColorIdentityPipe, ManaCostPipe],
  templateUrl: './card-full-details.component.html'
})
export class CardFullDetailsComponent implements OnInit {

  @Input() cardDetails: Card = this.cardService.getBlankCard();

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
  }

}
