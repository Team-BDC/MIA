CREATE DATABASE IF NOT EXISTS miadb;
USE miadb;

-- alter table User add last_login int;
-- CREATE TABLE IF NOT EXISTS `Gallery` (
-- 	`gallery_id` varchar(36) NOT NULL,
--     `user_id` varchar(36) NOT NULL, 
-- 	foreign key(user_id) references auth_user(id) ON DELETE CASCADE,
-- 	primary key(`gallery_id`) 
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE Gallery;
DROP TABLE Image;


CREATE TABLE IF NOT EXISTS Gallery (
	gallery_id varchar(36) NOT NULL,
    user_id INT NOT NULL,
    created_at DATETIME(6) NOT NULL, 
    FOREIGN KEY(user_id) REFERENCES auth_user(id),
    PRIMARY KEY(gallery_id)
);

CREATE TABLE IF NOT EXISTS Image (
	image_number INT NOT NULL auto_increment,
    gallery_id varchar(36) NOT NULL,
    image_name varchar(50),
    image_path varchar(500),
    FOREIGN KEY(gallery_id) REFERENCES Gallery(gallery_id) ON DELETE CASCADE,
    PRIMARY KEY(image_number)
);

-- CREATE TABLE IF NOT EXISTS `Image` (
-- 	`image_number` int NOT NULL auto_increment,
--     `gallery_id` varchar(36) NOT NULL, 
--     `image_name` varchar(50), 
--     `image_path` varchar(100),
-- 	foreign key(`gallery_id`) references `Gallery`(`gallery_id`) ON DELETE CASCADE,
-- 	primary key(`image_number`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;






