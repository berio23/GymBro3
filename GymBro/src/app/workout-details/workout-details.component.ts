import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailsComponent {
  workout: any; // Add this line to declare the workout property

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.workout = data.workout;
  }
}
