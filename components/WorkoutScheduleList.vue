<script setup lang="ts">
  const calendarEventStore = useCalendarEventStore()
  const startWorkoutDialog = ref(false)

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
</script>

<template>
  <v-list>
    <v-list-item 
      v-for="event in sortedEvents"
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
            <v-dialog
              v-model="startWorkoutDialog"
              fullscreen
              :scrim="false"
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  color="orange"
                  size="small"
                  class="mr-5"
                  :disabled="!event.valid"
                  @click="startWorkoutDialog = true"
                >
                  Start Workout
                </v-btn>
              </template>
              <StartedWorkoutPane @close="startWorkoutDialog = false" :title="event.title.toUpperCase()"/>
            </v-dialog>
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