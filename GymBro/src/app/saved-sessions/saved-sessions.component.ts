import { Component, OnInit } from '@angular/core';
import { WorkoutSessionService } from '../services/workout-session.service';
import { IWorkoutSession } from '../services/iworkout-session';

@Component({
  selector: 'app-saved-sessions',
  templateUrl: './saved-sessions.component.html',
  styleUrls: ['./saved-sessions.component.css']
})
export class SavedSessionsComponent implements OnInit {
  sessions: any[] = [];

  constructor(private workoutSessionService: WorkoutSessionService) { }

  ngOnInit(): void {
    this.fetchSessions();
  }

  fetchSessions(): void {
    this.workoutSessionService.getWorkoutSessions().subscribe((data: IWorkoutSession[]) => {
      this.sessions = data;
    });
  }

  deleteSession(id: number): void {
    this.workoutSessionService.deleteWorkoutSession(id).subscribe(() => {
      this.sessions = this.sessions.filter(session => session.id !== id);
    });
  }

}
