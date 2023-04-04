<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
  const { validate, handleReset } = useForm({
    validationSchema: {
      sets (value: string) {
        return isInteger(value)
      },
      reps (value: string) {
        return isInteger(value)
      },
      weight (value: string) {
        return isInteger(value)
      },
      rir (value: string) {
        return isInteger(value)
      },
      restTime (value: string) {
        return isInteger(value)
      },
      exercise (value: string) {
        if (value) return true
        return 'Select an item.'
      },
    },
  })

  const exercises = ref([
    'Squat',
    'Bench',
    'Deadlift',
    'Overhead',
  ])

  const exercise = useField('exercise')
  const sets = useField('sets')
  const reps = useField('reps')
  const weight = useField('weight')
  const rir = useField('rir')
  const restTime = useField('restTime')

  const props = defineProps(['id'])

  const emit = defineEmits(['closeForm', 'exerciseFormFilled'])
  const emitClose = () => {
    emit('closeForm', props.id)
  }

  watch([exercise.value, sets.value, reps.value, weight.value, rir.value, restTime.value], () => {
    validate().then(() => {
      emit('exerciseFormFilled', {
        id: props.id,
        exercise: exercise.value.value,
        sets: sets.value.value,
        reps: reps.value.value,
        weight: weight.value.value,
        rir: rir.value.value,
        restTime: restTime.value.value,
      })
    })
  })
</script>

<template>
<v-card class="exercise-form-card">
  <v-toolbar density="compact" color="orange">
    <v-toolbar-title v-if="exercise.value.value">{{ exercise.value.value }}</v-toolbar-title>
    <v-toolbar-title v-else>{{ `Exercise #${id}` }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      icon="$close"
      size="small"
      variant="text"
      class="ma-2"
      @click="emitClose"
    ></v-btn>
  </v-toolbar>
  <form>
    <div class="form-components">
    <v-row>
      <v-col cols="9">
        <v-select
          v-model="exercise.value.value"
          :items="exercises"
          :error-messages="exercise.errorMessage.value"
          label="Exercise"
          required
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="restTime.value.value"
          :error-messages="restTime.errorMessage.value"
          label="Rest Time"
          suffix="s"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-text-field
          v-model="sets.value.value"
          :error-messages="sets.errorMessage.value"
          label="Sets"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="1">
      <span class="text-h6 volume-multiplicator">x</span>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="reps.value.value"
          :error-messages="reps.errorMessage.value"
          label="Repetitions"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="3">
        <v-text-field
          v-model="weight.value.value"
          :error-messages="weight.errorMessage.value"
          label="Weight"
          suffix="kg"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="3">
        <v-text-field
          v-model="rir.value.value"
          :error-messages="rir.errorMessage.value"
          label="RIR"
        ></v-text-field>
      </v-col>
    </v-row>
    </div>
  </form>
</v-card>
</template>

<style scoped>
.volume-multiplicator {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  text-align: center;
}
.exercise-form-card {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.form-components {
  margin: 1rem 1rem 1rem 1rem;
}
</style>