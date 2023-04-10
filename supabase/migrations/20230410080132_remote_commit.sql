alter table "public"."planned_workouts" drop constraint "planned_workouts_workout_plan_id_fkey";

alter table "public"."planned_workouts" alter column "time_of_day" set data type time without time zone using "time_of_day"::time without time zone;

alter table "public"."planned_workouts" add constraint "planned_workouts_workout_plan_id_fkey" FOREIGN KEY (workout_plan_id) REFERENCES workout_plans(id) ON DELETE CASCADE not valid;

alter table "public"."planned_workouts" validate constraint "planned_workouts_workout_plan_id_fkey";


