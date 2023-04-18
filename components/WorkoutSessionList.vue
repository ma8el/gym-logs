<script setup lang="ts">
  const workoutSessionStore = useWorkoutSessionStore()
  const workoutSessions = ref()
  const workoutSessionDetails = ref([])

  const getFilteredSessionDetails = (sessionId: number) => {
    console.log(workoutSessionDetails.value)
    return workoutSessionDetails.value.filter((sessionDetail: any) => sessionDetail.id === sessionId)[0]
  }

  const getWorkoutSessionPerformance = (sessionId: number) => {
    const details = workoutSessionDetails.value.filter((sessionDetail: any) => sessionDetail.id === sessionId)[0]
    return details.workout_session_performances
  }

  onBeforeMount(() => {
    workoutSessionStore.fetchWorkoutSessionData().then(() => {
      workoutSessions.value = workoutSessionStore.workoutSessions
      workoutSessionStore.fetchWorkoutSessionDetailsData().then((data) => {
        workoutSessionDetails.value = data
      })
    })
  })
</script>

<template>
  <v-list>
    <v-list-item 
      v-for="session in workoutSessionStore.workoutSessions"
      :key="session.workoutId"
    >
        <div class="card-content">
          <v-list-item-title>Session ID: {{ session.id }}</v-list-item-title>
          <v-row>
            <v-col cols="3">
              <v-list-item-subtitle>Workout: {{ getFilteredSessionDetails(session.id) }}</v-list-item-subtitle>
            </v-col>
            <v-col cols="3">
              <v-list-item-subtitle>Started at {{ new Date(session.started_at).toLocaleString() }}</v-list-item-subtitle>
            </v-col>
            <v-col cols="3">
              <v-list-item-subtitle>Finished at {{ new Date(session.finished_at).toLocaleString() }}</v-list-item-subtitle>
            </v-col>
            <v-spacer></v-spacer>
            <v-icon>mdi-check-bold</v-icon>
          </v-row>
          <v-list-item-title>Details</v-list-item-title>
          <v-row>
            <v-col cols="10">
                <v-table>
                    <thead>
                        <th>Exercise</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Weight</th>
                    </thead>
                    <tbody>
                        <tr v-for="detail in getWorkoutSessionPerformance(session.id)" :key="detail.id">
                            <td>{{ detail.exercise_id }}</td>
                            <td>{{ detail.sets }}</td>
                            <td>{{ detail.reps }}</td>
                            <td>{{ detail.weight }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
          </v-row>
        </div>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.card-content {
  padding: 10px;
}
</style>