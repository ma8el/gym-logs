<script setup lang="ts">
 const dialog = ref(false)
</script>


<template>
  <NuxtLayout name="app">
    <v-row>
      <v-col>
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
          <WorkoutForm/>
        </v-dialog>
      </v-col>
    </v-row>
  </NuxtLayout> 
</template>