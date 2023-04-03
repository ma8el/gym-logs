<script setup lang="ts"> 
  import { useField, useForm } from 'vee-validate'

  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      name (value: string) {
        if (value?.length >= 2) return true
        return 'Name needs to be at least 2 characters.'
      },
      description (value: string) {
        if (value?.length > 9) return true
        return 'Phone number needs to be at least 9 characters.'
      },
    },
  })

  const submit = handleSubmit(values => {
        alert(JSON.stringify(values, null, 2))
  })

  const name = useField('name')
  const description = useField('description')

  const exercises = ref<WorkoutExercise[]>([])
  const exerciseCounter = ref(0)

  const addExercise = () => {
    exercises.value.push({
      id: exerciseCounter.value++,
    })
  }

  const closeExerciseForm = (id: number) => {
    exercises.value = exercises.value.filter(exercise => exercise.id !== id)
  }
  
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
    <v-row>
      <v-col cols="3">
        <v-btn @click="addExercise()">
          add exercise
        </v-btn>
      </v-col>
    </v-row>
      <div v-for="exercise in exercises" :key="exercise.id">
        <WorkoutExerciseForm :id="exercise.id" @close-form="closeExerciseForm"/>
        <v-spacer></v-spacer>
      </div>

    <v-row>
      <v-col cols="2">
        <v-btn
          class="me-4"
          type="submit"
        >
          submit
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn @click="handleReset">
          clear
        </v-btn>
      </v-col>
    </v-row>
  </form>
</template>