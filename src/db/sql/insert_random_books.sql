TRUNCATE TABLE books;

INSERT INTO books
(title, pub_date, author, description, image)
(SELECT
    'title_' || to_char(generate_series(1,100000), '') || md5(random()::text)  as title,
    (NOW() - (random() * (NOW()+'90 days' - NOW())))::date as pub_date,
    'author_' || md5(random()::text) as author,
    'desc_' || md5(random()::text) as description,
    'http://' || md5(random()::text) as image
);
