import type { Database } from '~/types/supabase'

export const useDaysOfWeekStore = defineStore('daysOfWeek', {
    state: () => ({
        daysOfWeek: undefined as Database['public']['Tables']['days_of_week']['Row'][] | undefined
    }),
  
    actions: {
      async fetchData() {
        loadDaysOfWeek().then((data) => {
          this.daysOfWeek  = data?.map((day) => ({id: day.id, name: day.name}))
        });
      }
    }
})

export const useExercisesStore = defineStore('exercises', {
    state: () => ({
        exercises: undefined as Database['public']['Tables']['exercises']['Row'][] | undefined
    }),
  
    actions: {
      async fetchData() {
        loadExercises().then((data) => {
          this.exercises  = data?.map((exercise) => (
            {
                id: exercise.id,
                name: exercise.name,
                description: exercise.description,
                muscles: exercise.muscles,
            }
            ))
        });
      }
    }
})

export const useWorkoutsStore = defineStore('workouts', {
    state: () => ({
        data: undefined as Database['public']['Tables']['workouts']['Row'][] | undefined
    }),

    actions: {
        async fetchData() {
            loadItems('workouts').then((data) => {
                this.data = data?.map((workout) => (
                    {
                        id: workout.id,
                        created_at: workout.created_at,
                        updated_at: workout.updated_at,
                        name: workout.name,
                        description: workout.description,
                        user_id: workout.user_id,
                    }
                ))
            })
        }
    }
})

export const useWorkoutPlansStore = defineStore('workoutPlans', {
    state: () => ({
        data: undefined as Database['public']['Tables']['workout_plans']['Row'][] | undefined
    }),

    actions: {
        async fetchData() {
            loadItems('workout_plans').then((data) => {
                this.data = data?.map((workout) => (
                    {
                        id: workout.id,
                        created_at: workout.created_at,
                        updated_at: workout.updated_at,
                        name: workout.name,
                        description: workout.description,
                        user_id: workout.user_id,
                    }
                ))
            })
        }
    }
})

export const usePlannedWorkoutsStore = defineStore('plannedWorkouts', {
    state: () => ({
        plannedWorkouts: undefined as Database['public']['Tables']['planned_workouts']['Row'][] | undefined
    }),

    actions: {
        async fetchData() {
            loadPlannedWorkouts().then((data) => {
                this.plannedWorkouts = data?.map((plannedWorkout) => (
                    {
                        id: plannedWorkout.id,
                        workout_plan_id: plannedWorkout.workout_plan_id,
                        workout_id: plannedWorkout.workout_id,
                        day_of_week_id: plannedWorkout.day_of_week_id,
                        time_of_day: plannedWorkout.time_of_day,
                    }
                ))
            })
        }
    }
})

export const useWorkoutExercisesStore = defineStore('workoutExercises', {
    state: () => ({
        workoutExercises: undefined as Database['public']['Tables']['workout_exercises']['Row'][] | undefined
    }),

    actions: {
        async fetchData() {
            loadWorkoutExercises().then((data) => {
                this.workoutExercises = data?.map((workoutExercise) => (
                    {
                        id: workoutExercise.id,
                        workout_id: workoutExercise.workout_id,
                        exercise_id: workoutExercise.exercise_id,
                        sets: workoutExercise.sets,
                        reps: workoutExercise.reps,
                        weight: workoutExercise.weight,
                        resttime: workoutExercise.resttime,
                        rir: workoutExercise.rir,
                        created_at: workoutExercise.created_at,
                        updated_at: workoutExercise.updated_at,
                        valid: workoutExercise.valid,
                    }
                ))
            })
        }
    }
})

export const useWorkoutScheduleStore = defineStore('workoutSchedule', {
    state: () => ({
        workoutSchedule: undefined as Database['public']['Tables']['workout_schedule']['Row'][] | undefined
    }),

    actions: {
        async fetchData() {
            loadWorkoutSchedule().then((data) => {
                this.workoutSchedule = data?.map((workoutSchedule) => (
                    {
                        id: workoutSchedule.id,
                        user_id: workoutSchedule.user_id,
                        created_at: workoutSchedule.created_at,
                        updated_at: workoutSchedule.updated_at,
                        starts_at: workoutSchedule.starts_at,
                        ends_at: workoutSchedule.ends_at,
                        workout_plan_id: workoutSchedule.workout_plan_id,
                    }
                ))
            })
        }
    }
})

export const useCalendarEventStore = defineStore('calendarEvent', {
    state: () => ({
        rawEvents: undefined
    }),

    actions: {
      async loadCalendarEventData() {
        const supabase = useSupabaseClient()
        const { data, error } = await supabase
          .from('v_scheduled_workouts')
          .select(`*`)
        if (error) {
          console.log(error)
        } else {
          return data
        }
      },
      async fetchData() {
        this.rawEvents = await this.loadCalendarEventData()
      }
    },
    getters: {
      events: (state) => {
        const instances: CalendarEvent[] = [];
        if (!state.rawEvents) {
          return instances;
        }
        state.rawEvents.forEach((event) => {
          const startDate = new Date(event.starts_at);
          const endDate = new Date(event.ends_at);
        
          let currentDate = new Date(startDate);
          const timeOfDay = event.time_of_day ? event.time_of_day.split(":") : [0, 0];
        
          while (currentDate <= endDate) {
            if (currentDate.getDay() === event.day_of_week_id) {
              const start = new Date(currentDate);
              start.setHours(timeOfDay[0], timeOfDay[1], 0, 0);
        
              const end = new Date(start.getTime() + 90 * 60 * 1000);
        
              instances.push({
                title: event.workout_name,
                start: start.toISOString(),
                end: end.toISOString(),
                color: event.valid ? "orange" : "#FF0000",
                workoutId: event.workout_id,
                workoutPlanId: event.workout_plan_id,
                workoutName: event.workout_name,
                workoutPlanName: event.workout_plan_name,
                workoutDescription: event.workout_description,
                valid: event.valid
              });
            }
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });
        return instances;
      }
  },
})