import api from '../api/axiosInstance'; // Import file thật

export const authAPI = {
  // Đăng nhập
  signIn: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  // Đăng ký
  signUp: async (userData) => {
    const response = await api.post('/users', userData)
    return response.data
  },

  // Verify token
  verifyToken: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  // Đăng xuất
  signOut: async () => {
    // Backend của ta không có API này, ta chỉ cần xóa token ở client
    return Promise.resolve(); // Chỉ cần trả về thành công
  },
  // Refresh token (nếu backend hỗ trợ)
  refreshToken: async (refreshToken) => {
    return Promise.reject("Chưa hỗ trợ"); 
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
    const response = await api.post("/users", userData);
    return response.data;
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

  // Lấy profile (API này không tồn tại, ta dùng /auth/me)
  getProfile: async () => {
    const response = await api.get('/auth/me'); // Sửa
    return response.data;
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


// ==============MONEY API===============

export const feeAPI = {
  // Tạo fee
  createFee: async (data) => {
    const res = await api.post("/fees", data);
    return res.data;
  },

  // Lấy tất cả fee
  getAllFees: async () => {
    const res = await api.get("/fees");
    return res.data;
  },

  // Thống kê
  getFeeStatistics: async (feeId) => {
    const res = await api.get(`/fees/${feeId}/statistics`);
    return res.data;
  },

  // Cập nhật fee
  updateFee: async (feeId, data) => {
    const res = await api.put(`/fees/${feeId}`, data);
    return res.data;
  },

  // Xóa fee
  deleteFee: async (feeId) => {
    const res = await api.delete(`/fees/${feeId}`);
    return res.data;
  },

  // Leader lấy fee hộ gia đình
  getMyHouseholdFees: async () => {
    const res = await api.get("/fees/my-household");
    return res.data;
  },

  // Admin lấy fee của một hộ
  getHouseholdFeesByAdmin: async (householdId) => {
    const res = await api.get(`/fees/household/${householdId}`);
    return res.data;
  },
};
