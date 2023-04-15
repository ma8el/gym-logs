<script setup lang="ts">
  const props = defineProps(['title', 'workoutId', 'startsAt'])
  const emit = defineEmits(['close'])

  const timeElapsed = ref(0)
  let interval: number | null = null;

  const startTimer = () => {
    if (interval === null) {
      interval = window.setInterval(() => {
        timeElapsed.value += 10;
      }, 10);
    }
  };
  
  const stopTimer = () => {
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
  };
  
  const resetTimer = () => {
    stopTimer();
    timeElapsed.value = 0;
  };
  
  const milliseconds = computed(() => {
    return Math.floor(timeElapsed.value % 1000 / 10).toString().padStart(2, '0');
  });
  
  const seconds = computed(() => {
    return Math.floor(timeElapsed.value / 1000) % 60;
  });
  
  const minutes = computed(() => {
    return Math.floor(timeElapsed.value / 60000);
  });
</script>

<template>
  <v-card>
    <v-toolbar
      color="orange"
    >
      <v-btn
        icon
        dark
        @click="emit('close')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>  
    <div class="stopwatch">
      <div class="text-h2 mb-1">
        {{ minutes }}:{{ seconds }}.{{ milliseconds }}
      </div>
      <v-row justify="center">
        <v-col cols="4">
          <v-btn color="orange" @click="stopTimer">Pause</v-btn>
        </v-col>
<!--        <v-col cols="4">
          <v-btn color="orange" @click="resetTimer">Reset</v-btn>
        </v-col>-->
      </v-row>
    </div>
    <v-divider></v-divider>
    <WorkoutSessionContainer 
      @start="startTimer"
      @close="emit('close')"
      :workoutId="workoutId"
      :startsAt="startsAt"
    />
  </v-card>
</template>

<style scoped>
.stopwatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>