ALTER TABLE workout_exercises ADD COLUMN valid BOOLEAN NOT NULL DEFAULT FALSE;

CREATE FUNCTION workout_exercises_valid_check() 
RETURNS trigger AS $$
BEGIN
    IF NEW.sets IS NOT NULL AND NEW.reps IS NOT NULL AND NEW.weight IS NOT NULL THEN
        NEW.valid = true;
    ELSE
        NEW.valid = false;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_workout_exercise_columns
BEFORE INSERT OR UPDATE
ON workout_exercises
FOR EACH ROW
EXECUTE FUNCTION workout_exercises_valid_check();