import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { WorkoutDetailsComponent } from '../workout-details/workout-details.component';


@Component({
  selector: 'app-saved-workouts',
  templateUrl: './saved-workouts.component.html',
  styleUrls: ['./saved-workouts.component.css']
})
export class SavedWorkoutsComponent implements OnInit {
  savedWorkouts: any[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.getSavedWorkouts();
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
