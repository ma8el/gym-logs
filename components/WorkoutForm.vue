<script setup lang="ts"> 
  import { useField, useForm } from 'vee-validate'
  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      name (value) {
        if (value?.length >= 2) return true
        return 'Name needs to be at least 2 characters.'
      },
      description (value) {
        if (value?.length > 9) return true
        return 'Phone number needs to be at least 9 characters.'
      },
      exercise (value) {
            if (value) return true
            return 'Select an item.'
      },
    },
  })

  const name = useField('name')
  const description = useField('description')
  const exercise = useField('exercise')
  
  const exercises = ref([
    'Squat',
    'Bench',
    'Deadlift',
    'Overhead',
  ])

  const submit = handleSubmit(values => {
        alert(JSON.stringify(values, null, 2))
  })
</script>

<template>
    <form @submit.prevent="submit">
    <v-text-field
      v-model="name.value.value"
      :counter="2"
      :error-messages="name.errorMessage.value"
      label="Name"
    ></v-text-field>

    <v-text-field
      v-model="description.value.value"
      :counter="9"
      :error-messages="description.errorMessage.value"
      label="Description"
    ></v-text-field>

    <v-select
      v-model="exercise.value.value"
      :items="exercises"
      :error-messages="exercise.errorMessage.value"
      label="exercise"
    ></v-select>

    <v-btn
      class="me-4"
      type="submit"
    >
      submit
    </v-btn>

    <v-btn @click="handleReset">
      clear
    </v-btn>
  </form>
</template>