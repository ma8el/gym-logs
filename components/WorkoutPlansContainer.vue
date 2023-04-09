<script setup lang="ts">
  const props = defineProps(['workoutPlanId'])
  const supabase = useSupabaseClient()
  const userStore = useUserStore()

  const plannedWorkoutsTable = 'planned_workouts'
  const workoutsTable = 'workouts'

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
      loadPlannedWorkouts(props.workoutPlanId).then((data) => {
      plannedWorkouts.value = data
      })
  }

  const deletePlannedWorkout = async (id: number) => {
    await supabase
      .from(plannedWorkoutsTable)
      .delete()
      .eq('id', id)
    loadPlannedWorkouts(props.workoutPlanId).then((data) => {
      plannedWorkouts.value = data
    })
  }

  onMounted(() => {
    loadPlannedWorkouts(props.workoutPlanId).then((data) => {
      plannedWorkouts.value = data
    })
    loadItems(workoutsTable).then((data) => {
      workouts.value = data
    })
  })

  onUpdated(() => {
    loadPlannedWorkouts(props.workoutPlanId).then((data) => {
      plannedWorkouts.value = data
    })
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