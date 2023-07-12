import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleAssignedQuizComponent } from './reschedule-assigned-quiz.component';

describe('RescheduleAssignedQuizComponent', () => {
  let component: RescheduleAssignedQuizComponent;
  let fixture: ComponentFixture<RescheduleAssignedQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RescheduleAssignedQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RescheduleAssignedQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
