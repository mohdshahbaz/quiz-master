import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPublicQuizComponent } from './edit-public-quiz.component';

describe('EditPublicQuizComponent', () => {
  let component: EditPublicQuizComponent;
  let fixture: ComponentFixture<EditPublicQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPublicQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPublicQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
