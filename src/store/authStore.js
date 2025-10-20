import { create } from 'zustand'
// import api from '../config/axios' // Tạm thời comment để dùng mock
import { mockApi } from '../services/mockApi' // Sử dụng mock API
import { hasPermission, hasAnyPermission, hasAllPermissions } from '../constants/roles'

const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,

  // SignUp
  signUp: async (userData) => {
    set({ loading: true, error: null })
    try {
      // const response = await api.post('/auth/signup', userData)
      const response = await mockApi.signUp(userData) // Dùng mock
      const { user, token } = response.data
      
      set({ 
        user, 
        token,
        loading: false 
      })
      localStorage.setItem('token', token)
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Đăng ký thất bại'
      set({ 
        error: errorMessage, 
        loading: false 
      })
      return { success: false, error: errorMessage }
    }
  },

  // SignIn
  signIn: async (credentials) => {
    set({ loading: true, error: null })
    try {
      // const response = await api.post('/auth/signin', credentials)
      const response = await mockApi.signIn(credentials) // Dùng mock
      const { user, token } = response.data
      
      set({ 
        user, 
        token,
        loading: false 
      })
      localStorage.setItem('token', token)
      return { success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại'
      set({ 
        error: errorMessage, 
        loading: false 
      })
      return { success: false, error: errorMessage }
    }
  },

  // SignOut
  signOut: () => {
    set({ user: null, token: null })
    localStorage.removeItem('token')
  },

  // Clear Error
  clearError: () => set({ error: null }),
  
  // Check Auth - Kiểm tra token còn hợp lệ không
  checkAuth: async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      set({ user: null, token: null })
      return false
    }
    
    try {
      // const response = await api.get('/auth/me')
      const response = await mockApi.checkAuth() // Dùng mock
      set({ user: response.data.user, token })
      return true
    } catch (error) {
      set({ user: null, token: null })
      localStorage.removeItem('token')
      return false
    }
  },

  // Kiểm tra quyền
  hasPermission: (permission) => {
    const { user } = get()
    return hasPermission(user?.role, permission)
  },

  hasAnyPermission: (permissions) => {
    const { user } = get()
    return hasAnyPermission(user?.role, permissions)
  },

  hasAllPermissions: (permissions) => {
    const { user } = get()
    return hasAllPermissions(user?.role, permissions)
  },

  // Lấy role của user hiện tại
  getUserRole: () => {
    const { user } = get()
    return user?.role
  },
}))

export default useAuthStore