<script setup lang="ts">
  const calendarEventStore = useCalendarEventStore()

  onBeforeMount(() => {
    calendarEventStore.fetchData()
  })
</script>

<template>
  <NuxtLayout name="app">
    <h1>Calendar</h1>
    <div class="calendar">
      <Calendar />
    </div>
  </NuxtLayout>
</template>

<style scoped>
.calendar {
  width: 100hv;
  height: auto;
}
</style>