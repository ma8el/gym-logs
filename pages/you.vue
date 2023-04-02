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
    <h1>You</h1>
    <div class="form">
      <form  @submit.prevent="updateProfile">
        <h2>Body Metrics</h2>
        <v-row no-gutters>
          <v-text-field variant="outlined" label="Weight (in kg)" v-model="userStatistics.weight"/>
          <v-text-field variant="outlined" label="Height (in cm)" v-model="userStatistics.height" />
          <v-text-field variant="outlined" label="Age" v-model="userStatistics.age" />
          <v-select variant="outlined" :items="genderItems" label="Gender" v-model="userStatistics.gender" />
        </v-row>
        <h2>Gym Performance</h2>
        <v-row no-gutters>
          <v-text-field variant="outlined" label="Squat 1RM (in kg)" v-model="userStatistics.performance.squat"/>
          <v-text-field variant="outlined" label="Deadlift 1RM (in kg)" v-model="userStatistics.performance.deadlift"/>
          <v-text-field variant="outlined" label="Bench 1RM (in kg)" v-model="userStatistics.performance.bench"/>
          <v-text-field variant="outlined" label="Overhead 1RM (in kg)" v-model="userStatistics.performance.overhead"/>
        </v-row>
        <div>
          <input
            type="submit"
            class="button primary block"
            :value="loading ? 'Loading ...' : 'Save'"
            :disabled="loading"
          />
        </div>
      </form>
    </div>

  </NuxtLayout>
</template>

<style scoped>
.form {
  margin: 10px 10px 10px 0;
}

form h2 {
  margin-bottom: 10px;
}

</style>