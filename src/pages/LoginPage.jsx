import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, getCurrentUser } from '../lib/supabase'
import { User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = loginUser(username, password)
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Login Card with blue glow */}
      <div className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full mx-4 grid grid-cols-1 md:grid-cols-2 card-glow">
        {/* Left - Logo */}
        <div className="p-8 flex items-center justify-center">
          <img src="/AramcoLab.svg" alt="AramcoLab Logo" className="w-48 h-48 object-contain" />
        </div>

        {/* Right - Form */}
        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-[#1e3a5f] italic mb-1">AramcoLab</h1>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Selamat Datang di AramcoLab</h2>
          <p className="text-sm text-gray-500 mb-8">Sistem Manajemen Inventaris Lab Komputer Modern</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e3a5f] text-white py-3 rounded-full text-sm font-medium hover:bg-[#152a44] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Memproses...' : 'Masuk ke Sistem'}
              <ArrowRight size={16} />
            </button>
          </form>

          <a href="#" className="text-sm text-[#1e3a5f] text-center mt-4 hover:underline font-medium">
            Lupa Password?
          </a>
        </div>
      </div>
    </div>
  )
}
