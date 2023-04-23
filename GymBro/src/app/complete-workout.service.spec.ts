import { TestBed } from '@angular/core/testing';

import { CompleteWorkoutService } from './complete-workout.service';

describe('CompleteWorkoutService', () => {
  let service: CompleteWorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompleteWorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
