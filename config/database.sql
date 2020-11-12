CREATE DATABASE todoapp;

CREATE TABLE users(
    id BIGSERIAL NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (username)
);

CREATE TABLE lists(
    id BIGSERIAL NOT NULL,
    userId BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL,
    createdAt timestamp NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE;
);

CREATE TABLE list_items(
    id BIGSERIAL NOT NULL,
    list_id BIGINT NOT NULL,
    description VARCHAR(255),
    created_at timestamp NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (listId) REFERENCES lists(id) ON DELETE CASCADE
);