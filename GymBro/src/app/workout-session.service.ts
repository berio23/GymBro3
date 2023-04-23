import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutSessionService {
  private apiUrl = 'http://localhost:5000/api/workout-sessions';

  constructor(private http: HttpClient) { }

  getWorkoutSessions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  saveWorkoutSession(sessionData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, sessionData);
  }

  deleteWorkoutSession(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
