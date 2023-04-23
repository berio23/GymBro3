import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartWorkoutService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getCompleteWorkouts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/complete-workouts`);
  }

  saveWorkoutSession(sessionData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/workout-sessions`, sessionData);
  }

  // Add this method to get workout sessions
  getWorkoutSessions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/workout-sessions`);
  }

  // Add this method to delete a workout session
  deleteWorkoutSession(sessionId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/workout-sessions/${sessionId}`);
  }
}
