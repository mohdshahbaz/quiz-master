import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllQuizzesComponent } from './show-all-quizzes.component';

describe('ShowAllQuizzesComponent', () => {
  let component: ShowAllQuizzesComponent;
  let fixture: ComponentFixture<ShowAllQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllQuizzesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
