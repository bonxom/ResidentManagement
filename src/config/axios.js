import axios from 'axios'

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
})

// Request interceptor - Tự động thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Xử lý lỗi chung
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      // Server trả về lỗi
      switch (error.response.status) {
        case 401:
          // Token hết hạn hoặc không hợp lệ
          localStorage.removeItem('token')
          window.location.href = '/signin'
          break
        case 403:
          console.error('Bạn không có quyền truy cập')
          break
        case 404:
          console.error('Không tìm thấy tài nguyên')
          break
        case 500:
          console.error('Lỗi server')
          break
        default:
          break
      }
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      console.error('Không thể kết nối đến server')
    } else {
      // Lỗi khác
      console.error('Lỗi:', error.message)
    }
    return Promise.reject(error)
  }
)

export default api