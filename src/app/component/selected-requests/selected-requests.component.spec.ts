import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedRequestsComponent } from './selected-requests.component';

describe('SelectedRequestsComponent', () => {
  let component: SelectedRequestsComponent;
  let fixture: ComponentFixture<SelectedRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
