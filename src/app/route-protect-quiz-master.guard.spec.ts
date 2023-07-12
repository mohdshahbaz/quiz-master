import { TestBed } from '@angular/core/testing';

import { RouteProtectQuizMasterGuard } from './route-protect-quiz-master.guard';

describe('RouteProtectQuizMasterGuard', () => {
  let guard: RouteProtectQuizMasterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RouteProtectQuizMasterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
