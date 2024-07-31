CREATE DATABASE `calorieapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

CREATE TABLE `calorieapp`.`users` (
  `userid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pass` varchar(100) NOT NULL,
  `uname` varchar(100) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `calorieapp`.`entries` (
  `userid` int(10) unsigned NOT NULL,
  `netcal` decimal(8,2) NOT NULL,
  `calconsumed` decimal(8,2) NOT NULL,
  `calburned` decimal(8,2) NOT NULL,
  `entrydate` datetime NOT NULL,
  KEY `userid_idx` (`userid`),
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE DEFINER=`root`@`localhost` TRIGGER `calorieapp`.`entries_BEFORE_INSERT` BEFORE INSERT ON `entries` FOR EACH ROW
BEGIN
	SET NEW.entrydate = CURDATE();
END

INSERT INTO `users` (`pass`, `uname`) VALUES ('password', 'user@gmail.com');
INSERT INTO `entries` (`userid`, `netcal`, `calconsumed`, `calburned`) VALUES (7, 10, 2010, 2000);
INSERT INTO `entries` (`userid`, `netcal`, `calconsumed`, `calburned`) VALUES (7, 100, 2100, 2000);
INSERT INTO `entries` (`userid`, `netcal`, `calconsumed`, `calburned`) VALUES (7, -10, 2000, 2010);
INSERT INTO `entries` (`userid`, `netcal`, `calconsumed`, `calburned`) VALUES (7, -100, 2000, 2100);
INSERT INTO `entries` (`userid`, `netcal`, `calconsumed`, `calburned`) VALUES (7, 20, 2020, 2000);
INSERT INTO `entries` (`userid`, `netcal`, `calconsumed`, `calburned`) VALUES (7, 200, 2200, 2000);
INSERT INTO `entries` (`userid`, `netcal`, `calconsumed`, `calburned`) VALUES (7, -20, 2000, 2020);
INSERT INTO `entries` (`userid`, `netcal`, `calconsumed`, `calburned`) VALUES (7, -200, 2000, 2200);
UPDATE `entries` SET `entrydate` = '2024-06-20' WHERE `netcal` = 10;
UPDATE `entries` SET `entrydate` = '2024-06-21' WHERE `netcal` = 100;
UPDATE `entries` SET `entrydate` = '2024-06-22' WHERE `netcal` = -10;
UPDATE `entries` SET `entrydate` = '2024-06-23' WHERE `netcal` = -100;
UPDATE `entries` SET `entrydate` = '2024-06-24' WHERE `netcal` = 20;
UPDATE `entries` SET `entrydate` = '2024-06-25' WHERE `netcal` = 200;
UPDATE `entries` SET `entrydate` = '2024-06-26' WHERE `netcal` = -20;
UPDATE `entries` SET `entrydate` = '2024-06-27' WHERE `netcal` = -200;