import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// ============================================
// KATEGORI LAB KOMPUTER RPL/PPLG
// ============================================

export const CATEGORIES = [
  'Komputer & Laptop',
  'Monitor & Display',
  'Jaringan & Server',
  'Peripheral',
  'Komponen Hardware',
  'Software & Lisensi',
  'Alat Praktikum',
  'Furniture Lab',
]

// ============================================
// DUMMY DATA & AUTH SYSTEM
// ============================================

const INITIAL_USERS = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'Super Admin',
    name: 'Lab Administrator',
    email: 'admin@aramcolab.edu',
  },
  {
    id: '2',
    username: 'guru',
    password: 'guru123',
    role: 'Guru',
    name: 'Budi Santoso',
    email: 'budi@aramcolab.edu',
  },
  {
    id: '3',
    username: 'siswa',
    password: 'siswa123',
    role: 'Siswa',
    name: 'Andi Pratama',
    email: 'andi@aramcolab.edu',
  },
  {
    id: '4',
    username: 'guru2',
    password: 'guru123',
    role: 'Guru',
    name: 'Siti Rahayu',
    email: 'siti@aramcolab.edu',
  },
  {
    id: '5',
    username: 'siswa2',
    password: 'siswa123',
    role: 'Siswa',
    name: 'Rina Wati',
    email: 'rina@aramcolab.edu',
  },
]

const INITIAL_INVENTORY = [
  { id: 1, name: 'PC Desktop Lenovo ThinkCentre', code: 'LAB-PC-001', category: 'Komputer & Laptop', condition: 'Baik', stock: 20, image: null },
  { id: 2, name: 'Laptop ASUS VivoBook 14', code: 'LAB-LP-002', category: 'Komputer & Laptop', condition: 'Baik', stock: 10, image: null },
  { id: 3, name: 'Monitor LG 24" IPS', code: 'LAB-MN-001', category: 'Monitor & Display', condition: 'Baik', stock: 20, image: null },
  { id: 4, name: 'Monitor Dell 27" 4K', code: 'LAB-MN-002', category: 'Monitor & Display', condition: 'Perbaikan', stock: 2, image: null },
  { id: 5, name: 'Projector Epson EB-X51', code: 'LAB-MN-003', category: 'Monitor & Display', condition: 'Baik', stock: 3, image: null },
  { id: 6, name: 'Router MikroTik hAP ac3', code: 'LAB-NET-001', category: 'Jaringan & Server', condition: 'Baik', stock: 5, image: null },
  { id: 7, name: 'Switch Cisco Catalyst 2960', code: 'LAB-NET-002', category: 'Jaringan & Server', condition: 'Baik', stock: 4, image: null },
  { id: 8, name: 'Server Rack HP ProLiant', code: 'LAB-NET-003', category: 'Jaringan & Server', condition: 'Baik', stock: 2, image: null },
  { id: 9, name: 'Kabel UTP Cat6 (box)', code: 'LAB-NET-004', category: 'Jaringan & Server', condition: 'Baik', stock: 8, image: null },
  { id: 10, name: 'Keyboard Logitech K120', code: 'LAB-PR-001', category: 'Peripheral', condition: 'Baik', stock: 25, image: null },
  { id: 11, name: 'Mouse Logitech B100', code: 'LAB-PR-002', category: 'Peripheral', condition: 'Baik', stock: 25, image: null },
  { id: 12, name: 'Headset Logitech H390', code: 'LAB-PR-003', category: 'Peripheral', condition: 'Rusak', stock: 3, image: null },
  { id: 13, name: 'Webcam Logitech C920', code: 'LAB-PR-004', category: 'Peripheral', condition: 'Baik', stock: 5, image: null },
  { id: 14, name: 'Printer HP LaserJet Pro', code: 'LAB-PR-005', category: 'Peripheral', condition: 'Baik', stock: 2, image: null },
  { id: 15, name: 'RAM DDR4 8GB', code: 'LAB-HW-001', category: 'Komponen Hardware', condition: 'Baik', stock: 15, image: null },
  { id: 16, name: 'SSD NVMe 256GB', code: 'LAB-HW-002', category: 'Komponen Hardware', condition: 'Baik', stock: 10, image: null },
  { id: 17, name: 'Power Supply 500W', code: 'LAB-HW-003', category: 'Komponen Hardware', condition: 'Perbaikan', stock: 2, image: null },
  { id: 18, name: 'Crimping Tool Set', code: 'LAB-ALT-001', category: 'Alat Praktikum', condition: 'Baik', stock: 10, image: null },
  { id: 19, name: 'LAN Tester', code: 'LAB-ALT-002', category: 'Alat Praktikum', condition: 'Baik', stock: 8, image: null },
  { id: 20, name: 'Obeng Set Elektronik', code: 'LAB-ALT-003', category: 'Alat Praktikum', condition: 'Baik', stock: 10, image: null },
  { id: 21, name: 'Arduino Uno Starter Kit', code: 'LAB-ALT-004', category: 'Alat Praktikum', condition: 'Baik', stock: 15, image: null },
  { id: 22, name: 'Raspberry Pi 4 Model B', code: 'LAB-ALT-005', category: 'Alat Praktikum', condition: 'Baik', stock: 8, image: null },
  { id: 23, name: 'Meja Komputer', code: 'LAB-FB-001', category: 'Furniture Lab', condition: 'Baik', stock: 20, image: null },
  { id: 24, name: 'Kursi Ergonomis', code: 'LAB-FB-002', category: 'Furniture Lab', condition: 'Rusak', stock: 2, image: null },
  { id: 25, name: 'Whiteboard 120x240cm', code: 'LAB-FB-003', category: 'Furniture Lab', condition: 'Baik', stock: 2, image: null },
]



// ============================================
// LOCAL STORAGE PERSISTENCE
// ============================================

const STORAGE_KEY = 'aramcolab_inventory'
const USERS_STORAGE_KEY = 'aramcolab_users'

function loadInventory() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) return JSON.parse(stored)
  return [...INITIAL_INVENTORY]
}

function saveInventory(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function loadUsers() {
  const stored = localStorage.getItem(USERS_STORAGE_KEY)
  if (stored) return JSON.parse(stored)
  return [...INITIAL_USERS]
}

function saveUsers(data) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(data))
}

let inventoryData = loadInventory()
let usersData = loadUsers()

// ============================================
// AUTH FUNCTIONS
// ============================================

export function loginUser(username, password) {
  const user = usersData.find(u => u.username === username && u.password === password)
  if (user) {
    const { password: _, ...userWithoutPassword } = user
    localStorage.setItem('aramcolab_user', JSON.stringify(userWithoutPassword))
    return { success: true, user: userWithoutPassword }
  }
  return { success: false, error: 'Username atau password salah' }
}

export function logoutUser() {
  localStorage.removeItem('aramcolab_user')
}

export function getCurrentUser() {
  const stored = localStorage.getItem('aramcolab_user')
  return stored ? JSON.parse(stored) : null
}

// ============================================
// USER MANAGEMENT (CRUD - Admin only)
// ============================================

export function getUsers() {
  return usersData.map(({ password, ...user }) => user)
}

export function addUser(userData) {
  const maxId = usersData.reduce((max, u) => Math.max(max, parseInt(u.id)), 0)
  const newUser = {
    id: String(maxId + 1),
    ...userData,
  }
  usersData.push(newUser)
  saveUsers(usersData)
  return { ...newUser, password: undefined }
}

export function updateUser(id, updates) {
  const index = usersData.findIndex(u => u.id === id)
  if (index !== -1) {
    usersData[index] = { ...usersData[index], ...updates }
    saveUsers(usersData)
    return { ...usersData[index], password: undefined }
  }
  return null
}

export function deleteUser(id) {
  // Jangan hapus admin utama
  if (id === '1') return false
  usersData = usersData.filter(u => u.id !== id)
  saveUsers(usersData)
  return true
}

// ============================================
// INVENTORY CRUD FUNCTIONS
// ============================================

export function getInventory() {
  return [...inventoryData]
}

export function getInventoryById(id) {
  return inventoryData.find(item => item.id === id) || null
}

export function addInventoryItem(item) {
  const maxId = inventoryData.reduce((max, i) => Math.max(max, i.id), 0)
  const newItem = { id: maxId + 1, ...item }
  inventoryData.push(newItem)
  saveInventory(inventoryData)
  return newItem
}

export function updateInventoryItem(id, updates) {
  const index = inventoryData.findIndex(item => item.id === id)
  if (index !== -1) {
    inventoryData[index] = { ...inventoryData[index], ...updates }
    saveInventory(inventoryData)
    return inventoryData[index]
  }
  return null
}

export function deleteInventoryItem(id) {
  inventoryData = inventoryData.filter(item => item.id !== id)
  saveInventory(inventoryData)
  return true
}

export function resetInventoryData() {
  inventoryData = [...INITIAL_INVENTORY]
  saveInventory(inventoryData)
}



// ============================================
// DASHBOARD STATS
// ============================================

export function getDashboardStats() {
  const total = inventoryData.reduce((sum, item) => sum + item.stock, 0)
  const baik = inventoryData.filter(i => i.condition === 'Baik').reduce((sum, item) => sum + item.stock, 0)
  const rusak = inventoryData.filter(i => i.condition === 'Rusak').reduce((sum, item) => sum + item.stock, 0)
  const perbaikan = inventoryData.filter(i => i.condition === 'Perbaikan').reduce((sum, item) => sum + item.stock, 0)
  
  return { totalBarang: total, kondisiBaik: baik, barangRusak: rusak, dalamPerbaikan: perbaikan }
}

// ============================================
// REPORT DATA
// ============================================

export function getReportData() {
  const total = inventoryData.length
  const baik = inventoryData.filter(i => i.condition === 'Baik').length
  const perbaikan = inventoryData.filter(i => i.condition === 'Perbaikan').length
  const rusak = inventoryData.filter(i => i.condition === 'Rusak').length

  const baikPct = total > 0 ? Math.round((baik / total) * 100) : 0
  const perbaikanPct = total > 0 ? Math.round((perbaikan / total) * 100) : 0
  const rusakPct = total > 0 ? 100 - baikPct - perbaikanPct : 0

  // Hitung kategori dari data aktual
  const categoryCount = {}
  inventoryData.forEach(item => {
    categoryCount[item.category] = (categoryCount[item.category] || 0) + item.stock
  })
  const categories = Object.entries(categoryCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return {
    totalItems: total,
    conditionData: [
      { name: 'Baik', value: baikPct, color: '#3b82f6' },
      { name: 'Perbaikan', value: perbaikanPct, color: '#c4b5fd' },
      { name: 'Rusak', value: rusakPct, color: '#fca5a5' },
    ],
    categories,
    summary: {
      barangBaru: 24,
      perluServis: rusak + perbaikan,
    },
  }
}
