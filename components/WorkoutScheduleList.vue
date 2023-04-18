<script setup lang="ts">
  const calendarEventStore = useCalendarEventStore()
  const workoutSessionStore = useWorkoutSessionStore()

  const sortedEvents = computed(() => {
    return calendarEventStore.events.sort((a, b) => {
      const dateA = new Date(a.start);
      const dateB = new Date(b.start);
      
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      if (a.workoutId < b.workoutId) {
        return -1;
      }
      if (a.workoutId > b.workoutId) {
        return 1;
      }
      return 0;
    });
  });

  const sortedEventsWithShowStartWorkoutDialog = computed(() => {
    return sortedEvents.value.map((event) => {
      return {
        ...event,
        startWorkoutDialog: false
      }
    })
  })

  const sessionExists = ref([])

  onMounted(async () => {
    const sessionMeta = workoutSessionStore.workoutSessions.map(({ workout_id, scheduled_at }) => ({ workout_id, scheduled_at }))
    const calendarMeta = calendarEventStore.events.map(({ workoutId, start }) => ({ workoutId, start }))

    sessionExists.value = calendarMeta.map(calendar => {
      return sessionMeta.some(session => {
        return session.workout_id === calendar.workoutId && new Date(session.scheduled_at).toISOString() === calendar.start
      })
    })
})
</script>

<template>
  <v-list>
    <v-list-item 
      v-for="(event, index) in sortedEventsWithShowStartWorkoutDialog"
      :key="event.workoutId"
    >
        <div class="card-content">
          <v-list-item-title>{{ event.workoutName }}</v-list-item-title>
          <v-row>
            <v-col cols="3">
              <v-list-item-subtitle>{{ event.workoutPlanName }}</v-list-item-subtitle>
            </v-col>
            <v-col cols="3">
              <v-list-item-subtitle>{{ event.workoutDescription }}</v-list-item-subtitle>
            </v-col>
            <v-col cols="3">
              <v-list-item-subtitle>Starts at {{ new Date(event.start).toLocaleString() }}</v-list-item-subtitle>
            </v-col>
            <div v-if="!event.valid" class="mb-2">
              <MissingValuesExclamationMark/>
            </div>
            <v-spacer></v-spacer>
            <WorkoutSessionDialog v-if="!sessionExists[index]" :event="event"/>
            <v-icon v-else>mdi-check-bold</v-icon>
          </v-row>
        </div>
        <v-divider></v-divider>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.card-content {
  padding: 10px;
}
</style>