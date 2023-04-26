import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { IWorkoutSession } from '../services/iworkout-session';

@Injectable({
  providedIn: 'root',
})
export class WorkoutSessionService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:5000/api/workout-sessions');
  }

  getWorkoutSessions(): Observable<IWorkoutSession[]> {
    return super.getAll();
  }

  override save(data: IWorkoutSession): Observable<IWorkoutSession> {
    return super.save(data);
  }

  deleteWorkoutSession(id: number): Observable<any> {
    return super.delete(id);
  }
}
