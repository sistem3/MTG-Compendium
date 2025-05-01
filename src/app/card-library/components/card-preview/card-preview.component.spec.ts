import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { CardService } from '../../services/card.service';

import { CardPreviewComponent } from './card-preview.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CardPreviewComponent', () => {
  let component: CardPreviewComponent;
  let fixture: ComponentFixture<CardPreviewComponent>;
  let cardService: CardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CardPreviewComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();

    fixture = TestBed.createComponent(CardPreviewComponent);
    component = fixture.componentInstance;
    cardService = TestBed.inject(CardService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call displayFullDetails.emit (with card param details) ' +
    'when caliing emitFullDetails function', () => {
    const testCard = {...cardService.getBlankCard()};
    spyOn(component.displayFullDetails, 'emit');
    component.emitFullDetails(testCard);
    expect(component.displayFullDetails.emit).toHaveBeenCalled();
    expect(component.displayFullDetails.emit).toHaveBeenCalledWith(testCard);
  });
});
