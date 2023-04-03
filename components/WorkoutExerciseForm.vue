<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      sets (value: string) {
        if (parseInt(value) > 0 && /[0-9-]+/.test(value)) return true
        return 'Create at least one set.'
      },
      reps (value: string) {
        if (parseInt(value) > 0 && /[0-9-]+/.test(value)) return true
        return 'Lift something.'
      },
      weight (value: string) {
        if (parseInt(value) > 0 && /[0-9-]+/.test(value)) return true
        return 'Lift something.'
      },
      rir (value: string) {
        if (/[0-9-]+/.test(value)) return true
        return 'RIR must be a number.'
      },
      restTime (value: string) {
        if (/[0-9-]+/.test(value)) return true
        return 'Rest time must be a number.'
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

  const emit = defineEmits(['closeForm'])
  const emitClose = () => {
    emit('closeForm', props.id)
  }

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
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="restTime.value.value"
          :error-messages="restTime.errorMessage.value"
          label="Rest Time (s)"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-text-field
          v-model="sets.value.value"
          :error-messages="sets.errorMessage.value"
          label="Sets"
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
        ></v-text-field>
      </v-col>

      <v-col cols="3">
        <v-text-field
          v-model="weight.value.value"
          :error-messages="weight.errorMessage.value"
          label="Weight (kg)"
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