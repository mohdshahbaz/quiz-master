import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPublicQuesDetailsComponent } from './add-public-ques-details.component';

describe('AddPublicQuesDetailsComponent', () => {
  let component: AddPublicQuesDetailsComponent;
  let fixture: ComponentFixture<AddPublicQuesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPublicQuesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPublicQuesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
