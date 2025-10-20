export const ROLES = {
  TDANPHO: 'tdanpho',           // Tổ Dân Phố - Full quyền
  KIEMTOAN: 'kiemtoan',         // Kiểm Toán - Quản lý tài chính
  CHUHO: 'chuho',               // Chủ Hộ - Quản lý hộ gia đình
  CUDAN: 'cudan',               // Cư Dân - Quyền cơ bản
}

// Mô tả vai trò
export const ROLE_DESCRIPTIONS = {
  [ROLES.TDANPHO]: 'Tổ Dân Phố',
  [ROLES.KIEMTOAN]: 'Kiểm Toán',
  [ROLES.CHUHO]: 'Chủ Hộ',
  [ROLES.CUDAN]: 'Cư Dân',
}

// Quyền hạn của từng vai trò
export const PERMISSIONS = {
  // Quản lý nhân khẩu
  VIEW_ALL_CITIZENS: 'view_all_citizens',           // Xem tất cả cư dân
  VIEW_OWN_INFO: 'view_own_info',                   // Xem thông tin bản thân
  VIEW_HOUSEHOLD_INFO: 'view_household_info',       // Xem thông tin hộ gia đình
  CREATE_CITIZEN: 'create_citizen',                 // Thêm cư dân mới
  UPDATE_CITIZEN: 'update_citizen',                 // Cập nhật thông tin cư dân
  DELETE_CITIZEN: 'delete_citizen',                 // Xóa cư dân
  
  // Quản lý hộ khẩu
  VIEW_ALL_HOUSEHOLDS: 'view_all_households',       // Xem tất cả hộ gia đình
  CREATE_HOUSEHOLD: 'create_household',             // Tạo hộ gia đình
  UPDATE_HOUSEHOLD: 'update_household',             // Cập nhật hộ gia đình
  DELETE_HOUSEHOLD: 'delete_household',             // Xóa hộ gia đình
  MANAGE_HOUSEHOLD_MEMBERS: 'manage_household_members', // Quản lý thành viên hộ
  
  // Quản lý tài chính
  VIEW_ALL_FINANCES: 'view_all_finances',           // Xem tất cả tài chính
  VIEW_HOUSEHOLD_FINANCES: 'view_household_finances', // Xem tài chính hộ
  CREATE_FINANCE: 'create_finance',                 // Tạo khoản thu/chi
  UPDATE_FINANCE: 'update_finance',                 // Cập nhật tài chính
  DELETE_FINANCE: 'delete_finance',                 // Xóa khoản thu/chi
  APPROVE_FINANCE: 'approve_finance',               // Duyệt khoản chi
  AUDIT_FINANCE: 'audit_finance',                   // Kiểm toán tài chính
  
  // Quản lý đóng góp
  VIEW_CONTRIBUTIONS: 'view_contributions',         // Xem các khoản đóng góp
  CREATE_CONTRIBUTION: 'create_contribution',       // Tạo khoản đóng góp
  PAY_CONTRIBUTION: 'pay_contribution',             // Đóng góp
  MANAGE_CONTRIBUTIONS: 'manage_contributions',     // Quản lý đóng góp
  
  // Thông báo và sự kiện
  VIEW_ANNOUNCEMENTS: 'view_announcements',         // Xem thông báo
  CREATE_ANNOUNCEMENT: 'create_announcement',       // Tạo thông báo
  DELETE_ANNOUNCEMENT: 'delete_announcement',       // Xóa thông báo
  
  // Báo cáo thống kê
  VIEW_STATISTICS: 'view_statistics',               // Xem thống kê
  VIEW_FINANCE_REPORTS: 'view_finance_reports',     // Xem báo cáo tài chính
  EXPORT_DATA: 'export_data',                       // Xuất dữ liệu
  
  // Quản lý hệ thống
  MANAGE_USERS: 'manage_users',                     // Quản lý người dùng
  MANAGE_ROLES: 'manage_roles',                     // Phân quyền
  SYSTEM_SETTINGS: 'system_settings',               // Cài đặt hệ thống
}

// Map quyền hạn theo vai trò
export const ROLE_PERMISSIONS = {
  // TỔ DÂN PHỐ - Full quyền
  [ROLES.TDANPHO]: [
    // Nhân khẩu
    PERMISSIONS.VIEW_ALL_CITIZENS,
    PERMISSIONS.CREATE_CITIZEN,
    PERMISSIONS.UPDATE_CITIZEN,
    PERMISSIONS.DELETE_CITIZEN,
    
    // Hộ khẩu
    PERMISSIONS.VIEW_ALL_HOUSEHOLDS,
    PERMISSIONS.CREATE_HOUSEHOLD,
    PERMISSIONS.UPDATE_HOUSEHOLD,
    PERMISSIONS.DELETE_HOUSEHOLD,
    PERMISSIONS.MANAGE_HOUSEHOLD_MEMBERS,
    
    // Tài chính
    PERMISSIONS.VIEW_ALL_FINANCES,
    PERMISSIONS.CREATE_FINANCE,
    PERMISSIONS.UPDATE_FINANCE,
    PERMISSIONS.DELETE_FINANCE,
    PERMISSIONS.APPROVE_FINANCE,
    
    // Đóng góp
    PERMISSIONS.VIEW_CONTRIBUTIONS,
    PERMISSIONS.CREATE_CONTRIBUTION,
    PERMISSIONS.MANAGE_CONTRIBUTIONS,
    
    // Thông báo
    PERMISSIONS.VIEW_ANNOUNCEMENTS,
    PERMISSIONS.CREATE_ANNOUNCEMENT,
    PERMISSIONS.DELETE_ANNOUNCEMENT,
    
    // Thống kê
    PERMISSIONS.VIEW_STATISTICS,
    PERMISSIONS.VIEW_FINANCE_REPORTS,
    PERMISSIONS.EXPORT_DATA,
    
    // Hệ thống
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_ROLES,
    PERMISSIONS.SYSTEM_SETTINGS,
  ],
  
  // KIỂM TOÁN - Quản lý tài chính
  [ROLES.KIEMTOAN]: [
    // Xem thông tin cơ bản
    PERMISSIONS.VIEW_ALL_CITIZENS,
    PERMISSIONS.VIEW_ALL_HOUSEHOLDS,
    
    // Tài chính - Full quyền
    PERMISSIONS.VIEW_ALL_FINANCES,
    PERMISSIONS.CREATE_FINANCE,
    PERMISSIONS.UPDATE_FINANCE,
    PERMISSIONS.DELETE_FINANCE,
    PERMISSIONS.AUDIT_FINANCE,
    
    // Đóng góp
    PERMISSIONS.VIEW_CONTRIBUTIONS,
    PERMISSIONS.MANAGE_CONTRIBUTIONS,
    
    // Thông báo
    PERMISSIONS.VIEW_ANNOUNCEMENTS,
    
    // Thống kê
    PERMISSIONS.VIEW_STATISTICS,
    PERMISSIONS.VIEW_FINANCE_REPORTS,
    PERMISSIONS.EXPORT_DATA,
  ],
  
  // CHỦ HỘ - Quản lý hộ gia đình
  [ROLES.CHUHO]: [
    // Xem thông tin
    PERMISSIONS.VIEW_OWN_INFO,
    PERMISSIONS.VIEW_HOUSEHOLD_INFO,
    
    // Quản lý hộ gia đình
    PERMISSIONS.UPDATE_HOUSEHOLD,
    PERMISSIONS.MANAGE_HOUSEHOLD_MEMBERS,
    
    // Tài chính hộ
    PERMISSIONS.VIEW_HOUSEHOLD_FINANCES,
    PERMISSIONS.PAY_CONTRIBUTION,
    
    // Đóng góp
    PERMISSIONS.VIEW_CONTRIBUTIONS,
    PERMISSIONS.PAY_CONTRIBUTION,
    
    // Thông báo
    PERMISSIONS.VIEW_ANNOUNCEMENTS,
  ],
  
  // CƯ DÂN - Quyền cơ bản
  [ROLES.CUDAN]: [
    // Chỉ xem thông tin cá nhân
    PERMISSIONS.VIEW_OWN_INFO,
    
    // Xem thông báo
    PERMISSIONS.VIEW_ANNOUNCEMENTS,
    
    // Xem thông tin hộ (nếu thuộc hộ)
    PERMISSIONS.VIEW_HOUSEHOLD_INFO,
    
    // Xem đóng góp
    PERMISSIONS.VIEW_CONTRIBUTIONS,
  ],
}

// Hàm kiểm tra quyền
export const hasPermission = (userRole, permission) => {
  if (!userRole) return false
  const rolePermissions = ROLE_PERMISSIONS[userRole] || []
  return rolePermissions.includes(permission)
}

// Hàm kiểm tra có ít nhất một trong các quyền
export const hasAnyPermission = (userRole, permissions) => {
  return permissions.some(permission => hasPermission(userRole, permission))
}

// Hàm kiểm tra có tất cả các quyền
export const hasAllPermissions = (userRole, permissions) => {
  return permissions.every(permission => hasPermission(userRole, permission))
}