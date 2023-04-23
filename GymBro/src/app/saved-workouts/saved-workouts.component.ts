import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { WorkoutDetailsComponent } from '../workout-details/workout-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-saved-workouts',
  templateUrl: './saved-workouts.component.html',
  styleUrls: ['./saved-workouts.component.css']
})
export class SavedWorkoutsComponent implements OnInit {
  savedWorkouts: any[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.getSavedWorkouts();
  }

  deleteWorkout(workoutId: number): void {
    this.http.delete(`http://localhost:5000/api/complete-workouts/${workoutId}`).subscribe(
      (response: any) => {
        this.snackBar.open(response.message, 'Close', { duration: 3000 });
        this.getSavedWorkouts();
      },
      (error: any) => {
        this.snackBar.open(error.error.error, 'Close', { duration: 3000 });
      }
    );
  }

  getSavedWorkouts(): void {
    this.http.get('http://localhost:5000/api/complete-workouts').subscribe((data: Object) => {
      this.savedWorkouts = data as any[];
    });
  }
  openDialog(workout: any): void {
    const dialogRef = this.dialog.open(WorkoutDetailsComponent, {
      width: '500px',
      data: { workout: workout },
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }




}
