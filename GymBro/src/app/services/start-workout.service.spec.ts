import { TestBed } from '@angular/core/testing';

import { StartWorkoutService } from './start-workout.service';

describe('StartWorkoutService', () => {
  let service: StartWorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartWorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
