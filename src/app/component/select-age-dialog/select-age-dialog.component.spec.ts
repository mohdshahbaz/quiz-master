import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAgeDialogComponent } from './select-age-dialog.component';

describe('SelectAgeDialogComponent', () => {
  let component: SelectAgeDialogComponent;
  let fixture: ComponentFixture<SelectAgeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAgeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAgeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
