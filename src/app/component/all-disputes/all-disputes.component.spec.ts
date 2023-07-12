import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDisputesComponent } from './all-disputes.component';

describe('AllDisputesComponent', () => {
  let component: AllDisputesComponent;
  let fixture: ComponentFixture<AllDisputesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDisputesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDisputesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
