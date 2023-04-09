<script setup lang="ts">
  const props = defineProps(['workoutPlanId'])
  const supabase = useSupabaseClient()
  const userStore = useUserStore()

  const plannedWorkoutsTable = 'planned_workouts'
  const workoutsTable = 'workouts'

  const plannedWorkoutStore = usePlannedWorkoutsStore()

  const workouts = ref()
  const plannedWorkouts = ref()

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
    <v-col cols="3">
      <v-btn color="orange" @click="addPlannedWorkout()">
        add workout
      </v-btn>
    </v-col>
  </v-row>
  <div v-for="plannedWorkout in plannedWorkouts" :key="plannedWorkout.id">
    <PlannedWorkoutsForm :plannedWorkoutId="plannedWorkout.id" :workoutPlanId="$props.workoutPlanId"/>
    <v-spacer></v-spacer>
  </div>
</template>