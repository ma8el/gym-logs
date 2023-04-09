<script setup lang="ts">
  import VueDatePicker from '@vuepic/vue-datepicker';

  const props = defineProps(['plannedWorkoutId', 'workoutPlanId'])
  const supabase = useSupabaseClient()
  const form = ref()

  const daysOfWeekStore = useDaysOfWeekStore()
  const workoutStore = useWorkoutsStore()
  const usePlannedWorkoutStore = usePlannedWorkoutsStore()

  const plannedWorkoutsTable = 'planned_workouts'

  const workouts = ref()
  const daysOfWeek = ref()
  const rules = [
    (value: string) => {
      if (value !== undefined) {
        return true
      }
      return 'This field is required!'
    }
  ]

  const workout = ref()
  const dayOfWeek = ref()
  const time = ref({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes()
  })

  const deletePlannedWorkout = async () => {
    await supabase
      .from(plannedWorkoutsTable)
      .delete()
      .eq('id', props.plannedWorkoutId)
  }

  const updatePlannedWorkout = async () => {
      const { error } = await supabase
          .from(plannedWorkoutsTable)
          .update(
            {
              workout_id: workout.value,
              day_of_week_id: dayOfWeek.value,
              time_of_day: `${time.value.hours}:${time.value.minutes}`
            }
          )
          .eq('id', props.plannedWorkoutId)
        if (error) {
          console.log(error)
        }
      }

  onBeforeMount(() => {
    if (workoutStore.data) {
      workouts.value = workoutStore.data.map((workout: any) => ({ value: workout.id, title: workout.name,}))
    }

    daysOfWeekStore.fetchData().then(() => {
      daysOfWeek.value = daysOfWeekStore.daysOfWeek?.map((day: any) => ({ value: day.id, title: day.name,}))
    });

    if(usePlannedWorkoutStore.plannedWorkouts){
      usePlannedWorkoutStore.plannedWorkouts.filter((plannedWorkout: any) => {
        if (plannedWorkout.id === props.plannedWorkoutId) {
          workout.value = plannedWorkout.workout_id
          dayOfWeek.value = plannedWorkout.day_of_week_id
          if(plannedWorkout.time_of_day) {
            time.value = {
              hours: plannedWorkout.time_of_day.split(':')[0],
              minutes: plannedWorkout.time_of_day.split(':')[1]
          }
          } else {
            time.value = {
              hours: new Date().getHours(),
              minutes: new Date().getMinutes()
            }
          }
        }
      })
    }
  })
</script>

<template>
<v-card class="exercise-form-card mt-2">
  <v-form @submit.prevent ref="form">
    <v-row class="mt-1">
      <v-col cols="6">
        <v-select
          v-model="workout"
          :items="workouts"
          :rules="rules"
          label="Workout"
          required
        ></v-select>
      </v-col>
      <v-col col="2">
        <v-select
          v-model="dayOfWeek"
          :items.upper="daysOfWeek"
          :rules="rules"
          label="Day"
          required
        ></v-select>
      </v-col>
      <v-col col="2">
        <VueDatePicker v-model="time" time-picker :teleport="true"/>
      </v-col>
      <v-col cols="1">
        <v-btn
          icon="mdi-content-save"
          size="small"
          variant="text"
          class="ma-2"
          type="submit"
          @click="updatePlannedWorkout()"
        ></v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn
          icon="$delete"
          size="small"
          variant="text"
          class="ma-2"
          @click="deletePlannedWorkout()"
        ></v-btn>
      </v-col>
    </v-row>
  </v-form>
</v-card>
</template>

<style scoped>
.date-time-picker {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>