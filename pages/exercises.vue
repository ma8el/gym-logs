<script setup lang="ts">
  const axios = useNuxtApp().$axios
  const baseUrl = import.meta.env.VITE_EXERCISE_API_URL
  const baseEndPoint = import.meta.env.VITE_EXERCISE_API_ENDPOINT

  const exerciseResponse = ref(null)

  const fetchExercise = async () => {
    try {
      const resp = await axios.get(`${baseUrl}/${baseEndPoint}&language=2&limit=100`)//&name=Bench Press`)
      if (resp.status === 200) {
        exerciseResponse.value = resp.data.results.filter((data: any) => data.language.id === 2)
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
      <v-row v-if="exerciseResponse">
        <v-col cols="auto" v-for="exercise in exerciseResponse" :key="exercise.id">
          <ExerciseCard :exercise="exercise" />
        </v-col>
      </v-row>
      <p v-else>Oops something went wrong...</p>
    </NuxtLayout>
</template>