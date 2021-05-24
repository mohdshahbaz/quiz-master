import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQuestionsListComponent } from './quiz-questions-list.component';

describe('QuizQuestionsListComponent', () => {
  let component: QuizQuestionsListComponent;
  let fixture: ComponentFixture<QuizQuestionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizQuestionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuestionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
