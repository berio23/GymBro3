import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackWorkoutComponent } from './track-workout.component';

describe('TrackWorkoutComponent', () => {
  let component: TrackWorkoutComponent;
  let fixture: ComponentFixture<TrackWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackWorkoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
