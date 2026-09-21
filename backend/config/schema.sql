-- School Club Management System Database Schema designed based on J'isabelle mockData.js blueprint

CREATE DATABASE IF NOT EXISTS school_club_management;
USE school_club_management;

-- 1. Students Table
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    programme VARCHAR(100) NOT NULL
);

-- 2. Clubs Table
CREATE TABLE clubs (
    club_id INT AUTO_INCREMENT PRIMARY KEY,
    club_name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50)
);

-- 3. Memberships Table (Linking Students to Clubs)
CREATE TABLE memberships (
    membership_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    club_id INT,
    join_date DATE,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE
);

-- Seed Data from mockData.js
INSERT INTO students (name, email, programme) VALUES
('Amina', 'amina@uni.edu', 'Computer Science'),
('Kwame', 'kwame@uni.edu', 'Economics'),
('Sarah', 'sarah@uni.edu', 'Law'),
('David', 'david@uni.edu', 'Engineering'),
('Fatima', 'fatima@uni.edu', 'Biology');

INSERT INTO clubs (club_name, description, category) VALUES
('Chess Club', 'Weekly matches and tournaments.', 'Sport'),
('Debate Society', 'Practice public speaking and argument.', 'Academic'),
('Drama Club', 'Stage productions and acting workshops.', 'Arts'),
('Coding Club', 'Build projects, learn new tech.', 'Academic'),
('Photography Club', 'Explore visual storytelling.', 'Arts');

INSERT INTO memberships (student_id, club_id, join_date) VALUES
(1, 1, '2026-09-01'),
(2, 2, '2026-09-05'),
(3, 3, '2026-09-10'),
(4, 1, '2026-09-12'),
(5, 4, '2026-09-14');
