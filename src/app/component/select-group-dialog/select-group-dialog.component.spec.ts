import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGroupDialogComponent } from './select-group-dialog.component';

describe('SelectGroupDialogComponent', () => {
  let component: SelectGroupDialogComponent;
  let fixture: ComponentFixture<SelectGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectGroupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
