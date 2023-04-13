<script setup lang="ts">
  const dialog = ref(false)

  const weightStore = useWeightStore()
  const weightGoal = ref(70)
  const currentWeight = ref()
  const lastUpdated = ref()

  onMounted(() => {
    weightStore.getLatestWeight().then((weight) => {
      if (weight) {
        currentWeight.value = weight.weight
        lastUpdated.value = new Date(weight.created_at).toLocaleDateString()
      }
    })
  })

  watch(weightStore, (newVal) => {
    if (newVal.weights) {
      currentWeight.value = newVal.weights[0].weight
      lastUpdated.value = new Date(newVal.weights[0].created_at).toLocaleDateString()
    }
  })
</script>

<template>
  <v-card>
    <v-card-title>
      <div class="text-h5">Weight</div>
    </v-card-title>
    <v-card-text>
      <div class="text-subtitle-1">Last entry: {{ lastUpdated }}</div>
      <div class="text-subtitle-1">Weight: {{ currentWeight }} kg</div>
      <div class="text-subtitle-1">Goal: {{ weightGoal }} kg</div>
      <v-card-actions>
      <v-dialog
        v-model="dialog"
        width="800"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            class="primary"
            v-bind="props"
          >
            Add weight
          </v-btn>
        </template>
        <WeightForm @close-weight-form="dialog = false"/>
      </v-dialog>
    </v-card-actions>
    </v-card-text>
  </v-card>
</template>