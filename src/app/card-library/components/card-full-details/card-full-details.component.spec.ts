import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { CardFullDetailsComponent } from './card-full-details.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CardFullDetailsComponent', () => {
  let component: CardFullDetailsComponent;
  let fixture: ComponentFixture<CardFullDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CardFullDetailsComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();

    fixture = TestBed.createComponent(CardFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
