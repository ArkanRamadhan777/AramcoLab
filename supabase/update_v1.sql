-- ============================================
-- AramcoLab Update Schema - v1.0
-- File ini mencatat perubahan database untuk fitur baru
-- ============================================

-- 1. Fitur Foto Profil
-- Di schema.sql awal, tabel `users` sudah memiliki kolom `avatar_url` (Line 15).
-- Jadi kita tidak perlu menambahkan kolom baru. Kita bisa menggunakan kolom tersebut
-- untuk menyimpan string Base64 atau URL foto profil yang diunggah.

-- Jika Anda ingin mengganti nama kolom menjadi 'photo', Anda bisa menjalankan query ini:
-- ALTER TABLE users RENAME COLUMN avatar_url TO photo;

-- 2. Fitur Lainnya (UI & Logic)
-- Perubahan lainnya yang kita lakukan tadi adalah:
-- - Background putih dengan sentuhan biru (Hanya CSS di `index.css`)
-- - Efek sinar biru (glow) di card (Hanya CSS di `index.css`)
-- - Fitur intip password (Hanya logic React di `LoginPage.jsx`)
-- - Pembatasan akses berdasarkan Role (Hanya logic React di `DashboardLayout.jsx` dan `InventoryPage.jsx`)
--
-- Semua fitur di atas tidak memerlukan perubahan pada struktur database Supabase.
