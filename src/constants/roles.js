// =====================
//  HỆ THỐNG VAI TRÒ
// =====================

export const ROLES = {
  TO_DAN_PHO: 'toDanPho',       // Tổ Dân Phố - Full quyền
  KIEM_TOAN: 'kiemToan',        // Kiểm Toán - Quản lý tài chính
  CHU_HO: 'chuHo',              // Chủ Hộ - Quản lý hộ gia đình
  CU_DAN: 'cuDan',              // Cư Dân - Quyền cơ bản
}

// =====================
//  MÔ TẢ VAI TRÒ
// =====================

export const ROLE_DESCRIPTIONS = {
  [ROLES.TO_DAN_PHO]: 'Tổ Dân Phố',
  [ROLES.KIEM_TOAN]: 'Kiểm Toán',
  [ROLES.CHU_HO]: 'Chủ Hộ',
  [ROLES.CU_DAN]: 'Cư Dân',
}

// =====================
//  DANH SÁCH QUYỀN HẠN
// =====================

export const PERMISSIONS = {
  // Quản lý nhân khẩu
  VIEW_ALL_CITIZENS: 'view_all_citizens',
  VIEW_OWN_INFO: 'view_own_info',
  VIEW_HOUSEHOLD_INFO: 'view_household_info',
  CREATE_CITIZEN: 'create_citizen',
  UPDATE_CITIZEN: 'update_citizen',
  DELETE_CITIZEN: 'delete_citizen',

  // Quản lý hộ khẩu
  VIEW_ALL_HOUSEHOLDS: 'view_all_households',
  CREATE_HOUSEHOLD: 'create_household',
  UPDATE_HOUSEHOLD: 'update_household',
  DELETE_HOUSEHOLD: 'delete_household',
  MANAGE_HOUSEHOLD_MEMBERS: 'manage_household_members',

  // Quản lý tài chính
  VIEW_ALL_FINANCES: 'view_all_finances',
  VIEW_HOUSEHOLD_FINANCES: 'view_household_finances',
  CREATE_FINANCE: 'create_finance',
  UPDATE_FINANCE: 'update_finance',
  DELETE_FINANCE: 'delete_finance',
  APPROVE_FINANCE: 'approve_finance',
  AUDIT_FINANCE: 'audit_finance',

  // Quản lý đóng góp
  VIEW_CONTRIBUTIONS: 'view_contributions',
  CREATE_CONTRIBUTION: 'create_contribution',
  PAY_CONTRIBUTION: 'pay_contribution',
  MANAGE_CONTRIBUTIONS: 'manage_contributions',

  // Thông báo và sự kiện
  VIEW_ANNOUNCEMENTS: 'view_announcements',
  CREATE_ANNOUNCEMENT: 'create_announcement',
  DELETE_ANNOUNCEMENT: 'delete_announcement',

  // Báo cáo thống kê
  VIEW_STATISTICS: 'view_statistics',
  VIEW_FINANCE_REPORTS: 'view_finance_reports',
  EXPORT_DATA: 'export_data',

  // Quản lý hệ thống
  MANAGE_USERS: 'manage_users',
  MANAGE_ROLES: 'manage_roles',
  SYSTEM_SETTINGS: 'system_settings',
}

// =====================
//  PHÂN QUYỀN THEO VAI TRÒ
// =====================

export const ROLE_PERMISSIONS = {
  // === TỔ DÂN PHỐ ===
  [ROLES.TO_DAN_PHO]: [
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

  // === KIỂM TOÁN ===
  [ROLES.KIEM_TOAN]: [
    PERMISSIONS.VIEW_ALL_CITIZENS,
    PERMISSIONS.VIEW_ALL_HOUSEHOLDS,
    PERMISSIONS.VIEW_ALL_FINANCES,
    PERMISSIONS.CREATE_FINANCE,
    PERMISSIONS.UPDATE_FINANCE,
    PERMISSIONS.DELETE_FINANCE,
    PERMISSIONS.AUDIT_FINANCE,
    PERMISSIONS.VIEW_CONTRIBUTIONS,
    PERMISSIONS.MANAGE_CONTRIBUTIONS,
    PERMISSIONS.VIEW_ANNOUNCEMENTS,
    PERMISSIONS.VIEW_STATISTICS,
    PERMISSIONS.VIEW_FINANCE_REPORTS,
    PERMISSIONS.EXPORT_DATA,
  ],

  // === CHỦ HỘ ===
  [ROLES.CHU_HO]: [
    PERMISSIONS.VIEW_OWN_INFO,
    PERMISSIONS.VIEW_HOUSEHOLD_INFO,
    PERMISSIONS.UPDATE_HOUSEHOLD,
    PERMISSIONS.MANAGE_HOUSEHOLD_MEMBERS,
    PERMISSIONS.VIEW_HOUSEHOLD_FINANCES,
    PERMISSIONS.VIEW_CONTRIBUTIONS,
    PERMISSIONS.PAY_CONTRIBUTION,
    PERMISSIONS.VIEW_ANNOUNCEMENTS,
  ],

  // === CƯ DÂN ===
  [ROLES.CU_DAN]: [
    PERMISSIONS.VIEW_OWN_INFO,
    PERMISSIONS.VIEW_HOUSEHOLD_INFO,
    PERMISSIONS.VIEW_CONTRIBUTIONS,
    PERMISSIONS.VIEW_ANNOUNCEMENTS,
  ],
}

// =====================
//  HÀM KIỂM TRA QUYỀN
// =====================

export const hasPermission = (userRole, permission) => {
  if (!userRole) return false
  const allowed = ROLE_PERMISSIONS[userRole] || []
  return allowed.includes(permission)
}

export const hasAnyPermission = (userRole, permissions) =>
  permissions.some((p) => hasPermission(userRole, p))

export const hasAllPermissions = (userRole, permissions) =>
  permissions.every((p) => hasPermission(userRole, p))
