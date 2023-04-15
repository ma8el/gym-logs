<script setup lang="ts">
  const props = defineProps(['event'])
  const startWorkoutDialog = ref(false)
</script>

<template>
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
        @click="startWorkoutDialog= true"
      >
        Start Workout
      </v-btn>
    </template>
    <StartedWorkoutPane 
      @close="startWorkoutDialog = false"
      :title="event.title.toUpperCase()"
      :workoutId="event.workoutId"
      :startsAt="event.start" 
    />
  </v-dialog>
</template>