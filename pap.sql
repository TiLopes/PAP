-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2022 at 07:00 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+01:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pap`
--

-- --------------------------------------------------------

--
-- Table structure for table `condominio`
--

CREATE TABLE `condominio` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `nomeAdministrador` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nif` decimal(9,0) NOT NULL DEFAULT 0,
  `morada` varchar(100) NOT NULL,
  `codPostal` varchar(8) NOT NULL DEFAULT '0000-000',
  `group_id` int(11) NOT NULL DEFAULT 999,
  `authToken` varchar(255) DEFAULT NULL,
  `code` varchar(10) NOT NULL
) DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `condominio`
--

INSERT INTO `condominio` (`id`, `nome`, `nomeAdministrador`, `email`, `password`, `nif`, `morada`, `codPostal`, `group_id`, `authToken`, `code`) VALUES
(2, 'asd', 'asd', 'asd@asd.com', '$2b$10$Uk5nQ6G7T15kFVyJT.j98OMq/MI297ou7oxieTd2Qk0nlhJxI39d2', '123456789', 'asd, 1', '1234-123', 999, NULL, 'M0P9NsLZ03');

-- --------------------------------------------------------

--
-- Table structure for table `condomino`
--

CREATE TABLE `condomino` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `nif` decimal(9,0) NOT NULL,
  `telemovel` decimal(9,0) NOT NULL DEFAULT 0,
  `fracao` varchar(2) NOT NULL,
  `andar` varchar(20) NOT NULL,
  `morada` varchar(100) NOT NULL,
  `idcondominio` int(11) NOT NULL,
  `codPostal` varchar(8) NOT NULL DEFAULT '0000-000',
  `group_id` int(11) NOT NULL DEFAULT 1,
  `authToken` varchar(255) DEFAULT NULL
) DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`) VALUES
(999, 'administrator'),
(1, 'client');

-- --------------------------------------------------------

--
-- Table structure for table `group_permissions`
--

CREATE TABLE `group_permissions` (
  `group_id` int(11) NOT NULL,
  `permission_id` varchar(50) NOT NULL
) DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `group_permissions`
--

INSERT INTO `group_permissions` (`group_id`, `permission_id`) VALUES
(999, '*:*');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL
) DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `description`) VALUES
('*:*', 'Todas permissões');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `group_id` int(11) NOT NULL DEFAULT 1,
  `authToken` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `condominio`
--
ALTER TABLE `condominio`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `condominio_un_email` (`email`),
  ADD UNIQUE KEY `condominio_un_nif` (`nif`),
  ADD UNIQUE KEY `condominio_un_code` (`code`),
  ADD KEY `condominio_FK` (`group_id`);

--
-- Indexes for table `condomino`
--
ALTER TABLE `condomino`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `condomino_un_email` (`email`),
  ADD UNIQUE KEY `condomino_un_nif` (`nif`),
  ADD KEY `condomino_FK` (`group_id`),
  ADD KEY `condomino_ibfk_1` (`idcondominio`) USING BTREE;

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `group_permissions`
--
ALTER TABLE `group_permissions`
  ADD PRIMARY KEY (`group_id`,`permission_id`),
  ADD UNIQUE KEY `group_permissions_permission_id_group_id_unique` (`group_id`,`permission_id`),
  ADD KEY `permission_FK_idx` (`permission_id`) USING BTREE;

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `description_UNIQUE` (`description`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `authToken_UNIQUE` (`authToken`),
  ADD KEY `group_FK_idx` (`group_id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `condominio`
--
ALTER TABLE `condominio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `condomino`
--
ALTER TABLE `condomino`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `condominio`
--
ALTER TABLE `condominio`
  ADD CONSTRAINT `condominio_FK` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `condomino`
--
ALTER TABLE `condomino`
  ADD CONSTRAINT `condomino_FK` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `condomino_ibfk_1` FOREIGN KEY (`idcondominio`) REFERENCES `condominio` (`id`);

--
-- Constraints for table `group_permissions`
--
ALTER TABLE `group_permissions`
  ADD CONSTRAINT `group_permissions_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `group_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
