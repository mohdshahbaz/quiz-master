import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleStudentPerformanceComponent } from './single-student-performance.component';

describe('SingleStudentPerformanceComponent', () => {
  let component: SingleStudentPerformanceComponent;
  let fixture: ComponentFixture<SingleStudentPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleStudentPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleStudentPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
