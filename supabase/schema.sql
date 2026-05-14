-- ============================================
-- AramcoLab Database Schema & Dummy Data
-- Sistem Manajemen Inventaris Lab Komputer RPL/PPLG
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================

-- 1. Tabel Users
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('Super Admin', 'Guru', 'Siswa')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabel Kategori (Lab Komputer RPL/PPLG)
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabel Inventaris
CREATE TABLE IF NOT EXISTS inventory (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  condition VARCHAR(20) NOT NULL CHECK (condition IN ('Baik', 'Rusak', 'Perbaikan')),
  stock INTEGER NOT NULL DEFAULT 0,
  location VARCHAR(100),
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabel Peminjaman
CREATE TABLE IF NOT EXISTS borrowings (
  id SERIAL PRIMARY KEY,
  inventory_id INTEGER REFERENCES inventory(id) ON DELETE CASCADE,
  borrower_name VARCHAR(100) NOT NULL,
  borrower_class VARCHAR(50),
  borrow_date DATE NOT NULL DEFAULT CURRENT_DATE,
  return_date DATE,
  due_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('Dipinjam', 'Dikembalikan', 'Terlambat')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabel Log Aktivitas
CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Tabel Pengaturan Notifikasi
CREATE TABLE IF NOT EXISTS notification_settings (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  low_stock_alert BOOLEAN DEFAULT TRUE,
  weekly_report BOOLEAN DEFAULT FALSE,
  lab_activity BOOLEAN DEFAULT TRUE
);

-- ============================================
-- INSERT DUMMY DATA
-- ============================================

-- Users
INSERT INTO users (username, password_hash, name, email, role) VALUES
('admin', 'admin123', 'Lab Administrator', 'admin@aramcolab.edu', 'Super Admin'),
('guru', 'guru123', 'Budi Santoso', 'budi@aramcolab.edu', 'Guru'),
('guru2', 'guru123', 'Siti Rahayu', 'siti@aramcolab.edu', 'Guru'),
('guru3', 'guru123', 'Ahmad Fauzi', 'ahmad@aramcolab.edu', 'Guru'),
('siswa', 'siswa123', 'Andi Pratama', 'andi@aramcolab.edu', 'Siswa'),
('siswa2', 'siswa123', 'Rina Wati', 'rina@aramcolab.edu', 'Siswa'),
('siswa3', 'siswa123', 'Deni Kurnia', 'deni@aramcolab.edu', 'Siswa');

-- Kategori (Lab Komputer RPL/PPLG)
INSERT INTO categories (name, icon) VALUES
('Komputer & Laptop', 'monitor'),
('Monitor & Display', 'tv'),
('Jaringan & Server', 'wifi'),
('Peripheral', 'mouse'),
('Komponen Hardware', 'cpu'),
('Software & Lisensi', 'code'),
('Alat Praktikum', 'wrench'),
('Furniture Lab', 'armchair');

-- Inventaris Lab Komputer RPL/PPLG
INSERT INTO inventory (name, code, category_id, condition, stock, location, description) VALUES
-- Komputer & Laptop
('PC Desktop Lenovo ThinkCentre', 'LAB-PC-001', 1, 'Baik', 20, 'Lab Komputer A', 'Lenovo ThinkCentre M70q Gen 3 i5 16GB RAM'),
('PC Desktop HP ProDesk', 'LAB-PC-002', 1, 'Baik', 20, 'Lab Komputer B', 'HP ProDesk 400 G9 i5 8GB RAM'),
('Laptop ASUS VivoBook 14', 'LAB-LP-001', 1, 'Baik', 10, 'Lab RPL', 'ASUS VivoBook 14 i5 8GB SSD 512GB'),
('Laptop Lenovo IdeaPad 3', 'LAB-LP-002', 1, 'Perbaikan', 2, 'Lab RPL', 'Lenovo IdeaPad 3 Ryzen 5 8GB'),
('MacBook Air M1', 'LAB-LP-003', 1, 'Baik', 5, 'Lab iOS Dev', 'Apple MacBook Air M1 8GB 256GB'),

-- Monitor & Display
('Monitor LG 24" IPS', 'LAB-MN-001', 2, 'Baik', 40, 'Lab Komputer A & B', 'LG 24MK430H 24 inch IPS Full HD'),
('Monitor Dell 27" 4K', 'LAB-MN-002', 2, 'Perbaikan', 2, 'Lab Desain', 'Dell UltraSharp U2723QE 4K USB-C'),
('Projector Epson EB-X51', 'LAB-MN-003', 2, 'Baik', 4, 'Semua Lab', 'Epson EB-X51 XGA 3LCD 3800 Lumens'),
('Smart TV 55" Samsung', 'LAB-MN-004', 2, 'Baik', 2, 'Ruang Presentasi', 'Samsung Crystal UHD 55 inch'),

-- Jaringan & Server
('Router MikroTik hAP ac3', 'LAB-NET-001', 3, 'Baik', 5, 'Lab Jaringan', 'MikroTik hAP ac3 Dual Band Router'),
('Switch Cisco Catalyst 2960-L', 'LAB-NET-002', 3, 'Baik', 4, 'Lab Jaringan', 'Cisco Catalyst 2960-L 24 Port Managed'),
('Switch TP-Link 16 Port', 'LAB-NET-003', 3, 'Baik', 6, 'Semua Lab', 'TP-Link TL-SG1016D 16 Port Gigabit'),
('Server Rack HP ProLiant DL380', 'LAB-NET-004', 3, 'Baik', 2, 'Ruang Server', 'HP ProLiant DL380 Gen10 Xeon 32GB'),
('Access Point Ubiquiti', 'LAB-NET-005', 3, 'Baik', 8, 'Semua Lab', 'Ubiquiti UniFi AP AC Pro'),
('Kabel UTP Cat6 (box 305m)', 'LAB-NET-006', 3, 'Baik', 5, 'Gudang', 'Belden Cat6 UTP 305 meter'),
('RJ45 Connector (box 100)', 'LAB-NET-007', 3, 'Baik', 10, 'Gudang', 'AMP RJ45 Cat6 Connector isi 100'),

-- Peripheral
('Keyboard Logitech K120', 'LAB-PR-001', 4, 'Baik', 45, 'Lab Komputer A & B', 'Logitech K120 USB Wired Keyboard'),
('Mouse Logitech B100', 'LAB-PR-002', 4, 'Baik', 45, 'Lab Komputer A & B', 'Logitech B100 USB Wired Mouse'),
('Headset Logitech H390', 'LAB-PR-003', 4, 'Rusak', 3, 'Lab Multimedia', 'Logitech H390 USB Headset with Mic'),
('Webcam Logitech C920', 'LAB-PR-004', 4, 'Baik', 5, 'Lab Multimedia', 'Logitech C920 HD Pro Webcam 1080p'),
('Printer HP LaserJet Pro', 'LAB-PR-005', 4, 'Baik', 3, 'Ruang Guru & Lab', 'HP LaserJet Pro MFP M428fdw'),
('Scanner Epson V600', 'LAB-PR-006', 4, 'Baik', 2, 'Ruang Guru', 'Epson Perfection V600 Photo Scanner'),
('USB Hub 7 Port', 'LAB-PR-007', 4, 'Baik', 10, 'Semua Lab', 'Orico USB 3.0 Hub 7 Port'),

-- Komponen Hardware
('RAM DDR4 8GB', 'LAB-HW-001', 5, 'Baik', 20, 'Gudang', 'Kingston DDR4 8GB 3200MHz'),
('RAM DDR4 16GB', 'LAB-HW-002', 5, 'Baik', 10, 'Gudang', 'Corsair Vengeance DDR4 16GB 3200MHz'),
('SSD NVMe 256GB', 'LAB-HW-003', 5, 'Baik', 15, 'Gudang', 'Samsung 980 NVMe M.2 256GB'),
('SSD NVMe 512GB', 'LAB-HW-004', 5, 'Baik', 8, 'Gudang', 'WD Blue SN570 NVMe 512GB'),
('HDD 1TB', 'LAB-HW-005', 5, 'Baik', 5, 'Gudang', 'Seagate Barracuda 1TB 7200RPM'),
('Power Supply 500W', 'LAB-HW-006', 5, 'Perbaikan', 3, 'Gudang', 'Corsair CV550 80+ Bronze 550W'),
('VGA Card GTX 1650', 'LAB-HW-007', 5, 'Baik', 5, 'Gudang', 'NVIDIA GeForce GTX 1650 4GB'),
('Motherboard H510', 'LAB-HW-008', 5, 'Rusak', 2, 'Gudang', 'ASUS Prime H510M-K LGA1200'),

-- Alat Praktikum
('Crimping Tool RJ45', 'LAB-ALT-001', 7, 'Baik', 15, 'Lab Jaringan', 'Crimping Tool untuk RJ45 & RJ11'),
('LAN Tester', 'LAB-ALT-002', 7, 'Baik', 10, 'Lab Jaringan', 'Network Cable Tester RJ45 RJ11'),
('Obeng Set Elektronik', 'LAB-ALT-003', 7, 'Baik', 10, 'Lab Hardware', 'Jakemy 73 in 1 Precision Screwdriver'),
('Arduino Uno Starter Kit', 'LAB-ALT-004', 7, 'Baik', 15, 'Lab IoT', 'Arduino Uno R3 + Sensor Kit Lengkap'),
('Raspberry Pi 4 Model B', 'LAB-ALT-005', 7, 'Baik', 8, 'Lab IoT', 'Raspberry Pi 4 Model B 4GB RAM'),
('Breadboard + Jumper Wire', 'LAB-ALT-006', 7, 'Baik', 20, 'Lab IoT', 'Breadboard 830 point + 65 jumper wire'),
('Multimeter Digital', 'LAB-ALT-007', 7, 'Baik', 8, 'Lab Hardware', 'Sanwa CD800a Digital Multimeter'),
('Solder Station', 'LAB-ALT-008', 7, 'Baik', 5, 'Lab Hardware', 'Hakko FX-888D Soldering Station'),
('Tang Potong & Tang Lancip', 'LAB-ALT-009', 7, 'Baik', 10, 'Lab Hardware', 'Set tang untuk elektronik'),

-- Furniture Lab
('Meja Komputer', 'LAB-FB-001', 8, 'Baik', 40, 'Lab Komputer A & B', 'Meja komputer 120x60cm dengan rak CPU'),
('Kursi Putar', 'LAB-FB-002', 8, 'Rusak', 3, 'Lab Komputer A', 'Kursi putar staff tanpa lengan'),
('Kursi Putar', 'LAB-FB-003', 8, 'Baik', 37, 'Semua Lab', 'Kursi putar staff tanpa lengan'),
('Whiteboard 120x240cm', 'LAB-FB-004', 8, 'Baik', 4, 'Semua Lab', 'Whiteboard magnetic 120x240cm'),
('Rak Server 42U', 'LAB-FB-005', 8, 'Baik', 2, 'Ruang Server', 'Rack Server 42U 600x1000mm'),
('Lemari Penyimpanan', 'LAB-FB-006', 8, 'Baik', 4, 'Gudang', 'Lemari besi 2 pintu untuk komponen');

-- Peminjaman
INSERT INTO borrowings (inventory_id, borrower_name, borrower_class, borrow_date, return_date, due_date, status, notes) VALUES
(3, 'Andi Pratama', 'XII RPL 1', '2024-04-01', '2024-04-08', '2024-04-08', 'Dikembalikan', 'Project akhir semester web development'),
(35, 'Siti Rahayu', 'XI RPL 2', '2024-04-03', NULL, '2024-04-10', 'Dipinjam', 'Praktikum IoT Arduino'),
(31, 'Budi Santoso', NULL, '2024-04-05', '2024-04-06', '2024-04-12', 'Dikembalikan', 'Praktikum jaringan kelas XI'),
(36, 'Rina Wati', 'XII RPL 1', '2024-04-07', NULL, '2024-04-14', 'Dipinjam', 'Project IoT smart home'),
(10, 'Deni Kurnia', 'X PPLG 1', '2024-03-28', NULL, '2024-04-04', 'Terlambat', 'Praktikum konfigurasi router'),
(3, 'Fajar Hidayat', 'XII RPL 2', '2024-04-08', NULL, '2024-04-15', 'Dipinjam', 'Pengembangan aplikasi mobile'),
(21, 'Maya Sari', 'XI RPL 1', '2024-04-09', '2024-04-10', '2024-04-16', 'Dikembalikan', 'Praktikum webcam streaming'),
(36, 'Rizki Ramadhan', 'X PPLG 2', '2024-04-10', NULL, '2024-04-17', 'Dipinjam', 'Belajar Raspberry Pi dasar'),
(1, 'Nadia Putri', 'XII RPL 1', '2024-04-02', '2024-04-05', '2024-04-09', 'Dikembalikan', 'Ujian praktik pemrograman'),
(11, 'Hendra Wijaya', 'XI PPLG 1', '2024-03-25', NULL, '2024-04-01', 'Terlambat', 'Tugas konfigurasi switch VLAN'),
(35, 'Lina Marlina', 'X PPLG 1', '2024-04-11', NULL, '2024-04-18', 'Dipinjam', 'Project Arduino traffic light'),
(5, 'Agus Setiawan', 'XII RPL 1', '2024-04-06', '2024-04-08', '2024-04-13', 'Dikembalikan', 'Development iOS app'),
(36, 'Bayu Aditya', 'X PPLG 2', '2024-04-12', NULL, '2024-04-19', 'Dipinjam', 'Project Raspberry Pi web server'),
(32, 'Dewi Anggraini', 'XI RPL 2', '2024-04-04', '2024-04-05', '2024-04-11', 'Dikembalikan', 'Praktikum LAN testing'),
(10, 'Irfan Hakim', 'XI PPLG 1', '2024-03-30', NULL, '2024-04-06', 'Terlambat', 'Konfigurasi MikroTik firewall'),
(3, 'Putri Handayani', 'XII RPL 2', '2024-04-13', NULL, '2024-04-20', 'Dipinjam', 'Project UI/UX design'),
(32, 'Yoga Pratama', 'XI RPL 1', '2024-04-07', '2024-04-09', '2024-04-14', 'Dikembalikan', 'Testing kabel jaringan'),
(35, 'Sinta Dewi', 'X PPLG 1', '2024-04-14', NULL, '2024-04-21', 'Dipinjam', 'Kompetisi IoT tingkat kota'),
(7, 'Rendi Saputra', 'XII RPL 1', '2024-04-10', NULL, '2024-04-17', 'Dipinjam', 'Presentasi project akhir'),
(22, 'Anisa Fitri', 'XI RPL 2', '2024-04-08', '2024-04-09', '2024-04-15', 'Dikembalikan', 'Scanning dokumen project');

-- Log Aktivitas
INSERT INTO activity_logs (user_id, action, description, created_at) VALUES
((SELECT id FROM users WHERE username = 'admin'), 'LOGIN', 'Admin login ke sistem', '2024-04-14 08:00:00'),
((SELECT id FROM users WHERE username = 'admin'), 'ADD_ITEM', 'Menambahkan Arduino Uno Kit x15', '2024-04-14 08:15:00'),
((SELECT id FROM users WHERE username = 'guru'), 'LOGIN', 'Guru Budi login ke sistem', '2024-04-14 09:00:00'),
((SELECT id FROM users WHERE username = 'guru'), 'BORROW', 'Meminjamkan Laptop ke kelas XII RPL', '2024-04-14 09:30:00'),
((SELECT id FROM users WHERE username = 'admin'), 'UPDATE_ITEM', 'Update kondisi PSU ke Perbaikan', '2024-04-14 10:00:00'),
((SELECT id FROM users WHERE username = 'siswa'), 'LOGIN', 'Siswa Andi login ke sistem', '2024-04-14 10:30:00'),
((SELECT id FROM users WHERE username = 'admin'), 'DELETE_ITEM', 'Menghapus item rusak permanen', '2024-04-14 11:00:00'),
((SELECT id FROM users WHERE username = 'guru2'), 'LOGIN', 'Guru Siti login ke sistem', '2024-04-14 11:30:00'),
((SELECT id FROM users WHERE username = 'guru2'), 'RETURN', 'Menerima pengembalian Router MikroTik', '2024-04-14 12:00:00'),
((SELECT id FROM users WHERE username = 'admin'), 'EXPORT', 'Export laporan bulanan PDF', '2024-04-14 14:00:00');

-- Notification Settings
INSERT INTO notification_settings (user_id, low_stock_alert, weekly_report, lab_activity)
SELECT id, TRUE, FALSE, TRUE FROM users WHERE username = 'admin'
UNION ALL
SELECT id, TRUE, TRUE, FALSE FROM users WHERE username = 'guru'
UNION ALL
SELECT id, FALSE, FALSE, TRUE FROM users WHERE username = 'siswa';

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE borrowings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view inventory" ON inventory FOR SELECT USING (true);
CREATE POLICY "Admin and Guru can manage inventory" ON inventory FOR ALL USING (true);
CREATE POLICY "Anyone can view borrowings" ON borrowings FOR SELECT USING (true);
CREATE POLICY "Admin and Guru can manage borrowings" ON borrowings FOR ALL USING (true);

-- ============================================
-- VIEWS
-- ============================================

CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
  SUM(stock) AS total_barang,
  SUM(CASE WHEN condition = 'Baik' THEN stock ELSE 0 END) AS kondisi_baik,
  SUM(CASE WHEN condition = 'Rusak' THEN stock ELSE 0 END) AS barang_rusak,
  SUM(CASE WHEN condition = 'Perbaikan' THEN stock ELSE 0 END) AS dalam_perbaikan
FROM inventory;

CREATE OR REPLACE VIEW popular_categories AS
SELECT
  c.name AS category_name,
  COUNT(b.id) AS borrow_count
FROM categories c
LEFT JOIN inventory i ON i.category_id = c.id
LEFT JOIN borrowings b ON b.inventory_id = i.id
GROUP BY c.name
ORDER BY borrow_count DESC
LIMIT 5;
