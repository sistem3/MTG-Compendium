import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CardFullDetailsComponent } from './card-full-details.component';

describe('CardFullDetailsComponent', () => {
  let component: CardFullDetailsComponent;
  let fixture: ComponentFixture<CardFullDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ CardFullDetailsComponent ]
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
