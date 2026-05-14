import { Link } from 'react-router-dom'
import { Monitor, BarChart3, Smile, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        <span className="text-lg font-bold text-primary-600 italic">AramcoLab</span>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-gray-600 hover:text-gray-800 font-medium">
            Login
          </Link>
          <Link
            to="/login"
            className="bg-primary-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            Daftar Gratis
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium mb-6 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              OS Lab Sekolah Modern #1
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Manajemen Inventaris Lab
              <br />
              Jadi Lebih{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Menyenangkan</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-200 -z-0 rounded"></span>
              </span>
            </h1>
            <p className="text-gray-600 text-base mb-8 max-w-lg">
              Tinggalkan buku catatan lama. Pantau peralatan, bahan kimia, dan jadwal peminjaman dalam satu dashboard cantik bersuara anime yang disukai siswa dan admin.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="bg-primary-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-blue-200"
              >
                Mulai Sekarang
              </Link>
              <Link
                to="/login"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Lihat Demo
              </Link>
            </div>
            <div className="flex items-center gap-2 mt-6 text-sm text-gray-500">
              <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                <Monitor size={14} className="text-blue-600" />
              </div>
              <span>Kelas: <strong className="text-gray-700">Aman Terkendali</strong></span>
            </div>
          </div>

          {/* Hero Right - Logo AramcoLab */}
          <div className="relative flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 card-glow">
              <div className="p-10 flex items-center justify-center">
                <img src="/AramcoLab.svg" alt="AramcoLab" className="h-32" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Fitur Utama AramcoLab</h2>
          <p className="text-gray-500 text-sm mb-12 max-w-lg mx-auto">
            Segala yang Anda butuhkan untuk mengatur lab sekolah dengan mudah, cepat, dan tanpa pusing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tracking Real-time */}
            <div className="bg-white rounded-2xl p-6 card-glow text-left">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <Monitor size={24} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Tracking Real-time</h3>
              <p className="text-sm text-gray-500">
                Pantau ketersediaan mikroskop, bahan kimia, dan alat lainnya secara langsung. Tidak ada lagi barang hilang tanpa jejak.
              </p>
            </div>
            {/* Laporan Visual */}
            <div className="bg-white rounded-2xl p-6 card-glow text-left">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 size={24} className="text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Laporan Visual</h3>
              <p className="text-sm text-gray-500">
                Hasilkan laporan kondisi barang dan riwayat peminjaman dengan grafik padati yang menyajikan data dan mudah dibaca.
              </p>
            </div>
            {/* Mudah Digunakan */}
            <div className="bg-white rounded-2xl p-6 card-glow text-left">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                <Smile size={24} className="text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mudah Digunakan</h3>
              <p className="text-sm text-gray-500">
                Antarmuka ramah pengguna dengan gaya Modern Anime School Dashboard. Siswa dan guru dapat mengakses hanya dengan beberapa klik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-12">Cara Kerja Super Gampang</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-left relative overflow-hidden card-glow">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Daftarkan Lab Anda</h3>
              <p className="text-sm text-gray-600">
                Buat ruang kerja digital untuk lab biologi, kimia, atau fisika dalam hitungan detik.
              </p>
              {/* Decorative building illustration placeholder */}
              <div className="mt-4 flex justify-end opacity-20">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <rect x="10" y="20" width="25" height="55" rx="2" fill="#1e3a5f"/>
                  <rect x="40" y="35" width="30" height="40" rx="2" fill="#2563eb"/>
                  <rect x="15" y="30" width="5" height="5" rx="1" fill="white"/>
                  <rect x="23" y="30" width="5" height="5" rx="1" fill="white"/>
                  <rect x="15" y="40" width="5" height="5" rx="1" fill="white"/>
                  <rect x="23" y="40" width="5" height="5" rx="1" fill="white"/>
                  <rect x="45" y="42" width="5" height="5" rx="1" fill="white"/>
                  <rect x="53" y="42" width="5" height="5" rx="1" fill="white"/>
                  <rect x="45" y="52" width="5" height="5" rx="1" fill="white"/>
                  <rect x="53" y="52" width="5" height="5" rx="1" fill="white"/>
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 text-left relative overflow-hidden card-glow">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Input Barang</h3>
              <p className="text-sm text-gray-600">
                Tambahkan data aset dengan cepat.
              </p>
              <div className="mt-4 flex justify-end opacity-20">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <rect x="15" y="25" width="50" height="35" rx="3" fill="#ea580c"/>
                  <rect x="20" y="30" width="40" height="20" rx="2" fill="white"/>
                  <rect x="30" y="62" width="20" height="5" rx="1" fill="#ea580c"/>
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-left relative overflow-hidden card-glow">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pantau & Kelola Sambil Bersantai</h3>
              <p className="text-sm text-gray-600">
                Semua data tersinkronisasi di cloud. Terima notifikasi peminjaman, pantau stok bahan habis pakai, dan fokus pada eksperimen keren.
              </p>
              <Link
                to="/login"
                className="inline-block mt-4 bg-primary-600 text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-primary-700 transition-colors"
              >
                Coba Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <span className="text-lg font-bold text-primary-600 italic">AramcoLab</span>
              <p className="text-sm text-gray-500 max-w-xs mt-2">
                Sistem Operasi Lab Sekolah Modern. Membuat manajemen inventaris menjadi pengalaman yang menyenangkan dan efisien.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <a href="#" className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-xs font-bold">
                  GH
                </a>
                <a href="#" className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-xs font-bold">
                  ✉
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Produk</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-700">Fitur</a></li>
                <li><a href="#" className="hover:text-gray-700">Harga</a></li>
                <li><a href="#" className="hover:text-gray-700">Testimoni Sekolah</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Dukungan</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-gray-700">Pusat Bantuan</a></li>
                <li><a href="#" className="hover:text-gray-700">Dokumentasi</a></li>
                <li><a href="#" className="hover:text-gray-700">Hubungi Kami</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-8 pt-8 flex items-center justify-between text-xs text-gray-400">
            <p>&copy; 2024 AramcoLab. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-600">Syarat & Ketentuan</a>
              <a href="#" className="hover:text-gray-600">Kebijakan Privasi</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
