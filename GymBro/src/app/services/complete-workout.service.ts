import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompleteWorkout } from './icomplete-workout';

@Injectable({
  providedIn: 'root',
})
export class CompleteWorkoutService {
  private apiUrl = 'http://localhost:5000/api/complete-workouts';

  constructor(private http: HttpClient) {}

  getCompleteWorkouts(): Observable<ICompleteWorkout[]> {
    return this.http.get<ICompleteWorkout[]>(this.apiUrl);
  }

  saveCompleteWorkout(workoutData: ICompleteWorkout): Observable<ICompleteWorkout> {
    return this.http.post<ICompleteWorkout>(this.apiUrl, workoutData);
  }

  deleteCompleteWorkout(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
