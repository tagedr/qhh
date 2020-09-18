-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: 192.168.250.12    Database: qhh
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attaches`
--

CREATE DATABASE IF NOT EXISTS `qhh`;
USE `qhh`;

DROP TABLE IF EXISTS `attaches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attaches` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(1023) DEFAULT 'someattache',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fileName` varchar(1024) DEFAULT NULL,
  `md5` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=431 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attaches`
--

LOCK TABLES `attaches` WRITE;
/*!40000 ALTER TABLE `attaches` DISABLE KEYS */;
/*!40000 ALTER TABLE `attaches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_attaches`
--

DROP TABLE IF EXISTS `candidate_attaches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidate_attaches` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idCandidate` int(10) unsigned NOT NULL,
  `idAttache` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `candidate_attaches_id_uindex` (`id`),
  KEY `candidate_attaches_candidates_id_fk` (`idCandidate`),
  KEY `candidate_attaches_attaches_id_fk` (`idAttache`),
  CONSTRAINT `candidate_attaches_attaches_id_fk` FOREIGN KEY (`idAttache`) REFERENCES `attaches` (`id`) ON DELETE CASCADE,
  CONSTRAINT `candidate_attaches_candidates_id_fk` FOREIGN KEY (`idCandidate`) REFERENCES `candidates` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_attaches`
--

LOCK TABLES `candidate_attaches` WRITE;
/*!40000 ALTER TABLE `candidate_attaches` DISABLE KEYS */;
/*!40000 ALTER TABLE `candidate_attaches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_messages`
--

DROP TABLE IF EXISTS `candidate_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidate_messages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idMessage` int(10) unsigned NOT NULL,
  `idCandidate` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `candidate_messages_id_uindex` (`id`),
  KEY `candidate_messages_candidates_id_fk` (`idCandidate`),
  KEY `candidate_messages_messages_id_fk` (`idMessage`),
  CONSTRAINT `candidate_messages_candidates_id_fk` FOREIGN KEY (`idCandidate`) REFERENCES `candidates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `candidate_messages_messages_id_fk` FOREIGN KEY (`idMessage`) REFERENCES `messages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=332 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_messages`
--

LOCK TABLES `candidate_messages` WRITE;
/*!40000 ALTER TABLE `candidate_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `candidate_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidates`
--

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(1023) NOT NULL DEFAULT 'EmptyCandidateName',
  `tel` varchar(100) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `im` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `candidates_updated_index` (`created`)
) ENGINE=InnoDB AUTO_INCREMENT=472 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidates_tags`
--

DROP TABLE IF EXISTS `candidates_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidates_tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idCandidate` int(10) unsigned NOT NULL,
  `idTag` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `candidates_tags_id_uindex` (`id`),
  KEY `candidates_tags_candidates_id_fk` (`idCandidate`),
  KEY `candidates_tags_tags_id_fk` (`idTag`),
  CONSTRAINT `candidates_tags_candidates_id_fk` FOREIGN KEY (`idCandidate`) REFERENCES `candidates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `candidates_tags_tags_id_fk` FOREIGN KEY (`idTag`) REFERENCES `tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1349 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates_tags`
--

LOCK TABLES `candidates_tags` WRITE;
/*!40000 ALTER TABLE `candidates_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `candidates_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interviews`
--

DROP TABLE IF EXISTS `interviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interviews` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `begin` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `desc` varchar(1023) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interviews`
--

LOCK TABLES `interviews` WRITE;
/*!40000 ALTER TABLE `interviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `interviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interviews_candidates_users`
--

DROP TABLE IF EXISTS `interviews_candidates_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interviews_candidates_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idInterview` int(10) unsigned DEFAULT '0',
  `idCandidate` int(10) unsigned DEFAULT '0',
  `idWelcomeUser` int(10) unsigned DEFAULT '0',
  `idInterviewer` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `interviews_candidates_users_users_id_fk` (`idInterviewer`),
  KEY `interviews_candidates_users_interviews_id_fk` (`idInterview`),
  KEY `interviews_candidates_users_candidates_id_fk` (`idCandidate`),
  KEY `interviews_candidates_users_users_id_fk_2` (`idWelcomeUser`),
  CONSTRAINT `interviews_candidates_users_candidates_id_fk` FOREIGN KEY (`idCandidate`) REFERENCES `candidates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `interviews_candidates_users_interviews_id_fk` FOREIGN KEY (`idInterview`) REFERENCES `interviews` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `interviews_candidates_users_users_id_fk` FOREIGN KEY (`idInterviewer`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `interviews_candidates_users_users_id_fk_2` FOREIGN KEY (`idWelcomeUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interviews_candidates_users`
--

LOCK TABLES `interviews_candidates_users` WRITE;
/*!40000 ALTER TABLE `interviews_candidates_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `interviews_candidates_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knex_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (1,'20150613161239_initial_schema.js',1,'2018-06-14 17:40:49');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knex_migrations_lock` (
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `body` text NOT NULL,
  `type` tinyint(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `messages_updated_index` (`updated`)
) ENGINE=InnoDB AUTO_INCREMENT=333 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(1023) NOT NULL,
  `color` varchar(6) NOT NULL DEFAULT '0',
  `priority` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tags_name_uindex` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (3,'artist','0',11),(4,'dev','0',10),(34,'cpp','0',50),(38,'js','0',51),(39,'invite','f2ca3c',110),(40,'new','DDD8B8',100),(45,'reject','96897B',200),(47,'maybe','31a9f9',105),(48,'connecting','D0CFEC',115),(49,'feedback','FE5D26',120),(50,'refused','C5AFA4',210),(51,'interview','ef2d56',130),(52,'offer','9EB25D',150),(53,'analyse','0',NULL),(54,'rejected','0',NULL);
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usergroups`
--

DROP TABLE IF EXISTS `usergroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usergroups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(1023) NOT NULL DEFAULT 'some_usergroup"',
  PRIMARY KEY (`id`),
  UNIQUE KEY `usergroups_id_uindex` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usergroups`
--

LOCK TABLES `usergroups` WRITE;
/*!40000 ALTER TABLE `usergroups` DISABLE KEYS */;
/*!40000 ALTER TABLE `usergroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usergroups_tags`
--

DROP TABLE IF EXISTS `usergroups_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usergroups_tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idUsergroup` int(10) unsigned NOT NULL,
  `idTag` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usergroups_tags_id_uindex` (`id`),
  KEY `usergroups_tags_usergroups_id_fk` (`idUsergroup`),
  KEY `usergroups_tags_tags_id_fk` (`idTag`),
  CONSTRAINT `usergroups_tags_tags_id_fk` FOREIGN KEY (`idTag`) REFERENCES `tags` (`id`),
  CONSTRAINT `usergroups_tags_usergroups_id_fk` FOREIGN KEY (`idUsergroup`) REFERENCES `usergroups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usergroups_tags`
--

LOCK TABLES `usergroups_tags` WRITE;
/*!40000 ALTER TABLE `usergroups_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `usergroups_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usergroups_users`
--

DROP TABLE IF EXISTS `usergroups_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usergroups_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idUsergroup` int(10) unsigned NOT NULL,
  `idUser` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usergroups_users_id_uindex` (`id`),
  KEY `usergroups_users_users_user_fk` (`idUser`),
  KEY `usergroups_users_usergroups_id_fk` (`idUsergroup`),
  CONSTRAINT `usergroups_users_usergroups_id_fk` FOREIGN KEY (`idUsergroup`) REFERENCES `usergroups` (`id`),
  CONSTRAINT `usergroups_users_users_user_fk` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usergroups_users`
--

LOCK TABLES `usergroups_users` WRITE;
/*!40000 ALTER TABLE `usergroups_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `usergroups_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `description` varchar(1023) NOT NULL DEFAULT 'empty',
  `ip` int(10) unsigned DEFAULT NULL,
  `pass` varchar(50) DEFAULT NULL,
  `lastMessageId` int(10) unsigned DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_login_uindex` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (0,'admin','empty',NULL,'40bd001563085fc35165329ea1ff5c5ecbdbbeef',0),(2,'user','empty',NULL,'40bd001563085fc35165329ea1ff5c5ecbdbbeef',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_messages`
--

DROP TABLE IF EXISTS `users_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_messages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idUser` int(10) unsigned NOT NULL,
  `idMessage` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_messages_id_uindex` (`id`),
  KEY `users_messages_users_id_fk` (`idUser`),
  KEY `users_messages_messages_id_fk` (`idMessage`),
  CONSTRAINT `users_messages_messages_id_fk` FOREIGN KEY (`idMessage`) REFERENCES `messages` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `users_messages_users_id_fk` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=330 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_messages`
--

LOCK TABLES `users_messages` WRITE;
/*!40000 ALTER TABLE `users_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_messages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-06 16:54:51
