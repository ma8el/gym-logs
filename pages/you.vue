<script setup lang="ts">
  const loading = ref(false)
  const userStatistics = ref<UserStatistics>({
                              id: 0,
                              at: new Date(),
                              weight: 0,
                              height: 0,
                              age: 0,
                              gender: 'male',
                              performance: {
                                id: 0,
                                at: new Date(),
                                squat: 0,
                                bench: 0,
                                deadlift: 0,
                                overhead: 0,
                              }
                            })
  const genderItems = ['male', 'female']

  const updateProfile = async () => {
    loading.value = true
    console.log(userStatistics.value)
    loading.value = false
  }
</script>

<template>
  <NuxtLayout name="app">
    <h1>Goals</h1>
      <form  @submit.prevent="updateProfile">
        <v-row>
          <h2>Weight</h2>
        </v-row>
        <v-row>
          <v-text-field variant="outlined" label="Weight (in kg)" v-model="userStatistics.weight"/>
        </v-row>
        <v-row>
          <h2>Gym Performance</h2>
        </v-row>
        <v-row>
          <v-text-field variant="outlined" label="Squat 1RM (in kg)" v-model="userStatistics.performance.squat"/>
          <v-text-field variant="outlined" label="Deadlift 1RM (in kg)" v-model="userStatistics.performance.deadlift"/>
          <v-text-field variant="outlined" label="Bench 1RM (in kg)" v-model="userStatistics.performance.bench"/>
          <v-text-field variant="outlined" label="Overhead 1RM (in kg)" v-model="userStatistics.performance.overhead"/>
        </v-row>
      </form>
  </NuxtLayout>
</template>

<style scoped>

</style>