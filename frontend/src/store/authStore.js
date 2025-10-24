import { create } from 'zustand'
import * as jose from 'jose'
import { authAPI, userAPI } from '../services/apiService'

const useAuthStore = create((set, get) => ({
  token: localStorage.getItem('token') || null,
  user: null,
  isLoading: false,
  error: null,

  // Đăng nhập
  signIn: async (credentials) => {
    set({ isLoading: true, error: null })
    try {
      const data = await authAPI.signIn(credentials)
      
      // Lưu token
      localStorage.setItem('token', data.token)
      
      // Decode token để lấy thông tin user
      const decoded = jose.decodeJwt(data.token)
      const user = {
        id: decoded.userId,
        fullName: decoded.fullName,
        role: decoded.role,
        permissions: decoded.permissions || [],
        citizenId: decoded.citizenId,
        phoneNumber: decoded.phoneNumber,
        address: decoded.address,
        householdBookId: decoded.householdBookId,
      }
      
      localStorage.setItem('user', JSON.stringify(user))
      
      set({ token: data.token, user, isLoading: false })
      return { success: true }
    } catch (error) {
      set({ isLoading: false, error: error.customMessage || 'Đăng nhập thất bại' })
      return { success: false, error: error.customMessage }
    }
  },

  // Đăng ký
  signUp: async (userData) => {
    set({ isLoading: true, error: null })
    try {
      const data = await authAPI.signUp(userData)
      set({ isLoading: false })
      return { success: true, data }
    } catch (error) {
      set({ isLoading: false, error: error.customMessage || 'Đăng ký thất bại' })
      return { success: false, error: error.customMessage }
    }
  },

  // Kiểm tra auth
  checkAuth: async () => {
    const token = get().token
    if (!token) return false

    try {
      // Kiểm tra token có expired không
      const decoded = jose.decodeJwt(token)
      const now = Math.floor(Date.now() / 1000)
      
      if (decoded.exp < now) {
        get().signOut()
        return false
      }

      // Optional: Verify với backend
      await authAPI.verifyToken()
      return true
    } catch (error) {
      console.error('Auth check failed:', error)
      get().signOut()
      return false
    }
  },

  // Đăng xuất
  signOut: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ token: null, user: null })
  },

  // Load user từ localStorage
  loadUserFromStorage: () => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const user = JSON.parse(userData)
        set({ user })
      } catch (error) {
        console.error('Failed to parse user data:', error)
        get().signOut()
      }
    }
  },

  // Kiểm tra permission
  hasPermission: (permission) => {
    const user = get().user
    if (!user || !user.permissions) return false
    return user.permissions.includes(permission)
  },

  hasAnyPermission: (permissions) => {
    const user = get().user
    if (!user || !user.permissions) return false
    return permissions.some(p => user.permissions.includes(p))
  },

  hasAllPermissions: (permissions) => {
    const user = get().user
    if (!user || !user.permissions) return false
    return permissions.every(p => user.permissions.includes(p))
  },

  // Cập nhật profile
  updateProfile: async (userData) => {
    set({ isLoading: true, error: null })
    try {
      const data = await userAPI.updateProfile(userData)
      
      // Cập nhật user trong store
      const updatedUser = { ...get().user, ...data.user }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      set({ user: updatedUser, isLoading: false })
      
      return { success: true, data }
    } catch (error) {
      set({ isLoading: false, error: error.customMessage })
      return { success: false, error: error.customMessage }
    }
  },
}))

export default useAuthStore