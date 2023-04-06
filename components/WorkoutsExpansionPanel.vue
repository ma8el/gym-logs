<script setup lang="ts">
  const supabase = useSupabaseClient()
  
  const exerciseIDs = ref<number[]>([])
  const exerciseID = ref(0)
  const workouts = ref()
  
  const closeExerciseForm = (id: number) => {
    exerciseIDs.value = exerciseIDs.value.filter(exerciseID => exerciseID !== id)
  }
  
  const addExercise = () => {
    exerciseIDs.value.push(exerciseID.value++)
  }

  const loadWorkouts = () => {
    supabase
      .from('workouts')
      .select(`id, name, description, created_at`)
      .then(({ data, error }) => {
        if (error) {
          console.log('error', error)
        } else {
          workouts.value = data
        }
      })
  }

  const channel = supabase
    .channel('table-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'workouts',
      },
      () => loadWorkouts()
    )

  onMounted(async () => {
    loadWorkouts()
    channel.subscribe()
  })

  onUnmounted(() => {
    channel.unsubscribe()
  })
</script>

<template>
  <div v-if="workouts">
    <v-expansion-panels 
      variant="accordion"
      class="workout-panels"
      v-for="workout in workouts"
      :key="workout.id"
    >
      <v-expansion-panel>
        <v-expansion-panel-title>{{ workout.name }}</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col>
              <b>Description:</b> {{ workout.description }}
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="justify-end">
              <b>Created at:</b> {{ new Date(workout.created_at).toLocaleString('en-US', {timeZone: 'UTC'}) }}
            </v-col>
          </v-row>
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

        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>