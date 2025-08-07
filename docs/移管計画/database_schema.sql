/*
  MySQL Schema for the new PHP/MySQL based application.
  Generated based on the TypeScript definitions from the previous Supabase setup.
*/

-- 1. `dramas` テーブル
CREATE TABLE dramas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    `year` INT NOT NULL,
    season ENUM('spring', 'summer', 'autumn', 'winter') NOT NULL,
    broadcaster VARCHAR(100) NOT NULL,
    timeslot VARCHAR(50),
    air_day VARCHAR(20),
    genre VARCHAR(100),
    synopsis TEXT,
    main_cast TEXT,
    status ENUM('airing', 'completed', 'upcoming') DEFAULT 'upcoming' NOT NULL,
    featured_weekly BOOLEAN DEFAULT FALSE,
    featured_popular BOOLEAN DEFAULT FALSE,
    featured_priority INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. `reviews` テーブル
CREATE TABLE reviews (
    id CHAR(36) PRIMARY KEY,
    drama_id INT NOT NULL,
    nickname VARCHAR(50) DEFAULT '名無しさん' NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (drama_id) REFERENCES dramas(id) ON DELETE CASCADE
);

-- 3. `likes` テーブル
CREATE TABLE likes (
    id CHAR(36) PRIMARY KEY,
    review_id CHAR(36) NOT NULL,
    user_session VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
    UNIQUE KEY unique_like (review_id, user_session)
);
