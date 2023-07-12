import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSinglePublicQuesComponent } from './add-single-public-ques.component';

describe('AddSinglePublicQuesComponent', () => {
  let component: AddSinglePublicQuesComponent;
  let fixture: ComponentFixture<AddSinglePublicQuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSinglePublicQuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSinglePublicQuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
