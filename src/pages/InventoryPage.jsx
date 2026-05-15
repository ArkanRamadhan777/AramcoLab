import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getInventory, deleteInventoryItem, updateInventoryItem, CATEGORIES, getCurrentUser } from '../lib/supabase'
import { Filter, ArrowUpDown, Pencil, Trash2, Monitor, Microscope, Printer, Tv, Camera, FlaskConical, X, ChevronDown } from 'lucide-react'

const iconMap = {
  'Komputer & Laptop': Monitor,
  'Monitor & Display': Tv,
  'Jaringan & Server': Monitor,
  'Peripheral': Camera,
  'Komponen Hardware': FlaskConical,
  'Software & Lisensi': Monitor,
  'Alat Praktikum': Printer,
  'Furniture Lab': Monitor,
}

const iconColorMap = {
  'Komputer & Laptop': { bg: 'bg-blue-50', color: 'text-blue-600' },
  'Monitor & Display': { bg: 'bg-purple-50', color: 'text-purple-600' },
  'Jaringan & Server': { bg: 'bg-green-50', color: 'text-green-600' },
  'Peripheral': { bg: 'bg-orange-50', color: 'text-orange-600' },
  'Komponen Hardware': { bg: 'bg-red-50', color: 'text-red-600' },
  'Software & Lisensi': { bg: 'bg-indigo-50', color: 'text-indigo-600' },
  'Alat Praktikum': { bg: 'bg-yellow-50', color: 'text-yellow-600' },
  'Furniture Lab': { bg: 'bg-teal-50', color: 'text-teal-600' },
}

const conditionStyles = {
  'Baik': 'bg-green-50 text-green-600',
  'Rusak': 'bg-red-50 text-red-600',
  'Perbaikan': 'bg-yellow-50 text-yellow-700',
}

export default function InventoryPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = getCurrentUser()
  const [inventory, setInventory] = useState(getInventory())
  const [currentPage, setCurrentPage] = useState(1)
  const [editItem, setEditItem] = useState(null)
  const [deleteItemId, setDeleteItemId] = useState(null)
  const [filterCondition, setFilterCondition] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [toast, setToast] = useState(location.state?.message ? { message: location.state.message, type: 'success' } : null)
  const itemsPerPage = 4

  // Clear location state after reading it
  useEffect(() => {
    if (location.state?.message) {
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  // Auto hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  // Filter
  let filteredInventory = [...inventory]
  if (filterCondition) {
    filteredInventory = filteredInventory.filter(item => item.condition === filterCondition)
  }

  // Default Sort (Newest first - higher ID first)
  filteredInventory.sort((a, b) => b.id - a.id)

  // Sort
  if (sortBy === 'name') {
    filteredInventory.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy === 'stock-asc') {
    filteredInventory.sort((a, b) => a.stock - b.stock)
  } else if (sortBy === 'stock-desc') {
    filteredInventory.sort((a, b) => b.stock - a.stock)
  }

  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = filteredInventory.slice(startIndex, startIndex + itemsPerPage)

  const handleDelete = (id) => {
    setDeleteItemId(id)
  }

  const handleEdit = (item) => {
    setEditItem({ ...item })
  }

  const handleSaveEdit = () => {
    if (editItem) {
      updateInventoryItem(editItem.id, {
        name: editItem.name,
        code: editItem.code,
        category: editItem.category,
        condition: editItem.condition,
        stock: parseInt(editItem.stock),
      })
      setInventory(getInventory())
      setEditItem(null)
      setToast({ message: 'Barang berhasil diperbarui!', type: 'success' })
    }
  }

  return (
    <div>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
          <div className="bg-white border border-green-100 rounded-xl p-4 shadow-lg flex items-center gap-3 max-w-sm">
            <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToast(null)}
              className="text-gray-400 hover:text-gray-600 ml-auto"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Inventaris Lab</h1>
          <p className="text-gray-500 mt-1">Kelola seluruh perangkat laboratorium dengan cepat dan efisien.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={filterCondition}
              onChange={(e) => { setFilterCondition(e.target.value); setCurrentPage(1) }}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors appearance-none pr-8 bg-white"
            >
              <option value="">⚡ Filter</option>
              <option value="Baik">Baik</option>
              <option value="Rusak">Rusak</option>
              <option value="Perbaikan">Perbaikan</option>
            </select>
            <Filter size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors appearance-none pr-8 bg-white"
            >
              <option value="">⇅ Urutkan</option>
              <option value="name">Nama A-Z</option>
              <option value="stock-asc">Stok Terendah</option>
              <option value="stock-desc">Stok Tertinggi</option>
            </select>
            <ArrowUpDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Nama Barang</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Kode Aset</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Kondisi</th>
              <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">Stok</th>
              {user?.role !== 'Siswa' && (
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">Aksi</th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-400 text-sm">
                  Tidak ada data inventaris.
                </td>
              </tr>
            ) : (
              currentItems.map((item) => {
                const IconComponent = iconMap[item.category] || Monitor
                const colors = iconColorMap[item.category] || { bg: 'bg-gray-50', color: 'text-gray-600' }
                
                return (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center`}>
                          <IconComponent size={18} className={colors.color} />
                        </div>
                        <span className="text-sm font-medium text-gray-800">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.code}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${conditionStyles[item.condition]}`}>
                        {item.condition}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-sm font-semibold ${item.stock === 0 ? 'text-red-500' : 'text-gray-800'}`}>
                        {item.stock}
                      </span>
                    </td>
                    {user?.role !== 'Siswa' && (
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Menampilkan {filteredInventory.length > 0 ? startIndex + 1 : 0}–{Math.min(startIndex + itemsPerPage, filteredInventory.length)} dari {filteredInventory.length} perangkat
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Sebelumnya
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Edit Inventaris</h2>
              <button
                onClick={() => setEditItem(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perangkat</label>
                <input
                  type="text"
                  value={editItem.name}
                  onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Aset</label>
                <input
                  type="text"
                  value={editItem.code}
                  onChange={(e) => setEditItem({ ...editItem, code: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kondisi</label>
                  <select
                    value={editItem.condition}
                    onChange={(e) => setEditItem({ ...editItem, condition: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 appearance-none"
                  >
                    <option value="Baik">Baik</option>
                    <option value="Rusak">Rusak</option>
                    <option value="Perbaikan">Perbaikan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                  <input
                    type="number"
                    min="0"
                    value={editItem.stock}
                    onChange={(e) => setEditItem({ ...editItem, stock: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select
                  value={editItem.category}
                  onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 appearance-none"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setEditItem(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteItemId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in-down">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Hapus Inventaris</h2>
              <button
                onClick={() => setDeleteItemId(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-gray-500 text-sm mb-6">
              Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteItemId(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  deleteInventoryItem(deleteItemId)
                  setInventory(getInventory())
                  setToast({ message: 'Barang berhasil dihapus!', type: 'success' })
                  setDeleteItemId(null)
                  
                  // Reset page if needed
                  const newTotal = Math.ceil((filteredInventory.length - 1) / itemsPerPage)
                  if (currentPage > newTotal && newTotal > 0) {
                    setCurrentPage(newTotal)
                  }
                }}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
