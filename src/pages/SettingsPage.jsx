import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, getUsers, addUser, updateUser, deleteUser, logoutUser } from '../lib/supabase'
import { User, Mail, Shield, Plus, Pencil, Trash2, X, Users, KeyRound } from 'lucide-react'

export default function SettingsPage() {
  const navigate = useNavigate()
  const currentUser = getCurrentUser()
  const isAdmin = currentUser?.role === 'Super Admin'

  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
  })
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  })
  const [profileMsg, setProfileMsg] = useState('')
  const [passwordMsg, setPasswordMsg] = useState('')

  // User management state
  const [users, setUsers] = useState(getUsers())
  const [showUserModal, setShowUserModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [userForm, setUserForm] = useState({ username: '', password: '', name: '', email: '', role: 'Siswa' })

  // Profile save - actually updates localStorage
  const handleSaveProfile = () => {
    if (!profileForm.name || !profileForm.email) {
      setProfileMsg('Nama dan email wajib diisi!')
      return
    }
    const user = getCurrentUser()
    if (user) {
      const updated = { ...user, name: profileForm.name, email: profileForm.email }
      localStorage.setItem('aramcolab_user', JSON.stringify(updated))
      // Also update in users data
      updateUser(user.id, { name: profileForm.name, email: profileForm.email })
      setUsers(getUsers())
    }
    setProfileMsg('Profil berhasil disimpan!')
    setTimeout(() => setProfileMsg(''), 3000)
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        const user = getCurrentUser()
        if (user) {
          const updated = { ...user, photo: base64String }
          localStorage.setItem('aramcolab_user', JSON.stringify(updated))
          updateUser(user.id, { photo: base64String })
          window.location.reload()
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Password change - actually works
  const handleChangePassword = () => {
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      setPasswordMsg('Semua field password wajib diisi!')
      return
    }
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordMsg('Password baru dan konfirmasi tidak cocok!')
      return
    }
    if (passwordForm.new.length < 5) {
      setPasswordMsg('Password baru minimal 5 karakter!')
      return
    }
    // Update password
    const user = getCurrentUser()
    if (user) {
      updateUser(user.id, { password: passwordForm.new })
    }
    setPasswordForm({ current: '', new: '', confirm: '' })
    setPasswordMsg('Password berhasil diubah! Silakan login ulang.')
    setTimeout(() => {
      logoutUser()
      navigate('/login')
    }, 2000)
  }

  // User CRUD handlers
  const handleOpenAddUser = () => {
    setEditingUser(null)
    setUserForm({ username: '', password: '', name: '', email: '', role: 'Siswa' })
    setShowUserModal(true)
  }

  const handleOpenEditUser = (user) => {
    setEditingUser(user)
    setUserForm({ username: user.username, password: '', name: user.name, email: user.email, role: user.role })
    setShowUserModal(true)
  }

  const handleSaveUser = () => {
    if (!userForm.username || !userForm.name || !userForm.email) {
      alert('Harap isi semua field yang wajib!')
      return
    }

    if (editingUser) {
      const updates = { username: userForm.username, name: userForm.name, email: userForm.email, role: userForm.role }
      if (userForm.password) updates.password = userForm.password
      updateUser(editingUser.id, updates)
    } else {
      if (!userForm.password) {
        alert('Password wajib diisi untuk user baru!')
        return
      }
      addUser(userForm)
    }

    setUsers(getUsers())
    setShowUserModal(false)
  }

  const handleDeleteUser = (id) => {
    if (window.confirm('Yakin ingin menghapus user ini?')) {
      const result = deleteUser(id)
      if (!result) {
        alert('Tidak bisa menghapus admin utama!')
        return
      }
      setUsers(getUsers())
    }
  }

  const roleColors = {
    'Super Admin': 'bg-purple-50 text-purple-700',
    'Guru': 'bg-blue-50 text-blue-700',
    'Siswa': 'bg-green-50 text-green-700',
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan Sistem</h1>
        <p className="text-gray-500 mt-1">Kelola profil dan pengguna AramcoLab.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-6">
              <User size={20} className="text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Profil Pengguna</h2>
            </div>

            <div className="flex items-start gap-6">
                <div className="text-center">
                  <div className="relative group cursor-pointer" onClick={() => document.getElementById('photo-input').click()}>
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                      {currentUser?.photo ? (
                        <img src={currentUser.photo} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl">👩‍💼</span>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs text-white font-medium">Ubah Foto</p>
                    </div>
                  </div>
                  <input
                    id="photo-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>

              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Alamat Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        value={currentUser?.role || ''}
                        readOnly
                        className="w-full pl-9 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {profileMsg && (
                  <p className={`text-xs px-3 py-2 rounded-lg ${profileMsg.includes('berhasil') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                    {profileMsg}
                  </p>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setProfileForm({ name: currentUser?.name || '', email: currentUser?.email || '' })}
                    className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Management - Admin Only */}
          {isAdmin && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Manajemen Pengguna</h2>
                </div>
                <button
                  onClick={handleOpenAddUser}
                  className="flex items-center gap-1.5 px-3 py-2 bg-primary-600 text-white rounded-xl text-xs font-medium hover:bg-primary-700 transition-colors"
                >
                  <Plus size={14} />
                  Tambah User
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Nama</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Username</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Role</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{user.username}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${roleColors[user.role] || 'bg-gray-50 text-gray-600'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleOpenEditUser(user)}
                              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Pencil size={14} />
                            </button>
                            {user.id !== '1' && (
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Hapus"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Change Password */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <KeyRound size={20} className="text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Ubah Password</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password Saat Ini</label>
                <input
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  placeholder="••••••"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password Baru</label>
                <input
                  type="password"
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                  placeholder="Minimal 5 karakter"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi Password Baru</label>
                <input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  placeholder="Ketik ulang password baru"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>

              {passwordMsg && (
                <p className={`text-xs px-3 py-2 rounded-lg ${passwordMsg.includes('berhasil') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                  {passwordMsg}
                </p>
              )}

              <button
                onClick={handleChangePassword}
                className="w-full px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Ubah Password
              </button>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5 mt-6">
            <p className="text-sm font-medium text-blue-800 mb-1">Info Akun</p>
            <div className="space-y-1 text-xs text-blue-600">
              <p>Username: <span className="font-mono font-medium">{currentUser?.username}</span></p>
              <p>Role: <span className="font-medium">{currentUser?.role}</span></p>
              <p>Login sejak: <span className="font-medium">{new Date().toLocaleDateString('id-ID')}</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingUser ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
              </h2>
              <button onClick={() => setShowUserModal(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  placeholder="Nama lengkap"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  placeholder="email@aramcolab.edu"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                  <input
                    type="text"
                    value={userForm.username}
                    onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                    placeholder="username"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password {editingUser ? '' : '*'}
                  </label>
                  <input
                    type="password"
                    value={userForm.password}
                    onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                    placeholder={editingUser ? 'Kosongkan jika tidak diubah' : '••••••'}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 appearance-none"
                >
                  <option value="Guru">Guru</option>
                  <option value="Siswa">Siswa</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setShowUserModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSaveUser}
                className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                {editingUser ? 'Simpan Perubahan' : 'Tambah User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
