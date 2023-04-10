interface Muscle {
  id: number,
  name: string,
  description: string,
  bodyPart: string,
}

interface Exercise {
  id: number,
  name: string,
  description: string,
  usedMuscles: Muscle[],
  neuronalFatigueFactor: number,
  muscleFatigueFactor: number,
}

interface WorkoutExercise {
  id: number,
  exerciseID?: number,
  sets?: number,
  reps?: number,
  weight?: number,
  rir?: number,
  restTime?: number,
  estimatedFatigue?: number,
}

interface Workout {
  id: number,
  name: string,
  description: string,
  exercises: WorkoutExercise[]
  estimatedTime: number,
}

interface WorkoutSession {
  id: number,
  at: Date,
  workout: Workout
  notes: string,
}

interface WorkoutRoutine {
  id: number,
  name: string,
  description: string,
  sessions: WorkoutSession[]
}

interface Performance {
  id: number,
  at: Date,
  squat: number,
  bench: number,
  deadlift: number,
  overhead: number,
}
interface UserStatistics {
  id: number
  at: Date,
  weight: number,
  height: number,
  age: number,
  gender: string,
  performance: Performance
}

interface CalendarEvent {
  title: string
  start: string
  end: string
  color: string
}