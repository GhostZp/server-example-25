-- show databases = shows databases
-- source drag and drop from file explorer = runs sql script
-- show tables = shows all tables
-- desc table? = reveals details of a table
-- select = selects desired column(s) * means every column
-- from = which table(s) the data is retrieved from
-- where = Conditions that records must satisfy (optional)
-- group by = Group records by given column(s) (optional)
-- having = Conditions that groups must satisfy (optional)
-- order by = Order records by given column(s) in ASCending or DESCending order (optional)
-- limit = Limit the number of records (optional)

-- deletes database if it already exists
DROP DATABASE IF EXISTS HealthDiary;

-- creates the database
CREATE DATABASE HealthDiary;

-- Create a table for users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) NOT NULL DEFAULT 'regular'
);

-- Create a table for diary entries
CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create a table for health data
CREATE TABLE HealthData (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    sys DECIMAL(5,2),
    dia DECIMAL(5,2),
    pul DECIMAL(5,2),
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- ALTER example, adding a new column to existing table
-- ALTER TABLE Users ADD COLUMN user_level VARCHAR(10) DEFAULT 'regular';

---------------------
-- insert test data
---------------------

-- Inserting a single record, without specifying column names
INSERT INTO Users VALUES (1, 'johndoe', 'temp-pw-1', 'johndoe@example.com', '2024-01-02 10:00:00', 'regular');

-- Iserting multiple user rows at once (default values like created_at are inserted without need to specify them)
INSERT INTO Users (username, password, email, user_level) VALUES
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
  ('mike_smith', 'temp-pw-3', 'mike@example.com', 'moderator');

-- Example when FK constraint fails (if user_id 15 does not exist)
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (15, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00');

-- Inserting multiple diary entries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out', '2024-01-10 21:00:00');

  -- INSERT HealthData mock data
-- Inserting multiple healthdata entries
INSERT INTO HealthData (user_id, entry_date, sys, dia, pul, notes, created_at) VALUES
  (1, '2024-01-10', 118, 78, 69, 'OK', '2024-01-10 05:10:00'),
  (1, '2024-01-11', 128, 86, 88, 'Stressed', '2024-01-11 21:30:00'),
  (2, '2024-01-10', 140, 88, 86, 'Oops', '2023-01-10 18:00:00');