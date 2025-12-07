import Permission from "../models/Permission.js";
import Role from "../models/Role.js";
import User from "../models/User.js";

const INIT_PERMISSIONS = {
  // --- USER MANAGEMENT ---
  "CREATE USER": "Create a user account",
  "DELETE USER": "Delete a user account",
  "EDIT USER": "Update user information (Admin force update)",
  "VIEW USER LIST": "See the list of users",
  "VIEW USER": "See a user's profile",
  "DEACTIVATE USER": "Disable an account without deleting",
  "VERIFY USER": "Verify user information",
  "RESET USER PASSWORD": "Reset a user's password",
  "ASSIGN ROLES": "Assign roles to a user",
  "CREATE ACCOUNT": "Create a accountant acc or user acc",
  "MANAGE USER PERMISSIONS": "Grant/revoke permissions for a specific user",

  // --- PERMISSION MANAGEMENT ---
  "VIEW PERMISSIONS": "See all permissions",
  "CREATE PERMISSION": "Create a permission",
  "EDIT PERMISSION": "Edit permission details",
  "DELETE PERMISSION": "Delete a permission",

  // --- ROLE MANAGEMENT ---
  "VIEW ROLES": "See all roles",
  "CREATE ROLE": "Create a role",
  "EDIT ROLE": "Edit role details",
  "DELETE ROLE": "Delete a role",

  // --- HOUSEHOLD MANAGEMENT ---
  "CHANGE HOUSEHOLD LEADER": "Change household leader",
  "VIEW HOUSEHOLD LIST": "See households",
  "VIEW HOUSEHOLD": "See household details",
  "CREATE HOUSEHOLD": "Create a household",
  "EDIT HOUSEHOLD": "Edit household info, Split, Move members", // Đã bao gồm quyền Tách/Chuyển hộ
  "DELETE HOUSEHOLD": "Delete a household",

  // --- FEE & CONTRIBUTION ---
  "VIEW FEES": "See all fees/contributions",
  "CREATE FEE": "Create a fee or contribution",
  "EDIT FEE": "Edit fee information",
  "DELETE FEE": "Delete a fee",
  "CALCULATE FEE": "Calculate household fee payable",
  "RECORD PAYMENT": "Record fee payment transaction",
  "VIEW FEE STATS": "View fee collection statistics",

  // --- REQUEST & APPROVAL SYSTEM (MỚI) ---
  "READ REQUESTS LIST": "View list of registration/update requests",
  "REJECT REQUEST": "Reject a request",
  "APPROVE REQUEST": "Approve a request (Register, Update Info)",
};

const INIT_ROLES = {
  "HAMLET LEADER": [
    // User
    "CREATE USER", "DELETE USER", "EDIT USER", "VIEW USER LIST", "VIEW USER",
    "DEACTIVATE USER", "VERIFY USER", "RESET USER PASSWORD", "ASSIGN ROLES",
    "CREATE ACCOUNT", "MANAGE USER PERMISSIONS",
    // Permission
    "VIEW PERMISSIONS", "CREATE PERMISSION", "EDIT PERMISSION", "DELETE PERMISSION",
    // Role
    "VIEW ROLES", "CREATE ROLE", "EDIT ROLE", "DELETE ROLE",
    // Household
    "CHANGE HOUSEHOLD LEADER", "VIEW HOUSEHOLD LIST", "VIEW HOUSEHOLD",
    "CREATE HOUSEHOLD", "EDIT HOUSEHOLD", "DELETE HOUSEHOLD",
    // Fee
    "VIEW FEES", "CREATE FEE", "EDIT FEE", "DELETE FEE",
    "CALCULATE FEE", "RECORD PAYMENT", "VIEW FEE STATS",
    // Request (QUAN TRỌNG: Để duyệt đơn đăng ký/sửa đổi)
    "READ REQUESTS LIST", "REJECT REQUEST", "APPROVE REQUEST",
  ],

  "ACCOUNTANT": [
    "VIEW USER LIST", "VIEW USER",
    "VIEW PERMISSIONS", "VIEW ROLES",
    "VIEW HOUSEHOLD LIST", "VIEW HOUSEHOLD",
    // Fee focus
    "VIEW FEES", "CALCULATE FEE", "RECORD PAYMENT", "VIEW FEE STATS",
  ],

  // Cư dân đã có hộ khẩu
  "HOUSE MEMBER": [
    "VIEW USER", // Xem profile bản thân
    "VIEW HOUSEHOLD", // Xem hộ khẩu của mình
  ],

  // Cư dân vãng lai / Mới đăng ký (Chưa vào hộ)
  "MEMBER": [
    "VIEW USER", // Chỉ xem được profile bản thân
  ],
};

const seedUser = {
  "ACCOUNTANT": [
    {
      email: "accountant@resident.test",
      userCardID: 689123456002,
      password: "123456",
      name: "Trần Quốc Huy",
      sex: "Nam",
      dob: new Date("1990-11-02T00:00:00.000Z"),
      location: "Tổ 3, Khu phố 1, Phường An Phú, TP. Thuận An",
      phoneNumber: "0987654321",
    },
    {
      email: "accountant2@resident.test",
      userCardID: 689123456102,
      password: "123456",
      name: "Nguyễn Thị Mai",
      sex: "Nữ",
      dob: new Date("1992-04-15T00:00:00.000Z"),
      location: "Tổ 4, Khu phố 2, Phường Hiệp Thành, TP. Thủ Dầu Một",
      phoneNumber: "0912003344",
    },
    {
      email: "accountant3@resident.test",
      userCardID: 689123456103,
      password: "123456",
      name: "Phạm Văn Dũng",
      sex: "Nam",
      dob: new Date("1987-12-03T00:00:00.000Z"),
      location: "Tổ 6, Khu phố 5, Phường Bình Chuẩn, TP. Thuận An",
      phoneNumber: "0938456123",
    },
  ],
  "HOUSE MEMBER": [
    {
      email: "member@resident.test",
      userCardID: 689123456004,
      password: "123456",
      name: "Đặng Hoài Nam",
      sex: "Nam",
      dob: new Date("2002-09-09T00:00:00.000Z"),
      location: "Tổ 2, Khu phố 4, Phường Chánh Nghĩa, TP. Thủ Dầu Một",
      phoneNumber: "0966332211",
    },
    {
      email: "member2@resident.test",
      userCardID: 689123456104,
      password: "123456",
      name: "Lê Thị Hồng",
      sex: "Nữ",
      dob: new Date("1998-07-21T00:00:00.000Z"),
      location: "Tổ 1, Khu phố 2, Phường Phú Lợi, TP. Thủ Dầu Một",
      phoneNumber: "0905123456",
    },
    {
      email: "member3@resident.test",
      userCardID: 689123456105,
      password: "123456",
      name: "Ngô Minh Trí",
      sex: "Nam",
      dob: new Date("1996-01-30T00:00:00.000Z"),
      location: "Tổ 3, Khu phố 3, Phường Tân Đông Hiệp, TP. Dĩ An",
      phoneNumber: "0977889900",
    },
    {
      email: "member4@resident.test",
      userCardID: 689123456106,
      password: "123456",
      name: "Vũ Thị Lan",
      sex: "Nữ",
      dob: new Date("2001-03-12T00:00:00.000Z"),
      location: "Tổ 5, Khu phố 6, Phường An Phú, TP. Thuận An",
      phoneNumber: "0923344556",
    },
    {
      email: "member5@resident.test",
      userCardID: 689123456107,
      password: "123456",
      name: "Bùi Quốc Khánh",
      sex: "Nam",
      dob: new Date("1994-10-05T00:00:00.000Z"),
      location: "Tổ 7, Khu phố 1, Phường Tân Bình, TP. Dĩ An",
      phoneNumber: "0911778899",
    },
    {
      email: "member6@resident.test",
      userCardID: 689123456108,
      password: "123456",
      name: "Trần Mai Anh",
      sex: "Nữ",
      dob: new Date("1999-05-18T00:00:00.000Z"),
      location: "Tổ 2, Khu phố 7, Phường Bình An, TP. Dĩ An",
      phoneNumber: "0988001122",
    },
    {
      email: "member7@resident.test",
      userCardID: 689123456109,
      password: "123456",
      name: "Đỗ Hữu Nghĩa",
      sex: "Nam",
      dob: new Date("1993-02-22T00:00:00.000Z"),
      location: "Tổ 8, Khu phố 2, Phường Phú Cường, TP. Thủ Dầu Một",
      phoneNumber: "0955667788",
    },
    {
      email: "member8@resident.test",
      userCardID: 689123456110,
      password: "123456",
      name: "Phan Thu Hà",
      sex: "Nữ",
      dob: new Date("1997-09-09T00:00:00.000Z"),
      location: "Tổ 9, Khu phố 4, Phường Phú Hòa, TP. Thủ Dầu Một",
      phoneNumber: "0933002211",
    },
  ],
};

const initSeedUsers = async () => {
  for (const [roleName, users] of Object.entries(seedUser)) {
    const role = await Role.findByName(roleName);
    if (!role) {
      console.warn(`[seed] Missing role "${roleName}". Skipping user seeds for this role.`);
      continue;
    }

    for (const u of users) {
      const exists = await User.findByEmail(u.email);
      if (exists) {
        continue;
      }

      await User.create({
        ...u,
        role: role._id,
      });

      console.log(`INIT_user: ${u.email} (${roleName})`);
    }
  }
};

const initPermissions = async () => {
  for (const [per, des] of Object.entries(INIT_PERMISSIONS)) {
    const existPer = await Permission.findByName(per);
    if (existPer) continue;

    await Permission.create({
      permission_name: per,
      description: des,
    });

    console.log("INIT_per: ", per);
  }
};

const initRoles = async () => {
  for (const [role, permissions] of Object.entries(INIT_ROLES)) {
    const existRole = await Role.findByName(role);
    if (existRole) {
      // Logic cập nhật: Nếu Role đã tồn tại, update lại permissions cho chắc chắn (tránh trường hợp thêm quyền mới mà DB cũ không có)
      const perList = await Permission.findByListOfName(permissions);
      existRole.permissions = perList;
      await existRole.save();
      console.log("UPDATE_role_permissions: ", role);
      continue;
    }

    const perList = await Permission.findByListOfName(permissions);
    await Role.create({
      role_name: role,
      permissions: perList,
    });

    console.log("INIT_role: ", role);
  }
};

const initAdmin = async () => {
  const existAdmin = await User.findByEmail("admin@res.com");
  if (!existAdmin) {
    console.log("INIT admin");
    const hamletRole = await Role.findByName("HAMLET LEADER");
    if (!hamletRole) {
      console.warn('[seed] Missing role "HAMLET LEADER". Seed roles before initAdmin().');
      return;
    }

    await User.create({
      email: "admin@res.com",
      userCardID: "000000000001", // Chuyển sang string cho đồng bộ model nếu cần
      password: "123456",
      name: "Administrator",
      role: hamletRole._id,
      status: "VERIFIED", // Admin mặc định phải Verified
    });

    console.log(
      "INIT_ADMIN: Create admin account\n" +
      "email: admin@res.com\npassword: 123456\n" +
      "Please change admin's password to secure your system"
    );
  }
};

export const defaultInit = async () => {
  try {
    await initPermissions();
    await initRoles();
    await initSeedUsers();
    await initAdmin();
  } catch (error) {
    console.error("Initialization Error:", error);
  }
};