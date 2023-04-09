drop table scheduled_workout_plans;

alter table workout_schedule
  add column workout_plan_id integer references workout_plans(id) on delete cascade;