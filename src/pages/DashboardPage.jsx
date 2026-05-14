import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getDashboardStats, getInventory, getBorrowings } from '../lib/supabase'
import { Package, CheckCircle, AlertTriangle, Wrench, Monitor, Camera, Microscope, ChevronDown, MoreHorizontal } from 'lucide-react'

export default function DashboardPage() {
  const stats = getDashboardStats()
  const inventory = getInventory()
  const borrowings = getBorrowings()

  const popularItems = [
    { name: 'PC Desktop Lenovo', location: 'Lab Komputer A', status: 'Tersedia', icon: Monitor, iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
    { name: 'Laptop ASUS VivoBook', location: 'Lab RPL', status: 'Dipinjam', icon: Camera, iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
    { name: 'Arduino Uno Kit', location: 'Lab Praktikum', status: 'Tersedia', icon: Microscope, iconBg: 'bg-green-50', iconColor: 'text-green-600' },
  ]

  const statCards = [
    { label: 'Total Barang', value: stats.totalBarang.toLocaleString(), icon: Package, badge: '+12%', bgColor: 'bg-blue-50', borderColor: 'border-blue-100', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', badgeColor: 'text-blue-600' },
    { label: 'Kondisi Baik', value: stats.kondisiBaik.toLocaleString(), icon: CheckCircle, badge: null, bgColor: 'bg-green-50', borderColor: 'border-green-100', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
    { label: 'Barang Rusak', value: stats.barangRusak.toString(), icon: AlertTriangle, badge: 'Perlu Aksi', bgColor: 'bg-red-50', borderColor: 'border-red-100', iconBg: 'bg-red-100', iconColor: 'text-red-600', badgeColor: 'text-red-600' },
    { label: 'Dalam Perbaikan', value: stats.dalamPerbaikan.toString(), icon: Wrench, badge: null, bgColor: 'bg-purple-50', borderColor: 'border-purple-100', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Inventaris</h1>
        <p className="text-gray-500 mt-1">
          Kelola seluruh inventaris laboratorium dengan mudah dan menyenangkan.<br />
          Pantau status perangkat dalam satu tampilan cerdas.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} border ${card.borderColor} rounded-2xl p-5 relative overflow-hidden`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`${card.iconBg} p-2 rounded-xl`}>
                <card.icon size={20} className={card.iconColor} />
              </div>
              {card.badge && (
                <span className={`text-xs font-medium ${card.badgeColor} bg-white/80 px-2 py-0.5 rounded-full`}>
                  {card.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mb-1">{card.label}</p>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Aktivitas Peminjaman */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Aktivitas Peminjaman</h2>
            <button className="flex items-center gap-1 text-sm text-primary-600 font-medium hover:text-primary-700">
              Minggu Ini <ChevronDown size={16} />
            </button>
          </div>
          
          {/* Chart placeholder - 3D style bars */}
          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-end justify-center gap-3 p-6">
            {[40, 65, 45, 80, 55, 70, 50, 60, 75, 45, 85, 55].map((height, i) => (
              <div
                key={i}
                className="w-6 rounded-t-lg transition-all hover:opacity-80"
                style={{
                  height: `${height}%`,
                  backgroundColor: i % 2 === 0 ? '#93c5fd' : '#fca5a5',
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Alat Populer */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Alat Populer</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {popularItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-10 h-10 ${item.iconBg} rounded-xl flex items-center justify-center`}>
                  <item.icon size={18} className={item.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.location}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    item.status === 'Tersedia'
                      ? 'text-green-600 bg-green-50'
                      : 'text-red-600 bg-red-50'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <Link
            to="/dashboard/inventaris"
            className="block text-center text-sm text-primary-600 font-medium mt-6 hover:text-primary-700"
          >
            Lihat Semua Inventaris
          </Link>
        </div>
      </div>
    </div>
  )
}
