import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css']
})
export class CreateWorkoutComponent {
  sets = 0;
  repetitions = 0;
  weight = 0;
  setType = 'warmup';
  private apiUrl = 'http://localhost:5000/api/workouts';

  workouts: any[] = [];

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
    const newWorkout = {
      sets: this.sets,
      repetitions: this.repetitions,
      weight: this.weight,
      setType: this.setType,
    };

    this.http.post(this.apiUrl, newWorkout).subscribe(
      (response: any) => {
        this.workouts.push(response);
        this.sets = 0;
        this.repetitions = 0;
        this.weight = 0;
        this.setType = 'warmup';
      },
      (error) => {
        console.error('Error creating workout:', error);
      }
    );
  }

}
