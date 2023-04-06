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
  const tab = ref('')
</script>

<template>
  <div v-if="workouts" class="d-flex flex-row">
    <v-tabs
      v-model="tab"
      direction="vertical"
      color="orange"
    >
      <v-tab 
        v-for="workout in workouts"
        :key="workout.id"
        :value="workout.name">
        {{  workout.name }}
      </v-tab>
    </v-tabs>
    <div class="full-width-card">
    <v-card>
      <v-window
        v-for="workout in workouts"
        :key="workout.id"
        v-model="tab">
        <v-window-item :value="workout.name">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col cols="10">
                  <b>Description:</b> {{ workout.description }}
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="2">
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
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
    </div>
  </div>
</template>

<style scoped>
.full-width-card {
  width: 90%;
}
</style>