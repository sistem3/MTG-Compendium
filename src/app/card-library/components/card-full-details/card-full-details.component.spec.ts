import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { CardService } from '../../services/card.service';

import { CardFullDetailsComponent } from './card-full-details.component';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';

describe('CardFullDetailsComponent', () => {
  let component: CardFullDetailsComponent;
  let fixture: ComponentFixture<CardFullDetailsComponent>;
  let cardService: CardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CardFullDetailsComponent],
    providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();

    fixture = TestBed.createComponent(CardFullDetailsComponent);
    component = fixture.componentInstance;
    cardService = TestBed.inject(CardService);
    const testCard = cardService.getBlankCard();
    fixture.componentRef.setInput('cardDetails', testCard);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
