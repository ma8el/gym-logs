<script setup lang="ts">
  const supabase = useSupabaseClient()

  const loading = ref(false)
  const weightStore = useWeightStore()

  const weightChannel = supabase
     .channel('weights-table-change')
     .on(
         'postgres_changes',
         {
           event: '*',
           schema: 'public',
           table: 'weights',
         },
         () => weightStore.fetchWeights()
       )

  const weightData = ref({labels: [], datasets: [{}]})
  const fetchChartData = async () => {
    loading.value = true
    const labels = await weightStore.getSortedDates()
    const data = await weightStore.getSortedWeights()
    console.log(data)
    weightData.value = {
        labels: labels,
        datasets: [
          {
            label: 'Weight',
            data: data,
            borderColor: 'orange',
            backgroundColor: 'orange',
            fill: false,
            tension: 0.1,
          },
        ],
    }
    loading.value = false
  }
  const weightOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date and Time',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Weight',
          },
        },
      },
    };

  onBeforeMount(() => {
    weightStore.fetchWeights()
  })
  
  onMounted(() => {
    weightChannel.subscribe()
    fetchChartData()
  })

  onUnmounted(() => {
    weightChannel.unsubscribe()
  })

  watch(weightStore.getSortedWeights(), () => {
    fetchChartData()
  })
</script>

<template>
  <NuxtLayout name="app">
    <h1>Performance Dashboard</h1>
    <div class="dashboard">
        <v-row>
          <v-col cols="3">
            <YouCard/>
          </v-col>
          <v-col cols="3">
            <WeightCard/>
          </v-col>
          <v-col cols="3">
            <v-card>
              <v-card-title>
                <h4>Performance</h4>
              </v-card-title>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      <v-row class="double-row">
        <v-col cols="6">
          <v-card>
            <v-card-title>
              Weight
            </v-card-title>
            <v-card-text>
              <LineChart :data="weightData" :options="weightOptions" />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-card-title>
              Squat
            </v-card-title>
            <v-card-text>
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