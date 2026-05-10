CREATE TABLE IF NOT EXISTS movies (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title character varying,
    description text,
    year integer,
    release_date date,
    runtime integer,
    rating integer,
    mpaa_rating character varying,
    image text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);

CREATE TABLE IF NOT EXISTS genres (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    genre_name character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);

CREATE TABLE IF NOT EXISTS movies_genres (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    movie_id INTEGER REFERENCES movies(id),
    genre_id INTEGER REFERENCES genres(id),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);

CREATE TABLE IF NOT EXISTS users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name character varying,
    last_name character varying,
    email TEXT UNIQUE,
    password character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);

-- -------------------------------------
-- Specify columns to skip the 'id' column
INSERT INTO movies (title, description, year, release_date, runtime, rating, mpaa_rating, image, created_at, updated_at) 
VALUES 
('The Shawshank Redemption', 'Two imprisoned men bond over a number of years', 1994, '1994-10-14', 145, 5, 'PG', 'https://m.media-amazon.com/images/I/410oZCX8w2L._SY300_SX300_QL70_FMwebp_.jpg', '1993-05-17 00:00:00',  '1999-05-17 00:00:00'),
('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control to his son', 1972, '1972-03-24', 175, 5, 'PG-13', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSel__j-uYHI7K0j9kFFq4rMpZ3kfdW1RAGag&s', '1972-05-17 00:00:00', '2024-05-17 00:00:00'),
('The Dark Knight', 'The menace known as the Joker wreaks havoc on Gotham City', 2008, '2008-07-18', 152, 5, 'PG-13', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHOKLDNCPgtNT_GgusKjCqXfYKaNeIxAD7MQ&s', '2008-05-17 00:00:00', '2026-05-17 00:00:00'),
('American Psycho', 'A wealthy New York investment banking executive hides his alternate psychopathic ego', 2000, '2000-04-14', 102, 4, 'R', '', '2000-05-17 00:00:00', '2021-05-17 00:00:00');

-- -----------------------------------------------

INSERT INTO genres (genre_name, created_at, updated_at) 
VALUES
('Drama', '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
('Crime', '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
('Action', '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
('Comic Book', '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
('Sci-Fi', '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
('Mystery', '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
('Adventure', '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
('Comedy', '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
('Romance', '2021-05-17 00:00:00', '2021-05-17 00:00:00');

-- ---------------------------------------

INSERT INTO movies_genres (movie_id, genre_id, created_at, updated_at) 
VALUES
(1, 1, '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
(1, 2, '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
(2, 3, '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
(2, 4, '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
(3, 5, '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
(3, 6, '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
(4, 7, '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
(4, 8, '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
(1, 9, '2021-05-17 00:00:00', '2021-05-17 00:00:00'),
(2, 6, '2021-05-17 00:00:00', '2021-05-17 00:00:00');

-------------------------------------

INSERT INTO users (first_name, last_name, email, password, created_at, updated_at) 
VALUES
('Admin', 'User', 'admin@example.com' ,'$2a$12$BuSxzX9VZ4uktWI0PJjWq.s0v1lg5W9EapQs4L3Ju8ZZ4JDFGmzT6', '2026-04-25 00:00:00', '2026-05-03 00:00:00');