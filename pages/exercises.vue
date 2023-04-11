<script setup lang="ts">
  const axios = useNuxtApp().$axios
  const baseUrl = import.meta.env.VITE_EXERCISE_API_URL
  const baseEndPoint = import.meta.env.VITE_EXERCISE_API_ENDPOINT

  const exerciseResponse = ref(null)
  const loading = ref(true)

  const fetchExercise = async () => {
    try {
      const resp = await axios.get(`${baseUrl}/${baseEndPoint}&language=2&limit=100`)
      if (resp.status === 200) {
        exerciseResponse.value = resp.data.results.filter((data: any) => data.language.id === 2)
        loading.value = false
      }
      } catch (error) {
      console.log(error)
    }     
  }

  onMounted(() => {
    fetchExercise()
  })
</script>

<template>
    <NuxtLayout name="app">
      <h1>Exercises</h1>
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
        class="mx-auto"
      ></v-progress-circular>
      <v-row v-else>
        <v-col cols="3" v-for="exercise in exerciseResponse" :key="exercise.id">
          <ExerciseCard :exercise="exercise" />
        </v-col>
      </v-row>
    </NuxtLayout>
</template>