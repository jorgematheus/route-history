import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentEvolutionComponent } from './payment-evolution.component';

describe('PaymentEvolutionComponent', () => {
  let component: PaymentEvolutionComponent;
  let fixture: ComponentFixture<PaymentEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentEvolutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
