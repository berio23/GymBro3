import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompleteWorkoutService {
  private apiUrl = 'http://localhost:5000/api/complete-workouts';

  constructor(private http: HttpClient) { }

  getCompleteWorkouts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  saveCompleteWorkout(workoutData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, workoutData);
  }

  deleteCompleteWorkout(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
