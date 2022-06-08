CREATE TABLE users(
    "id" serial NOT NULL PRIMARY KEY,
    "name" text NOT NULL,
    "email" text UNIQUE NOT NULL,
    "password" text NOT NULL
);

CREATE TABLE links(
    "id" serial NOT NULL PRIMARY KEY,
    "shortUrl" text NOT NULL,
    "url" text NOT NULL,
    "visitCount" integer NOT NULL DEFAULT 0,
    "userId" integer NOT NULL REFERENCES users("id")
);