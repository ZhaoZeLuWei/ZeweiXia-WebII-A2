-- MySQL dump 10.13  Distrib 8.0.43, for macos15 (arm64)
--
-- Host: localhost    Database: charityevents_db
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `CategoryID` int NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (1,'Charity Run'),(2,'Gala Dinner'),(3,'Silent Auction'),(4,'Concert');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Event`
--

DROP TABLE IF EXISTS `Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Event` (
  `EventID` int NOT NULL AUTO_INCREMENT,
  `LocationID` int NOT NULL,
  `CategoryID` int NOT NULL,
  `OrgID` int NOT NULL,
  `EventName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `EventDate` date NOT NULL,
  `Description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Goal` int NOT NULL,
  `ImageURL` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`EventID`),
  KEY `fk_event_location` (`LocationID`),
  KEY `fk_event_category` (`CategoryID`),
  KEY `fk_event_OrgID` (`OrgID`),
  CONSTRAINT `fk_event_category` FOREIGN KEY (`CategoryID`) REFERENCES `Category` (`CategoryID`),
  CONSTRAINT `fk_event_location` FOREIGN KEY (`LocationID`) REFERENCES `Location` (`LocationID`),
  CONSTRAINT `fk_event_OrgID` FOREIGN KEY (`OrgID`) REFERENCES `Organisation` (`OrgID`)
) ENGINE=InnoDB AUTO_INCREMENT=1009 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event`
--

LOCK TABLES `Event` WRITE;
/*!40000 ALTER TABLE `Event` DISABLE KEYS */;
INSERT INTO `Event` VALUES (1001,101,1,1,'Charity Run for Children','2025-10-01','A marathon to raise funds for children education.',300000,'/images/event_1.jpg','active'),(1002,102,2,1,'Annual Charity Gala Dinner','2025-10-05','Gala dinner with auctions to support medical aid.',800000,'/images/event_2.jpg','active'),(1003,103,3,2,'Autumn Silent Auction','2025-10-10','Silent auction of artworks for environmental protection.',500000,'/images/event_3.jpg','active'),(1004,104,4,2,'Charity Concert for Elderly','2025-10-15','Orchestra performance to fund senior care centers.',400000,'/images/event_4.jpg','active'),(1005,103,1,3,'City Park Charity Fun Run','2025-10-20','Family-friendly run to support local communities.',200000,'/images/event_5.jpg','active'),(1006,101,2,3,'Corporate Charity Gala','2025-10-22','Corporate-sponsored gala for poverty alleviation.',1000000,'/images/event_6.jpg','active'),(1007,102,3,4,'Luxury Goods Silent Auction','2025-10-25','Auction of luxury items to fund clean water projects.',600000,'/images/event_7.jpg','suspended'),(1008,104,4,4,'Rock Charity Concert','2025-10-30','Rock music event to support animal shelters.',350000,'/images/event_8.jpg','active');
/*!40000 ALTER TABLE `Event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Location`
--

DROP TABLE IF EXISTS `Location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Location` (
  `LocationID` int NOT NULL AUTO_INCREMENT,
  `LocationName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `StreetAddress` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `VenueDetails` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`LocationID`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Location`
--

LOCK TABLES `Location` WRITE;
/*!40000 ALTER TABLE `Location` DISABLE KEYS */;
INSERT INTO `Location` VALUES (101,'Civic Center','123 Main Street, Downtown','Hall A, 3rd Floor'),(102,'City Convention Center','456 Riverside Road','Conference Room B'),(103,'People\'s Square','555 Central Avenue, Chengzhong District',NULL),(104,'City Stadium','789 Sports Road, Eastern District',NULL);
/*!40000 ALTER TABLE `Location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Organisation`
--

DROP TABLE IF EXISTS `Organisation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Organisation` (
  `OrgID` int NOT NULL AUTO_INCREMENT,
  `LocationID` int NOT NULL,
  `OrgName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PhoneNumber` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`OrgID`),
  KEY `fk_org_location` (`LocationID`),
  CONSTRAINT `fk_org_location` FOREIGN KEY (`LocationID`) REFERENCES `Location` (`LocationID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Organisation`
--

LOCK TABLES `Organisation` WRITE;
/*!40000 ALTER TABLE `Organisation` DISABLE KEYS */;
INSERT INTO `Organisation` VALUES (1,101,'Charity Relief Headquarters','hq@example.org','+861012345677'),(2,102,'Green Earth Foundation','green@example.org','+861012345678'),(3,103,'Community Care Association','care@example.org','+861012345679'),(4,104,'Youth Support Network','youth@example.org','+861012345680');
/*!40000 ALTER TABLE `Organisation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ticket`
--

DROP TABLE IF EXISTS `Ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ticket` (
  `TicketID` int NOT NULL AUTO_INCREMENT,
  `EventID` int NOT NULL,
  `TicketName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Quantity` int NOT NULL,
  PRIMARY KEY (`TicketID`),
  KEY `fk_ticket_event` (`EventID`),
  CONSTRAINT `fk_ticket_event` FOREIGN KEY (`EventID`) REFERENCES `Event` (`EventID`)
) ENGINE=InnoDB AUTO_INCREMENT=10017 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ticket`
--

LOCK TABLES `Ticket` WRITE;
/*!40000 ALTER TABLE `Ticket` DISABLE KEYS */;
INSERT INTO `Ticket` VALUES (10001,1001,'Regular Ticket',199.00,5000),(10002,1001,'VIP Ticket',599.00,1000),(10003,1002,'Regular Ticket',399.00,3000),(10004,1002,'VIP Ticket',999.00,500),(10005,1003,'Regular Ticket',150.00,2000),(10006,1003,'VIP Ticket',450.00,300),(10007,1004,'Regular Ticket',299.00,4000),(10008,1004,'VIP Ticket',899.00,800),(10009,1005,'Regular Ticket',99.00,8000),(10010,1005,'VIP Ticket',299.00,2000),(10011,1006,'Regular Ticket',599.00,2500),(10012,1006,'VIP Ticket',1599.00,600),(10013,1007,'Regular Ticket',120.00,3500),(10014,1007,'VIP Ticket',380.00,500),(10015,1008,'Regular Ticket',250.00,5000),(10016,1008,'VIP Ticket',750.00,1000);
/*!40000 ALTER TABLE `Ticket` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-06 12:48:24
