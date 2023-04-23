import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutStatisticsComponent } from './workout-statistics.component';

describe('WorkoutStatisticsComponent', () => {
  let component: WorkoutStatisticsComponent;
  let fixture: ComponentFixture<WorkoutStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
