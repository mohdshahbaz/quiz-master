import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGroupStudentsComponent } from './view-group-students.component';

describe('ViewGroupStudentsComponent', () => {
  let component: ViewGroupStudentsComponent;
  let fixture: ComponentFixture<ViewGroupStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGroupStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGroupStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
