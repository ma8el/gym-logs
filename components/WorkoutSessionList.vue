<script setup lang="ts">
  const workoutSessionStore = useWorkoutSessionStore()
  const workoutSessions = ref()
  const workoutSessionDetails = ref()

  const workoutSessionLoading = ref(true)
  const workoutSessionDetailLoading = ref(true)

  const getFilteredSessionDetails = (sessionId: number) => {
    return workoutSessionDetails.value.filter((sessionDetail: any) => sessionDetail.id === sessionId)[0]
  }

  const getWorkoutSessionPerformance = (sessionId: number) => {
    const details = workoutSessionDetails.value.filter((sessionDetail: any) => sessionDetail.id === sessionId)[0]
    return details.workout_session_performances
  }

  const fetchWorkoutSessionData = async () => {
    workoutSessionLoading.value = true
    await workoutSessionStore.fetchWorkoutSessionData()
    workoutSessions.value = workoutSessionStore.workoutSessions
    workoutSessionLoading.value = false
  }

  const fetchWorkoutSessionDetailsData = async () => {
    workoutSessionDetailLoading.value = true
    workoutSessionDetails.value = await workoutSessionStore.fetchWorkoutSessionDetailsData()
    workoutSessionDetailLoading.value = false
  }

  onBeforeMount(async () => {
    await fetchWorkoutSessionData()
    await fetchWorkoutSessionDetailsData()
  })
</script>

<template>
  <v-progress-circular
      v-if="workoutSessionDetailLoading"
      indeterminate
      color="primary"
      class="mx-auto"
  ></v-progress-circular>
  <div v-else>
  <v-list>
    <v-list-item 
      v-for="session in workoutSessionStore.workoutSessions"
      :key="session.workoutId"
    >
        <div class="card-content">
          <v-list-item-title>Session: {{ session.id }}</v-list-item-title>
          <v-row>
            <v-col cols="3">
              <v-list-item-subtitle>Workout: {{ getFilteredSessionDetails(session.id).workouts.name }}</v-list-item-subtitle>
            </v-col>
            <v-col cols="3">
              <v-list-item-subtitle>Started at {{ new Date(session.started_at).toLocaleString() }}</v-list-item-subtitle>
            </v-col>
            <v-col cols="3">
              <v-list-item-subtitle>Finished at {{ new Date(session.finished_at).toLocaleString() }}</v-list-item-subtitle>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10">
                <v-table>
                    <thead>
                      <tr>
                        <th>Exercise</th>
                        <th>Set</th>
                        <th>Planned Reps</th>
                        <th>Performed Reps</th>
                        <th>Planned Weight</th>
                        <th>Performed Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr v-for="detail in getWorkoutSessionPerformance(session.id)" :key="detail.id">
                            <td>{{ detail.exercises.name }}</td>
                            <td>{{ detail.set }}</td>
                            <td>{{ detail.planned_reps }}</td>
                            <td>{{ detail.performed_reps }}</td>
                            <td>{{ detail.planned_weight }}</td>
                            <td>{{ detail.performed_weight }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
          </v-row>
        </div>
    </v-list-item>
  </v-list>
  </div>
</template>

<style scoped>
.card-content {
  padding: 10px;
}
</style>