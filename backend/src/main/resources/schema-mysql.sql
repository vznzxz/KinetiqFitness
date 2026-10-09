-- KINETIQ Fitness Platform Database Schema (MySQL 8.0+)
-- Auto-generated schema reference for manual execution or migration runners

CREATE DATABASE IF NOT EXISTS kinetiq_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kinetiq_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(191) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'ROLE_USER',
    fitness_level VARCHAR(50) DEFAULT 'Intermediate',
    current_weight DOUBLE DEFAULT 75.0,
    target_weight DOUBLE DEFAULT 70.0,
    height DOUBLE DEFAULT 178.0,
    primary_goal VARCHAR(100) DEFAULT 'General Fitness',
    bio TEXT,
    avatar VARCHAR(255),
    streak_days INT DEFAULT 0,
    points INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Workouts Table
CREATE TABLE IF NOT EXISTS workouts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    duration_minutes INT NOT NULL,
    intensity VARCHAR(30) NOT NULL,
    calories_burned INT NOT NULL,
    workout_date DATE NOT NULL,
    notes TEXT,
    exercises_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_workouts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Fitness Goals Table
CREATE TABLE IF NOT EXISTS fitness_goals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    weekly_workouts_target INT DEFAULT 4,
    weekly_calories_target INT DEFAULT 2500,
    starting_weight_kg DOUBLE DEFAULT 75.0,
    target_weight_kg DOUBLE DEFAULT 70.0,
    deadline DATE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_goals_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Weight Logs Table
CREATE TABLE IF NOT EXISTS weight_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    weight_kg DOUBLE NOT NULL,
    body_fat_percentage DOUBLE,
    recorded_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_weight_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Fitness Challenges Table
CREATE TABLE IF NOT EXISTS challenges (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    target_value INT NOT NULL,
    unit VARCHAR(30) NOT NULL,
    total_days INT NOT NULL,
    reward_badge VARCHAR(100) NOT NULL,
    reward_points INT NOT NULL,
    icon VARCHAR(50) DEFAULT 'flame',
    start_date DATE,
    end_date DATE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Challenge Participations Table
CREATE TABLE IF NOT EXISTS challenge_participations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    challenge_id BIGINT NOT NULL,
    current_progress INT DEFAULT 0,
    status VARCHAR(30) DEFAULT 'JOINED',
    joined_date DATE NOT NULL,
    completed_date DATE,
    CONSTRAINT fk_part_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_part_challenge FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_challenge (user_id, challenge_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Fitness Content / Articles / Guides Table
CREATE TABLE IF NOT EXISTS fitness_contents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    author_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    read_time VARCHAR(20) DEFAULT '5 min',
    status VARCHAR(30) DEFAULT 'PENDING',
    tags VARCHAR(255),
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_content_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. System Settings Table
CREATE TABLE IF NOT EXISTS system_settings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    description VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Activity Logs Table
CREATE TABLE IF NOT EXISTS activity_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    details TEXT,
    user_name VARCHAR(100),
    category VARCHAR(50) DEFAULT 'general',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
