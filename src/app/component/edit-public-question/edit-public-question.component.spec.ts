import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPublicQuestionComponent } from './edit-public-question.component';

describe('EditPublicQuestionComponent', () => {
  let component: EditPublicQuestionComponent;
  let fixture: ComponentFixture<EditPublicQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPublicQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPublicQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
