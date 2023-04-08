<script setup lang="ts">
 const dialog = ref(false)
 const sourceTable = 'workout_plans'
</script>

<template>
  <NuxtLayout name="app">
    <NuxtLayout name="planner">
      <template #header>
        <h1>Workout Plans</h1>
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
              Add workout plan
            </v-btn>
          </template>
          <WorkoutPlanForm @close-workout-form="dialog = false"/>
        </v-dialog>
      </template>
      <template #tabs>
        <PlannerTabs :source-table="sourceTable" v-slot="slotProps">
            <WorkoutPlansContainer :workoutPlanId = "slotProps.itemId"/>
        </PlannerTabs>
      </template>
    </NuxtLayout>
  </NuxtLayout> 
</template>

<style scoped>
.header-row {
  flex: 0 0 auto;
  margin-bottom: 1rem;
}

</style>