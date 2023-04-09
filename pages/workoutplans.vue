<script setup lang="ts">
  const supabase = useSupabaseClient()
  const dialog = ref(false)
  const sourceTable = 'workout_plans'

  const workoutPlanStore = useWorkoutPlansStore()
  const workoutStore = useWorkoutsStore()
  const plannedWorkoutStore = usePlannedWorkoutsStore()
  const daysOfWeekStore = useDaysOfWeekStore()

  const workoutChannel = supabase
    .channel('workout-plans-table-change')
    .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workout_plans',
        },
        () => workoutPlanStore.fetchData()
  )

  const workoutExerciseChannel = supabase
    .channel('planned-workouts-table-change')
    .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'planned_workouts',
        },
        () => plannedWorkoutStore.fetchData()
  )

  onBeforeMount(() => {
    workoutPlanStore.fetchData()
    workoutStore.fetchData()
    plannedWorkoutStore.fetchData()
    daysOfWeekStore.fetchData()
  })

  onMounted(() => {
    console.log(plannedWorkoutStore.plannedWorkouts)
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
        <h1>Workout Plans</h1>
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
              Add workout plan
            </v-btn>
          </template>
          <WorkoutPlanForm @close-workout-form="dialog = false"/>
        </v-dialog>
      </template>
      <template #tabs>
        <PlannerTabs 
          :source-table="sourceTable"
          :source-store="workoutPlanStore"
          v-slot="slotProps"
        >
            <WorkoutPlansContainer :workoutPlanId = "slotProps.itemId"/>
        </PlannerTabs>
      </template>
    </NuxtLayout>
  </NuxtLayout> 
</template>

<style scoped>
.header-row {
  flex: 0 0 auto;
  margin-bottom: 1rem;
}

</style>