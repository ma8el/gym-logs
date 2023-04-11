alter table profiles drop column website;
alter table profiles drop column full_name;

alter table profiles add column first_name text;
alter table profiles add column last_name text;
alter table profiles add column date_of_birth date;