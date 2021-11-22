CREATE DATABASE  IF NOT EXISTS `spdatabase` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `spdatabase`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: spdatabase
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `gamecat`
--

DROP TABLE IF EXISTS `gamecat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gamecat` (
  `cat_name` varchar(45) NOT NULL,
  `cat_desc` tinytext NOT NULL,
  `cat_id` int NOT NULL AUTO_INCREMENT,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cat_id`),
  UNIQUE KEY `cat_name_UNIQUE` (`cat_name`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamecat`
--

LOCK TABLES `gamecat` WRITE;
/*!40000 ALTER TABLE `gamecat` DISABLE KEYS */;
INSERT INTO `gamecat` VALUES ('Strategy','Plan out your paths to obtain VICTORY!',1,'2020-12-27 10:19:13'),('Action','An action game emphasizes physical challenges, including hand–eye coordination and reaction-time',2,'2020-12-28 07:25:12'),('RPG','Become the main charatacter of the SHOW!',3,'2020-12-28 07:28:02'),('Adventure','Push through all the challenges thrown at you! Solve all the puzzles to complete the adventure!',4,'2021-02-06 15:01:24');
/*!40000 ALTER TABLE `gamecat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `title` varchar(45) NOT NULL,
  `description` tinytext NOT NULL,
  `price` int NOT NULL,
  `platform` varchar(255) NOT NULL,
  `cat_id` int NOT NULL,
  `year` int NOT NULL,
  `game_id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gameImgUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`game_id`),
  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES ('Jellyfishing','Jellyfish fields is home to many jellyfish that are waiting to get caught!',5,'PC',1,1999,1,'2020-12-27 10:02:09','/jellyfishing'),('Krusty Krab Cookoff','Defeat Spongebob by making the ultimate krabby patty',10,'XBOX',2,1998,2,'2020-12-27 10:04:36','/cookoff'),('Fry Cook Games','Be the manager of Spongebob or Patrick as they battle out to win the prize',67,'XBOX',2,2000,4,'2020-12-27 10:08:51','/cookgames'),('Sandy\'s Home','Help Sandy find all her SCIENCE stuff so that she can save bikini bottom from a virus',100,'PC',1,2020,5,'2020-12-27 10:11:26','/sandyhome'),('Krusty Budget','Mr Krabs need to earn more money. Help him cut cost in the krusty krab so he can be the richer.',999,'PS4',3,2014,6,'2020-12-27 10:15:19','/money'),('Squidwards Music Adventure','Squidward is going to perform at the BIKINI BOTTOM CONCERT! Help him improve his clarinet skills before the BIG DAY!',49,'Wii',4,2020,7,'2021-02-06 15:02:19','/clarinet'),('Plankton\'s Final Act','Plankton had ENOUGH of that DARN KRABS! Help him devise him master plan to STEAL the KRABBY PATTY SECRET FORMULA',140,'PS4',3,2009,8,'2021-02-06 15:11:07','/finalAct'),('Patrick Needs Food','Patrick is HUNGRY! Without krabby patties Patrick will DIE! SAVE HIM!',420,'PC',2,2010,9,'2021-02-06 15:15:45','/hungryPatrick'),('Krusty Dash','Krabs wants MORE PROFIT! You need to run the krusty krab for as long as possible!',60,'XBOX',1,2011,10,'2021-02-06 15:23:55','/day13');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviewid` int NOT NULL AUTO_INCREMENT,
  `game_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` tinytext NOT NULL,
  `rating` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  KEY `fk_game_id_idx` (`game_id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_game_id` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `userinfo` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,1,'Jellyfishing IS THE BEST!',4,'2021-01-02 16:55:39'),(2,2,1,'KRABBY PATTIES!!!!!',5,'2021-01-02 16:56:10'),(3,6,1,'i cant buy food for gary',1,'2021-01-02 16:56:52'),(5,5,5,'is mayonnaise an instrument?',5,'2021-01-02 16:59:23'),(6,1,2,'SPONGEBOB GET BACK TO WORK!',1,'2021-01-02 16:59:59'),(7,1,3,'I hate spongebob',1,'2021-01-02 17:01:25'),(8,2,4,'I hate my life',1,'2021-01-06 08:52:36'),(27,10,8,'HELLO ITS ME',4,'2021-02-07 14:48:00'),(28,8,8,'IM THE MOST COOLEST PERSON EVER',2,'2021-02-07 14:48:20'),(29,9,8,' THI SCHINAI CHBAI',3,'2021-02-07 14:48:36'),(30,4,8,' IM GONNA DIE',4,'2021-02-07 14:51:22'),(31,1,5,' HELP ME SPONGEBOB!',3,'2021-02-07 14:51:44'),(32,2,5,'can i have 1 krabby patty please',3,'2021-02-07 14:52:15'),(33,4,5,' YOU SHALL LOSE SPONGEBOB',5,'2021-02-07 14:52:30'),(34,6,5,'im getting hungry mr krabs',4,'2021-02-07 14:53:08'),(35,9,5,' GIVE ME FOOOOOOD!',5,'2021-02-07 14:53:20'),(36,10,5,' OH ITS 3AM TIME TO EAT',3,'2021-02-07 14:53:42'),(37,1,6,' MeOOOEWWWWW',1,'2021-02-07 14:54:18'),(38,2,6,' MEEEEOOWWW',3,'2021-02-07 14:54:28'),(39,4,6,' mmmmeeeeeeoowww',2,'2021-02-07 14:54:39'),(40,7,6,' meeeeeooow',1,'2021-02-07 14:54:52'),(41,5,6,' mmmeeeeooooooow',5,'2021-02-07 14:55:04'),(42,2,7,' MUHAHAHHAHAA',2,'2021-02-07 14:55:32'),(43,8,7,' LETS GET IT!!!!!!!',4,'2021-02-07 14:55:43'),(44,10,7,' EUGENE KRABBBSSSSS!!',3,'2021-02-07 14:55:55'),(45,2,3,' What is life?',1,'2021-02-07 14:56:43'),(46,5,3,' why am I here',2,'2021-02-07 14:56:56'),(47,10,3,' I wanna go home',4,'2021-02-07 14:57:17'),(48,7,3,'IM THE BEST PERSON EVER',3,'2021-02-07 14:57:54');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinfo` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(24) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(8) DEFAULT NULL,
  `picurl` varchar(255) DEFAULT NULL,
  `timecreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES (1,'SpongeBob','iluvgary@bikinibottom.com','123','admin','/spongebob','2020-12-27 09:55:21','2021-01-02 17:04:38'),(2,'Mr Krabs','money@bikinibottom.com','123','admin','/krabs','2020-12-27 09:55:21',NULL),(3,'Squidward','ihatespongebob@bikinibottom.com','123','admin','/squidward','2020-12-27 09:55:21',NULL),(4,'Sandy','iluvscience@bikinibottom.com','123','member','/sandy','2020-12-27 09:57:32',NULL),(5,'Patrick','thisispatrick@bikinibottom.com','123','member','/patrick','2020-12-27 09:57:32',NULL),(6,'Gary','meow@bikinibottom.com','123','member','/gary','2020-12-27 09:57:32',NULL),(7,'Plankton','EEEVVILLLLL@bikinibottom.com','123','member','/plankton','2020-12-27 10:17:09',NULL),(8,'admin','admin@admin.com','admin','admin','/admin','2021-01-02 16:51:18',NULL);
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-07 22:59:58
