<script setup lang="ts">
  const loading = ref(false)
  const userStatistics = ref<UserStatistics>({
      id: 0,
      at: new Date(),
      weight: 80,
      height: 180,
      age: 25,
      gender: 'male',
      performance: {
        id: 0,
        at: new Date(),
        squat: 180,
        bench: 110,
        deadlift: 200,
        overhead: 70,
      }
    })

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Bench',
        backgroundColor: 'orange',
        borderColor: 'orange',
        data: [40, 39, 10, 40, 39, 80, 40]
      },
      {
        label: 'Goal',
        backgroundColor: '#222',
        borderColor: '#222',
        pointStyle: false,
        borderDash: [5, 5],
        data: [100, 100, 100, 100, 100, 100, 100]
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 120,
      }
    }
  }
  onMounted(() => {
    const userStore = useUserStore()
    userStore.fetchUser()
  })
</script>

<template>
  <NuxtLayout name="app">
    <h1>Performance Dashboard</h1>
    <div class="dashboard">
        <v-row>
          <v-col cols="3">
            <v-card>
              <v-card-title>
                <h4>You</h4>
              </v-card-title>
              <v-card-text>
                <p>Gender: {{ userStatistics.gender }}</p>
                <p>Age: {{ userStatistics.age }} years</p>
                <p>weight: {{ userStatistics.weight }}kg</p>
                <p>Height: {{ userStatistics.height }}cm</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card>
              <v-card-title>
                <h4>Performance</h4>
              </v-card-title>
              <v-card-text>
                <p>Squat: {{ userStatistics.performance.squat }}kg</p>
                <p>Deadlift: {{ userStatistics.performance.deadlift }}kg</p>
                <p>Bench: {{ userStatistics.performance.bench }}kg</p>
                <p>Overhead: {{ userStatistics.performance.overhead }}kg</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      <v-row class="double-row">
        <v-col cols="6">
          <v-card>
            <v-card-title>
              Bench
            </v-card-title>
            <v-card-text>
              <LineChart :data="data" :options="options" />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-card-title>
              Squat
            </v-card-title>
            <v-card-text>
              <LineChart :data="data" :options="options" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </NuxtLayout>
</template>

<style scoped>
h1 {
  margin-bottom: 10px;
}

p {
  font-weight: bold;
}

v-card {
  margin: 10px;
  padding: 10px;
}

.dashboard {
  width: 100hv;
  height: auto;
  padding: 10px;
}

.double-row {
  height: 2rem;
}
</style>