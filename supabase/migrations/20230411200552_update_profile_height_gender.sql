CREATE TYPE gender AS ENUM ('male', 'female', 'other');

alter table profiles add column height integer;
alter table profiles add column gender gender;