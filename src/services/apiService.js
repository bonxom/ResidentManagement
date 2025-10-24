import api from './mockApi'

export const authAPI = {
  // Đăng nhập
  signIn: async (credentials) => {
    const response = await api.post('/auth/signin', credentials)
    return response.data
  },

  // Đăng ký
  signUp: async (userData) => {
    const response = await api.post('/auth/signup', userData)
    return response.data
  },

  // Verify token
  verifyToken: async () => {
    const response = await api.get('/auth/verify')
    return response.data
  },

  // Đăng xuất
  signOut: async () => {
    const response = await api.post('/auth/signout')
    return response.data
  },

  // Refresh token (nếu backend hỗ trợ)
  refreshToken: async (refreshToken) => {
    const response = await api.post('/auth/refresh', { refreshToken })
    return response.data
  },
}

// ============= USER API =============
export const userAPI = {
  // Lấy tất cả users
  getAll: async (params = {}) => {
    const response = await api.get('/users', { params })
    return response.data
  },

  // Lấy user theo ID
  getById: async (id) => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  // Tạo user mới
  create: async (userData) => {
    const response = await api.post('/users', userData)
    return response.data
  },

  // Cập nhật user
  update: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData)
    return response.data
  },

  // Xóa user
  delete: async (id) => {
    const response = await api.delete(`/users/${id}`)
    return response.data
  },

  // Lấy profile của user hiện tại
  getProfile: async () => {
    const response = await api.get('/users/profile')
    return response.data
  },

  // Cập nhật profile
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData)
    return response.data
  },
}

// ============= HOUSEHOLD API =============
export const householdAPI = {
  // Lấy tất cả hộ gia đình
  getAll: async (params = {}) => {
    const response = await api.get('/households', { params })
    return response.data
  },

  // Lấy hộ gia đình theo ID
  getById: async (id) => {
    const response = await api.get(`/households/${id}`)
    return response.data
  },

  // Tạo hộ gia đình mới
  create: async (householdData) => {
    const response = await api.post('/households', householdData)
    return response.data
  },

  // Cập nhật hộ gia đình
  update: async (id, householdData) => {
    const response = await api.put(`/households/${id}`, householdData)
    return response.data
  },

  // Xóa hộ gia đình
  delete: async (id) => {
    const response = await api.delete(`/households/${id}`)
    return response.data
  },

  // Lấy thành viên của hộ gia đình
  getMembers: async (id) => {
    const response = await api.get(`/households/${id}/members`)
    return response.data
  },

  // Thêm thành viên vào hộ gia đình
  addMember: async (id, memberData) => {
    const response = await api.post(`/households/${id}/members`, memberData)
    return response.data
  },

  // Xóa thành viên khỏi hộ gia đình
  removeMember: async (householdId, memberId) => {
    const response = await api.delete(`/households/${householdId}/members/${memberId}`)
    return response.data
  },
}

// ============= FEE API =============
export const feeAPI = {
  // Lấy tất cả phí
  getAll: async (params = {}) => {
    const response = await api.get('/fees', { params })
    return response.data
  },

  // Lấy phí theo ID
  getById: async (id) => {
    const response = await api.get(`/fees/${id}`)
    return response.data
  },

  // Tạo phí mới
  create: async (feeData) => {
    const response = await api.post('/fees', feeData)
    return response.data
  },

  // Cập nhật phí
  update: async (id, feeData) => {
    const response = await api.put(`/fees/${id}`, feeData)
    return response.data
  },

  // Xóa phí
  delete: async (id) => {
    const response = await api.delete(`/fees/${id}`)
    return response.data
  },

  // Thanh toán phí
  pay: async (id, paymentData) => {
    const response = await api.post(`/fees/${id}/pay`, paymentData)
    return response.data
  },

  // Lấy lịch sử thanh toán
  getPaymentHistory: async (id) => {
    const response = await api.get(`/fees/${id}/payments`)
    return response.data
  },
}

// ============= STATISTICS API =============
export const statisticsAPI = {
  // Dashboard overview
  getOverview: async () => {
    const response = await api.get('/statistics/overview')
    return response.data
  },

  // Thống kê theo tháng
  getMonthly: async (year, month) => {
    const response = await api.get('/statistics/monthly', {
      params: { year, month }
    })
    return response.data
  },

  // Thống kê tài chính
  getFinancial: async (params = {}) => {
    const response = await api.get('/statistics/financial', { params })
    return response.data
  },
}