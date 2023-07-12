import { TestBed } from '@angular/core/testing';

import { PublicQuestionsService } from './public-questions.service';

describe('PublicQuestionsService', () => {
  let service: PublicQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
