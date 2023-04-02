<script setup lang="ts">
  const axios = useNuxtApp().$axios
  const baseUrl = import.meta.env.VITE_EXERCISE_API_URL
  const baseEndPoint = import.meta.env.VITE_EXERCISE_API_ENDPOINT
  console.log(baseUrl)

  const exerciseResponse = ref(null)

  const fetchExercise = async () => {
    try {
      const resp = await axios.get(`${baseUrl}/${baseEndPoint}&name=Bench Press`)
      if (resp.status === 200) {
        exerciseResponse.value = resp.data.results[0]
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
      <ExerciseCard v-if="exerciseResponse" :exercise="exerciseResponse" />
    </NuxtLayout>
</template>