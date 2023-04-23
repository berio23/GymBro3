import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout-overview',
  templateUrl: './workout-overview.component.html',
  styleUrls: ['./workout-overview.component.css']
})
export class WorkoutOverviewComponent implements OnInit {
  @Input() workoutExercises: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
