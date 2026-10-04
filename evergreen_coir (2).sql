-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2026 at 08:13 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `evergreen_coir`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password`, `full_name`, `created_at`) VALUES
(1, 'admin', '$2y$10$3BzwdmPARrv1vvtNI7coDO0JSeyOFBzyoaw9hK4gMWopeUmqtNKH2', 'System Admin', '2026-04-05 07:20:45');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Bangles - Raw Materials', 'bangles---raw-materials', NULL, 'Active', '2026-04-05 07:20:45', '2026-05-11 06:02:04'),
(2, 'Beads', 'beads', NULL, 'Active', '2026-04-05 07:20:45', '2026-05-11 06:02:04'),
(3, 'Bracelet Charms', 'bracelet-charms', NULL, 'Active', '2026-04-05 07:20:45', '2026-05-11 06:02:04'),
(4, 'Centre Clips', 'centre-clips', NULL, 'Active', '2026-04-05 07:20:45', '2026-05-11 06:02:04'),
(6, 'Coir Pot', 'coir-pot', 'We are a leading Manufacturer of coco coir 4 inch pot, coco coir pot & hanging set in various sizes, coco coir wall hanging basket, round coir pot, coco coir hanging conical and 10 inch coco coir hanging pot from Pollachi, India.', 'Active', '2026-04-05 09:02:38', '2026-04-05 09:02:38'),
(7, 'Moss Sticks', 'moss-sticks', 'Providing you the best range of coir moss sticks, garden plant moss stick, plants moss stick, moss stick in coir, coconut fiber moss stick and coco moss coir sticks with effective & timely delivery.', 'Active', '2026-04-05 09:02:38', '2026-04-05 09:02:38'),
(8, 'Cocopeat Products', 'cocopeat-products', 'Our range of products include cocopeat coir pellets, rectangular cocopeat brick, coco coir roll, brown coco coir scrubber, coco coir mint tray and coco coir scrubber.', 'Active', '2026-04-05 09:02:38', '2026-04-05 09:02:38'),
(9, 'Coir Mat', 'coir-mat', 'Our product range includes a wide range of coco coir mulch mat, woven coir roll, weed mulching mat, coir mulch mats for gardening, jute mulch mat and coir mulch mat.', 'Active', '2026-04-05 09:02:38', '2026-04-05 09:02:38'),
(10, 'Mulch Mats', 'mulch-mats', 'Offering you a complete choice of products which include coir mulch mat(weed control mat).', 'Active', '2026-04-05 09:02:38', '2026-04-05 09:02:38'),
(12, 'V² COCONUT OIL', 'v2-coconut-oil', 'Premium Organic Coconut Oil products.', 'Active', '2026-05-11 05:29:01', '2026-05-11 05:29:01');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `status` enum('Unread','Read') DEFAULT 'Unread',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `mobile`, `name`, `message`, `status`, `created_at`) VALUES
(1, '9585059823', 'yuvaraja', 'test', 'Unread', '2026-04-06 05:20:54'),
(2, '9585059823', 'Quick Inquiry User', 'I am interested in the product: Premium Coco Coir 4 Inch Pot', 'Unread', '2026-04-06 05:33:10'),
(3, 'Not Provided', 'Website Visitor', 'test', 'Unread', '2026-04-06 05:38:01'),
(4, '9585059823', 'Website Visitor', 'test', 'Unread', '2026-04-06 05:56:25');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `mobile`, `password`, `created_at`) VALUES
(1, 'yuvaraja', '9585059823', '$2y$10$yMeiNNWpDfyxC8Z9hJpS3ePfqsdX8qjHNlckhptC4WDd2LfzdeI0a', '2026-04-06 06:12:24');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` int(11) NOT NULL,
  `reviewer_name` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `rating` int(11) DEFAULT 5,
  `review_text` text DEFAULT NULL,
  `metric_response` tinyint(1) DEFAULT 0,
  `metric_quality` tinyint(1) DEFAULT 0,
  `metric_delivery` tinyint(1) DEFAULT 0,
  `seller_response` text DEFAULT NULL,
  `response_date` timestamp NULL DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `reviewer_name`, `location`, `product_name`, `rating`, `review_text`, `metric_response`, `metric_quality`, `metric_delivery`, `seller_response`, `response_date`, `status`, `created_at`) VALUES
(1, 'LIL EVE MICROGREENS', 'SECUNDERABAD, TELANGANA', 'Coir Mats', 5, 'Excellent product. Ordered non-latex coir roll, which came in good condition.', 1, 1, 1, 'Thank you very much for your valuable feedback', '2024-02-11 04:30:00', 'Approved', '2026-04-06 13:00:32'),
(2, 'yuvaraja', 'coimbatore', 'product', 5, 'test', 1, 1, 1, NULL, NULL, 'Approved', '2026-04-06 13:27:36'),
(3, 'raj', 'coimbatore', 'product', 3, 'CoirMats', 1, 1, 1, NULL, NULL, 'Approved', '2026-04-06 13:34:13');

-- --------------------------------------------------------

--
-- Table structure for table `hero_slides`
--

CREATE TABLE `hero_slides` (
  `id` int(11) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `badge_text` varchar(255) DEFAULT 'CERTIFIED MANUFACTURER',
  `title` varchar(255) DEFAULT NULL,
  `subtitle` text DEFAULT NULL,
  `button_primary_text` varchar(255) DEFAULT 'VIEW OUR RANGE',
  `button_secondary_text` varchar(255) DEFAULT 'GET CUSTOM QUOTE',
  `order_index` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hero_slides`
--

INSERT INTO `hero_slides` (`id`, `image_url`, `badge_text`, `title`, `subtitle`, `button_primary_text`, `button_secondary_text`, `order_index`, `created_at`) VALUES
(1, 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1600&h=800&fit=crop', 'CERTIFIED MANUFACTURER', 'EVERGREEN PREMIUM COIR', 'Eco-friendly solutions for modern landscaping, gardening, and erosion control. Trusted by 500+ global clients.', 'VIEW OUR RANGE', 'GET CUSTOM QUOTE', 0, '2026-04-05 09:27:51'),
(2, 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=1600&h=800&fit=crop', 'QUALITY ASSURED', 'SUSTAINABLE GROWING MEDIA', 'High-performance cocopeat and coir products for global agriculture and horticulture.', 'DISCOVER PRODUCTS', 'GET CUSTOM QUOTE', 0, '2026-04-05 09:34:01'),
(3, 'http://localhost/green-earth/evergreen-coir/backend/uploads/1775451089_coir_pots_6863994a-61aa-4ecd-ba94-aca0257b2a6b.webp', 'GLOBAL RELIABILITY', 'GLOBAL EXPORT PARTNER', 'Delivering premium coir solutions to 500+ clients across 30 countries.', 'CONTACT US', 'GET CUSTOM QUOTE', 0, '2026-04-05 09:34:01');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1,
  `status` enum('Pending','Processing','Completed','Cancelled') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `product_id`, `product_name`, `price`, `quantity`, `status`, `created_at`) VALUES
(1, 1, 12, 'Premium Coco Coir 4 Inch Pot', '10 / Piece', 1, 'Pending', '2026-04-06 06:12:47');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` varchar(100) DEFAULT NULL,
  `moq` int(11) DEFAULT 1,
  `description` text DEFAULT NULL,
  `brochure_url` varchar(255) DEFAULT NULL,
  `specifications` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`specifications`)),
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `price`, `moq`, `description`, `brochure_url`, `specifications`, `status`, `created_at`, `updated_at`) VALUES
(1, 6, 'Coco Coir 4 Inch Pot', '₹ 10 / Piece', 500, 'Eco-friendly biodegradable pots for plants.', '', '{\"Material\":\"Coco Fiber\",\"Origin\":\"India\",\"Usage\":\"Gardening\",\"Size\":\"4 Inch\"}', 'Active', '2026-04-05 08:11:46', '2026-04-05 09:07:45'),
(2, 6, 'Coco Coir 6 Inch Pot', '₹ 18 / Piece', 300, 'Durable and breathable pots for medium plants.', '', '{\"Material\":\"Coco Fiber\",\"Origin\":\"India\"}', 'Active', '2026-04-05 08:11:46', '2026-04-09 06:07:08'),
(3, 8, 'Coco Peat 5KG Block', '₹ 120 / Block', 50, 'High quality compressed coco pith for gardening.', '', '{\"Material\":\"Coco Fiber\",\"Origin\":\"India\"}', 'Active', '2026-04-05 08:11:46', '2026-04-09 06:07:40'),
(9, 9, 'Coco Fiber Mulch Mat', '₹ 40 / Piece', 200, 'Weed control mats for base of trees.', '', '{\"Material\":\"Coco Fiber\",\"Origin\":\"India\"}', 'Active', '2026-04-05 08:11:46', '2026-04-09 06:03:49'),
(12, 6, 'Premium Coco Coir 4 Inch Pot', '10 / Piece', 500, 'Eco-friendly biodegradable pots for healthy root growth. Perfect for nurseries and home gardening.', '', '{\"Material\":\"Coco Fiber\",\"Top Diameter\":\"4 inch\",\"Usage\":\"Garden\\/Plantation\"}', 'Active', '2026-04-05 09:14:15', '2026-04-09 06:02:57'),
(13, 7, 'Natural Coir Moss Stick - 2ft', '30 / Piece', 100, 'Sturdy support for climbing plants using premium natural coco fibers.', '', '{\"Size\":\"2 Feet\",\"Material\":\"Coconut Fiber\",\"Brand\":\"Evergreen\"}', 'Active', '2026-04-05 09:14:15', '2026-04-09 06:02:48'),
(14, 8, 'Compressed Cocopeat 5kg Block', '120 / Block', 50, 'High-quality compressed coco pith for hydroponics and home gardening.', '', '{\"Weight\":\"5 kg\",\"EC\":\"Low EC\",\"Expansion\":\"75 Liters\"}', 'Active', '2026-04-05 09:14:15', '2026-04-09 06:02:36'),
(15, 9, 'Erosion Control Coir Mat', '850 / Roll', 10, 'Natural coir mat for soil erosion control and landscaping.', '', '{\"Dimensions\":\"1m x 5m\",\"Thickness\":\"10 mm\",\"Material\":\"Woven Coir\"}', 'Active', '2026-04-05 09:14:15', '2026-04-09 06:02:25'),
(16, 10, 'Coir Mulch Mat (18 inch Disc)', '15 / Piece', 200, 'Circular coir disc designed to protect plant roots from weeds and retain moisture.', '', '{\"Diameter\":\"18 inch\",\"Material\":\"Natural Fiber\",\"Durability\":\"6-12 Months\"}', 'Active', '2026-04-05 09:14:15', '2026-04-09 06:02:15'),
(18, 12, 'Extra Virgin Coconut Oil (500ml)', '₹ 250 / Piece', 10, '100% pure extra virgin coconut oil, cold-pressed from fresh coconuts. Ideal for cooking and skincare.', NULL, NULL, 'Active', '2026-05-11 05:37:59', '2026-05-11 05:37:59'),
(19, 12, 'Cold Pressed Coconut Oil (1L)', '₹ 450 / Piece', 5, 'Pure cold-pressed coconut oil, perfect for daily use. Retains all natural nutrients and aroma.', 'http://localhost/green-earth/evergreen-coir/backend/uploads/1783060742_report.pdf', '{\"Top Diameter\":\"\",\"Material\":\"Coco Fiber\"}', 'Active', '2026-05-11 05:37:59', '2026-07-03 06:39:05');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`) VALUES
(22, 16, 'http://localhost/green-earth/evergreen-coir/backend/uploads/1775714534_Coir Mulch Mat (18 inch Disc).jpg', 1),
(23, 15, 'http://localhost/green-earth/evergreen-coir/backend/uploads/1775714544_Erosion Control Coir Mat.jpg', 1),
(24, 14, 'http://localhost/green-earth/evergreen-coir/backend/uploads/1775714554_Compressed Cocopeat 5kg Block.jpg', 1),
(25, 13, 'http://localhost/green-earth/evergreen-coir/backend/uploads/1775714566_Natural Coir Moss Stick - 2ft.jpg', 1),
(26, 12, 'http://localhost/green-earth/evergreen-coir/backend/uploads/1775714576_Premium Coco Coir 4 Inch Pot.jpg', 1),
(27, 9, 'http://localhost/green-earth/evergreen-coir/backend/uploads/1775714626_Coco Fiber Mulch MatCoco Fiber Mulch Mat.jpg', 1),
(33, 2, 'http://localhost/green-earth/evergreen-coir/backend/uploads/1775714827_Coco Coir 6 Inch Pot.jpg', 1),
(34, 3, 'http://localhost/green-earth/evergreen-coir/backend/uploads/1775714858_Coco Peat 5KG Block.jpg', 1),
(35, 1, 'http://localhost/green-earth/evergreen-coir/backend/uploads/1775714885_Coco Coir 6 Inch Pot.jpg', 1),
(36, 18, 'http://localhost/green-earth/evergreen-coir/backend/uploads/extra_virgin_coconut_oil.png', 1),
(38, 19, 'http://localhost/green-earth/evergreen-coir/backend/uploads/cold_pressed_coconut_oil.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES
('social_facebook', 'https://www.facebook.com/', '2026-04-06 06:41:00'),
('social_instagram', 'https://www.instagram.com/', '2026-04-06 06:41:00'),
('social_linkedin', '', '2026-04-06 06:47:56'),
('social_twitter', '', '2026-04-06 06:47:56'),
('social_youtube', '', '2026-04-06 06:31:40');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `video_url` text NOT NULL,
  `thumbnail_url` text DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `title`, `video_url`, `thumbnail_url`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Coir Mats', 'https://youtu.be/WzsedlAVAvY?si=y8gv79RPVqT39QSN', 'https://img.youtube.com/vi/WzsedlAVAvY/hqdefault.jpg', 0, 1, '2026-04-09 05:54:57', '2026-04-09 05:55:06'),
(2, 'Moss Sticks', 'https://youtu.be/UZKh_21-xyY?si=zfGForOnjGK3eodB', 'https://img.youtube.com/vi/UZKh_21-xyY/hqdefault.jpg', 0, 1, '2026-04-09 05:55:53', '2026-04-09 05:55:53'),
(3, 'Cocopeat Products', 'https://youtu.be/QiPfWXlOWJM?si=cW2WTdAbQxyvlKPT', 'https://img.youtube.com/vi/QiPfWXlOWJM/hqdefault.jpg', 0, 1, '2026-04-09 05:56:41', '2026-04-09 05:56:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile` (`mobile`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hero_slides`
--
ALTER TABLE `hero_slides`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`setting_key`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hero_slides`
--
ALTER TABLE `hero_slides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
