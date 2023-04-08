<script setup lang="ts">
  import VueDatePicker from '@vuepic/vue-datepicker';

  const workoutsTable = 'workouts'
  const daysOfWeekTable = 'days_of_week'

  const workout = ref()
  const workouts = ref()
  const dayOfWeek = ref()
  const daysOfWeek = ref()

  const date = ref()
  const time = ref({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes()
  })

  const emit = defineEmits(['delete-planned-workouts'])

  onMounted(() => {
    loadItems(workoutsTable).then((data) => {
      workouts.value = data?.map((workout: any) => ({ value: workout.id, title: workout.name,}))
    });
    loadDaysOfWeek().then((data) => {
      daysOfWeek.value = data?.map((day: any) => ({ value: day.id, title: day.name,}))
    });
    const startDate = new Date();
    const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    date.value = [startDate, endDate];
  })
</script>

<template>
<v-card class="exercise-form-card mt-2">
  <v-row class="mt-1">
    <v-col cols="6">
      <v-select
        v-model="workout"
        :items="workouts"
        label="Workout"
        required
      ></v-select>
    </v-col>
    <v-col col="2">
      <v-select
        v-model="dayOfWeek"
        :items.upper="daysOfWeek"
        label="Day"
        required
      ></v-select>
    </v-col>
    <v-col col="2">
      <VueDatePicker v-model="time" time-picker :teleport="true"/>
    </v-col>
  </v-row>
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