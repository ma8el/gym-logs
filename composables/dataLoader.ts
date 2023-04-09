const supabase = useSupabaseClient()

const daysOfWeekTable = 'days_of_week'
const workoutExercisesTable = 'workout_exercises'
const plannedWorkoutsTable = 'planned_workouts'
const exercisesTable = 'exercises'

export const loadDaysOfWeek = async () => {
  const { data, error } = await supabase
    .from(daysOfWeekTable)
    .select(`id, name`)
  if (error) {
    console.log('error', error)
  } else {
    return data
  }
}

export const loadWorkoutExercises = async () => {
  const { data, error } = await supabase
    .from(workoutExercisesTable)
    .select(`id, workout_id, exercise_id, sets, reps, weight, resttime, rir, created_at, updated_at, valid`)
  if (error) {
    console.log(error)
  } else {
    return data
  }
}

// Note: Used for workouts and workout_plans
export const loadItems = async (sourceTable: string) => {
  const { data, error } = await supabase
    .from(sourceTable)
    .select(`id, name, description, created_at, updated_at, user_id`)
  if (error) {
  } else {
    return data
  }
}

export const loadPlannedWorkouts = async (workoutPlanId: number) => {
  const { data, error } = await supabase
    .from(plannedWorkoutsTable)
    .select(`id, workout_plan_id, workout_id, day_of_week_id, time_of_day`)
    .eq('workout_plan_id', workoutPlanId)
  if (error) {
    console.log(error)
  } else {
    return data
  }
}

export const loadExercises = async () => {
  const { data, error } = await supabase
    .from(exercisesTable)
    .select(`id, name, description, muscles`)
  if (error) {
    console.log(error)
  } else {
    return data
  }
}