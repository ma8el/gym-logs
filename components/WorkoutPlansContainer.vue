<script setup lang="ts">
  const props = defineProps(['workoutPlanId'])
  const supabase = useSupabaseClient()

  const plannedWorkoutsTable = 'planned_workouts'
  const workoutsTable = 'workouts'

  const userStore = useUserStore()
  const plannedWorkoutStore = usePlannedWorkoutsStore()

  const workouts = ref()
  const plannedWorkouts = ref()
  const dialog = ref(false)

  const addPlannedWorkout = async () => {
      await supabase
        .from(plannedWorkoutsTable)
        .insert(
            {
            workout_id: workouts.value[0].id,
            workout_plan_id: props.workoutPlanId,
            day_of_week_id: 1,
            user_id: userStore.user
            },
        )
  }

  const updatePlannedWorkouts = async (store) => {
    if(store.plannedWorkouts) {
      plannedWorkouts.value = store.plannedWorkouts
        .filter((plannedWorkout: any) => 
          plannedWorkout.workout_plan_id === props.workoutPlanId)
    } else {
      plannedWorkouts.value = undefined
    }
  }

  onMounted(() => {
    updatePlannedWorkouts(plannedWorkoutStore)
    loadItems(workoutsTable).then((data) => {
      workouts.value = data
    })
  })

  watch(plannedWorkoutStore, (newVal) => {
    updatePlannedWorkouts(newVal)
  })
</script>

<template>
  <v-row>
    <v-col cols="2">
      <v-btn color="orange" @click="addPlannedWorkout()">
        add workout
      </v-btn>
    </v-col>
    <v-col cols="4">
      <v-dialog
        v-model="dialog"
        width="800"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            class="primary"
            v-bind="props"
          >
            Schedule workout plan
          </v-btn>
        </template>
        <WorkoutScheduleForm @close-workout-schedule-form="dialog = false" :workoutPlanId="props.workoutPlanId"/>
      </v-dialog>
    </v-col>
  </v-row>
  <div v-for="plannedWorkout in plannedWorkouts" :key="plannedWorkout.id">
    <PlannedWorkoutsForm :plannedWorkoutId="plannedWorkout.id" :workoutPlanId="$props.workoutPlanId"/>
    <v-spacer></v-spacer>
  </div>
</template>