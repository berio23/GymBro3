// base-workout.ts
export abstract class BaseWorkout {
  constructor(public name: string, public exercises: any[]) {}

  abstract calculateDifficulty(): number;
}
