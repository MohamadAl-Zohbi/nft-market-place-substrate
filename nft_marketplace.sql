-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 06, 2023 at 08:58 AM
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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `public_key` varchar(64) NOT NULL,
  `secret_key` varchar(300) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `archived` smallint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`, `name`, `public_key`, `secret_key`, `created_date`, `updated_date`, `archived`) VALUES
(1, 'admin@admin.com', '1234', 'admin', '5Depso7tM5KPEmszbyy7mioEevgpmXByMNDiLLDrMF8YFXw9', '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', '2022-12-28 17:09:12', '2023-01-08 09:54:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `auction`
--

DROP TABLE IF EXISTS `auction`;
CREATE TABLE IF NOT EXISTS `auction` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `blockchain_auction_id` int UNSIGNED NOT NULL,
  `nft_id` int UNSIGNED NOT NULL,
  `seller_wallet_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `auction_start_date` timestamp NOT NULL,
  `auction_end_date` timestamp NOT NULL,
  `min_bid` double UNSIGNED NOT NULL,
  `min_step` double UNSIGNED NOT NULL,
  `current_bid` double UNSIGNED NOT NULL,
  `current_winner_wallet` int(10) UNSIGNED ZEROFILL NOT NULL,
  `status` smallint NOT NULL COMMENT '1:pending;2:completed;3:canceled',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `nft_id` (`nft_id`),
  KEY `wallet_address` (`seller_wallet_id`),
  KEY `current_winner_wallet` (`current_winner_wallet`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `auction`
--

INSERT INTO `auction` (`id`, `blockchain_auction_id`, `nft_id`, `seller_wallet_id`, `auction_start_date`, `auction_end_date`, `min_bid`, `min_step`, `current_bid`, `current_winner_wallet`, `status`, `created_date`) VALUES
(1, 1, 16, 0000000002, '2023-02-23 11:21:15', '2023-02-23 11:21:15', 2345, 525, 255, 0000000004, 2, '2023-02-23 11:21:15'),
(2, 0, 14, 0000000003, '2023-02-23 11:21:15', '2023-02-23 11:21:15', 144, 244, 255, 0000000008, 2, '2023-02-23 11:21:15'),
(3, 0, 15, 0000000007, '2023-02-23 11:21:40', '2023-02-23 11:21:40', 55, 66, 777, 0000000001, 2, '2023-02-23 11:21:40'),
(8, 0, 16, 0000000002, '2023-02-23 11:22:56', '2023-02-23 11:22:56', 587, 677, 1000, 0000000001, 2, '2023-02-23 11:22:56'),
(9, 2, 26, 0000000005, '2023-02-23 11:22:56', '2023-02-23 11:22:56', 56, 66, 79, 0000000006, 2, '2023-02-23 11:22:56'),
(10, 0, 14, 0000000007, '2023-02-23 11:26:29', '2023-02-23 11:26:29', 55, 744, 800, 0000000003, 0, '2023-02-23 11:26:29'),
(11, 2, 17, 0000000002, '2023-02-23 11:26:29', '2023-02-23 11:26:29', 90, 90, 150, 0000000005, 0, '2023-02-23 11:26:29'),
(18, 1, 1, 0000000008, '2023-02-23 11:28:00', '2023-02-23 11:28:00', 60, 66, 830, 0000000001, 2, '2023-02-23 11:28:00'),
(19, 1, 16, 0000000005, '2023-02-23 11:28:00', '2023-02-23 11:28:00', 144, 244, 785, 0000000003, 2, '2023-02-23 11:28:00');

-- --------------------------------------------------------

--
-- Table structure for table `auction_participants`
--

DROP TABLE IF EXISTS `auction_participants`;
CREATE TABLE IF NOT EXISTS `auction_participants` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `auction_id` int UNSIGNED NOT NULL,
  `bid` double UNSIGNED NOT NULL,
  `wallet_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `auction_id` (`auction_id`),
  KEY `wallet_address` (`wallet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `collection`
--

DROP TABLE IF EXISTS `collection`;
CREATE TABLE IF NOT EXISTS `collection` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `blockchain_collection_id` int UNSIGNED NOT NULL,
  `name` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nft_count` int UNSIGNED NOT NULL,
  `background_image` int UNSIGNED DEFAULT NULL,
  `front_image` int UNSIGNED DEFAULT NULL,
  `block_number` bigint UNSIGNED NOT NULL,
  `wallet_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `front_image` (`front_image`),
  KEY `background_image` (`background_image`),
  KEY `wallet_address` (`wallet_id`),
  KEY `nft_count` (`nft_count`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `collection`
--

INSERT INTO `collection` (`id`, `blockchain_collection_id`, `name`, `description`, `nft_count`, `background_image`, `front_image`, `block_number`, `wallet_id`, `created_date`, `updated_date`) VALUES
(1, 0, 'collection1', 'lukytryetarwesrtyuiop[]poiuytdsa[poiutyrtesjk', 24, 1, 1, 122, 0000000001, '2023-02-20 15:36:13', '2023-03-02 04:12:42'),
(2, 0, 'collection2', 'lpoiugyewiuwoooibvucgsfajkhsldjsdfjobiuhyvcbgxbhIUCJOSVGIHNCLKM;VIJOHGUDJIO', 10, 1, 1, 122, 0000000003, '2023-02-20 15:36:34', '2023-03-03 04:34:23'),
(3, 2, 'collection3', 'kmgsfkgkmlgrlekglkemrgkerge', 6, 1, 1, 12, 0000000003, '2023-02-23 10:34:15', '2023-03-03 04:35:10'),
(4, 0, 'collection4', 'sfdsffgfgfgfdfcfvcscfsccxx  ', 35, 1, 1, 23, 0000000007, '2023-02-23 10:34:15', '2023-03-03 12:15:08'),
(5, 1, 'abdelkarim_collection', 'kj;madf;jklkfeanjfnlksdskfvlkf', 0, 11, 11, 33, 0000000003, '2023-03-03 06:10:47', '2023-03-03 06:10:47'),
(6, 1, 'abdelkarim_collection', 'kj;madf;jklkfeanjfnlksdskfvlkf', 0, 16, 16, 33, 0000000003, '2023-03-03 14:00:31', '2023-03-03 14:00:31'),
(7, 1, 'abdelkarim_collection', 'kj;madf;jklkfeanjfnlksdskfvlkf', 0, NULL, NULL, 33, 0000000003, '2023-03-06 08:49:18', NULL),
(8, 1, 'abdelkarim_collection', 'kj;madf;jklkfeanjfnlksdskfvlkf', 0, NULL, NULL, 33, 0000000003, '2023-03-06 08:49:39', NULL),
(9, 1, 'abdelkarim_collection56356', 'kj;madf;jklkfeanjfnlksdskfvlkf', 0, NULL, NULL, 33, 0000000003, '2023-03-06 08:50:14', NULL),
(10, 1, 'abdelkarim_collection56356', 'kj;madf;jklkfeanjfnlksdskfvlkf', 0, NULL, NULL, 33, 0000000003, '2023-03-06 08:51:15', NULL),
(11, 1, 'abdelkarim_collection56356', 'kj;madf;jklkfeanjfnlksdskfvlkf', 0, NULL, NULL, 33, 0000000003, '2023-03-06 08:52:16', NULL),
(12, 1, 'abdelkarim_collection56356', 'kj;madf;jklkfeanjfnlksdskfvlkf', 0, NULL, NULL, 33, 0000000003, '2023-03-06 08:52:28', NULL),
(13, 1, 'abdelkarim_collection5635622', 'kj;madf;jklkfeanjfnlksdskfvlkf', 0, 17, 17, 33, 0000000003, '2023-03-06 08:55:30', '2023-03-06 08:55:30');

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
CREATE TABLE IF NOT EXISTS `content` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `slug` varchar(30) NOT NULL,
  `page` longtext NOT NULL,
  `updated_by` smallint UNSIGNED NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `archived` smallint UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `updated_by` (`updated_by`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `title`, `slug`, `page`, `updated_by`, `created_date`, `updated_date`, `archived`) VALUES
(1, 'About us', 'about-us', '<h1>hi</h1><p>this is dummy text for testing</p>', 1, '2023-01-08 09:36:40', '2023-01-08 09:39:10', 0),
(2, 'Contact us', 'contact-us', '<h1>hi</h1><p>this is dummy text for testing</p>', 1, '2023-01-08 09:36:40', '2023-01-08 09:39:10', 0);

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
CREATE TABLE IF NOT EXISTS `country` (
  `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `archived` smallint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `name`, `archived`) VALUES
(1, 'lebanon', 0),
(2, 'Canada', 0),
(3, 'USA', 0),
(4, 'Mexico', 0),
(5, 'souria', 0),
(6, 'argantine', 0),
(7, 'africia', 0),
(8, 'holanda', 0);

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
CREATE TABLE IF NOT EXISTS `faq` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `question` varchar(300) NOT NULL,
  `answer` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `question`, `answer`, `created_at`) VALUES
(0000000001, 'question1', 'answer1', '2023-02-20 14:22:03'),
(0000000002, 'question2', 'answer2', '2023-02-20 14:22:03');

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
CREATE TABLE IF NOT EXISTS `favorite` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int UNSIGNED NOT NULL,
  `nft_id` int UNSIGNED NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `favorite_nft`
--

DROP TABLE IF EXISTS `favorite_nft`;
CREATE TABLE IF NOT EXISTS `favorite_nft` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `user_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `nft_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `created_date` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nft_id` (`nft_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `fraud`
--

DROP TABLE IF EXISTS `fraud`;
CREATE TABLE IF NOT EXISTS `fraud` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wallet_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `auction_id` int(10) UNSIGNED ZEROFILL DEFAULT NULL,
  `listing_id` int(10) UNSIGNED ZEROFILL DEFAULT NULL,
  `offer_id` int(10) UNSIGNED ZEROFILL DEFAULT NULL,
  `created_date` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `auction_id` (`auction_id`),
  KEY `listing_id` (`listing_id`),
  KEY `offer_id` (`offer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `path` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `uuid` varchar(40) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `type` smallint NOT NULL DEFAULT '1' COMMENT '1:nftImage;2:collectionImg;3:Collection Background;4 Collection Features',
  `archived` smallint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `path`, `uuid`, `type`, `archived`) VALUES
(0000000001, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', '0b173a42147f4b1daa4028ee5f3c39a2', 1, 0),
(0000000002, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', '0b173a42147f4b1daa4028ee5f3c39a2', 1, 0),
(0000000003, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', '0b173a42147f4b1daa4028ee5f3c39a2', 1, 0),
(0000000004, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', '0b173a42147f4b1daa4028ee5f3c39a2', 1, 0),
(0000000005, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', '0b173a42147f4b1daa4028ee5f3c39a2', 1, 0),
(0000000006, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', '0b173a42147f4b1daa4028ee5f3c39a2', 1, 0),
(0000000007, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', '0b173a42147f4b1daa4028ee5f3c39a2', 1, 0),
(0000000008, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', '0b173a42147f4b1daa4028ee5f3c39a2', 1, 0),
(0000000009, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', '0b173a42147f4b1daa4028ee5f3c39a2', 1, 0),
(0000000010, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', '6ed78335-b262-4886-9ca9-4', 1, 0),
(0000000011, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', '0b173a42147f4b1daa4028ee5f3c39a2', 1, 0),
(0000000012, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', '0b173a42147f4b1daa4028ee5f3c39a2', 1, 0),
(0000000013, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', '0b173a42147f4b1daa4028ee5f3c39a2', 1, 0),
(0000000014, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', '0b173a42147f4b1daa4028ee5f3c39a2', 1, 0),
(0000000015, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', '0b173a42147f4b1daa4028ee5f3c39a2', 1, 0),
(0000000016, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', '0b173a42147f4b1daa4028ee5f3c39a2', 1, 0),
(0000000017, 'localhost/substrate-nft-marketplace/backend/uploads/images/13', 'd2166ad5f3c44d57a08f35190222634c', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `listing`
--

DROP TABLE IF EXISTS `listing`;
CREATE TABLE IF NOT EXISTS `listing` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `nft_id` int UNSIGNED NOT NULL,
  `blockchain_listing_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `buyer_wallet_id` int(10) UNSIGNED ZEROFILL DEFAULT NULL,
  `seller_wallet_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `price` double UNSIGNED NOT NULL,
  `status` int UNSIGNED NOT NULL DEFAULT '1',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `nft_id` (`nft_id`),
  KEY `buyer_wallet_address` (`buyer_wallet_id`),
  KEY `seller_wallet_address` (`seller_wallet_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `listing`
--

INSERT INTO `listing` (`id`, `nft_id`, `blockchain_listing_id`, `buyer_wallet_id`, `seller_wallet_id`, `price`, `status`, `created_date`, `updated_date`) VALUES
(1, 18, 0000000001, 0000000003, 0000000005, 87456, 1, '2023-02-21 12:34:46', NULL),
(2, 14, 0000000001, 0000000002, 0000000005, 644, 1, '2023-02-23 11:23:33', NULL),
(3, 1, 0000000000, 0000000005, 0000000001, 755, 1, '2023-02-23 11:23:33', NULL),
(4, 1, 0000000001, 0000000004, 0000000007, 2145, 1, '2023-02-23 11:23:45', NULL),
(5, 27, 0000000000, 0000000001, 0000000002, 666, 1, '2023-02-23 11:24:38', NULL),
(6, 21, 0000000002, 0000000002, 0000000005, 644, 1, '2023-02-23 11:24:38', NULL),
(7, 27, 0000000000, 0000000008, 0000000005, 655, 1, '2023-02-23 11:25:05', NULL),
(8, 26, 0000000001, 0000000004, 0000000001, 5502, 1, '2023-02-23 11:25:05', NULL),
(9, 1, 0000000001, 0000000003, 0000000005, 124141, 1, '2023-02-23 11:25:25', NULL),
(10, 24, 0000000000, 0000000003, 0000000007, 5135135, 1, '2023-02-23 11:25:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
CREATE TABLE IF NOT EXISTS `log` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int UNSIGNED DEFAULT NULL,
  `api_name` varchar(50) NOT NULL,
  `error` text NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`id`, `user_id`, `api_name`, `error`, `created_date`) VALUES
(1, NULL, '/country/:id', 'EntityNotFoundError: Could not find any entity of type \"Country\" matching: {\n    \"where\": {\n        \"id\": \"34\"\n    }\n}\n    at C:\\Users\\Mo\\Documents\\GitHub\\cex-exchanger-backend\\node_modules\\src\\entity-manager\\EntityManager.ts:1184:25\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)\n    at async findOne (C:\\Users\\Mo\\Documents\\GitHub\\cex-exchanger-backend\\module\\country.ts:18:10)\n    at async C:\\Users\\Mo\\Documents\\GitHub\\cex-exchanger-backend\\router\\country.ts:36:18', '2023-01-17 22:07:36'),
(2, NULL, '/nft/create', 'TypeError: Cannot read properties of undefined (reading \'apply\')\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:646:15\n    at next (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:265:14)\n    at Function.handle (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:175:3)\n    at router (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:47:12)\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\nft.ts:132:32\n    at Layer.handle [as handle_request] (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\route.js:144:13)\n    at done (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:45:7)\n    at indicateDone (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:49:68)\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:155:11\n    at WriteStream.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\storage\\disk.js:43:9)\n    at WriteStream.emit (node:events:539:35)\n    at WriteStream.emit (node:domain:475:12)\n    at finish (node:internal/streams/writable:754:10)\n    at finishMaybe (node:internal/streams/writable:739:9)\n    at afterWrite (node:internal/streams/writable:504:3)', '2023-02-24 11:50:49'),
(3, NULL, '/nft/create', 'TypeError: Cannot read properties of undefined (reading \'apply\')\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:646:15\n    at next (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:265:14)\n    at Function.handle (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:175:3)\n    at router (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:47:12)\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\nft.ts:132:32\n    at Layer.handle [as handle_request] (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\route.js:144:13)\n    at done (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:45:7)\n    at indicateDone (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:49:68)\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:155:11\n    at WriteStream.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\storage\\disk.js:43:9)\n    at WriteStream.emit (node:events:539:35)\n    at WriteStream.emit (node:domain:475:12)\n    at finish (node:internal/streams/writable:754:10)\n    at finishMaybe (node:internal/streams/writable:739:9)\n    at afterWrite (node:internal/streams/writable:504:3)', '2023-02-24 11:51:29'),
(4, NULL, '/nft/create', 'TypeError: Cannot read properties of undefined (reading \'apply\')\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:646:15\n    at next (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:265:14)\n    at Function.handle (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:175:3)\n    at router (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:47:12)\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\nft.ts:132:32\n    at Layer.handle [as handle_request] (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\route.js:144:13)\n    at done (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:45:7)\n    at indicateDone (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:49:68)\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:155:11\n    at WriteStream.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\storage\\disk.js:43:9)\n    at WriteStream.emit (node:events:539:35)\n    at WriteStream.emit (node:domain:475:12)\n    at finish (node:internal/streams/writable:754:10)\n    at finishMaybe (node:internal/streams/writable:739:9)\n    at afterWrite (node:internal/streams/writable:504:3)', '2023-02-24 11:52:57'),
(5, NULL, '/nft/create', 'TypeError: Cannot read properties of undefined (reading \'apply\')\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:646:15\n    at next (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:265:14)\n    at Function.handle (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:175:3)\n    at router (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:47:12)\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\nft.ts:132:32\n    at Layer.handle [as handle_request] (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\route.js:144:13)\n    at done (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:45:7)\n    at indicateDone (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:49:68)\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:155:11\n    at WriteStream.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\storage\\disk.js:43:9)\n    at WriteStream.emit (node:events:539:35)\n    at WriteStream.emit (node:domain:475:12)\n    at finish (node:internal/streams/writable:754:10)\n    at finishMaybe (node:internal/streams/writable:739:9)\n    at afterWrite (node:internal/streams/writable:504:3)', '2023-02-24 11:53:54'),
(6, NULL, '/nft/create', 'TypeError: Cannot read properties of undefined (reading \'apply\')\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:646:15\n    at next (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:265:14)\n    at Function.handle (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:175:3)\n    at router (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:47:12)\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\nft.ts:132:32\n    at Layer.handle [as handle_request] (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\route.js:144:13)\n    at done (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:45:7)\n    at indicateDone (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:49:68)\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:155:11\n    at WriteStream.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\storage\\disk.js:43:9)\n    at WriteStream.emit (node:events:539:35)\n    at WriteStream.emit (node:domain:475:12)\n    at finish (node:internal/streams/writable:754:10)\n    at finishMaybe (node:internal/streams/writable:739:9)\n    at afterWrite (node:internal/streams/writable:504:3)', '2023-02-24 11:54:17'),
(7, NULL, '/nft/create', 'TypeError: Cannot read properties of undefined (reading \'apply\')\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:646:15\n    at next (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:265:14)\n    at Function.handle (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:175:3)\n    at router (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:47:12)\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\nft.ts:133:32\n    at Layer.handle [as handle_request] (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\route.js:144:13)\n    at done (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:45:7)\n    at indicateDone (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:49:68)\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:155:11\n    at WriteStream.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\storage\\disk.js:43:9)\n    at WriteStream.emit (node:events:539:35)\n    at WriteStream.emit (node:domain:475:12)\n    at finish (node:internal/streams/writable:754:10)\n    at finishMaybe (node:internal/streams/writable:739:9)\n    at afterWrite (node:internal/streams/writable:504:3)', '2023-02-24 11:55:25'),
(8, NULL, '/nft/create', 'TypeError: Cannot read properties of undefined (reading \'apply\')\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:646:15\n    at next (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:265:14)\n    at Function.handle (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:175:3)\n    at router (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:47:12)\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\nft.ts:133:32\n    at Layer.handle [as handle_request] (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\route.js:144:13)\n    at done (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:45:7)\n    at indicateDone (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:49:68)\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:155:11\n    at WriteStream.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\storage\\disk.js:43:9)\n    at WriteStream.emit (node:events:539:35)\n    at WriteStream.emit (node:domain:475:12)\n    at finish (node:internal/streams/writable:754:10)\n    at finishMaybe (node:internal/streams/writable:739:9)\n    at afterWrite (node:internal/streams/writable:504:3)', '2023-02-24 11:55:57'),
(9, NULL, '/nft/create', 'TypeError: Cannot read properties of undefined (reading \'apply\')\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:646:15\n    at next (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:265:14)\n    at Function.handle (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:175:3)\n    at router (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\index.js:47:12)\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\nft.ts:133:32\n    at Layer.handle [as handle_request] (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\express\\lib\\router\\route.js:144:13)\n    at done (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:45:7)\n    at indicateDone (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:49:68)\n    at C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\lib\\make-middleware.js:155:11\n    at WriteStream.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\multer\\storage\\disk.js:43:9)\n    at WriteStream.emit (node:events:539:35)\n    at WriteStream.emit (node:domain:475:12)\n    at finish (node:internal/streams/writable:754:10)\n    at finishMaybe (node:internal/streams/writable:739:9)\n    at afterWrite (node:internal/streams/writable:504:3)', '2023-02-24 11:56:27'),
(10, NULL, '/nft/create', 'QueryFailedError: Cannot add or update a child row: a foreign key constraint fails (`nft_marketplace`.`nft`, CONSTRAINT `nft_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collection` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT)\n    at Query.onResult (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\typeorm\\src\\driver\\mysql\\MysqlQueryRunner.ts:222:33)\n    at Query.execute (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\commands\\command.js:36:14)\n    at PoolConnection.handlePacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:456:32)\n    at PacketParser.onPacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:85:12)\n    at PacketParser.executeStart (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\packet_parser.js:75:16)\n    at Socket.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:92:25)\n    at Socket.emit (node:events:527:28)\n    at Socket.emit (node:domain:475:12)\n    at addChunk (node:internal/streams/readable:315:12)\n    at readableAddChunk (node:internal/streams/readable:289:9)\n    at Socket.Readable.push (node:internal/streams/readable:228:10)\n    at TCP.onStreamRead (node:internal/stream_base_commons:190:23)', '2023-02-24 11:57:10'),
(11, NULL, '/nft/create', 'QueryFailedError: Cannot add or update a child row: a foreign key constraint fails (`nft_marketplace`.`nft`, CONSTRAINT `nft_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collection` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT)\n    at Query.onResult (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\typeorm\\src\\driver\\mysql\\MysqlQueryRunner.ts:222:33)\n    at Query.execute (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\commands\\command.js:36:14)\n    at PoolConnection.handlePacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:456:32)\n    at PacketParser.onPacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:85:12)\n    at PacketParser.executeStart (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\packet_parser.js:75:16)\n    at Socket.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:92:25)\n    at Socket.emit (node:events:527:28)\n    at Socket.emit (node:domain:475:12)\n    at addChunk (node:internal/streams/readable:315:12)\n    at readableAddChunk (node:internal/streams/readable:289:9)\n    at Socket.Readable.push (node:internal/streams/readable:228:10)\n    at TCP.onStreamRead (node:internal/stream_base_commons:190:23)', '2023-02-24 12:10:32'),
(12, NULL, '/nft/create', 'QueryFailedError: Cannot add or update a child row: a foreign key constraint fails (`nft_marketplace`.`nft`, CONSTRAINT `nft_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collection` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT)\n    at Query.onResult (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\typeorm\\src\\driver\\mysql\\MysqlQueryRunner.ts:222:33)\n    at Query.execute (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\commands\\command.js:36:14)\n    at PoolConnection.handlePacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:456:32)\n    at PacketParser.onPacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:85:12)\n    at PacketParser.executeStart (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\packet_parser.js:75:16)\n    at Socket.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:92:25)\n    at Socket.emit (node:events:527:28)\n    at Socket.emit (node:domain:475:12)\n    at addChunk (node:internal/streams/readable:315:12)\n    at readableAddChunk (node:internal/streams/readable:289:9)\n    at Socket.Readable.push (node:internal/streams/readable:228:10)\n    at TCP.onStreamRead (node:internal/stream_base_commons:190:23)', '2023-02-24 12:14:25'),
(13, NULL, '/nft/top-ten-collections', 'QueryFailedError: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'AS id ORDER BY count DESC LIMIT 10\' at line 1\n    at Query.onResult (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\typeorm\\src\\driver\\mysql\\MysqlQueryRunner.ts:222:33)\n    at Query.execute (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\commands\\command.js:36:14)\n    at PoolConnection.handlePacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:456:32)\n    at PacketParser.onPacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:85:12)\n    at PacketParser.executeStart (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\packet_parser.js:75:16)\n    at Socket.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:92:25)\n    at Socket.emit (node:events:527:28)\n    at Socket.emit (node:domain:475:12)\n    at addChunk (node:internal/streams/readable:315:12)\n    at readableAddChunk (node:internal/streams/readable:289:9)\n    at Socket.Readable.push (node:internal/streams/readable:228:10)\n    at TCP.onStreamRead (node:internal/stream_base_commons:190:23)', '2023-03-01 14:18:37'),
(14, NULL, '/nft/top-ten-collections', 'QueryFailedError: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'AS id ORDER BY count DESC LIMIT 10\' at line 1\n    at Query.onResult (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\typeorm\\src\\driver\\mysql\\MysqlQueryRunner.ts:222:33)\n    at Query.execute (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\commands\\command.js:36:14)\n    at PoolConnection.handlePacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:456:32)\n    at PacketParser.onPacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:85:12)\n    at PacketParser.executeStart (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\packet_parser.js:75:16)\n    at Socket.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:92:25)\n    at Socket.emit (node:events:527:28)\n    at Socket.emit (node:domain:475:12)\n    at addChunk (node:internal/streams/readable:315:12)\n    at readableAddChunk (node:internal/streams/readable:289:9)\n    at Socket.Readable.push (node:internal/streams/readable:228:10)\n    at TCP.onStreamRead (node:internal/stream_base_commons:190:23)', '2023-03-01 14:18:42'),
(15, NULL, '/nft/top-ten-collections', 'QueryFailedError: Unknown column \'count\' in \'order clause\'\n    at Query.onResult (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\typeorm\\src\\driver\\mysql\\MysqlQueryRunner.ts:222:33)\n    at Query.execute (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\commands\\command.js:36:14)\n    at PoolConnection.handlePacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:456:32)\n    at PacketParser.onPacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:85:12)\n    at PacketParser.executeStart (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\packet_parser.js:75:16)\n    at Socket.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:92:25)\n    at Socket.emit (node:events:527:28)\n    at Socket.emit (node:domain:475:12)\n    at addChunk (node:internal/streams/readable:315:12)\n    at readableAddChunk (node:internal/streams/readable:289:9)\n    at Socket.Readable.push (node:internal/streams/readable:228:10)\n    at TCP.onStreamRead (node:internal/stream_base_commons:190:23)', '2023-03-01 14:19:26'),
(16, NULL, '/nft/top-ten-collections', 'QueryFailedError: Unknown column \'count\' in \'order clause\'\n    at Query.onResult (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\typeorm\\src\\driver\\mysql\\MysqlQueryRunner.ts:222:33)\n    at Query.execute (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\commands\\command.js:36:14)\n    at PoolConnection.handlePacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:456:32)\n    at PacketParser.onPacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:85:12)\n    at PacketParser.executeStart (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\packet_parser.js:75:16)\n    at Socket.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:92:25)\n    at Socket.emit (node:events:527:28)\n    at Socket.emit (node:domain:475:12)\n    at addChunk (node:internal/streams/readable:315:12)\n    at readableAddChunk (node:internal/streams/readable:289:9)\n    at Socket.Readable.push (node:internal/streams/readable:228:10)\n    at TCP.onStreamRead (node:internal/stream_base_commons:190:23)', '2023-03-01 14:19:31'),
(17, NULL, '/nft/top-ten-collections', 'QueryFailedError: Unknown column \'count\' in \'order clause\'\n    at Query.onResult (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\typeorm\\src\\driver\\mysql\\MysqlQueryRunner.ts:222:33)\n    at Query.execute (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\commands\\command.js:36:14)\n    at PoolConnection.handlePacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:456:32)\n    at PacketParser.onPacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:85:12)\n    at PacketParser.executeStart (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\packet_parser.js:75:16)\n    at Socket.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:92:25)\n    at Socket.emit (node:events:527:28)\n    at Socket.emit (node:domain:475:12)\n    at addChunk (node:internal/streams/readable:315:12)\n    at readableAddChunk (node:internal/streams/readable:289:9)\n    at Socket.Readable.push (node:internal/streams/readable:228:10)\n    at TCP.onStreamRead (node:internal/stream_base_commons:190:23)', '2023-03-01 14:21:16'),
(18, NULL, '/nft/top-ten-collections', 'QueryFailedError: Unknown column \'count\' in \'order clause\'\n    at Query.onResult (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\typeorm\\src\\driver\\mysql\\MysqlQueryRunner.ts:222:33)\n    at Query.execute (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\commands\\command.js:36:14)\n    at PoolConnection.handlePacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:456:32)\n    at PacketParser.onPacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:85:12)\n    at PacketParser.executeStart (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\packet_parser.js:75:16)\n    at Socket.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:92:25)\n    at Socket.emit (node:events:527:28)\n    at Socket.emit (node:domain:475:12)\n    at addChunk (node:internal/streams/readable:315:12)\n    at readableAddChunk (node:internal/streams/readable:289:9)\n    at Socket.Readable.push (node:internal/streams/readable:228:10)\n    at TCP.onStreamRead (node:internal/stream_base_commons:190:23)', '2023-03-01 14:21:36'),
(19, NULL, '/nft/top-ten-collections', 'QueryFailedError: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \', `nft`.`collection_id` AS id, `collection`.`blockchain_collection_id`,collectio\' at line 1\n    at Query.onResult (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\typeorm\\src\\driver\\mysql\\MysqlQueryRunner.ts:222:33)\n    at Query.execute (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\commands\\command.js:36:14)\n    at PoolConnection.handlePacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:456:32)\n    at PacketParser.onPacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:85:12)\n    at PacketParser.executeStart (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\packet_parser.js:75:16)\n    at Socket.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:92:25)\n    at Socket.emit (node:events:527:28)\n    at Socket.emit (node:domain:475:12)\n    at addChunk (node:internal/streams/readable:315:12)\n    at readableAddChunk (node:internal/streams/readable:289:9)\n    at Socket.Readable.push (node:internal/streams/readable:228:10)\n    at TCP.onStreamRead (node:internal/stream_base_commons:190:23)', '2023-03-01 14:27:57'),
(20, NULL, '/nft/top-ten-collections', 'QueryFailedError: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \', `nft`.`collection_id` AS id, `collection`.`blockchain_collection_id`,collectio\' at line 1\n    at Query.onResult (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\typeorm\\src\\driver\\mysql\\MysqlQueryRunner.ts:222:33)\n    at Query.execute (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\commands\\command.js:36:14)\n    at PoolConnection.handlePacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:456:32)\n    at PacketParser.onPacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:85:12)\n    at PacketParser.executeStart (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\packet_parser.js:75:16)\n    at Socket.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:92:25)\n    at Socket.emit (node:events:527:28)\n    at Socket.emit (node:domain:475:12)\n    at addChunk (node:internal/streams/readable:315:12)\n    at readableAddChunk (node:internal/streams/readable:289:9)\n    at Socket.Readable.push (node:internal/streams/readable:228:10)\n    at TCP.onStreamRead (node:internal/stream_base_commons:190:23)', '2023-03-01 14:28:31'),
(21, NULL, '/collection/top-ten-collections', 'QueryFailedError: Unknown column \'distinctAlias.Collection_nft_count\' in \'field list\'\n    at Query.onResult (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\typeorm\\src\\driver\\mysql\\MysqlQueryRunner.ts:222:33)\n    at Query.execute (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\commands\\command.js:36:14)\n    at PoolConnection.handlePacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:456:32)\n    at PacketParser.onPacket (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:85:12)\n    at PacketParser.executeStart (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\packet_parser.js:75:16)\n    at Socket.<anonymous> (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\node_modules\\mysql2\\lib\\connection.js:92:25)\n    at Socket.emit (node:events:527:28)\n    at Socket.emit (node:domain:475:12)\n    at addChunk (node:internal/streams/readable:315:12)\n    at readableAddChunk (node:internal/streams/readable:289:9)\n    at Socket.Readable.push (node:internal/streams/readable:228:10)\n    at TCP.onStreamRead (node:internal/stream_base_commons:190:23)', '2023-03-02 13:30:42'),
(22, NULL, '/nft/create', 'TypeError: Cannot read properties of undefined (reading \'0\')\n    at createNft (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\module\\nft.ts:147:24)\n    at async C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\nft.ts:140:20', '2023-03-02 14:10:17'),
(23, NULL, '/nft/create', 'TypeError: Cannot read properties of undefined (reading \'0\')\n    at createNft (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\module\\nft.ts:147:24)\n    at async C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\nft.ts:140:20', '2023-03-02 14:11:46'),
(24, NULL, '/nft/create', 'TypeError: Cannot read properties of undefined (reading \'0\')\n    at createNft (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\module\\nft.ts:147:24)\n    at async C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\nft.ts:140:20', '2023-03-02 14:12:43'),
(25, NULL, '/nft/create', 'TypeError: Cannot read properties of undefined (reading \'0\')\n    at createNft (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\module\\nft.ts:147:23)\n    at async C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\nft.ts:140:20', '2023-03-02 14:13:35'),
(26, NULL, '/nft/create', 'TypeError: Cannot read properties of undefined (reading \'0\')\n    at createNft (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\module\\nft.ts:147:23)\n    at async C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\nft.ts:140:20', '2023-03-02 14:14:10'),
(27, NULL, '/nft/create', 'TypeError: Cannot read properties of undefined (reading \'0\')\n    at createNft (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\module\\nft.ts:147:24)\n    at async C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\nft.ts:140:20', '2023-03-02 14:15:35'),
(28, NULL, '/nft/create', 'TypeError: Cannot read properties of undefined (reading \'0\')\n    at createNft (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\module\\nft.ts:148:24)\n    at async C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\nft.ts:140:20', '2023-03-02 14:16:13'),
(29, NULL, '/user/signup', 'TypeError: Cannot read properties of undefined (reading \'path\')\n    at userSignUp (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\module\\user.ts:63:18)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)\n    at async C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\user.ts:70:18', '2023-03-06 08:02:00'),
(30, NULL, '/user/signup', 'TypeError: Cannot read properties of undefined (reading \'path\')\n    at userSignUp (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\module\\user.ts:63:18)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)\n    at async C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\user.ts:70:18', '2023-03-06 08:04:15'),
(31, NULL, '/collection/create', 'TypeError: Cannot read properties of undefined (reading \'0\')\n    at creatCollection (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\module\\collection.ts:202:29)\n    at async C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\collection.ts:54:22', '2023-03-06 08:49:19'),
(32, NULL, '/collection/create', 'TypeError: Cannot read properties of undefined (reading \'0\')\n    at creatCollection (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\module\\collection.ts:202:29)\n    at async C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\collection.ts:54:22', '2023-03-06 08:49:39'),
(33, NULL, '/collection/create', 'TypeError: Cannot read properties of undefined (reading \'0\')\n    at creatCollection (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\module\\collection.ts:202:29)\n    at async C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\collection.ts:54:22', '2023-03-06 08:50:14'),
(34, NULL, '/collection/create', 'TypeError: Cannot read properties of undefined (reading \'0\')\n    at creatCollection (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\module\\collection.ts:202:29)\n    at async C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\collection.ts:54:22', '2023-03-06 08:51:15'),
(35, NULL, '/collection/create', 'TypeError: Cannot read properties of undefined (reading \'0\')\n    at creatCollection (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\module\\collection.ts:202:29)\n    at async C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\collection.ts:54:22', '2023-03-06 08:52:16'),
(36, NULL, '/collection/create', 'TypeError: Cannot read properties of undefined (reading \'0\')\n    at creatCollection (C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\module\\collection.ts:202:29)\n    at async C:\\wamp64\\www\\nft\\subtrate-nft-marketplace\\backend\\router\\collection.ts:54:22', '2023-03-06 08:52:28');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(80) NOT NULL,
  `password` varchar(50) NOT NULL,
  `private_key` varchar(200) NOT NULL,
  `password_reset_token` varchar(15) DEFAULT NULL,
  `verified` smallint NOT NULL DEFAULT '0',
  `verification_token` varchar(15) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `archived` smallint NOT NULL DEFAULT '0' COMMENT '0:not archived;1:archived',
  PRIMARY KEY (`id`),
  KEY `archived` (`archived`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `email`, `password`, `private_key`, `password_reset_token`, `verified`, `verification_token`, `created_date`, `updated_date`, `archived`) VALUES
(1, 'alice@user.com', '123', '', NULL, 1, '', '2023-01-08 09:53:27', '2023-03-02 13:56:32', 0),
(2, 'alice_stack@user.com', '81dc9bdb52d04dc20036', '', NULL, 0, '', '2023-01-08 09:53:27', '2023-01-09 20:30:10', 0),
(3, 'BOB@user.com', '81dc9bdb52d04dc20036', '', NULL, 0, '', '2023-01-08 09:53:27', '2023-01-09 20:31:35', 0),
(4, 'BOB_STASH@user.com', '81dc9bdb52d04dc20036', '', NULL, 0, '', '2023-01-08 09:53:27', '2023-01-09 20:32:35', 0),
(5, 'CHARLIE@user.com', '81dc9bdb52d04dc20036', '', NULL, 0, '', '2023-01-08 09:53:27', '2023-01-09 20:39:18', 0),
(6, 'FERDIE@user.com', '81dc9bdb52d04dc20036', '', NULL, 0, '', '2023-01-08 09:53:27', '2023-01-09 20:40:30', 0),
(7, 'DAVE@user.com', '81dc9bdb52d04dc20036', '', NULL, 0, '', '2023-01-08 09:53:27', '2023-01-09 20:33:19', 0),
(8, 'EVE@user.com', '81dc9bdb52d04dc20036', '', NULL, 0, '', '2023-01-08 09:53:27', '2023-01-09 20:33:41', 0),
(9, 'teest55@gmail.com', 'b3c97ebe39318a9ad81159a5f4ea25de', 'afdafauqe', NULL, 0, 'Ua4CFv3vv4lCPk', '2023-03-06 07:35:43', '2023-03-06 07:35:43', 0),
(10, 'tees42322t55@gmail.com', 'b3c97ebe39318a9ad81159a5f4ea25de', 'afdafauqe', NULL, 0, 'nFpiVnPr9Jwmtj', '2023-03-06 07:47:00', '2023-03-06 07:47:00', 0),
(11, 'tewwes42322t55@gmail.com', 'b3c97ebe39318a9ad81159a5f4ea25de', 'afdafauqe', NULL, 0, '2WR5eUK1Vi1xU5', '2023-03-06 08:01:59', '2023-03-06 08:01:59', 0),
(12, 'ts42322t55@gmail.com', 'b3c97ebe39318a9ad81159a5f4ea25de', 'afdafauqe', NULL, 0, 'Ry5QkSzKEUWJ3L', '2023-03-06 08:04:15', '2023-03-06 08:04:15', 0),
(13, 'ts42322t55@gmail.com2', 'b3c97ebe39318a9ad81159a5f4ea25de', 'afdafauqe', NULL, 0, '3wd2FCcZJV6nzs', '2023-03-06 08:04:53', '2023-03-06 08:04:53', 0),
(14, 'ts4233422t55@gmail.com2', 'b3c97ebe39318a9ad81159a5f4ea25de', 'afdafauqe', NULL, 0, 'LivevnJdI8cp7N', '2023-03-06 08:31:35', '2023-03-06 08:31:35', 0);

-- --------------------------------------------------------

--
-- Table structure for table `nft`
--

DROP TABLE IF EXISTS `nft`;
CREATE TABLE IF NOT EXISTS `nft` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `current_price` double UNSIGNED NOT NULL DEFAULT '0',
  `favorite_count` int UNSIGNED NOT NULL DEFAULT '0',
  `collection_id` int UNSIGNED NOT NULL,
  `blockchain_nft_id` int UNSIGNED NOT NULL,
  `image_id` int UNSIGNED DEFAULT NULL,
  `nft_info_id` int UNSIGNED NOT NULL,
  `owner_wallet_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `collection_id` (`collection_id`),
  KEY `image_id` (`image_id`),
  KEY `nft_info_id` (`nft_info_id`),
  KEY `owner_wallet` (`owner_wallet_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `nft`
--

INSERT INTO `nft` (`id`, `name`, `description`, `current_price`, `favorite_count`, `collection_id`, `blockchain_nft_id`, `image_id`, `nft_info_id`, `owner_wallet_id`, `created_date`) VALUES
(0000000001, 'NFT2214', 'ASSJKHKFHGJFIUIUTYERRTDTFGHJK[PIINBVSCAHWGHJ', 13513, 1, 2, 1, 1, 1, 0000000001, '2023-02-20 15:39:50'),
(0000000002, 'NFT62', 'DSAFSYDSWBNUTUWQQZZGFJTYIUIHLNDTUFSFPNKXFLDPP[P;LKJH', 2, 1, 1, 1, 1, 1, 0000000001, '2023-02-20 15:40:44'),
(0000000014, 'nft1', 'asdfklhgfdewrjkllcxfyervae', 425, 1, 2, 1, 1, 2, 0000000002, '2023-02-21 08:45:16'),
(0000000015, 'nft922', 'sdafkljhgfrDEIULYRGTFIUGTFSDAEGFHFGHJCGFUIOUTRYTDYUOIUTYDTBNVXCZGHJKL;JGFXHBJKJHBV', 453, 1, 2, 1, 1, 1, 0000000001, '2023-02-21 08:45:16'),
(0000000016, 'NFT2332', 'asdfhgdfsfnjhtrerkljhygtfrftghj', 643, 1, 1, 1, 1, 2, 0000000002, '2023-02-21 08:45:16'),
(0000000017, 'nft622', 'sadjrbvc q q q q q q q q q q q q q q q q qunncgnchnjcffdskjfds', 7643, 1, 2, 1, 1, 2, 0000000002, '2023-02-21 08:45:16'),
(0000000018, 'nft9012', 'adfsghdcerttrqqttqfcrpmpiomrxrewrexnirexwiudrxuhfexjhifecjhinrewjhifrcjhnncfrjhnacrggcrfgcijgfrjkrkj', 9812, 1, 2, 1, 1, 2, 0000000001, '2023-02-21 08:45:16'),
(0000000019, 'nft3433', 'dsaffdsgv afcrtgefdrtgjkgtrhujykdfgkjggefshtrfypou', 100, 1, 1, 1, 1, 1, 0000000002, '2023-02-21 08:45:16'),
(0000000020, 'nftZohbi', 'dsfdgfgrwrgwgrgrge', 324, 1, 1, 1, 1, 2, 0000000007, '2023-02-21 10:01:00'),
(0000000021, 'nft4314r', 'gggggggggggggggsrewqfwfwffwfwfwfsdvcsfsfgfefsfffwfwfwfwfwfwfw', 7312, 1, 2, 1, 1, 2, 0000000006, '2023-02-21 10:01:00'),
(0000000024, 'nft33212', 'reedwwefvrgsfrdfvghbghbbypgfrtpioUUIyyj', 722, 1, 4, 2, 1, 2, 0000000003, '2023-02-23 11:00:46'),
(0000000025, 'nft09991', 'daseceecqoijcfwoijfwapofwajpfklvfsklvfnsknlfsf ', 8124, 0, 4, 1, 1, 2, 0000000008, '2023-02-23 11:00:46'),
(0000000026, 'nft3277', 'wqewrpxokcpfajcapjvpfvpfflkfkdsfodskfpsfp', 6533, 1, 3, 1, 1, 2, 0000000005, '2023-02-23 11:11:45'),
(0000000027, 'nft9155', 'vdsfrwrttrcccpc p l cppl rwwr[', 5213, 1, 3, 1, 1, 1, 0000000006, '2023-02-23 11:11:45'),
(0000000028, 'nft2213213', 'dfaCGSDCAFDFCDSVCGSFDCFVDSGFCFCOLEFRWQKWKJHNSEDLVI;Kilaknuucsloi;kcspfdxijuhfgnbkglkvfdi;csaljnhnkdl', 65, 1, 3, 1, 1, 2, 0000000003, '2023-02-23 11:12:25'),
(0000000032, 'nftPostman', 'dqhnuxqnuexqdgndkduhdioqopqipi1xiuqxiuoxdiehjjfdnmbFVSFVFSOWfadckq', 3551, 0, 4, 2, 5, 1, 0000000001, '2023-02-24 12:15:22'),
(0000000033, 'nftPostman', 'dqhnuxqnuexqdgndkduhdioqopqipi1xiuqxiuoxdiehjjfdnmbFVSFVFSOWfadckq', 3551, 0, 4, 2, 6, 1, 0000000001, '2023-03-02 13:34:20'),
(0000000034, 'nftPostman', 'dqhnuxqnuexqdgndkduhdioqopqipi1xiuqxiuoxdiehjjfdnmbFVSFVFSOWfadckq', 3551, 0, 4, 2, 7, 1, 0000000001, '2023-03-02 13:56:52'),
(0000000035, 'nftPostman', 'dqhnuxqnuexqdgndkduhdioqopqipi1xiuqxiuoxdiehjjfdnmbFVSFVFSOWfadckq', 3551, 0, 4, 2, 8, 1, 0000000001, '2023-03-02 14:16:36'),
(0000000036, 'nftPostman', 'dqhnuxqnuexqdgndkduhdioqopqipi1xiuqxiuoxdiehjjfdnmbFVSFVFSOWfadckq', 3551, 0, 4, 2, 9, 1, 0000000001, '2023-03-02 14:20:12'),
(0000000037, 'nftPostman', 'dqhnuxqnuexqdgndkduhdioqopqipi1xiuqxiuoxdiehjjfdnmbFVSFVFSOWfadckq', 3551, 0, 4, 2, 10, 1, 0000000001, '2023-03-02 14:26:22'),
(0000000038, 'nftPostman', 'dqhnuxqnuexqdgndkduhdioqopqipi1xiuqxiuoxdiehjjfdnmbFVSFVFSOWfadckq', 3551, 0, 4, 2, 12, 1, 0000000001, '2023-03-03 12:04:31'),
(0000000039, 'nftPostman44', 'dqhnuxqnuexqdgndkduhdioqopqipi1xiuqxiuoxdiehjjfdnmbFVSFVFSOWfadckq', 3551, 0, 4, 2, 13, 1, 0000000001, '2023-03-03 12:10:41'),
(0000000040, 'nftPostman442122', 'dqhnuxqnuexqdgndkduhdioqopqipi1xiuqxiuoxdiehjjfdnmbFVSFVFSOWfadckq', 3551, 0, 4, 2, 14, 1, 0000000001, '2023-03-03 12:13:35'),
(0000000041, 'nftPostman442122', 'dqhnuxqnuexqdgndkduhdioqopqipi1xiuqxiuoxdiehjjfdnmbFVSFVFSOWfadckq', 3551, 0, 4, 2, 15, 1, 0000000001, '2023-03-03 12:15:08');

-- --------------------------------------------------------

--
-- Table structure for table `nft_info`
--

DROP TABLE IF EXISTS `nft_info`;
CREATE TABLE IF NOT EXISTS `nft_info` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `data` json NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `nft_info`
--

INSERT INTO `nft_info` (`id`, `data`, `created_date`) VALUES
(1, '{\"test\": \"safadf\"}', '2023-02-20 15:28:08'),
(2, '{\"test\": \"qopqradfhjx\"}', '2023-02-20 15:28:34');

-- --------------------------------------------------------

--
-- Table structure for table `nft_owner_history`
--

DROP TABLE IF EXISTS `nft_owner_history`;
CREATE TABLE IF NOT EXISTS `nft_owner_history` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `nft_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `wallet_address_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `nft_id` (`nft_id`),
  KEY `wallet_address` (`wallet_address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

DROP TABLE IF EXISTS `offer`;
CREATE TABLE IF NOT EXISTS `offer` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `nft_id` int UNSIGNED NOT NULL,
  `blockchain_offer_id` bigint UNSIGNED NOT NULL,
  `offer_maker_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `recipient_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `price` double UNSIGNED NOT NULL,
  `status` smallint UNSIGNED NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `offer_maker_id` (`offer_maker_id`),
  KEY `recipient_id` (`recipient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `selling_history`
--

DROP TABLE IF EXISTS `selling_history`;
CREATE TABLE IF NOT EXISTS `selling_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` smallint UNSIGNED NOT NULL DEFAULT '1' COMMENT '1:listing;2:auction:3:offer',
  `selling_id` int(10) UNSIGNED ZEROFILL DEFAULT NULL,
  `seller_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `buyer_id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `price` double UNSIGNED NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `selling_id` (`selling_id`),
  KEY `type` (`type`),
  KEY `seller_id` (`seller_id`),
  KEY `buyer_id` (`buyer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `selling_history`
--

INSERT INTO `selling_history` (`id`, `type`, `selling_id`, `seller_id`, `buyer_id`, `price`, `created_date`) VALUES
(1, 1, 0000000014, 0000000007, 0000000005, 644, '2023-02-23 11:30:32'),
(2, 1, 0000000019, 0000000004, 0000000002, 7433, '2023-02-23 11:30:32'),
(3, 1, 0000000015, 0000000001, 0000000008, 1222, '2023-02-23 11:30:59'),
(4, 1, 0000000002, 0000000002, 0000000006, 1415135135, '2023-02-23 11:30:59'),
(5, 1, 0000000020, 0000000008, 0000000006, 1244, '2023-02-23 11:31:35'),
(6, 1, 0000000001, 0000000008, 0000000003, 550, '2023-02-23 11:31:35'),
(7, 1, 0000000002, 0000000001, 0000000002, 522, '2023-02-23 11:32:07'),
(8, 1, 0000000014, 0000000007, 0000000003, 3586, '2023-02-23 11:32:07');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `support_email` varchar(50) NOT NULL,
  `contact_number` varchar(15) NOT NULL,
  `node_url` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `support_email`, `contact_number`, `node_url`) VALUES
(1, 'admin@support.com', '+0000000000', 'http://localhost');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `login_id` int UNSIGNED NOT NULL,
  `gender` smallint NOT NULL DEFAULT '1' COMMENT '1:male;2 :female',
  `profile_img` varchar(15) DEFAULT NULL,
  `nft_count` int UNSIGNED NOT NULL DEFAULT '0',
  `country_id` smallint UNSIGNED DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `archived` smallint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `login_id` (`login_id`),
  KEY `country_id` (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `login_id`, `gender`, `profile_img`, `nft_count`, `country_id`, `created_date`, `updated_date`, `archived`) VALUES
(1, 'mohamad', 'zohbie', 1, 1, NULL, 0, 1, '2023-01-08 09:54:34', '2023-01-08 09:54:34', 0),
(2, 'ali', 'moustafa', 2, 1, NULL, 0, 1, '2023-01-08 09:54:34', '2023-01-08 09:54:34', 0),
(3, 'anana', 'boul', 4, 1, NULL, 0, 1, '2023-01-08 09:54:34', '2023-01-08 09:54:34', 0),
(4, 'string', 'char', 7, 1, NULL, 0, 1, '2023-01-08 09:54:34', '2023-01-08 09:54:34', 0),
(5, 'softwar', 'mouhsa', 6, 1, NULL, 0, 1, '2023-01-08 09:54:34', '2023-01-08 09:54:34', 0),
(6, 'khaled', 'alouche', 3, 1, NULL, 0, 1, '2023-01-08 09:54:34', '2023-01-08 09:54:34', 0),
(7, 'mahmoud', 'boul', 5, 1, NULL, 0, 1, '2023-01-08 09:54:34', '2023-01-08 09:54:34', 0),
(8, 'kanze', 'where', 8, 1, NULL, 0, 1, '2023-01-08 09:54:34', '2023-01-08 09:54:34', 0),
(9, 'souad', 'To', 9, 1, '9Btn2x.png', 0, 1, '2023-03-06 07:35:43', '2023-03-06 07:35:43', 0),
(10, 'souad', 'To', 10, 1, '10fpdOb.png', 0, 1, '2023-03-06 07:47:00', '2023-03-06 07:47:00', 0),
(11, 'adfdafdafdafa', 'To', 11, 1, '11pUXf8.png', 0, 1, '2023-03-06 08:02:00', '2023-03-06 08:02:00', 0),
(12, 'adfdafdafdafa', 'To', 12, 1, '12cUJvB.png', 0, 1, '2023-03-06 08:04:15', '2023-03-06 08:04:15', 0),
(13, 'adfdafdafdafa', 'To', 13, 1, '13JA1us.png', 0, 1, '2023-03-06 08:04:53', '2023-03-06 08:04:53', 0),
(14, 'adfdafdafdafa', 'To', 14, 1, '14m4akP.png', 0, 1, '2023-03-06 08:31:35', '2023-03-06 08:31:35', 0);

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
CREATE TABLE IF NOT EXISTS `wallet` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `wallet_address` varchar(64) NOT NULL,
  `user_id` int(10) UNSIGNED ZEROFILL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wallet_address` (`wallet_address`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`id`, `wallet_address`, `user_id`) VALUES
(0000000001, 'rtyrtyrtyruy', 0000000002),
(0000000002, 'sdsdgsgdafd', 0000000007),
(0000000003, 'drwfyughi7ppi', 0000000001),
(0000000004, 'sdffffgiuhyttb', 0000000003),
(0000000005, 'ijhhhhhhdyvuuubi', 0000000004),
(0000000006, 'kygjunfvccertvykbiu', 0000000005),
(0000000007, 'kjhgfdjkmm', 0000000006),
(0000000008, 'juhyrftuiujoiijmo', 0000000008),
(0000000009, 'dafadfa', 0000000009),
(0000000010, 'dafadfa', 0000000010),
(0000000011, 'dafadfa', 0000000011),
(0000000012, 'dafadfa', 0000000012),
(0000000013, 'dafadfa', 0000000013),
(0000000014, 'dafadfa', 0000000014);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auction`
--
ALTER TABLE `auction`
  ADD CONSTRAINT `auction_ibfk_1` FOREIGN KEY (`nft_id`) REFERENCES `nft` (`id`),
  ADD CONSTRAINT `auction_ibfk_2` FOREIGN KEY (`seller_wallet_id`) REFERENCES `wallet` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `auction_ibfk_3` FOREIGN KEY (`current_winner_wallet`) REFERENCES `wallet` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `auction_participants`
--
ALTER TABLE `auction_participants`
  ADD CONSTRAINT `auction_participants_ibfk_2` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`id`),
  ADD CONSTRAINT `auction_participants_ibfk_3` FOREIGN KEY (`wallet_id`) REFERENCES `wallet` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `collection`
--
ALTER TABLE `collection`
  ADD CONSTRAINT `collection_ibfk_2` FOREIGN KEY (`front_image`) REFERENCES `image` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `collection_ibfk_3` FOREIGN KEY (`background_image`) REFERENCES `image` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `collection_ibfk_4` FOREIGN KEY (`wallet_id`) REFERENCES `wallet` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `content`
--
ALTER TABLE `content`
  ADD CONSTRAINT `content_ibfk_1` FOREIGN KEY (`updated_by`) REFERENCES `admin` (`id`);

--
-- Constraints for table `favorite_nft`
--
ALTER TABLE `favorite_nft`
  ADD CONSTRAINT `favorite_nft_ibfk_1` FOREIGN KEY (`nft_id`) REFERENCES `nft` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `favorite_nft_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `fraud`
--
ALTER TABLE `fraud`
  ADD CONSTRAINT `fraud_ibfk_1` FOREIGN KEY (`auction_id`) REFERENCES `auction` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fraud_ibfk_2` FOREIGN KEY (`listing_id`) REFERENCES `listing` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fraud_ibfk_3` FOREIGN KEY (`offer_id`) REFERENCES `offer` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `listing`
--
ALTER TABLE `listing`
  ADD CONSTRAINT `listing_ibfk_1` FOREIGN KEY (`nft_id`) REFERENCES `nft` (`id`),
  ADD CONSTRAINT `listing_ibfk_2` FOREIGN KEY (`buyer_wallet_id`) REFERENCES `wallet` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `listing_ibfk_3` FOREIGN KEY (`seller_wallet_id`) REFERENCES `wallet` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `nft`
--
ALTER TABLE `nft`
  ADD CONSTRAINT `nft_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collection` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `nft_ibfk_3` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `nft_ibfk_4` FOREIGN KEY (`nft_info_id`) REFERENCES `nft_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `nft_ibfk_5` FOREIGN KEY (`owner_wallet_id`) REFERENCES `wallet` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `nft_owner_history`
--
ALTER TABLE `nft_owner_history`
  ADD CONSTRAINT `nft_owner_history_ibfk_1` FOREIGN KEY (`nft_id`) REFERENCES `nft` (`id`),
  ADD CONSTRAINT `nft_owner_history_ibfk_2` FOREIGN KEY (`wallet_address_id`) REFERENCES `wallet` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `offer`
--
ALTER TABLE `offer`
  ADD CONSTRAINT `offer_ibfk_1` FOREIGN KEY (`offer_maker_id`) REFERENCES `wallet` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `offer_ibfk_2` FOREIGN KEY (`recipient_id`) REFERENCES `wallet` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `selling_history`
--
ALTER TABLE `selling_history`
  ADD CONSTRAINT `selling_history_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `wallet` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `selling_history_ibfk_2` FOREIGN KEY (`buyer_id`) REFERENCES `wallet` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `selling_history_ibfk_3` FOREIGN KEY (`selling_id`) REFERENCES `nft` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `login` (`id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`);

--
-- Constraints for table `wallet`
--
ALTER TABLE `wallet`
  ADD CONSTRAINT `wallet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
