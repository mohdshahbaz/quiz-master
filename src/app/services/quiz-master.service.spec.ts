import { TestBed } from '@angular/core/testing';

import { QuizMasterService } from './quiz-master.service';

describe('QuizMasterService', () => {
  let service: QuizMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
