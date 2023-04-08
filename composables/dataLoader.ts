const supabase = useSupabaseClient()

const daysOfWeekTable = 'days_of_week'
const workoutExercisesTable = 'workout_exercises'

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

export const loadWorkoutExercises = async (workoutId: number) => {
  const { data, error } = await supabase
    .from(workoutExercisesTable)
    .select(`id, workout_id, exercise_id, sets, reps, weight, resttime, rir, created_at, updated_at, valid`)
    .eq('workout_id', workoutId)
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
    .select(`id, name, description, created_at, updated_at`)
  if (error) {
  } else {
    return data
  }
}