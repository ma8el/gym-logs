<script setup lang="ts">
  const props = defineProps<{
    workoutId: number
  }>()
  const supabase = useSupabaseClient()
  const workoutExercisesTable = 'workout_exercises'

  const workoutExercises = ref()

  const loadWorkoutExercises = () => {
    supabase
      .from(workoutExercisesTable)
      .select(`id, workout_id, exercise_id, sets, reps, weight, resttime, rir, created_at, updated_at, valid`)
      .eq('workout_id', props.workoutId)
      .then(({ data, error }) => {
        if (error) {
          console.log(error)
        } else {
          workoutExercises.value = data
        }
      })
  }

  const deleteWorkoutExercise = async (id: number) => {
    await supabase
      .from(workoutExercisesTable)
      .delete()
      .eq('id', id)
    loadWorkoutExercises()
  }
 
  const addExercise = async () => {
    const user = useSupabaseUser()
    await supabase
    .from(workoutExercisesTable)
    .insert(
      {
        workout_id: props.workoutId,
        exercise_id: 1,
        user_id: user.value.id
      },
    )
    loadWorkoutExercises()
  }

  onMounted(() => {
    loadWorkoutExercises()
  })
</script>

<template>
  <v-row>
    <v-col cols="3">
      <v-btn color="orange" @click="addExercise()">
        add exercise
      </v-btn>
    </v-col>
  </v-row>
  <div v-for="workoutExercise in workoutExercises" :key="workoutExercise.id">
    <WorkoutExerciseForm :workoutExerciseId="workoutExercise.id" @delete-workout-exercies="deleteWorkoutExercise"/>
    <v-spacer></v-spacer>
  </div>
</template>