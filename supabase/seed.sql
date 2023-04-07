alter table profiles drop constraint profiles_id_fkey;
insert into profiles (id, username)
 values (gen_random_uuid(), 'test user');

insert into workouts (id, user_id, name, description)
 values (0, (select id from profiles), 'test workout', 'test description');

insert into exercises (id, name, description)
 values (0, 'test exercise', 'test description');

insert into workout_exercises (id, workout_id, exercise_id)
 values (0, 0, 0);