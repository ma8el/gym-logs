<script setup lang="ts">
  const props = defineProps<{
    workoutId: number
  }>()
  const supabase = useSupabaseClient()
  const workoutExercisesTable = 'workout_exercises'

  const workoutExercises = ref()

  const deleteWorkoutExercise = async (id: number) => {
    await supabase
      .from(workoutExercisesTable)
      .delete()
      .eq('id', id)
    loadWorkoutExercises(props.workoutId).then((data) => {
      workoutExercises.value = data
    })
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
   loadWorkoutExercises(props.workoutId).then((data) => {
     workoutExercises.value = data
    })
  }

  onMounted(() => {
    loadWorkoutExercises(props.workoutId).then((data) => {
      console.log(data)
      workoutExercises.value = data
    })
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