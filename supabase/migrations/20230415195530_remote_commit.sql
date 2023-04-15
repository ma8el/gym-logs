create type "auth"."code_challenge_method" as enum ('s256', 'plain');

create table "auth"."flow_state" (
    "id" uuid not null,
    "user_id" uuid,
    "auth_code" text not null,
    "code_challenge_method" auth.code_challenge_method not null,
    "code_challenge" text not null,
    "provider_type" text not null,
    "provider_access_token" text,
    "provider_refresh_token" text,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


CREATE UNIQUE INDEX flow_state_pkey ON auth.flow_state USING btree (id);

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);

alter table "auth"."flow_state" add constraint "flow_state_pkey" PRIMARY KEY using index "flow_state_pkey";


drop policy "Users can insert weigths." on "public"."weight";

drop policy "Users can update own weight." on "public"."weight";

drop policy "Weigths are viewable by user." on "public"."weight";

alter table "public"."weight" drop constraint "weight_user_id_fkey";

drop table "public"."weight";

create table "public"."weights" (
    "id" integer not null default nextval('weight_id_seq'::regclass),
    "user_id" uuid,
    "weight" double precision not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."weights" enable row level security;

alter sequence "public"."weight_id_seq" owned by "public"."weights"."id";

CREATE UNIQUE INDEX weights_pkey ON public.weights USING btree (id);

alter table "public"."weights" add constraint "weights_pkey" PRIMARY KEY using index "weights_pkey";

alter table "public"."weights" add constraint "weights_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."weights" validate constraint "weights_user_id_fkey";

create or replace view "public"."v_scheduled_workout_sessions" as  SELECT schedule.id,
    workout_plans.id AS workouts_plan_id,
    workouts.id AS workout_id,
    schedule.user_id,
    g.date,
    schedule.starts_at,
    schedule.ends_at,
    workout_plans.name AS workout_plan_name,
    workout_plans.description AS workout_plan_description,
    workouts.name AS workout_name,
    workouts.description AS workout_description,
    exercises.id AS exercise_id,
    exercises.name AS exercise_name,
    workout_exercises.sets,
    workout_exercises.reps,
    workout_exercises.weight,
    workout_exercises.rir,
    workout_exercises.resttime,
    planned_workouts.day_of_week_id,
    planned_workouts.time_of_day,
    workout_exercises.valid
   FROM ((((((( SELECT workout_schedule.id,
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
     JOIN workout_exercises ON ((workout_exercises.workout_id = workouts.id)))
     JOIN exercises ON ((workout_exercises.exercise_id = exercises.id)))
     JOIN LATERAL generate_series(schedule.starts_at, schedule.ends_at, '1 day'::interval) g(date) ON (true))
  WHERE ((EXTRACT(dow FROM g.date))::integer = planned_workouts.day_of_week_id);


create policy "Users can insert weigths."
on "public"."weights"
as permissive
for insert
to public
with check ((auth.uid() IN ( SELECT profiles.id
   FROM profiles)));


create policy "Users can update own weight."
on "public"."weights"
as permissive
for update
to public
using ((auth.uid() = user_id));


create policy "Weigths are viewable by user."
on "public"."weights"
as permissive
for select
to public
using ((auth.uid() = user_id));



