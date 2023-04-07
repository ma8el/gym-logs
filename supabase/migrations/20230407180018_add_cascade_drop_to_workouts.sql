ALTER TABLE workout_exercises
DROP CONSTRAINT workout_exercises_workout_id_fkey,
ADD CONSTRAINT workout_exercises_workout_id_fkey
    FOREIGN KEY (workout_id)
    REFERENCES workouts(id)
    ON DELETE CASCADE;