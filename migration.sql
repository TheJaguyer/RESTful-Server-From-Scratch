DROP TABLE IF EXIST pets CASCADE;

CREATE TABLE pets (
  id serial PRIMARY KEY,
  age int NOT NULL,
  kind varchar NOT NULL,
  name varchar NOT NULL
)