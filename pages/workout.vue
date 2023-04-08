<script setup lang="ts">
 const dialog = ref(false)
 const sourceTable = 'workouts'
</script>

<template>
  <NuxtLayout name="app">
    <NuxtLayout name="planner">
      <template #header>
        <h1>Workouts</h1>
      </template>
      <template #form>
        <v-dialog
          v-model="dialog"
          width="800"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              class="primary"
              v-bind="props"
            >
              Add workout
            </v-btn>
          </template>
          <WorkoutForm @close-workout-form="dialog = false"/>
        </v-dialog>
      </template>
      <template #tabs>
        <PlannerTabs :source-table="sourceTable" v-slot="slotProps">
            <WorkoutExercisesContainer :workoutId="slotProps.itemId"/>
        </PlannerTabs>
      </template>
    </NuxtLayout>
  </NuxtLayout> 
</template>