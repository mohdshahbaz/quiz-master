import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuizMasterComponent } from './edit-quiz-master.component';

describe('EditQuizMasterComponent', () => {
  let component: EditQuizMasterComponent;
  let fixture: ComponentFixture<EditQuizMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuizMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuizMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
