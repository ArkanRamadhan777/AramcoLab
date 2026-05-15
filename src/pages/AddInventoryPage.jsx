import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addInventoryItem, CATEGORIES } from '../lib/supabase'
import { Plus, Camera, ChevronDown, Hash, Monitor, Package } from 'lucide-react'

export default function AddInventoryPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    code: '',
    stock: 1,
    condition: 'Baru (Sempurna)',
    image: null,
  })

  const categories = CATEGORIES
  const conditions = ['Baru (Sempurna)', 'Baik', 'Perbaikan', 'Rusak']

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const conditionMap = {
      'Baru (Sempurna)': 'Baik',
      'Baik': 'Baik',
      'Perbaikan': 'Perbaikan',
      'Rusak': 'Rusak',
    }

    addInventoryItem({
      name: formData.name,
      code: formData.code || `LAB-${Date.now().toString().slice(-6)}`,
      category: formData.category,
      condition: conditionMap[formData.condition] || 'Baik',
      stock: parseInt(formData.stock),
      image: null,
    })

    navigate('/dashboard/inventaris', { state: { message: 'Barang berhasil ditambahkan!' } })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Plus size={20} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tambah Data Inventaris</h1>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-8 ml-13">Masukkan informasi perangkat laboratorium dengan lengkap.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama Perangkat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Perangkat</label>
            <div className="relative">
              <Monitor className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Contoh: Mikroskop Digital XYZ"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400"
                required
              />
            </div>
          </div>

          {/* Kategori & Kode */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 appearance-none"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kode Inventaris (SKU)</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-mono">||||</div>
                <input
                  type="text"
                  placeholder="Otomatis atau ketik manual"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400"
                />
              </div>
            </div>
          </div>

          {/* Jumlah & Kondisi */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Unit</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  min="1"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kondisi Saat Ini</label>
              <div className="relative">
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 appearance-none"
                >
                  {conditions.map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          {/* Foto Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Foto Perangkat</label>
            <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center bg-blue-50/30 hover:bg-blue-50/50 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Camera size={24} className="text-blue-500" />
              </div>
              <p className="text-sm">
                <span className="text-blue-600 font-medium">Klik untuk upload</span>
                <span className="text-gray-500"> atau drag and drop</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard/inventaris')}
              className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors shadow-md"
            >
              <Package size={16} />
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
