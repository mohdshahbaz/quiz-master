import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsSuperAdminComponent } from './notifications-super-admin.component';

describe('NotificationsSuperAdminComponent', () => {
  let component: NotificationsSuperAdminComponent;
  let fixture: ComponentFixture<NotificationsSuperAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsSuperAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
