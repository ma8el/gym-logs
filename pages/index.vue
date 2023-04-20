<script setup lang="ts">
  const supabase = useSupabaseClient()

  const loading = ref(false)
  const weightStore = useWeightStore()
  const workoutSessionStore = useWorkoutSessionStore()

  const workoutPerformance = ref()
  const weightData = ref({labels: [], datasets: [{}]})

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

  const fetchChartData = async () => {
    loading.value = true
    const labels = await weightStore.getSortedDates()
    const data = await weightStore.getSortedWeights()
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
  const options = {
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

  const workoutPerformanceByExercise = (exercise: string) => {
    const exerciseData = workoutPerformance.value.filter((data) => data.name === exercise)
                           .map((data) => {
                             return {
                               date: new Date(data.created_at).toISOString().split('T')[0],
                               name: data.name,
                               tonnage: data.tonnage,
                             }
                           })
    return exerciseData
  }

  const aggregateTonnageByDate = (data) => {
    const aggregatedTonnage = {};
    for (const entry of data) {
      const { date, tonnage } = entry;
  
      if (aggregatedTonnage[date]) {
        aggregatedTonnage[date] += tonnage;
      } else {
        aggregatedTonnage[date] = tonnage;
      }
    }
    return aggregatedTonnage;
  }

  const createExerciseChartData = (exercise: string) => {
    const exerciseData = workoutPerformanceByExercise(exercise)
    const aggregatedTonnage = aggregateTonnageByDate(exerciseData)
    const labels = Object.keys(aggregatedTonnage)
    const data = Object.values(aggregatedTonnage)
    return {
      labels: labels,
      datasets: [
        {
          label: exercise,
          data: data,
          borderColor: 'orange',
          backgroundColor: 'orange',
          fill: false,
          tension: 0.1,
        },
      ],
    }
  }

  const getDistinctExercises = (workoutPerformance, key) => {
    return workoutPerformance.reduce((distinctValues, currentItem) => {
      if (!distinctValues.includes(currentItem[key])) {
        distinctValues.push(currentItem[key]);
      }
      return distinctValues;
    }, []);
  }

  onBeforeMount(async () => {
    await weightStore.fetchWeights()
    workoutPerformance.value = await workoutSessionStore.fetchGroupedWorkoutSessionPerformanceData()
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
        <v-col cols="6">
          <v-card>
            <v-card-title>
              Weight
            </v-card-title>
            <v-card-text>
              <LineChart :data="weightData" :options="options" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div v-if="workoutPerformance">
        <v-row>
          <v-col cols="6" v-for="exercise in getDistinctExercises(workoutPerformance, 'name')">
            <v-card>
              <v-card-title>
                {{ exercise }}
              </v-card-title>
              <v-card-text>
                <LineChart :data="createExerciseChartData(exercise)" :options="options" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>  
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