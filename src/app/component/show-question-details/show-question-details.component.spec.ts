import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuestionDetailsComponent } from './show-question-details.component';

describe('ShowQuestionDetailsComponent', () => {
  let component: ShowQuestionDetailsComponent;
  let fixture: ComponentFixture<ShowQuestionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowQuestionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQuestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
