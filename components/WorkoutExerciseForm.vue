<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  const supabase = useSupabaseClient()
  const exerciseStore = useExercisesStore()

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
    },
  })

  const exercises = ref([{}])
  const exercise = ref()
  const sets = useField('sets')
  const reps = useField('reps')
  const weight = useField('weight')
  const rir = useField('rir')
  const restTime = useField('restTime')

  const isValidWorkoutExercise = ref(false)
  const modify = ref(false)

  const props = defineProps(['workoutExerciseId'])

  const emit = defineEmits(['deleteWorkoutExercies'])
  const emitDelete = () => {
    emit('deleteWorkoutExercies', props.workoutExerciseId)
  }

  const loadWorkoutExercise = async () => {
    const { data, error } = await supabase
      .from('workout_exercises')
      .select(`id, exercise_id, sets, reps, weight, resttime, rir, created_at, updated_at, valid`)
      .eq('id', props.workoutExerciseId)
    if (data) {
      exercise.value = data[0].exercise_id
      sets.value.value = data[0].sets
      reps.value.value = data[0].reps
      weight.value.value = data[0].weight
      rir.value.value = data[0].rir
      restTime.value.value = data[0].resttime
      isValidWorkoutExercise.value = data[0].valid
    }
    if (error) {
      console.log('error', error)
    }
  }

  const save = async () => {
    const isValid = await validate()
    if (!isValid.valid) {
      return
    }
    if (!isValid) return
    const { error } = await supabase
      .from('workout_exercises')
      .update([
        {
          exercise_id: exercise.value,
          sets: sets.value.value,
          reps: reps.value.value,
          weight: weight.value.value,
          rir: rir.value.value,
          resttime: restTime.value.value,
        },
      ])
      .eq('id', props.workoutExerciseId)

    if (error) {
      console.log('error', error)
      return
    }
    loadWorkoutExercise()
    modify.value = false
  }

  onMounted (async () => {
    if (exerciseStore.exercises) {
      exercises.value = exerciseStore.exercises.map((exercise: any) => ({title: exercise.name, value: exercise.id}))
    }
    loadWorkoutExercise()
 })
</script>

<template>
<v-card class="exercise-form-card">
  <v-toolbar density="compact" color="orange">
    <v-toolbar-title v-if="exercise">{{ exercises.filter((e) => (e.value === exercise))[0].title }}</v-toolbar-title>
    <v-toolbar-title v-if="isValidWorkoutExercise">{{ `${sets.value.value} x ${reps.value.value}` }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="!isValidWorkoutExercise">
      <MissingValuesExclamationMark/>
    </div>
    <v-btn
      icon="mdi-pencil"
      size="small"
      variant="text"
      class="ma-2"
      @click="modify = !modify"
    ></v-btn>
    <v-btn
      icon="$delete"
      size="small"
      variant="text"
      class="ma-2"
      @click="emitDelete()"
    ></v-btn>
  </v-toolbar>
  <form v-if="!isValidWorkoutExercise || modify">
    <div class="form-components" >
    <v-row>
      <v-col cols="9">
        <v-select
          v-model="exercise"
          :items="exercises"
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
    <v-row>
      <v-col cols="2">
        <v-btn
        @click="save"
        >
          Save
        </v-btn>
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