import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizMasterComponent } from './add-quiz-master.component';

describe('AddQuizComponent', () => {
  let component: AddQuizMasterComponent;
  let fixture: ComponentFixture<AddQuizMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuizMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuizMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
