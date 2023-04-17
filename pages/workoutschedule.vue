<script setup lang="ts">
  const calendarEventStore = useCalendarEventStore()
  const workoutSessionStore = useWorkoutSessionStore()

  onBeforeMount(() => {
    calendarEventStore.fetchData()
    workoutSessionStore.fetchWorkoutSessionData()
  })
</script>

<template>
  <NuxtLayout name="app">
    <h1>Workout Schedule</h1>
    <WorkoutScheduleList />
  </NuxtLayout>
</template>