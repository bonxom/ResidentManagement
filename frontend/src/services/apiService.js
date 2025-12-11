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
  // CRUD
  getAll: async (params = {}) => {
    const response = await api.get('/households', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/households/${id}`);
    return response.data;
  },

  create: async (householdData) => {
    const response = await api.post('/households', householdData);
    return response.data;
  },

  update: async (id, householdData) => {
    const response = await api.put(`/households/${id}`, householdData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/households/${id}`);
    return response.data;
  },

  getMembers: async (id) => {
    const response = await api.get(`/households/${id}/members`);
    return response.data;
  },

  addMember: async (id, memberData) => {
    const response = await api.post(`/households/${id}/members`, memberData);
    return response.data;
  },

  removeMember: async (householdId, memberId) => {
    const response = await api.delete(`/households/${householdId}/members/${memberId}`);
    return response.data;
  },

  getResidentHistory: async (householdId) => {
    const response = await api.get(`/households/${householdId}/resident-history`);
    return response.data;
  },

  addTemporaryResident: async (householdId, residentData) => {
    const response = await api.post(`/households/${householdId}/temporary-residents`, residentData);
    return response.data;
  },

  endTemporaryResident: async (householdId, data) => {
    // data = { userCardID, endDate }
    const response = await api.put(`/households/${householdId}/temporary-residents/end`, data);
    return response.data;
  },

  //
  splitHousehold: async (splitData) => {
    // splitData = { userId, newHouseHoldID, newAddress }
    const response = await api.post('/households/split', splitData);
    return response.data;
  },

  moveMember: async (moveData) => {
    // moveData = { userId, targetHouseholdId, relationship }
    const response = await api.post('/households/move', moveData);
    return response.data;
  },
};


// ==============FEE API===============

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
