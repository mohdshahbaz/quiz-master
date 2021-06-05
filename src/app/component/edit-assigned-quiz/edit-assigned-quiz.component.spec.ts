import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssignedQuizComponent } from './edit-assigned-quiz.component';

describe('EditAssignedQuizComponent', () => {
  let component: EditAssignedQuizComponent;
  let fixture: ComponentFixture<EditAssignedQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAssignedQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssignedQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
