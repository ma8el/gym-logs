<script setup lang="ts">
  import FullCalendar from '@fullcalendar/vue3'
  import interactionPlugin from '@fullcalendar/interaction'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import dayGridPlugin from '@fullcalendar/daygrid'

  const headerToolbar = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  }

  const calendarOptions = {
    plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: headerToolbar,
    themeSystem: 'bootstrap5',
    nowIndicator: true,
    editable: true,
    selectable: true,
    locale: 'en',
    firstDay: 1,
    initialEvents: [
      { title: 'nice event', start: new Date() }
    ]
  }
</script>
<template>
    <FullCalendar :options='calendarOptions'/>
</template>

<style scoped>
.fc {
  min-width: 500px;
  min-height: 500px;
  height: 80vh;
}

</style>