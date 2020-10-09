-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2020 at 05:32 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sewadah`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `idAdmin` int(11) NOT NULL,
  `usernameAdmin` varchar(16) NOT NULL,
  `nameAdmin` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`idAdmin`, `usernameAdmin`, `nameAdmin`, `password`) VALUES
(1, 'efendiputra', 'efendi putra p', '1234567a');

-- --------------------------------------------------------

--
-- Table structure for table `berita`
--

CREATE TABLE `berita` (
  `idBerita` int(11) NOT NULL,
  `judulBerita` varchar(128) NOT NULL,
  `gambarBerita` varchar(64) NOT NULL,
  `isiBerita` varchar(255) NOT NULL,
  `tanggalBerita` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `catalog_pengguna`
--

CREATE TABLE `catalog_pengguna` (
  `idCatalog` int(11) NOT NULL,
  `judulCatalog` varchar(128) NOT NULL,
  `gambarCatalog` varchar(128) NOT NULL,
  `idPengguna` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `link`
--

CREATE TABLE `link` (
  `idLink` int(11) NOT NULL,
  `namaLink` varchar(64) NOT NULL,
  `alamatLink` varchar(64) NOT NULL,
  `idPengguna` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pengguna`
--

CREATE TABLE `pengguna` (
  `idPengguna` int(11) NOT NULL,
  `usernamePengguna` varchar(32) NOT NULL,
  `passwordPengguna` varchar(64) NOT NULL,
  `emailPengguna` varchar(64) NOT NULL,
  `namaPengguna` varchar(64) NOT NULL,
  `visitorPengguna` int(11) NOT NULL,
  `thumbPengguna` varchar(64) NOT NULL,
  `idLink` int(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idAdmin`);

--
-- Indexes for table `catalog_pengguna`
--
ALTER TABLE `catalog_pengguna`
  ADD PRIMARY KEY (`idCatalog`),
  ADD KEY `idPengguna` (`idPengguna`);

--
-- Indexes for table `link`
--
ALTER TABLE `link`
  ADD PRIMARY KEY (`idLink`),
  ADD KEY `idPengguna` (`idPengguna`);

--
-- Indexes for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`idPengguna`),
  ADD KEY `idProduk` (`idLink`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `catalog_pengguna`
--
ALTER TABLE `catalog_pengguna`
  MODIFY `idCatalog` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `link`
--
ALTER TABLE `link`
  MODIFY `idLink` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `idPengguna` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
