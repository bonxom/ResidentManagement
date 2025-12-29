import Permission from "../models/Permission.js";
import Role from "../models/Role.js";
import User from "../models/User.js";
import Household from "../models/Household.js";
import Fee from "../models/Fee.js";
import Transaction from "../models/Transaction.js";
import Request from "../models/Request.js";
import ResidentHistory from "../models/ResidentHistory.js";

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
  "VIEW BASIC STATS": "View basic dashboard statistics",

  // --- REQUEST & APPROVAL SYSTEM (MỚI) ---
  "READ REQUESTS LIST": "View list of registration/update requests",
  "REJECT REQUEST": "Reject a request",
  "APPROVE REQUEST": "Approve a request (Register, Update Info)",
};

const HOUSE_MEMBER_PERMISSIONS = ["VIEW USER", "VIEW HOUSEHOLD", "VIEW BASIC STATS"];

const INIT_ROLES = {
  "HAMLET LEADER": [
    // User
    "CREATE USER",
    "DELETE USER",
    "EDIT USER",
    "VIEW USER LIST",
    "VIEW USER",
    "DEACTIVATE USER",
    "VERIFY USER",
    "RESET USER PASSWORD",
    "ASSIGN ROLES",
    "CREATE ACCOUNT",
    "MANAGE USER PERMISSIONS",
    // Permission
    "VIEW PERMISSIONS",
    "CREATE PERMISSION",
    "EDIT PERMISSION",
    "DELETE PERMISSION",
    // Role
    "VIEW ROLES",
    "CREATE ROLE",
    "EDIT ROLE",
    "DELETE ROLE",
    // Household
    "CHANGE HOUSEHOLD LEADER",
    "VIEW HOUSEHOLD LIST",
    "VIEW HOUSEHOLD",
    "CREATE HOUSEHOLD",
    "EDIT HOUSEHOLD",
    "DELETE HOUSEHOLD",
    // Fee
    "VIEW FEES",
    "CREATE FEE",
    "EDIT FEE",
    "DELETE FEE",
    "CALCULATE FEE",
    "RECORD PAYMENT",
    "VIEW FEE STATS",
    // Request (QUAN TRỌNG: Để duyệt đơn đăng ký/sửa đổi)
    "READ REQUESTS LIST",
    "REJECT REQUEST",
    "APPROVE REQUEST",
  ],

  ACCOUNTANT: [
    "VIEW USER LIST",
    "VIEW USER",
    "VIEW PERMISSIONS",
    "VIEW ROLES",
    "VIEW HOUSEHOLD LIST",
    "VIEW HOUSEHOLD",
    // Fee focus
    "VIEW FEES",
    "CALCULATE FEE",
    "RECORD PAYMENT",
    "VIEW FEE STATS",
    "READ REQUESTS LIST",
    "APPROVE REQUEST",
  ],

  // Cư dân đã có hộ khẩu
  "HOUSE MEMBER": HOUSE_MEMBER_PERMISSIONS,

  // Cư dân vãng lai / Mới đăng ký (Chưa vào hộ)
  MEMBER: [
    "VIEW USER", // Chỉ xem được profile bản thân
    "VIEW BASIC STATS", // Xem thống kê cơ bản
  ],
};

const SEED_USERS_DATA = {
  "HAMLET LEADER": [
    {
      email: "leader@resident.test",
      userCardID: 689123456010,
      password: "123456",
      name: "Lãnh đạo thôn",
      sex: "Nam",
      dob: new Date("1985-06-12T00:00:00.000Z"),
      birthLocation: "Tổ 1, Phường Seed, TP. Test",
      phoneNumber: "0909123456",
      status: "VERIFIED",
    },
  ],
  ACCOUNTANT: [
    {
      email: "accountant@resident.test",
      userCardID: 689123456002,
      password: "123456",
      name: "Trần Quốc Huy",
      sex: "Nam",
      dob: new Date("1990-11-02T00:00:00.000Z"),
      birthLocation: "Tổ 3, Khu phố 1, Phường An Phú, TP. Thuận An",
      phoneNumber: "0987654321",
    },
    {
      email: "accountant2@resident.test",
      userCardID: 689123456102,
      password: "123456",
      name: "Nguyễn Thị Mai",
      sex: "Nữ",
      dob: new Date("1992-04-15T00:00:00.000Z"),
      birthLocation: "Tổ 4, Khu phố 2, Phường Hiệp Thành, TP. Thủ Dầu Một",
      phoneNumber: "0912003344",
    },
    {
      email: "accountant3@resident.test",
      userCardID: 689123456103,
      password: "123456",
      name: "Phạm Văn Dũng",
      sex: "Nam",
      dob: new Date("1987-12-03T00:00:00.000Z"),
      birthLocation: "Tổ 6, Khu phố 5, Phường Bình Chuẩn, TP. Thuận An",
      phoneNumber: "0938456123",
    },
  ],
  "HOUSE MEMBER": [
    {
      email: "household.leader1@resident.test",
      userCardID: 689123456201,
      password: "123456",
      name: "Nguyễn Văn Chủ",
      sex: "Nam",
      dob: new Date("1980-01-10T00:00:00.000Z"),
      birthLocation: "Tổ 1, Phường Seed, TP. Test",
      phoneNumber: "0901000001",
      status: "VERIFIED",
    },
    {
      email: "household.member1@resident.test",
      userCardID: 689123456202,
      password: "123456",
      name: "Lê Thị Thành Viên",
      sex: "Nữ",
      dob: new Date("1985-04-12T00:00:00.000Z"),
      birthLocation: "Tổ 1, Phường Seed, TP. Test",
      phoneNumber: "0901000002",
      status: "VERIFIED",
    },
    {
      email: "household.member2@resident.test",
      userCardID: 689123456203,
      password: "123456",
      name: "Nguyễn Văn Thành Viên",
      sex: "Nam",
      dob: new Date("2005-09-15T00:00:00.000Z"),
      birthLocation: "Tổ 1, Phường Seed, TP. Test",
      phoneNumber: "0901000003",
      status: "VERIFIED",
    },
    {
      email: "household.leader2@resident.test",
      userCardID: 689123456204,
      password: "123456",
      name: "Trần Thị Chủ",
      sex: "Nữ",
      dob: new Date("1978-03-20T00:00:00.000Z"),
      birthLocation: "Tổ 2, Phường Seed, TP. Test",
      phoneNumber: "0901000004",
      status: "VERIFIED",
    },
    {
      email: "household.member3@resident.test",
      userCardID: 689123456205,
      password: "123456",
      name: "Phạm Văn Thành Viên",
      sex: "Nam",
      dob: new Date("1999-12-01T00:00:00.000Z"),
      birthLocation: "Tổ 2, Phường Seed, TP. Test",
      phoneNumber: "0901000005",
      status: "VERIFIED",
    },
  ],
  MEMBER: [
    {
      email: "member@resident.test",
      userCardID: 689123456004,
      password: "123456",
      name: "Đặng Hoài Nam",
      sex: "Nam",
      dob: new Date("2002-09-09T00:00:00.000Z"),
      birthLocation: "Tổ 2, Khu phố 4, Phường Chánh Nghĩa, TP. Thủ Dầu Một",
      phoneNumber: "0966332211",
      status: "VERIFIED",
    },
    {
      email: "member2@resident.test",
      userCardID: 689123456104,
      password: "123456",
      name: "Lê Thị Hồng",
      sex: "Nữ",
      dob: new Date("1998-07-21T00:00:00.000Z"),
      birthLocation: "Tổ 1, Khu phố 2, Phường Phú Lợi, TP. Thủ Dầu Một",
      phoneNumber: "0905123456",
      status: "VERIFIED",
    },
  ],
};

const SEED_HOUSEHOLDS = [
  {
    houseHoldID: "SEED-HH-001",
    address: "Tổ 1, Phường Seed, TP. Test",
    leaderEmail: "household.leader1@resident.test",
    members: [
      { email: "household.member1@resident.test", relationship: "Vợ" },
      { email: "household.member2@resident.test", relationship: "Con" },
    ],
  },
  {
    houseHoldID: "SEED-HH-002",
    address: "Tổ 2, Phường Seed, TP. Test",
    leaderEmail: "household.leader2@resident.test",
    members: [{ email: "household.member3@resident.test", relationship: "Em" }],
  },
];

const SEED_FEES = [
  {
    name: "Phí vệ sinh 2024",
    type: "MANDATORY",
    description: "Thu theo đầu người trong năm 2024",
    unitPrice: 6000,
    status: "ACTIVE",
  },
  {
    name: "Phí an ninh 2024",
    type: "MANDATORY",
    description: "Khoản thu an ninh khu phố năm 2024",
    unitPrice: 5000,
    status: "ACTIVE",
  },
  {
    name: "Quỹ thiện nguyện 2024",
    type: "VOLUNTARY",
    description: "Ủng hộ quỹ thiện nguyện của khu phố",
    status: "ACTIVE",
  },
  {
    name: "Ủng hộ thiên tai 2024",
    type: "VOLUNTARY",
    description: "Đóng góp hỗ trợ thiên tai năm 2024",
    status: "ACTIVE",
  },
  {
    name: "Phí bảo trì 2023",
    type: "MANDATORY",
    description: "Khoản thu đã chốt sổ năm 2023",
    unitPrice: 8000,
    status: "COMPLETED",
  },
];

const initSeedUsers = async () => {
  for (const [roleName, users] of Object.entries(SEED_USERS_DATA)) {
    const role = await Role.findByName(roleName);
    if (!role) {
      console.warn(
        `[seed] Missing role "${roleName}". Skipping user seeds for this role.`
      );
      continue;
    }

    for (const u of users) {
      const exists = await User.findByEmail(u.email);
      if (exists) {
        const updates = {};
        if (exists.role?.toString() !== role._id.toString()) {
          updates.role = role._id;
        }
        if (roleName === "MEMBER") {
          updates.household = null;
          updates.relationshipWithHead = null;
        }
        if (Object.keys(updates).length > 0) {
          await User.updateOne({ _id: exists._id }, { $set: updates });
        }
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

const initSeedHouseholds = async () => {
  const householdRole = await Role.findByName("HOUSE MEMBER");
  if (!householdRole) {
    console.warn('[seed] Missing role "HOUSE MEMBER". Skip household seeds.');
    return;
  }

  for (const seed of SEED_HOUSEHOLDS) {
    const leader = await User.findByEmail(seed.leaderEmail);
    if (!leader) {
      console.warn(`[seed] Missing leader ${seed.leaderEmail} for ${seed.houseHoldID}`);
      continue;
    }

    const memberEmails = seed.members.map((m) => m.email);
    const members = await User.find({ email: { $in: memberEmails } });
    const memberMap = new Map(members.map((m) => [m.email, m]));
    const memberIds = members.map((m) => m._id);

    let household = await Household.findOne({ houseHoldID: seed.houseHoldID });
    if (!household) {
      household = await Household.create({
        houseHoldID: seed.houseHoldID,
        address: seed.address,
        leader: leader._id,
        members: [leader._id, ...memberIds],
      });
      console.log(`INIT_household: ${seed.houseHoldID}`);
    } else {
      let needsSave = false;
      if (seed.address && household.address !== seed.address) {
        household.address = seed.address;
        needsSave = true;
      }
      if (household.leader?.toString() !== leader._id.toString()) {
        household.leader = leader._id;
        needsSave = true;
      }

      const existingMemberIds = new Set(
        (household.members || []).map((id) => id.toString())
      );
      const desiredMembers = [leader._id, ...memberIds];
      desiredMembers.forEach((id) => {
        if (!existingMemberIds.has(id.toString())) {
          household.members.push(id);
          needsSave = true;
        }
      });

      if (needsSave) {
        await household.save();
      }
    }

    const allMembers = [
      { user: leader, relationship: "Chủ hộ" },
      ...seed.members
        .map((m) => ({
          user: memberMap.get(m.email),
          relationship: m.relationship || "Thành viên",
        }))
        .filter((m) => m.user),
    ];

    for (const entry of allMembers) {
      const user = entry.user;
      if (!user) continue;

      if (
        user.household &&
        user.household.toString() !== household._id.toString()
      ) {
        console.warn(
          `[seed] User ${user.email} already in another household, skip update.`
        );
        continue;
      }

      await User.updateOne(
        { _id: user._id },
        {
          $set: {
            household: household._id,
            relationshipWithHead: entry.relationship,
            role: householdRole._id,
          },
        }
      );
    }
  }
};

const initSeedFees = async () => {
  for (const feeData of SEED_FEES) {
    const exists = await Fee.findOne({ name: feeData.name });
    if (exists) continue;

    await Fee.create(feeData);
    console.log(`INIT_fee: ${feeData.name}`);
  }
};

const ensureSeedTransaction = async ({ fee, household, amount, note }) => {
  if (!fee || !household) return;
  const exists = await Transaction.findOne({ note });
  if (exists) return;

  await Transaction.create({
    fee: fee._id,
    household: household._id,
    payer: household.leader,
    amount,
    note,
  });

  console.log(`INIT_transaction: ${note}`);
};

const initSeedTransactions = async () => {
  const feeMandatory = await Fee.findOne({ name: "Phí vệ sinh 2024" });
  const feeVoluntary = await Fee.findOne({ name: "Quỹ thiện nguyện 2024" });
  const householdA = await Household.findOne({ houseHoldID: "SEED-HH-001" });
  const householdB = await Household.findOne({ houseHoldID: "SEED-HH-002" });

  if (!feeMandatory || !householdA || !householdB) return;

  const requiredA =
    feeMandatory.unitPrice * 12 * (householdA.members?.length || 0);
  const requiredB =
    feeMandatory.unitPrice * 12 * (householdB.members?.length || 0);

  await ensureSeedTransaction({
    fee: feeMandatory,
    household: householdA,
    amount: Math.max(1, Math.round(requiredA / 2)),
    note: "seed:tx:hh1:mandatory-partial",
  });

  await ensureSeedTransaction({
    fee: feeMandatory,
    household: householdB,
    amount: Math.max(1, requiredB),
    note: "seed:tx:hh2:mandatory-full",
  });

  if (feeVoluntary) {
    await ensureSeedTransaction({
      fee: feeVoluntary,
      household: householdA,
      amount: 200000,
      note: "seed:tx:hh1:voluntary",
    });
  }
};

const ensureSeedRequest = async ({ seedTag, ...payload }) => {
  const exists = await Request.findOne({ "requestData.seedTag": seedTag });
  if (exists) return;

  await Request.create({
    ...payload,
    requestData: {
      ...(payload.requestData || {}),
      seedTag,
    },
  });

  console.log(`INIT_request: ${seedTag}`);
};

const initSeedRequests = async () => {
  const household = await Household.findOne({ houseHoldID: "SEED-HH-001" });
  const fee = await Fee.findOne({ name: "Phí vệ sinh 2024" });
  const leader = await User.findByEmail("household.leader1@resident.test");
  const member1 = await User.findByEmail("household.member1@resident.test");
  const member2 = await User.findByEmail("household.member2@resident.test");

  if (!household || !leader || !member1 || !member2) return;

  const memberRole = await Role.findByName("MEMBER");
  if (!memberRole) {
    console.warn('[seed] Missing role "MEMBER". Skip request seeds.');
    return;
  }

  let pendingUser = await User.findByEmail("pending.member@resident.test");
  if (!pendingUser) {
    pendingUser = await User.create({
      email: "pending.member@resident.test",
      userCardID: 689123456300,
      password: "123456",
      name: "Tài khoản chờ duyệt",
      sex: "Nam",
      dob: new Date("2000-05-05T00:00:00.000Z"),
      birthLocation: "Tổ 3, Phường Seed, TP. Test",
      phoneNumber: "0902000001",
      role: memberRole._id,
      status: "PENDING",
    });
  }

  await ensureSeedRequest({
    seedTag: "seed:register",
    requester: pendingUser._id,
    type: "REGISTER",
    status: "PENDING",
    requestData: { note: "Seed register request" },
  });

  await ensureSeedRequest({
    seedTag: "seed:update-info",
    requester: member1._id,
    type: "UPDATE_INFO",
    status: "PENDING",
    requestData: {
      phoneNumber: "0909999999",
      job: "Seed job update",
      reason: "Seed update info",
    },
  });

  if (fee) {
    await ensureSeedRequest({
      seedTag: "seed:payment",
      requester: leader._id,
      type: "PAYMENT",
      status: "PENDING",
      requestData: {
        feeId: fee._id,
        householdId: household._id,
        amount: 150000,
        note: "Seed payment request",
        proofImage: "",
      },
    });
  }

  await ensureSeedRequest({
    seedTag: "seed:temporary-residence",
    requester: leader._id,
    type: "TEMPORARY_RESIDENCE",
    status: "PENDING",
    requestData: {
      householdId: household._id,
      name: "Người tạm trú seed",
      userCardID: "SEED-TRU-001",
      dob: new Date("1995-01-01T00:00:00.000Z"),
      sex: "Nữ",
      birthLocation: "Tổ 5, Phường Seed, TP. Test",
      ethnic: "Kinh",
      phoneNumber: "0902000002",
      job: "Tự do",
      permanentAddress: "Tổ 9, Phường Seed, TP. Test",
      reason: "Seed temporary residence",
      startDate: new Date("2024-01-01T00:00:00.000Z"),
      endDate: new Date("2024-12-31T00:00:00.000Z"),
      isActive: true,
    },
  });

  await ensureSeedRequest({
    seedTag: "seed:temporary-absent",
    requester: leader._id,
    type: "TEMPORARY_ABSENT",
    status: "PENDING",
    requestData: {
      householdId: household._id,
      absentUserId: member2._id,
      fromDate: new Date("2024-02-01T00:00:00.000Z"),
      toDate: new Date("2024-04-01T00:00:00.000Z"),
      reason: "Seed temporary absent",
      temporaryAddress: "TP. Test",
      isActive: true,
    },
  });

  await ensureSeedRequest({
    seedTag: "seed:birth",
    requester: leader._id,
    type: "BIRTH_REPORT",
    status: "PENDING",
    requestData: {
      householdId: household._id,
      name: "Bé seed",
      dob: new Date("2024-03-15T00:00:00.000Z"),
      sex: "Nam",
      birthLocation: "BV Seed",
      ethnic: "Kinh",
      birthCertificateNumber: "SEED-BIRTH-001",
    },
  });

  await ensureSeedRequest({
    seedTag: "seed:death",
    requester: leader._id,
    type: "DEATH_REPORT",
    status: "PENDING",
    requestData: {
      householdId: household._id,
      deceasedUserId: member1._id,
      dateOfDeath: new Date("2024-05-01T00:00:00.000Z"),
      reason: "Seed death report",
      deathCertificateUrl: "seed://death-certificate",
    },
  });
};

const initSeedResidentHistory = async () => {
  const household = await Household.findOne({ houseHoldID: "SEED-HH-001" });
  if (!household) return;

  let history = await ResidentHistory.findOne({ houseHoldId: household._id });
  if (!history) {
    history = await ResidentHistory.create({ houseHoldId: household._id });
  }

  const hasTempResident = (history.temporaryResidents || []).some(
    (r) => r.userCardID === "SEED-TRU-STATIC"
  );
  if (!hasTempResident) {
    history.temporaryResidents.push({
      name: "Người tạm trú dữ liệu",
      userCardID: "SEED-TRU-STATIC",
      dob: new Date("1990-07-07T00:00:00.000Z"),
      sex: "Nữ",
      birthLocation: "Tổ 6, Phường Seed, TP. Test",
      ethnic: "Kinh",
      phoneNumber: "0903000001",
      job: "Nhân viên",
      permanentAddress: "Tổ 6, Phường Seed, TP. Test",
      reason: "Seed resident history",
      startDate: new Date("2024-01-01T00:00:00.000Z"),
      endDate: new Date("2024-06-01T00:00:00.000Z"),
      isActive: true,
    });
  }

  const member = await User.findByEmail("household.member2@resident.test");
  if (member) {
    const hasTempAbsent = (history.temporaryAbsent || []).some(
      (r) => r.user?.toString() === member._id.toString()
    );
    if (!hasTempAbsent) {
      history.temporaryAbsent.push({
        user: member._id,
        startDate: new Date("2024-02-15T00:00:00.000Z"),
        endDate: new Date("2024-03-30T00:00:00.000Z"),
        reason: "Seed absent history",
        temporaryAddress: "TP. Test",
        isActive: true,
      });
    }
  }

  const hasBirth = (history.births || []).some(
    (b) => b.birthCertificateNumber === "SEED-BIRTH-STATIC"
  );
  if (!hasBirth) {
    history.births.push({
      name: "Bé seed lịch sử",
      sex: "Nữ",
      dob: new Date("2024-04-01T00:00:00.000Z"),
      birthLocation: "BV Seed",
      birthCertificateNumber: "SEED-BIRTH-STATIC",
      ethnic: "Kinh",
    });
  }

  await history.save();
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

const migrateHouseholdMemberRole = async () => {
  const legacyRole = await Role.findByName("HOUSEHOLD MEMBER");
  const targetRole = await Role.findByName("HOUSE MEMBER");
  if (!legacyRole || !targetRole) return;

  const result = await User.updateMany(
    { role: legacyRole._id },
    { $set: { role: targetRole._id } }
  );
  const updated = result.modifiedCount ?? result.nModified ?? 0;
  if (updated > 0) {
    console.log(
      `MIGRATE_role: ${updated} users from HOUSEHOLD MEMBER to HOUSE MEMBER`
    );
  }
};

const initAdmin = async () => {
  const existAdmin = await User.findByEmail("admin@res.com");
  if (!existAdmin) {
    console.log("INIT admin");
    const hamletRole = await Role.findByName("HAMLET LEADER");
    if (!hamletRole) {
      console.warn(
        '[seed] Missing role "HAMLET LEADER". Seed roles before initAdmin().'
      );
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
    await migrateHouseholdMemberRole();
    await initSeedUsers();
    await initSeedHouseholds();
    await initSeedFees();
    await initSeedTransactions();
    await initSeedRequests();
    await initSeedResidentHistory();
    await initAdmin();
  } catch (error) {
    console.error("Initialization Error:", error);
  }
};
