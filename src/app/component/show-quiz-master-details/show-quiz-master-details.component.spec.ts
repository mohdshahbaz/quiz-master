import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuizMasterDetailsComponent } from './show-quiz-master-details.component';

describe('ShowQuizMasterDetailsComponent', () => {
  let component: ShowQuizMasterDetailsComponent;
  let fixture: ComponentFixture<ShowQuizMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowQuizMasterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQuizMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
