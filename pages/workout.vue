<script setup lang="ts">
 const dialog = ref(false)
</script>


<template>
  <NuxtLayout name="app">
    <v-row class="header-row">
      <v-col cols="8">
        <h1>Workouts</h1>
      </v-col>
      <v-spacer></v-spacer>
      <v-col justify="end">
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
      </v-col>
    </v-row>
    <WorkoutsExpansionPanel/>
  </NuxtLayout> 
</template>

<style scoped>
.header-row {
  flex: 0 0 auto;
  margin-bottom: 1rem;
}

</style>