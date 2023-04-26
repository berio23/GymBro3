import { BaseWorkout } from './base-workout';

export class StrengthWorkout extends BaseWorkout {
  constructor(name: string, exercises: any[]) {
    super(name, exercises);
  }

  calculateDifficulty(): number {
    return 0
  }
}
