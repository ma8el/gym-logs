<script setup lang="ts">
  const props = defineProps(['workoutId', 'startsAt'])
  const emit = defineEmits(['start'])
  const supabase = useSupabaseClient()
  const workoutSessionData = ref([{}])
  const activeSlide = ref(0)
  const totalSlides = ref(0)

  const fetchWorkoutData = async () => {
    const { data, error } = await supabase
      .from('v_scheduled_workout_sessions')
      .select('*')
      .eq('workout_id', `${props.workoutId}`)
      .eq('date', props.startsAt)
    if (error) {
      console.log(error)
    } else {
      workoutSessionData.value = data
    }
  }

  const handleClick = (propsOnClick) => {
    if (activeSlide.value !== totalSlides.value) {
      propsOnClick()
      activeSlide.value = activeSlide.value++
      emit('start')
    }
  }

  onMounted(async () => {
    await fetchWorkoutData()
    totalSlides.value = workoutSessionData.value.length
  })

</script>

<template>
  <v-carousel
    hide-delimiters
    progress="orange"
    v-model="activeSlide"
  >
    <template v-slot:prev="{ props }">
      <v-btn
        :disabled="activeSlide < 2"
        variant="elevated"
        color="orange"
        @click="props.onClick"
        class="m-2"
      >
      Previous set
      </v-btn>
    </template>
    <template v-slot:next="{ props }">
      <v-btn
        variant="elevated"
        color="orange"
        @click="handleClick(props.onClick)"
      >
      {{ activeSlide == 0 ? "Start workout": "Next set" }}
      </v-btn>
    </template>

    <v-carousel-item>
      <v-sheet height="100%" class="d-flex flex-column justify-center align-center">
        <div class="text-h3">Get ready!</div>
      </v-sheet>
    </v-carousel-item>
    <v-carousel-item
      v-for="(item, i) in workoutSessionData"
      :key="i"
    >
      <v-sheet height="100%" class="d-flex flex-column justify-center align-center">
        <div class="text-h4"> {{ item.exercise_name }}</div>
        <div class="text-h4"> {{ item.sets }}</div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>