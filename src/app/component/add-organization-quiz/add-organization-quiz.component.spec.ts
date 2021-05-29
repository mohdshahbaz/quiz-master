import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrganizationQuizComponent } from './add-organization-quiz.component';

describe('AddOrganizationQuizComponent', () => {
  let component: AddOrganizationQuizComponent;
  let fixture: ComponentFixture<AddOrganizationQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrganizationQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrganizationQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
