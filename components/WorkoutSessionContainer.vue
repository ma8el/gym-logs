<script setup lang="ts">
  const props = defineProps(['workoutId', 'startsAt'])
  const emit = defineEmits(['start', 'close'])

  const workoutSessionStore = useWorkoutSessionStore()

  const activeSlide = ref(0)
  const phase = ref(0)
  const startedAt = ref(new Date().toISOString())
  const workoutSets = ref([{}])
  
  const handleNextClick = () => {
    if (activeSlide.value !== workoutSets.value.length || (activeSlide.value === workoutSets.value.length && phase.value === 0)) {
      if(phase.value === 0 && activeSlide.value !== 0) {
        phase.value = 1
      } else {
        phase.value = 0
        activeSlide.value += 1
      }
      emit('start')
    }
  }

  const handleBackClick = () => {
    if (activeSlide.value >= 1) {
      if (phase.value === 1) {
        phase.value = 0
      } else {
        phase.value = 1
        activeSlide.value -= 1
      }

    }
  }

  const handleFinishWorkout = async () => {
    const workoutSessionID = await workoutSessionStore.insertWorkoutSessionData(startedAt.value)
    workoutSessionStore.insertWorkoutSessionPerformance(workoutSessionID, workoutSets.value)
    emit('close')
  }

  const buttonText = computed(() => {
    if (activeSlide.value === 0) {
      return 'Start workout'
    } else {
      return 'Next set'
    }
  })

  onMounted(async () => {
    await workoutSessionStore.fetchPlannedWorkoutSessionData(props.workoutId, props.startsAt)
    workoutSets.value = await workoutSessionStore.calculateWorkoutSets

    const start = new Date()
    startedAt.value = start.toISOString()
  })
</script>

<template>
  <v-card
    class="mx-auto fill-height w-100 px-15"
  >
    <v-window
      v-model="activeSlide"
      class="mt-15"
    >
      <v-window-item>
        <v-sheet class="d-flex justify-center align-center">
          <div class="text-h3">Get ready!</div>
        </v-sheet>
      </v-window-item>
      <v-window-item
        v-for="(item, i) in workoutSets"
        :key="i"
      >
        <v-sheet 
          v-if="phase === 0"
          class="d-flex flex-column justify-center align-center"
        >
          <div class="text-h4"> {{ item.exercise_name }}</div>
          <div class="text-h4"> Set {{ item.set }} of {{ item.sets }}</div>
          <div class="text-h4"> with {{ item.weight }} kg</div>
        </v-sheet>
        <v-sheet 
          v-if="phase === 1"
          class="d-flex flex-column justify-center align-center"
        >
          <div class="text-h4">Add your performance</div>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="item.performedReps"
                label="Reps"
                type="number"
                class="mt-5"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="item.performedWeight"
                label="Weight"
                type="number"
                class="mt-5"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="item.performedRIR"
                label="RIR"
                type="number"
                class="mt-5"
              />
            </v-col>
          </v-row>
        </v-sheet>
      </v-window-item>
    </v-window>
    <v-card-actions>
      <v-btn
        v-if="activeSlide > 1 || phase === 1"
        variant="text"
        @click="handleBackClick()"
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="activeSlide < workoutSets.length || (activeSlide == workoutSets.length && phase === 0)"
        color="orange"
        variant="flat"
        @click="handleNextClick()"
      >
        {{  buttonText }}
      </v-btn>
      <v-btn
        v-if="activeSlide == workoutSets.length && phase === 1"
        color="orange"
        variant="flat"
        @click="handleFinishWorkout()"
      >
        Finish workout
      </v-btn>

    </v-card-actions>
  </v-card>
</template>