-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2023 at 05:07 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `papv2`
--

-- --------------------------------------------------------

--
-- Table structure for table `condominio`
--

CREATE TABLE `condominio` (
  `id` int(11) NOT NULL,
  `nif` decimal(9,0) NOT NULL DEFAULT 0,
  `nome` varchar(100) DEFAULT NULL,
  `nome_admin` varchar(100) DEFAULT NULL,
  `email_admin` varchar(100) DEFAULT NULL,
  `telemovel_admin` decimal(9,0) NOT NULL DEFAULT 0,
  `morada` varchar(100) NOT NULL DEFAULT '',
  `cod_postal` varchar(8) NOT NULL DEFAULT '0000-000',
  `id_seguro` int(11) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `id_grupo` int(11) NOT NULL DEFAULT 999,
  `auth_token` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `condominio`
--

INSERT INTO `condominio` (`id`, `nif`, `nome`, `nome_admin`, `email_admin`, `telemovel_admin`, `morada`, `cod_postal`, `id_seguro`, `password`, `id_grupo`, `auth_token`) VALUES
(1, '213421122', 'asd', 'asd', 'asd@asd.com', '121312312', 'aaa, 1', '1213-111', NULL, '$2b$10$XBcuoGea3.zWCCxECigZFOucgTlue0/wEMKj7Jk96z5baDLg.t4GW', 999, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRfZ3J1cG8iOjk5OSwiaGFzaGVkUmFuZFN0cmluZyI6ImE4N2FmOTY5NGY3MWQwZmMzNzM4NTUzYzc3OTk0MWFiMjA2MjdkZjk5YmFlZWVkNWFhMDcyYmUwNzQ0MmU4OTciLCJpYXQiOjE2NzI4NDIzOTIsImV4cCI6MTY3Mjg0NTk5Mn0.803Wak7LkhbEHdJfU2qRnc1emztwV5QOMBYaeO_QFjI'),
(2, '123412412', 'sadas', 'aaa', 'asd@asd.asd', '141112312', 'asda, 11', '2412-111', NULL, '$2b$10$VD1ryi7uXqacFSkBzJWlMuuzWXhEp.I6rJaIRGpEb1tzuKW10B4Pm', 999, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaGFzaGVkUmFuZFN0cmluZyI6IjI4NTMyOWU2N2QyMzRjZjJlZGQ0NGRmZDhiMTQ5ZjkxYTRkMmI2ZTUzNTFhYmQ2NDJiZDA2YTkwMTAwZTA4NTUiLCJpYXQiOjE2NzIyNTI3MDEsImV4cCI6MTY3MjI1NjMwMX0.xIREcqZMGb58NsU3JggIkcFbs9E_TCy88Eg7dAgkD0A');

-- --------------------------------------------------------

--
-- Table structure for table `condomino`
--

CREATE TABLE `condomino` (
  `id` int(11) NOT NULL,
  `nome_ocupante` varchar(100) NOT NULL,
  `nif_ocupante` decimal(9,0) NOT NULL,
  `telemovel_ocupante` decimal(9,0) DEFAULT NULL,
  `data_aquisicao` date NOT NULL,
  `data_venda` date NOT NULL,
  `email_ocupante` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_condominio` int(11) NOT NULL,
  `id_grupo` int(11) NOT NULL DEFAULT 1,
  `auth_token` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `condomino`
--

INSERT INTO `condomino` (`id`, `nome_ocupante`, `nif_ocupante`, `telemovel_ocupante`, `data_aquisicao`, `data_venda`, `email_ocupante`, `password`, `id_condominio`, `id_grupo`, `auth_token`) VALUES
(1, 'aaaa', '124121212', '123121333', '2022-12-14', '2022-12-21', 'tlcondominiospt@gmail.com', '$2b$10$3ZSIRfbXQeigennqVDeWVu1e5ECwoJ.6NuSkXiDfHN0b/4kCJ5G0i', 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRfZ3J1cG8iOjEsImhhc2hlZFJhbmRTdHJpbmciOiJjZTM3ZDYzZDQ4NzBhMDRkNTc1ZTA4YTMyN2RiYmFmODQ3NDFkYjA3M2M5ZTVmMzgwMTUyYmVhYzZiYWI4ZjIyIiwiaWF0IjoxNjcyNDE4MDkzLCJleHAiOjE2NzI0MjE2OTN9.E192TZj3_P6gYk06-JrbK5Gi_EPm7Jf9f5gQPI50wx0'),
(3, 'aa', '212131231', '132132111', '2023-01-01', '2023-01-04', 'aaa@aaa.aaa', '$2b$10$yVbXfQ0lTgXEB/rTLm9b9u/KaogPaSdhTfWT0lK2L84RFC64BXKCe', 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `fracoes`
--

CREATE TABLE `fracoes` (
  `id` varchar(5) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `andar` varchar(20) DEFAULT NULL,
  `escritura` float DEFAULT NULL,
  `estado` varchar(50) NOT NULL DEFAULT 'Livre',
  `id_condominio` int(11) NOT NULL,
  `id_condomino` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fracoes`
--

INSERT INTO `fracoes` (`id`, `tipo`, `andar`, `escritura`, `estado`, `id_condominio`, `id_condomino`) VALUES
('A', 'Apartamento', '1ºE', 1, 'Ocupado', 1, NULL),
('B', 'Apartamento', '1º D', 12, 'Ocupado', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`) VALUES
(999, 'Administrador'),
(1, 'Cliente');

-- --------------------------------------------------------

--
-- Table structure for table `group_permissions`
--

CREATE TABLE `group_permissions` (
  `group_id` int(11) NOT NULL,
  `permission_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `group_permissions`
--

INSERT INTO `group_permissions` (`group_id`, `permission_id`) VALUES
(999, '*:*');

-- --------------------------------------------------------

--
-- Table structure for table `ocorrencias`
--

CREATE TABLE `ocorrencias` (
  `id_condomino` int(11) NOT NULL,
  `id_condominio` int(11) NOT NULL,
  `criador` varchar(100) NOT NULL,
  `data_ocorrencia` date NOT NULL,
  `origem` varchar(100) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `descricao` text NOT NULL,
  `info_adicional` varchar(500) DEFAULT NULL,
  `data_lim_resolucao` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `description`) VALUES
('*:*', 'Acesso total');

-- --------------------------------------------------------

--
-- Table structure for table `seguro`
--

CREATE TABLE `seguro` (
  `id` int(11) NOT NULL,
  `capital_obrigatorio` int(11) NOT NULL,
  `validade` date NOT NULL,
  `empresa` varchar(100) NOT NULL,
  `apolice` varchar(100) NOT NULL,
  `coberturas` varchar(100) NOT NULL,
  `telemovel` decimal(9,0) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mediador` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `condominio`
--
ALTER TABLE `condominio`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nif_UNIQUE` (`nif`),
  ADD UNIQUE KEY `morada_UNIQUE` (`morada`),
  ADD UNIQUE KEY `cod_postal_UNIQUE` (`cod_postal`),
  ADD UNIQUE KEY `id_seguro_UNIQUE` (`id_seguro`),
  ADD UNIQUE KEY `auth_token_UNIQUE` (`auth_token`),
  ADD KEY `fk_grupo` (`id_grupo`);

--
-- Indexes for table `condomino`
--
ALTER TABLE `condomino`
  ADD PRIMARY KEY (`id`),
  ADD KEY `condomino_FK` (`id_grupo`),
  ADD KEY `condomino_FK_1` (`id_condominio`);

--
-- Indexes for table `fracoes`
--
ALTER TABLE `fracoes`
  ADD PRIMARY KEY (`id`,`id_condominio`),
  ADD KEY `fracoes_FK` (`id_condominio`),
  ADD KEY `fracoes_FK_1` (`id_condomino`);

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
-- Indexes for table `ocorrencias`
--
ALTER TABLE `ocorrencias`
  ADD KEY `ocorrencias_FK` (`id_condomino`),
  ADD KEY `ocorrencias_FK_1` (`id_condominio`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `description_UNIQUE` (`description`);

--
-- Indexes for table `seguro`
--
ALTER TABLE `seguro`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `condominio`
--
ALTER TABLE `condominio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `condomino`
--
ALTER TABLE `condomino`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `condominio`
--
ALTER TABLE `condominio`
  ADD CONSTRAINT `fk_grupo` FOREIGN KEY (`id_grupo`) REFERENCES `groups` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_seguro` FOREIGN KEY (`id_seguro`) REFERENCES `seguro` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `condomino`
--
ALTER TABLE `condomino`
  ADD CONSTRAINT `condomino_FK` FOREIGN KEY (`id_grupo`) REFERENCES `groups` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `condomino_FK_1` FOREIGN KEY (`id_condominio`) REFERENCES `condominio` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `fracoes`
--
ALTER TABLE `fracoes`
  ADD CONSTRAINT `fracoes_FK` FOREIGN KEY (`id_condominio`) REFERENCES `condominio` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fracoes_FK_1` FOREIGN KEY (`id_condomino`) REFERENCES `condomino` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `group_permissions`
--
ALTER TABLE `group_permissions`
  ADD CONSTRAINT `group_permissions_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `group_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ocorrencias`
--
ALTER TABLE `ocorrencias`
  ADD CONSTRAINT `ocorrencias_FK` FOREIGN KEY (`id_condomino`) REFERENCES `condomino` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ocorrencias_FK_1` FOREIGN KEY (`id_condominio`) REFERENCES `condominio` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
