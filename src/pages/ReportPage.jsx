import { getReportData } from '../lib/supabase'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Calendar, Download, TrendingUp, AlertTriangle, Package, ArrowLeft, Flame } from 'lucide-react'

export default function ReportPage() {
  const report = getReportData()

  const handleExportPDF = () => {
    window.print()
  }

  return (
    <div className="print:p-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 print:mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 print:text-xl">Laporan Inventaris</h1>
          <p className="text-gray-500 mt-1 print:text-sm">Analisis data perangkat laboratorium Anda secara visual.</p>
        </div>
        <div className="flex items-center gap-3 print:hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white">
            <Calendar size={16} />
            <span>Bulan Ini</span>
          </div>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download size={16} />
            Ekspor PDF
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Kondisi Barang - Donut Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 print:border print:rounded-lg">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package size={16} className="text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Kondisi Barang</h2>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={report.conditionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {report.conditionData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{report.totalItems}</p>
                  <p className="text-xs text-gray-500">Total Item</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-4">
            {report.conditionData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-medium text-gray-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tren Peminjaman - Bar Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 print:border print:rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <TrendingUp size={16} className="text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Tren Peminjaman</h2>
            </div>
            <span className="text-xs text-gray-400">6 Bulan Terakhir</span>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={report.trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="peminjaman" fill="#c4b5fd" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kategori Terpopuler */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 print:border print:rounded-lg">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Flame size={16} className="text-yellow-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Kategori Terpopuler</h2>
          </div>

          <div className="space-y-4">
            {report.categories.map((cat, index) => {
              const colors = ['bg-blue-500', 'bg-blue-400', 'bg-orange-400', 'bg-green-400', 'bg-purple-400']
              const maxCount = report.categories[0]?.count || 1
              const width = (cat.count / maxCount) * 100

              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded ${colors[index] || 'bg-gray-400'}`}></div>
                      <span className="text-sm text-gray-700">{cat.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{cat.count.toLocaleString()} unit</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${colors[index] || 'bg-gray-400'}`}
                      style={{ width: `${width}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tinjauan Singkat */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 print:border print:rounded-lg">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <Package size={16} className="text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Tinjauan Singkat</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <Package size={16} className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{report.summary.barangBaru}</p>
              <p className="text-xs text-gray-500 mt-1">Barang Baru (Bulan ini)</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mb-2">
                <AlertTriangle size={16} className="text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{report.summary.perluServis}</p>
              <p className="text-xs text-gray-500 mt-1">Perlu Servis Segera</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                    <ArrowLeft size={16} className="text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{report.summary.terlambatDikembalikan}</p>
                  <p className="text-xs text-gray-500 mt-1">Terlambat Dikembalikan</p>
                </div>
                <button className="text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors print:hidden">
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
