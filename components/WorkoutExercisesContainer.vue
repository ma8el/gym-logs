<script setup lang="ts">
  const props = defineProps<{
    workoutId: number
  }>()
  const supabase = useSupabaseClient()
  const workoutExercisesTable = 'workout_exercises'

  const workoutExercises = ref()

  const userStore = useUserStore()
  const workoutExercisesStore = useWorkoutExercisesStore()

  const deleteWorkoutExercise = async (id: number) => {
    await supabase
      .from(workoutExercisesTable)
      .delete()
      .eq('id', id)
  }
 
  const addExercise = async () => {
    await supabase
    .from(workoutExercisesTable)
    .insert(
      {
        workout_id: props.workoutId,
        exercise_id: 1,
        user_id: userStore.user
      },
    )
  }

  const updateWorkoutExercises = async (store) => {
    if(store.workoutExercises) {
      workoutExercises.value = store.workoutExercises
        .filter((workoutExercise: any) => 
          workoutExercise.workout_id === props.workoutId)
    } else {
      workoutExercises.value = undefined
    }
  }

  onMounted(() => {
    updateWorkoutExercises(workoutExercisesStore)
  })

  watch(workoutExercisesStore, (newVal) => {
    updateWorkoutExercises(newVal)
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
    <WorkoutExerciseForm :workoutExerciseId="workoutExercise.id" @delete-workout-exercies="deleteWorkoutExercise(workoutExercise.id)"/>
    <v-spacer></v-spacer>
  </div>
</template>