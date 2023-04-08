import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GymBro';
  exercises: any[] = [];
  selectedExercise: any;
  workoutExercises: any[] = [];
  workoutName: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/assets/json/exercises.json').subscribe((data: any) => {
      this.exercises = data.exercises;
      this.selectedExercise = this.exercises[0];
    });
  }

  onSelect(exercise: any): void {
    this.selectedExercise = exercise;
  }

  addToWorkout(): void {
    if (!this.workoutExercises.some(exercise => exercise.name === this.selectedExercise.name)) {
      this.workoutExercises.push(this.selectedExercise);
    } else {
      alert('This exercise is already in the workout.');
    }
  }

  finishWorkout(): void {
    if (!this.workoutName) {
      alert('Please enter a workout name.');
      return;
    }

    const workout = {
      name: this.workoutName,
      exercises: JSON.stringify(this.workoutExercises)
    };

    this.http.post('http://localhost:5000/api/complete-workouts', workout).subscribe(() => {
      console.log('Workout saved:', workout);
      this.workoutName = '';
      this.workoutExercises = [];
    }, (error) => {
      console.error('Error saving workout:', error);
    });
  }
}
