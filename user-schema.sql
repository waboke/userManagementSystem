CREATE TABLE `usermanagement_tuto`.`user` ( `id` INT NOT NULL AUTO_INCREMENT , `firstName` VARCHAR(100) NOT NULL , `lastName` VARCHAR(100) NOT NULL , `email` VARCHAR(45) NOT NULL , `phone` VARCHAR(15) NOT NULL , `comments` TEXT NOT NULL , `status` VARCHAR(50) NOT NULL DEFAULT 'active' , PRIMARY KEY (`id`)) ENGINE = InnoDB;