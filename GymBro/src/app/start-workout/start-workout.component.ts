import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StartWorkoutService } from '../start-workout.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-start-workout',
  templateUrl: './start-workout.component.html',
  styleUrls: ['./start-workout.component.css']
})
export class StartWorkoutComponent implements OnInit {
  completeWorkouts: any[] = [];
  selectedWorkout: any;
  savedWorkouts: any[] = [];
  startTime: number;
  workoutTime: number;
  workoutTimeDisplay: string;
  timerSubscription: any;

  constructor(private http: HttpClient, private startWorkoutService: StartWorkoutService) {
    this.startTime = 0;
    this.workoutTime = 0;
    this.workoutTimeDisplay = "";
  }

  ngOnInit(): void {
    this.startWorkoutService.getCompleteWorkouts().subscribe((data: any) => {
      this.savedWorkouts = data;
    });
  }

  startWorkout(): void {
    this.startTime = Date.now();
    this.timerSubscription = interval(1000).subscribe(() => {
      this.workoutTime = Date.now() - this.startTime;
      this.workoutTimeDisplay = this.formatTime(this.workoutTime);
    });
  }

  formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  saveWorkoutSession(): void {
    const sessionData = {
      workout_id: this.selectedWorkout.id,
      date: new Date().toISOString().slice(0, 10), // Get the current date in YYYY-MM-DD format
      duration: this.workoutTime, // Add the duration property
      exercises: this.selectedWorkout.exercises.map((exercise: any) => {
        return {
          name: exercise.name,
          sets: exercise.sets.map((set: any) => {
            return {
              weight: set.weight,
              reps: set.reps
            };
          })
        };
      })
    };

    this.startWorkoutService.saveWorkoutSession(sessionData).subscribe(() => {
      // Handle successful submission here, e.g., show a success message or navigate to another page
    }, (error) => {
      // Handle error here, e.g., show an error message
    });
  }

  onSelect(workout: any): void {
    this.selectedWorkout = JSON.parse(JSON.stringify(workout)); // Deep copy to avoid modifying the original object
    this.selectedWorkout.exercises.forEach((exercise: any) => {
      exercise.sets = [];
    });
  }

  endWorkout(): void {
    this.timerSubscription.unsubscribe();
    this.saveWorkoutSession();
  }

  addSet(exercise: any): void {
    exercise.sets.push({
      weight: '',
      reps: ''
    });
  }
}
