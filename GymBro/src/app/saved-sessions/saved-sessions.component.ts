import { Component, OnInit } from '@angular/core';
import { WorkoutSessionService } from '../workout-session.service';

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
    this.workoutSessionService.getWorkoutSessions().subscribe((data) => {
      this.sessions = data;
    });
  }

  deleteSession(id: number): void {
    this.workoutSessionService.deleteWorkoutSession(id).subscribe(() => {
      this.sessions = this.sessions.filter(session => session.id !== id);
    });
  }

}
