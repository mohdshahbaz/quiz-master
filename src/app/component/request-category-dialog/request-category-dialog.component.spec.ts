import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCategoryDialogComponent } from './request-category-dialog.component';

describe('RequestCategoryDialogComponent', () => {
  let component: RequestCategoryDialogComponent;
  let fixture: ComponentFixture<RequestCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCategoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
