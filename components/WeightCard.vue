<script setup lang="ts">
  const lastUpdated = ref('2021-01-01')
  const currentWeight = ref(80)
  const weightGoal = ref(70)
  const dialog = ref(false)

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
        <!--Add weight form here-->
      </v-dialog>
    </v-card-actions>
    </v-card-text>
  </v-card>
</template>