CREATE DATABASE checker_db

CREATE TABLE whitelist(
    id SERIAL PRIMARY KEY,
    address VARCHAR(255),
    type VARCHAR(255),
    confirm BOOLEAN
);