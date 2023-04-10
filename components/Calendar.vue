<script setup lang="ts">
  import FullCalendar from '@fullcalendar/vue3'
  import interactionPlugin from '@fullcalendar/interaction'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import dayGridPlugin from '@fullcalendar/daygrid'

  interface CalendarEvent {
    title: string
    start: string
    end: string
  }

  const supabase = useSupabaseClient()
  const rawEvents = ref([])
  const events = ref()

  const headerToolbar = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  }

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from('v_scheduled_workouts')
      .select(`*`)
    if (error) {
      console.log(error)
    } else {
      rawEvents.value = data
    }
  }

  const createEvents = async () => {
    const instances: CalendarEvent[] = [];
    if (!rawEvents.value) {
      return instances;
    }
    rawEvents.value.forEach((event) => {
      const startDate = new Date(event.starts_at);
      const endDate = new Date(event.ends_at);
    
      let currentDate = new Date(startDate);
      const timeOfDay = event.time_of_day ? event.time_of_day.split(":") : [0, 0];
    
      while (currentDate <= endDate) {
        if (currentDate.getDay() === event.day_of_week_id) {
          const start = new Date(currentDate);
          start.setHours(timeOfDay[0], timeOfDay[1], 0, 0);
    
          const end = new Date(start);
          end.setHours(end.getHours() + 1);
    
          instances.push({
            title: `${event.workout_plan_name}: ${event.workout_name}`,
            start: start.toISOString(),
            end: end.toISOString(),
          });
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    return instances;
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
      events: events.value,
    }
  })

  onMounted(async () => {
    await loadEvents()
    events.value = await createEvents()
  })

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