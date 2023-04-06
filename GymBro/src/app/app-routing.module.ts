import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// ... other imports
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { TrackWorkoutComponent } from './track-workout/track-workout.component';
import { RemindersComponent } from './reminders/reminders.component';
import { TipsComponent } from './tips/tips.component';

const routes: Routes = [
  // ... other routes
  { path: 'create-workout', component: CreateWorkoutComponent },
  { path: 'track-workout', component: TrackWorkoutComponent },
  { path: 'reminders', component: RemindersComponent },
  { path: 'tips', component: TipsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
