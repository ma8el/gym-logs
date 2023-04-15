alter table workout_sessions drop column if exists performance;

create table workout_session_performances (
    id serial primary key,
    user_id uuid not null references profiles(id) on delete cascade,
    workout_session_id integer not null references workout_sessions(id) on delete cascade,
    exercise_id integer not null,
    set integer not null,
    planned_reps integer not null,
    performed_reps integer not null,
    planned_weight double precision not null,
    performed_weight double precision not null,
    planned_rir integer not null,
    performed_rir integer not null,
    resttime integer not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

alter table "public"."workout_session_performances" enable row level security;

create policy "Users can update own session performance."
on "public"."workout_session_performances"
as permissive
for update
to public
using ((auth.uid() = user_id));


create policy "Session performances are viewable by user."
on "public"."workout_session_performances"
as permissive
for select
to public
using ((auth.uid() = user_id));