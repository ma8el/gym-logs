<script setup lang="ts">
  const workoutSessionStore = useWorkoutSessionStore()

  onBeforeMount(() => {
    workoutSessionStore.fetchWorkoutSessionData()
  })
</script>

<template>
  <NuxtLayout name="app">
    <h1>Workout Sessions</h1>
    <WorkoutSessionList />
  </NuxtLayout>
</template>