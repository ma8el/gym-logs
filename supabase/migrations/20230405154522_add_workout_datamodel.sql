CREATE TABLE days_of_week (
  id serial NOT NULL,
  name text NOT NULL,
  PRIMARY KEY (id)
);

alter table days_of_week
  enable row level security;

create policy "Viewable by users." on days_of_week
  for select using (
    auth.uid() in (
      select id from profiles
    )
);

CREATE TABLE muscles (
  id serial NOT NULL,
  name text NOT NULL,
  description text,
--  body_part text NOT NULL,
  PRIMARY KEY (id)
);

alter table muscles
  enable row level security;

create policy "Viewable by users." on muscles
  for select using (
    auth.uid() in (
      select id from profiles
    )
  );

CREATE TABLE exercises (
  id serial NOT NULL,
  name text NOT NULL,
  description text,
  muscles int[],
  PRIMARY KEY (id)
);

alter table exercises
  enable row level security;

create policy "Viewable by users." on exercises
  for select using (
    auth.uid() in (
      select id from profiles
    )
  );

CREATE TABLE workouts (
  id serial NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES profiles(id)
);

alter table workouts
  enable row level security;

create policy "Viewable by owner." on workouts
  for select using (
    auth.uid() = user_id
);

create policy "Modifiable by owner." on workouts
  for update using (
    auth.uid() = user_id
);

create policy "Writable by users." on workouts
  for insert with check (
    auth.uid() in (
      select id from profiles
    )
);

CREATE TABLE workout_exercises (
  id serial NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  workout_id int NOT NULL,
  exercise_id int NOT NULL,
  sets int NOT NULL,
  reps int NOT NULL,
  weight int NOT NULL,
  resttime int,
  rir int,
  PRIMARY KEY (id),
  FOREIGN KEY (workout_id) REFERENCES workouts(id),
  FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);

alter table workout_exercises
  enable row level security;

create policy "Viewable by owner." on workout_exercises
  for select using (
    id in (
      select workout_exercises.id from workout_exercises
      join workouts
      on workout_exercises.workout_id = workouts.id
      where user_id = auth.uid()
    )
);

create policy "Modifiable by owner." on workout_exercises
  for update using (
    id in (
      select workout_exercises.id from workout_exercises
      join workouts
      on workout_exercises.workout_id = workouts.id
      where user_id = auth.uid()
    )
);

create policy "Writable by users." on workout_exercises
  for insert with check (
    auth.uid() in (
      select id from profiles
    )
);

CREATE TABLE workout_plans (
  id serial NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES profiles(id)
);

alter table workout_plans
  enable row level security;

create policy "Viewable by owner." on workout_plans
  for select using (
    auth.uid() = user_id
);

create policy "Modifiable by owner." on workout_plans
  for update using (
    auth.uid() = user_id
);

create policy "Writable by users." on workout_plans
  for insert with check (
    auth.uid() in (
      select id from profiles
    )
  );

CREATE TABLE planned_workouts (
  id serial NOT NULL,
  workout_id int NOT NULL,
  workout_plan_id int NOT NULL,
  day_of_week_id int NOT NULL,
  time_of_day timestamp with time zone,
  PRIMARY KEY (id),
  FOREIGN KEY (workout_id) REFERENCES workouts(id),
  FOREIGN KEY (workout_plan_id) REFERENCES workout_plans(id),
  FOREIGN KEY (day_of_week_id) REFERENCES days_of_week(id)
);

alter table planned_workouts
  enable row level security;

create policy "Viewable by owner." on planned_workouts
  for select using (
    id in (
        select planned_workouts.id from planned_workouts
        join workout_plans
        on planned_workouts.workout_plan_id = workout_plans.id
        where user_id = auth.uid()
    )
);

create policy "Modifiable by owner." on planned_workouts
  for update using (
    id in (
        select planned_workouts.id from planned_workouts
        join workout_plans
        on planned_workouts.workout_plan_id = workout_plans.id
        where user_id = auth.uid()
    )
);

create policy "Writable by users." on planned_workouts
  for insert with check (
    auth.uid() in (
      select id from profiles
    )
  );

CREATE TABLE workout_schedule (
  id serial NOT NULL,
  user_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  starts_at timestamp with time zone NOT NULL,
  ends_at timestamp with time zone NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES profiles(id)
);

alter table workout_schedule
  enable row level security;

create policy "Viewable by owner." on workout_schedule
  for select using (
    auth.uid() = user_id
);

create policy "Modifiable by owner." on workout_schedule
  for update using (
    auth.uid() = user_id
);

create policy "Writable by users." on workout_schedule
  for insert with check (
    auth.uid() in (
      select id from profiles
    )
  );

CREATE TABLE scheduled_workout_plans (
    id serial NOT NULL,
    workout_plan_id int NOT NULL,
    workout_schedule_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (workout_plan_id) REFERENCES workout_plans(id),
    FOREIGN KEY (workout_schedule_id) REFERENCES workout_schedule(id)
);

alter table scheduled_workout_plans
  enable row level security;

create policy "Viewable by owner." on scheduled_workout_plans
  for select using (
    id in (
      select scheduled_workout_plans.id from scheduled_workout_plans
      join workout_schedule 
      on workout_schedule.id = scheduled_workout_plans.workout_schedule_id
      where user_id = auth.uid()
    )
);

create policy "Modifiable by owner." on scheduled_workout_plans
  for update using (
    id in (
      select scheduled_workout_plans.id from scheduled_workout_plans
      join workout_schedule 
      on workout_schedule.id = scheduled_workout_plans.workout_schedule_id
      where user_id = auth.uid()
    )
);

create policy "Writable by users." on scheduled_workout_plans
  for insert with check (
    auth.uid() in (
      select id from profiles
    )
);

CREATE TABLE workout_sessions (
  id serial NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  workout_id int NOT NULL,
  user_id uuid NOT NULL,
  scheduled_at timestamp with time zone NOT NULL,
  started_at timestamp with time zone,
  finished_at timestamp with time zone,
  performance jsonb,
  notes text,
  PRIMARY KEY (id),
  FOREIGN KEY (workout_id) REFERENCES workouts(id)
);

alter table workout_sessions
  enable row level security;

create policy "Viewable by owner." on workout_sessions
  for select using (
    auth.uid() = user_id
);

create policy "Modifiable by owner." on workout_sessions
  for update using (
    auth.uid() = user_id
);

create policy "Writable by users." on workout_sessions
  for insert with check (
    auth.uid() in (
      select id from profiles
    )
);