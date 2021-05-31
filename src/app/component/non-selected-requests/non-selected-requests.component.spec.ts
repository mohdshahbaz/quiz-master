import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonSelectedRequestsComponent } from './non-selected-requests.component';

describe('NonSelectedRequestsComponent', () => {
  let component: NonSelectedRequestsComponent;
  let fixture: ComponentFixture<NonSelectedRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonSelectedRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonSelectedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
