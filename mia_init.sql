CREATE DATABASE IF NOT EXISTS miadb;
USE miadb;

CREATE TABLE IF NOT EXISTS `User` (
	`user_id` varchar(36) NOT NULL,
    `user_name` varchar(30), 
    `user_paswd` varchar(30), 
    `user_email` varchar(50),
    PRIMARY KEY(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `Gallery` (
	`gallery_id` varchar(36) NOT NULL,
    `user_id` varchar(36) NOT NULL, 
	foreign key(`user_id`) references `User`(`user_id`) ON DELETE CASCADE,
	primary key(`gallery_id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `Image` (
	`image_number` int NOT NULL auto_increment,
    `gallery_id` varchar(36) NOT NULL, 
    `image_name` varchar(50), 
    `image_path` varchar(100),
	foreign key(`gallery_id`) references `Gallery`(`gallery_id`) ON DELETE CASCADE,
	primary key(`image_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;






