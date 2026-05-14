# 📘 Buku Panduan AramcoLab (Versi Simple)

## Apa itu AramcoLab?
AramcoLab adalah sistem manajemen inventaris laboratorium berbasis web. Digunakan untuk mencatat, meminjam, dan memantau perangkat lab sekolah secara digital.

---

## 🚀 Cara Menjalankan Aplikasi

### Langkah 1: Install Dependencies
Buka terminal di folder project, lalu jalankan:
```bash
npm install
```

### Langkah 2: Jalankan Server
```bash
npm run dev
```

### Langkah 3: Buka di Browser
Akses alamat:
```
http://localhost:5173
```

---

## 🔐 Akun Login

| Role | Username | Password | Akses |
|------|----------|----------|-------|
| Super Admin | `admin` | `admin123` | Semua fitur |
| Guru | `guru` | `guru123` | Dashboard, Inventaris, Laporan |
| Siswa | `siswa` | `siswa123` | Dashboard, Inventaris (lihat saja) |

---

## 📄 Halaman yang Tersedia

### 1. Landing Page (`/`)
Halaman depan publik. Berisi informasi tentang AramcoLab, fitur utama, dan cara kerja.

### 2. Login (`/login`)
Masukkan username dan password untuk masuk ke sistem.

### 3. Dashboard (`/dashboard`)
Tampilan utama setelah login. Menampilkan:
- Total barang, kondisi baik, rusak, dan dalam perbaikan
- Grafik aktivitas peminjaman
- Daftar alat populer

### 4. Data Inventaris (`/dashboard/inventaris`)
Tabel daftar semua perangkat lab. Fitur:
- **Filter** berdasarkan kondisi (Baik / Rusak / Perbaikan)
- **Urutkan** berdasarkan nama atau stok
- **Edit** — klik ikon pensil untuk mengubah data
- **Hapus** — klik ikon tempat sampah untuk menghapus

### 5. Tambah Barang (`/dashboard/inventaris/tambah`)
Form untuk menambahkan perangkat baru. Isi:
- Nama perangkat
- Kategori
- Kode inventaris (opsional, otomatis jika kosong)
- Jumlah unit
- Kondisi
- Foto (opsional)

### 6. Laporan (`/dashboard/laporan`)
Halaman analisis visual berisi:
- Donut chart kondisi barang
- Bar chart tren peminjaman 6 bulan
- Kategori terpopuler
- Ringkasan (barang baru, perlu servis, terlambat dikembalikan)

### 7. Pengaturan (`/dashboard/pengaturan`)
Halaman untuk mengatur:
- Profil pengguna (nama, email)
- Notifikasi (stok tipis, laporan mingguan, aktivitas lab)
- Bahasa aplikasi
- Tema visual (terang/gelap)

---

## 🔄 Cara Menggunakan CRUD

### Tambah Barang
1. Klik tombol **"+ Tambah Barang"** di sidebar kiri
2. Isi form lengkap
3. Klik **"Simpan Data"**
4. Barang baru muncul di tabel inventaris

### Edit Barang
1. Buka halaman **Inventaris**
2. Klik ikon **pensil (✏️)** pada baris yang ingin diedit
3. Ubah data di modal yang muncul
4. Klik **"Simpan Perubahan"**

### Hapus Barang
1. Buka halaman **Inventaris**
2. Klik ikon **tempat sampah (🗑️)** pada baris yang ingin dihapus
3. Konfirmasi penghapusan
4. Barang terhapus dari daftar

### Logout
1. Arahkan kursor ke **foto profil** di pojok kanan atas
2. Klik **"Keluar"**
3. Otomatis kembali ke halaman login

---

## 🗄️ Setup Supabase (Opsional)

Jika ingin menggunakan database Supabase:

1. Buat akun di [supabase.com](https://supabase.com)
2. Buat project baru
3. Buka **SQL Editor** di dashboard Supabase
4. Copy-paste isi file `supabase/schema.sql`
5. Klik **Run**
6. Salin URL dan Anon Key dari **Settings > API**
7. Buat file `.env` di root project:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxx
```

> **Catatan:** Tanpa setup Supabase, aplikasi tetap berjalan normal menggunakan data dummy lokal (disimpan di localStorage browser).

---

## 💡 Tips untuk Demo/Penilaian

- Data yang ditambah/edit/hapus **tersimpan di browser** (localStorage), jadi tidak hilang saat refresh
- Untuk reset data ke awal, buka Console browser (F12) dan ketik:
  ```javascript
  localStorage.removeItem('aramcolab_inventory')
  ```
  Lalu refresh halaman
- Gunakan akun **admin** untuk menunjukkan semua fitur
- Coba tambah 1-2 barang baru untuk menunjukkan fitur Create
- Edit salah satu barang untuk menunjukkan fitur Update
- Hapus salah satu barang untuk menunjukkan fitur Delete

---

## 🛠️ Tech Stack

| Teknologi | Fungsi |
|-----------|--------|
| React 18 | Frontend framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| React Router | Navigasi halaman |
| Recharts | Grafik & chart |
| Lucide React | Ikon |
| Supabase | Backend/database (opsional) |
| localStorage | Penyimpanan data demo |

---

## 📁 Struktur Folder

```
aramcolab/
├── public/            → File statis
├── src/
│   ├── components/    → Komponen reusable (Layout)
│   ├── lib/           → Konfigurasi & fungsi data (supabase.js)
│   ├── pages/         → Halaman-halaman aplikasi
│   ├── App.jsx        → Router utama
│   ├── main.jsx       → Entry point
│   └── index.css      → Styling global
├── supabase/
│   └── schema.sql     → SQL untuk setup database
├── package.json       → Dependencies & scripts
├── tailwind.config.js → Konfigurasi Tailwind
└── vite.config.js     → Konfigurasi Vite
```

---

*Dibuat oleh Rama dengan bantuan Kiro AI — 2024*
