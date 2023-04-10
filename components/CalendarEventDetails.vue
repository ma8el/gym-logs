<script setup lang="ts">
  const props = defineProps(['eventDetails'])
  const emit = defineEmits(['close'])

  onMounted(() => {
    console.log(props.eventDetails.valid)
  })
</script>

<template>
   <v-card>
      <v-card-title>
        {{ eventDetails.title.toUpperCase() }}
      </v-card-title>
      <v-alert
            v-if="!eventDetails.valid"
            class="mt-2 workout-alert"
            type="warning"
            text="You have not fully defined this workout.
                  Please go to the workout page and define it."
      />
      <v-card-text>
        <v-list>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>
                    Start
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ new Date(eventDetails.start).toLocaleString() }}
                </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>
                    End
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ new Date(eventDetails.end).toLocaleString() }}
                </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>
                    Workout
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ eventDetails.workoutName }}
                </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>
                    Workout Plan
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ eventDetails.workoutPlanName }}
                </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>
                    Description
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ eventDetails.workoutDescription }}
                </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-btn
          color="orange"
          class="ma-2"
          :disabled="!eventDetails.valid"
        >
          Start Workout
        </v-btn>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="orange"
          variant="text"
          @click="emit('close')"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>

</template>

<style scoped>
  .workout-alert {
      white-space: pre-line;
  }
</style>