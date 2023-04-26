import { Component, OnInit } from '@angular/core';
import { WorkoutLogicService } from '../services/workout-logic.service';
import { WorkoutSessionService } from '../services/workout-session.service';

@Component({
  selector: 'app-workout-statistics',
  templateUrl: './workout-statistics.component.html',
  styleUrls: ['./workout-statistics.component.css']
})
export class WorkoutStatisticsComponent implements OnInit {
  workoutSessions: any[] = [];
  statistics: any;
  totalTimeFormatted: string;

  constructor(
    private workoutLogicService: WorkoutLogicService,
    private workoutSessionService: WorkoutSessionService
  ) {
    this.totalTimeFormatted = "";
   }

  ngOnInit(): void {
      this.workoutSessionService.getWorkoutSessions().subscribe((sessions: any[]) => {
      console.log('Workout Sessions:', sessions); // Add this line
      this.workoutSessions = sessions;
      this.statistics = this.workoutLogicService.calculateWorkoutStatistics(sessions);
      this.totalTimeFormatted = this.workoutLogicService.formatTime(this.statistics.totalTime);
    });
  }

}
