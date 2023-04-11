create or replace view "public"."v_scheduled_workouts" as  SELECT DISTINCT ON (planned_workouts.id) schedule.id,
    workout_plans.id AS workouts_plan_id,
    workouts.id AS workout_id,
    schedule.user_id,
    schedule.starts_at,
    schedule.ends_at,
    workout_plans.name AS workout_plan_name,
    workout_plans.description AS workout_plan_description,
    workouts.name AS workout_name,
    workouts.description AS workout_description,
    planned_workouts.day_of_week_id,
    planned_workouts.time_of_day,
    bool_and(workout_exercises.valid) OVER (PARTITION BY schedule.id) AS valid
   FROM ((((( SELECT workout_schedule.id,
            workout_schedule.user_id,
            workout_schedule.created_at,
            workout_schedule.updated_at,
            workout_schedule.starts_at,
            workout_schedule.ends_at,
            workout_schedule.workout_plan_id
           FROM workout_schedule) schedule
     JOIN workout_plans ON ((schedule.workout_plan_id = workout_plans.id)))
     JOIN planned_workouts ON ((planned_workouts.workout_plan_id = workout_plans.id)))
     JOIN workouts ON ((planned_workouts.workout_id = workouts.id)))
     JOIN workout_exercises ON ((workout_exercises.workout_id = workouts.id)));