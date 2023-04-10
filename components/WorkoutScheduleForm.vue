<script setup lang="ts"> 
  import VueDatePicker from '@vuepic/vue-datepicker';

  const supabase = useSupabaseClient()
  const userStore = useUserStore()
  const workoutScheduleStore = useWorkoutScheduleStore()

  const props = defineProps(['workoutPlanId'])
  const emit = defineEmits(['closeWorkoutScheduleForm'])

  const schedule_range = ref()
  const alreadyScheduled = ref(false)

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
  alreadyScheduled.value = true
  emit('closeWorkoutScheduleForm')
  }

  const updateWorkoutSchedule = async () => {
    const starts_at = schedule_range.value[0]
    let ends_at = schedule_range.value[1]
    if (starts_at.getTime() === ends_at.getTime()) {
      // Note add 1000 days to the date
      ends_at = new Date(starts_at.getTime() + 86400000000)
    }
    const { error } = await supabase
      .from('workout_schedule')
      .update({
        updated_at: new Date(),
        starts_at: starts_at,
        ends_at: ends_at,
      })
      .eq('workout_plan_id', props.workoutPlanId)
    emit('closeWorkoutScheduleForm')
  }

  onBeforeMount(() => {
    if (workoutScheduleStore.workoutSchedule) {
      const workoutScheduleEntry = workoutScheduleStore.workoutSchedule
        .filter((workoutSchedule: any) => 
          workoutSchedule.workout_plan_id === props.workoutPlanId)
      if (workoutScheduleEntry.length > 0) {
        schedule_range.value = [new Date(workoutScheduleEntry[0].starts_at), new Date(workoutScheduleEntry[0].ends_at)]
      }
    }
  })
  onMounted(() => {
    alreadyScheduled.value = typeof schedule_range.value !== 'undefined'
  })
</script>

<template>
  <v-card>
    <v-card-title>
      <span v-if="alreadyScheduled" class="text-h5">Reschedule your workout plan</span>
      <span v-else class="text-h5">Schedule your workout plan</span>
    </v-card-title>
    <v-card-text>
      <v-form>
      <v-row>
        <v-col cols="auto">
          <div class="text-h8 mb-1">Select a date range</div>
          <div class="text-subtitle-2">Select the same date if you want to schedule without end</div>
          <v-alert
            v-if="alreadyScheduled"
            type="warning"
            class="mt-2"
            text="You already have a schedule for this workout plan. Select a new date range to reschedule."
          />
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
            v-if="!alreadyScheduled"
            class="me-4"
            @click="submit"
          >
            submit
          </v-btn>
          <v-btn
            v-else
            class="me-4"
            @click="updateWorkoutSchedule"
          >
            submit
          </v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn
            class="me-4"
            @click="emit('closeWorkoutScheduleForm')"
          >
            close
          </v-btn>
        </v-col>
      </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>