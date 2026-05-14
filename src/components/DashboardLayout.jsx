import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { logoutUser, getCurrentUser } from '../lib/supabase'
import { LayoutDashboard, Package, FileBarChart, Settings, Plus, Search, Bell, HelpCircle, LogOut } from 'lucide-react'

export default function DashboardLayout() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/dashboard/inventaris', icon: Package, label: 'Inventaris' },
    { to: '/dashboard/laporan', icon: FileBarChart, label: 'Laporan', roles: ['Super Admin', 'Guru'] },
    { to: '/dashboard/pengaturan', icon: Settings, label: 'Pengaturan' },
  ]

  const filteredNavItems = navItems.filter(item => {
    if (!item.roles) return true
    return item.roles.includes(user?.role)
  })

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-[220px] bg-white border-r border-gray-100 flex flex-col p-6">
        <div className="mb-8">
          <img src="/AramcoLab.svg" alt="AramcoLab" className="h-8" />
          <p className="text-xs text-gray-400 mt-1">MODERN LAB OS</p>
        </div>

        <nav className="flex-1 space-y-1">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {user?.role !== 'Siswa' && (
          <button
            onClick={() => navigate('/dashboard/inventaris/tambah')}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors shadow-md mt-4"
          >
            <Plus size={18} />
            Tambah Barang
          </button>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-8 py-4 flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari alat atau ruangan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl w-[320px] text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <HelpCircle size={20} />
            </button>
            <div className="relative group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-300 to-blue-300 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-white shadow">
                {user?.photo ? (
                  <img src={user.photo} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-xs font-bold">{user?.name?.charAt(0) || 'A'}</span>
                )}
              </div>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Keluar
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
