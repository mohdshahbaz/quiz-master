import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentGroupComponent } from './edit-student-group.component';

describe('EditStudentGroupComponent', () => {
  let component: EditStudentGroupComponent;
  let fixture: ComponentFixture<EditStudentGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStudentGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
