import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsAssignedQuizMasterComponent } from './notifications-assigned-quiz-master.component';

describe('NotificationsAssignedQuizMasterComponent', () => {
  let component: NotificationsAssignedQuizMasterComponent;
  let fixture: ComponentFixture<NotificationsAssignedQuizMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsAssignedQuizMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsAssignedQuizMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
