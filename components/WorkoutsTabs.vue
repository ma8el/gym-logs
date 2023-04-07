<script setup lang="ts">
  const supabase = useSupabaseClient()
  const workoutsTable = 'workouts'
  
  const exerciseIDs = ref<number[]>([])
  const exerciseID = ref(0)
  const workouts = ref()

  const deletionDialog = ref(false)

  const tab = ref('')
  
  const closeExerciseForm = (id: number) => {
    exerciseIDs.value = exerciseIDs.value.filter(exerciseID => exerciseID !== id)
  }
  
  const addExercise = () => {
    exerciseIDs.value.push(exerciseID.value++)
  }

  const loadWorkouts = async () => {
    await supabase
      .from(workoutsTable)
      .select(`id, name, description, created_at, updated_at`)
      .then(({ data, error }) => {
        if (error) {
          console.log('error', error)
        } else {
          workouts.value = data
        }
      })
  }

  const deleteWorkout = async (workoutId: number) => {
    const { error } = await supabase
      .from(workoutsTable)
      .delete()
      .eq('id', workoutId)
    if (error) {
      console.log('error', error)
    } else {
      deletionDialog.value = false
      loadWorkouts()
    }
  }

  const channel = supabase
    .channel('table-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: workoutsTable,
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
            <v-toolbar density="compact" color="orange">
              <v-toolbar-title></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                icon="$delete"
                size="small"
                variant="text"
                @click="deletionDialog = true"
              ></v-btn>
              <v-dialog
                v-model="deletionDialog"
                width="auto"
              >
              <DeletionModal 
                @delete-workout="deleteWorkout(workout.id)"
                @close-workout-form="deletionDialog = false"
              />
              </v-dialog>
            </v-toolbar>
            <v-card-text>
              <v-row>
                <v-col cols="8">
                  <b>Description:</b> {{ workout.description }}
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="4">
                  <b>Created at:</b> {{ new Date(workout.created_at).toLocaleString('en-US', {timeZone: 'UTC'}) }}
                </v-col>
              <v-row justify="end">
                <v-col cols="4">
                  <b>Last modified:</b> {{ new Date(workout.updated_at).toLocaleString('en-US', {timeZone: 'UTC'}) }}
                </v-col>
              </v-row>
              </v-row>
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