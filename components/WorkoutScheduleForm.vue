<script setup lang="ts"> 
  import { useField, useForm } from 'vee-validate'
  import VueDatePicker from '@vuepic/vue-datepicker';

  const supabase = useSupabaseClient()
  const userStore = useUserStore()

  const props = defineProps(['workoutPlanId'])
  const emit = defineEmits(['closeWorkoutScheduleForm'])

  const schedule_range = ref()

  const submit = async () => {
    const starts_at = schedule_range.value[0]
    let ends_at = schedule_range.value[1]
    if (starts_at.getTime() === ends_at.getTime()) {
      // Note add 1000 days to the date
      ends_at = new Date(starts_at.getTime() + 86400000000)
    }

    const { error } = await supabase
      .from('workout_schedule')
      .insert({
        created_at: new Date(),
        updated_at: new Date(),
        user_id: userStore.user,
        starts_at: starts_at,
        ends_at: ends_at,
        workout_plan_id: props.workoutPlanId,
      })
    emit('closeWorkoutScheduleForm')
  }
</script>

<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Schedule your workout plan</span>
    </v-card-title>
    <v-card-text>
      <v-form>
      <v-row>
        <v-col cols="auto">
          <div class="text-h8 mb-1">Select a date range</div>
          <div class="text-subtitle-2">Select the same date if you want to schedule without end</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5">
          <VueDatePicker :enable-time-picker="false" :auto-apply="true" range v-model="schedule_range" :teleport="true"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <v-btn
            class="me-4"
            @click="submit"
          >
            submit
          </v-btn>
        </v-col>
        <v-col cols="2">
        </v-col>
      </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>