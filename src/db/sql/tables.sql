DROP TABLE IF EXISTS books;
CREATE TABLE books(
    id serial PRIMARY KEY,
    title varchar(255) NOT NULL,
    pub_date date NOT NULL,
    author varchar(255) NOT NULL,
    description text,
    image varchar(255)
);