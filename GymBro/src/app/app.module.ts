import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { TrackWorkoutComponent } from './track-workout/track-workout.component';
import { RemindersComponent } from './reminders/reminders.component';
import { TipsComponent } from './tips/tips.component';
import { HttpClientModule } from '@angular/common/http';
import { ExerciseDetailsComponent } from './exercise-details/exercise-details.component';
import { WorkoutOverviewComponent } from './workout-overview/workout-overview.component';
import { SavedWorkoutsComponent } from './saved-workouts/saved-workouts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkoutDetailsComponent } from './workout-details/workout-details.component';
import { MatDialogModule } from '@angular/material/dialog';


const routes: Routes = [
  { path: '', redirectTo: '/workouts', pathMatch: 'full' },
  { path: 'workouts', component: AppComponent },
  { path: 'saved-workouts', component: SavedWorkoutsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateWorkoutComponent,
    TrackWorkoutComponent,
    RemindersComponent,
    TipsComponent,
    ExerciseDetailsComponent,
    WorkoutOverviewComponent,
    SavedWorkoutsComponent,
    WorkoutDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
