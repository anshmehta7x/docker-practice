CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE
);

--  sample data
INSERT INTO tasks (title, description, completed) VALUES
('Set up Docker Compose', 'Connect Flask, Vite, and PostgreSQL', true),
('Write an init script', 'Make PostgreSQL container run queries on startup', false);
