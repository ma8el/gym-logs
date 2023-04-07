create policy "Deletable by owner." on workouts
  for delete using (
    auth.uid() = user_id
);

create policy "Deletable by owner." on workout_exercises
  for delete using (
    id in (
      select workout_exercises.id from workout_exercises
      join workouts
      on workout_exercises.workout_id = workouts.id
      where user_id = auth.uid()
    )
);

create policy "Deletable by owner." on workout_plans
  for delete using (
    auth.uid() = user_id
);

create policy "Deletable by owner." on planned_workouts
  for delete using (
    id in (
        select planned_workouts.id from planned_workouts
        join workout_plans
        on planned_workouts.workout_plan_id = workout_plans.id
        where user_id = auth.uid()
    )
);

create policy "Deletable by owner." on workout_schedule
  for delete using (
    auth.uid() = user_id
);

create policy "Deletable by owner." on scheduled_workout_plans
  for delete using (
    id in (
      select scheduled_workout_plans.id from scheduled_workout_plans
      join workout_schedule 
      on workout_schedule.id = scheduled_workout_plans.workout_schedule_id
      where user_id = auth.uid()
    )
);

create policy "Deletable by owner." on workout_sessions
  for delete using (
    auth.uid() = user_id
);