import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizUsersPerformanceComponent } from './quiz-users-performance.component';

describe('QuizUsersPerformanceComponent', () => {
  let component: QuizUsersPerformanceComponent;
  let fixture: ComponentFixture<QuizUsersPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizUsersPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizUsersPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
