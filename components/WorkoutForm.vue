<script setup lang="ts"> 
  import { useField, useForm } from 'vee-validate'

  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      name (value: string) {
        if (value) {
          return minLength(2)(value)
        } 
      },
    },
  })

  const submit = handleSubmit(values => {
        alert(JSON.stringify(values, null, 2))
  })

  const name = useField('name')
  const description = useField('description')

  const exercises = ref<WorkoutExercise[]>([])
  const exerciseIDs = ref<number[]>([])
  const exerciseID = ref(0)

  const addExercise = () => {
    exerciseIDs.value.push(exerciseID.value++)
  }

  const closeExerciseForm = (id: number) => {
    exerciseIDs.value = exerciseIDs.value.filter(exerciseID => exerciseID !== id)
  }
  
</script>

<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Create your workout</span>
    </v-card-title>
    <v-card-text>
      <form @submit.prevent="submit">
      <v-text-field
        v-model="name.value.value"
        :counter="2"
        required
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
        <div v-for="exerciseID in exerciseIDs" :key="exerciseID">
          <WorkoutExerciseForm :id="exerciseID" @close-form="closeExerciseForm"/>
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
    </v-card-text>
  </v-card>
</template>