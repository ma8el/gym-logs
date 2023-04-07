<script setup lang="ts">
  const props = defineProps<{
    workoutId: number
  }>()

  const exerciseIDs = ref<number[]>([])
  const exerciseID = ref(0)

  const closeExerciseForm = (id: number) => {
    exerciseIDs.value = exerciseIDs.value.filter(exerciseID => exerciseID !== id)
  }
  
  const addExercise = () => {
    exerciseIDs.value.push(exerciseID.value++)
  }

</script>

<template>
  <v-row>
    <v-col cols="3">
      <v-btn color="orange" @click="addExercise()">
        add exercise
      </v-btn>
    </v-col>
  </v-row>
  <div v-for="exerciseID in exerciseIDs" :key="exerciseID">
    <WorkoutExerciseForm :id="exerciseID" @close-form="closeExerciseForm"/>
    <v-spacer></v-spacer>
  </div>
</template>