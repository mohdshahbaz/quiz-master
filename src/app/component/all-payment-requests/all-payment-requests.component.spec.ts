import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPaymentRequestsComponent } from './all-payment-requests.component';

describe('AllPaymentRequestsComponent', () => {
  let component: AllPaymentRequestsComponent;
  let fixture: ComponentFixture<AllPaymentRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPaymentRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPaymentRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
