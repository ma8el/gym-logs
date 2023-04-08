<script setup lang="ts">
 const dialog = ref(false)
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
        <WorkoutPlanTabs/>
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