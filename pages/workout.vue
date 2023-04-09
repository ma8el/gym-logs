<script setup lang="ts">
 const supabase = useSupabaseClient()
 const dialog = ref(false)
 const sourceTable = 'workouts'

 const workoutStore = useWorkoutsStore()
 const exerciseStore = useExercisesStore()
 const workoutExerciseStore = useWorkoutExercisesStore()

 const workoutChannel = supabase
    .channel('workouts-table-change')
    .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workouts',
        },
        () => workoutStore.fetchData()
      )

const workoutExerciseChannel = supabase
    .channel('workout-exercises-table-change')
    .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'workout_exercises',
        },
        () => workoutExerciseStore.fetchData()
    )

 onBeforeMount(() => {
   workoutStore.fetchData()
   exerciseStore.fetchData()
   workoutExerciseStore.fetchData()
 })

 onMounted(() => {
   workoutChannel.subscribe()
   workoutExerciseChannel.subscribe()
 })

 onUnmounted(() => {
   workoutChannel.unsubscribe()
   workoutExerciseChannel.unsubscribe()
 })
</script>

<template>
  <NuxtLayout name="app">
    <NuxtLayout name="planner">
      <template #header>
        <h1>Workouts</h1>
      </template>
      <template #form>
        <v-dialog
          v-model="dialog"
          width="800"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              class="primary"
              v-bind="props"
            >
              Add workout
            </v-btn>
          </template>
          <WorkoutForm @close-workout-form="dialog = false"/>
        </v-dialog>
      </template>
      <template #tabs>
        <PlannerTabs
         :source-table="sourceTable"
         :source-store="workoutStore"
         v-slot="slotProps"
        >
            <WorkoutExercisesContainer :workoutId="slotProps.itemId"/>
        </PlannerTabs>
      </template>
    </NuxtLayout>
  </NuxtLayout> 
</template>