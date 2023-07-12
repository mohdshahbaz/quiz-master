import { TestBed } from '@angular/core/testing';

import { RouteProtectOrganizationGuard } from './route-protect-organization.guard';

describe('RouteProtectOrganizationGuard', () => {
  let guard: RouteProtectOrganizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RouteProtectOrganizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
