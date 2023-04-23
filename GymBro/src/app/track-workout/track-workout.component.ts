import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-track-workout',
  templateUrl: './track-workout.component.html',
  styleUrls: ['./track-workout.component.css']
})
export class TrackWorkoutComponent {
  workouts: any[] = [];
  selectedWorkout: any = null;
  completedSets = 0;
  private apiUrl = 'http://localhost:5000/api/workouts';

  constructor(private http: HttpClient) {
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (workouts) => {
        this.workouts = workouts;
      },
      (error) => {
        console.error('Error loading workouts:', error);
      }
    );
  }


  onSubmit() {
    // Update the workout progress by calling the backend API
    // This part is not implemented in the backend yet, you need to create an API endpoint to handle progress updates
  }
}
