alter table workout_exercises add column user_id uuid not null references profiles(id);

alter policy "Viewable by owner." on workout_exercises
  using (
    auth.uid() = user_id
);

alter policy "Modifiable by owner." on workout_exercises
  using (
    auth.uid() = user_id
);

alter table planned_workouts add column user_id uuid not null references profiles(id);

alter policy "Viewable by owner." on planned_workouts
  using (
    auth.uid() = user_id
);

alter policy "Modifiable by owner." on planned_workouts
  using (
    auth.uid() = user_id
);

alter table scheduled_workout_plans add column user_id uuid not null references profiles(id);

alter policy "Viewable by owner." on scheduled_workout_plans
  using (
    auth.uid() = user_id
);

alter policy "Modifiable by owner." on scheduled_workout_plans
  using (
    auth.uid() = user_id
);