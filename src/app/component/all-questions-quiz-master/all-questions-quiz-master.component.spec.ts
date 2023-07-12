import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuestionsQuizMasterComponent } from './all-questions-quiz-master.component';

describe('AllQuestionsQuizMasterComponent', () => {
  let component: AllQuestionsQuizMasterComponent;
  let fixture: ComponentFixture<AllQuestionsQuizMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllQuestionsQuizMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllQuestionsQuizMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
