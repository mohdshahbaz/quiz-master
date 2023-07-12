import { TestBed } from '@angular/core/testing';

import { AdminRouteProtectGuard } from './admin-route-protect.guard';

describe('AdminRouteProtectGuard', () => {
  let guard: AdminRouteProtectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminRouteProtectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
