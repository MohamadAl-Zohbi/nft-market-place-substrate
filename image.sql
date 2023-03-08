-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 01, 2023 at 11:07 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nft_marketplace`
--

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uuid` varchar(25) NOT NULL,
  `type` smallint NOT NULL DEFAULT '1' COMMENT '1:nftImage;2:collectionImg;3:Collection Background;4 Collection Features',
  `archived` smallint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `path`, `uuid`, `type`, `archived`) VALUES
(0000000001, './uploads/images/4/5d5daf54-c518-4895-a274-7502c49c0dfd.png', '', 1, 0),
(0000000002, './uploads/images/4/a7bbc391-7577-4b89-89a3-1e4b8538c7be.png', '', 1, 0),
(0000000003, './uploads/images/4/47a6ca10-a8d1-460a-abd9-cb5e41af6a42.png', '', 1, 0),
(0000000004, './uploads/images/4/5d5daf54-c518-4895-a274-7502c49c0dfd.png', '', 1, 0),
(0000000005, './uploads/images/4/94b8f5c4-eeaa-48ea-9625-5519d48af7df.png', '', 1, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
