<script setup lang="ts">
  interface Muscle {
    id: number,
    name: string,
    description: string,
    bodyPart: string,
  }

  interface Exercise {
    id: number,
    name: string,
    description: string,
    usedMuscles: Muscle[],
    neuronalFatigueFactor: number,
    muscleFatigueFactor: number,
  }

  interface WorkoutExercise {
    id: number,
    exercise: Exercise,
    sets: number,
    reps: number,
    weight: number,
    restTime: number,
    estimatedFatigue: number,
  }

  interface Workout {
    id: number,
    name: string,
    description: string,
    exercises: WorkoutExercise[]
    estimatedTime: number,
  }

  interface WorkoutSession {
    id: number,
    at: Date,
    workout: Workout
    notes: string,
  }

  interface WorkoutRoutine {
    id: number,
    name: string,
    description: string,
    sessions: WorkoutSession[]
  }

</script>


<template>
  <NuxtLayout name="app">
    <h1>Workouts</h1>
  </NuxtLayout> 
</template>