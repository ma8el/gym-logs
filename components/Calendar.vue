<script setup lang="ts">
  import FullCalendar from '@fullcalendar/vue3'
  import interactionPlugin from '@fullcalendar/interaction'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import dayGridPlugin from '@fullcalendar/daygrid'

  const calendarEventStore = useCalendarEventStore()
  const showEventDetails = ref(false)
  const eventDetails = ref()

  const headerToolbar = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  }

  const calendarOptions = computed(() => {
    return {
      plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: headerToolbar,
      themeSystem: 'bootstrap5',
      nowIndicator: true,
      editable: true,
      selectable: true,
      locale: 'en',
      firstDay: 1,
      events: calendarEventStore.events,
      eventClick: handleEventClick,
      }
  })

  const handleEventClick = (info) => {
    eventDetails.value = {
      title: info.event.title,
      start: info.event.start.toISOString(),
      end: info.event.end.toISOString(),
      workoutId: info.event._def.extendedProps.workoutId,
      workoutPlanId: info.event._def.extendedProps.workoutPlanId,
      workoutName: info.event._def.extendedProps.workoutName,
      workoutPlanName: info.event._def.extendedProps.workoutPlanName,
      workoutDescription: info.event._def.extendedProps.workoutDescription,
      valid: info.event._def.extendedProps.valid
    }
    showEventDetails.value = true
  }
</script>

<template>
  <FullCalendar :options='calendarOptions'/>
  <v-dialog
    v-model="showEventDetails"
    width="auto"
  >
    <CalendarEventDetails :eventDetails="eventDetails" @close="showEventDetails = !showEventDetails"/>
  </v-dialog>
</template>

<style scoped>
.fc {
  min-width: 500px;
  min-height: 500px;
  height: 80vh;
}

</style>