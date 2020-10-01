CREATE DATABASE todoapp;

CREATE TABLE users(
    id BIGSERIAL NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (username)
);

CREATE TABLE lists(
    id BIGSERIAL NOT NULL,
    user_id BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE list_items(
    id BIGSERIAL NOT NULL,
    list_id BIGINT NOT NULL,
    description VARCHAR(255),
    created_at timestamp NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE
);