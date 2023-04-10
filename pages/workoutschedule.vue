<script setup lang="ts">
  const calendarEventStore = useCalendarEventStore()

  onBeforeMount(() => {
    calendarEventStore.fetchData()
  })
</script>

<template>
  <NuxtLayout name="app">
    <h1>Workout Schedule</h1>
    <WorkoutScheduleList />
  </NuxtLayout>
</template>