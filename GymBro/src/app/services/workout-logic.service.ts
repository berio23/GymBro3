import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutLogicService {

  constructor() { }

  validateExercise(exercise: any): boolean {
    return true;
  }

  calculateWorkoutStatistics(workoutSessions: any[]): any {
    // Implementieren Sie Ihre Statistikberechnungslogik hier
    // Beispiel:
    const totalWorkouts = workoutSessions.length;
    const totalTime = workoutSessions.reduce((acc, session) => {
      // Berechnen Sie die Zeit für diese Session basierend auf Ihren Daten
      // Replace the following line with your own logic
      const sessionTime = this.calculateSessionTime(session);
      return acc + sessionTime;
    }, 0);

    return {
      totalWorkouts,
      totalTime,
    };
  }

  // Add this method and implement your logic for calculating session time
  calculateSessionTime(session: any): string {
    console.log('Session Duration:', session.duration); // Add this line
    const totalSeconds = Math.floor(session / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Weitere Methoden für die Geschäftslogik
}
