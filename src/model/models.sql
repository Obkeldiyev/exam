CREATE DATABASE exam;

\c exam

CREATE TABLE companies(id SERIAL PRIMARY KEY, name VARCHAR(200));

CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(100), password VARCHAR(100), fullname VARCHAR(200), company_id INT REFERENCES companies(id) DEFAULT NULL, role VARCHAR(50));

CREATE TABLE tasks(id SERIAL PRIMARY KEY, title VARCHAR(100), description VARCHAR(1000), company_id INT REFERENCES companies(id), created_at TIMESTAMP DEFAULT NOW());

CREATE TABLE user_tasks(id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), task_id INT REFERENCES tasks(id), start_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ends_at TIMESTAMP, status VARCHAR(50));

INSERT INTO users(username, password, fullname, role) VALUES('ellie', '1234', 'Ellie Williams', 'admin');