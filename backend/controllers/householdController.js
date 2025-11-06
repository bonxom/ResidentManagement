import Household from "../models/Household.js";
import User from "../models/User.js";

// @desc    Tạo hộ khẩu mới
// @route   POST /households
// @access  Private (Tổ trưởng)
export const createHousehold = async (req, res) => {
  const { maHoKhau, diaChiHo, chuHoId } = req.body;

  try {
    // 1. Kiểm tra đầu vào
    if (!maHoKhau || !diaChiHo || !chuHoId) { // note: chuhoid?
      return res.status(400).json({ message: "Vui lòng cung cấp đủ thông tin" });
    }

    // 2. Kiểm tra mã hộ khẩu đã tồn tại chưa
    if (await Household.findOne({ maHoKhau })) {
      return res.status(400).json({ message: "Mã hộ khẩu đã tồn tại" });
    }

    // 3. Kiểm tra xem chuHoId có phải là User hợp lệ không
    const chuHo = await User.findById(chuHoId);
    if (!chuHo) {
      return res.status(404).json({ message: "Không tìm thấy người dùng (chủ hộ)" });
    }

    // 4. Tạo hộ khẩu mới
    // (Middleware trong Model sẽ tự động thêm chủ hộ vào danh sách thành viên)
    const household = await Household.create({
      maHoKhau,
      diaChiHo,
      chuHo: chuHoId,
      thanhVien: [chuHoId], // Khởi tạo với chủ hộ là thành viên đầu tiên
    });

    res.status(201).json(household);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy tất cả hộ khẩu
// @route   GET /households
// @access  Private (Tổ trưởng)
export const getAllHouseholds = async (req, res) => {
  try {
    const households = await Household.find({})
      .populate("chuHo", "ten email") // Lấy thông tin 'ten' và 'email' của chủ hộ
      .populate("thanhVien", "ten email"); // Lấy thông tin 'ten' và 'email' của thành viên

    res.status(200).json(households);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy 1 hộ khẩu bằng ID
// @route   GET /households/:id
// @access  Private (Mọi người)
export const getHouseholdById = async (req, res) => {
  try {
    const household = await Household.findById(req.params.id)
      .populate("chuHo", "ten email")
      .populate("thanhVien", "ten email");

    if (!household) {
      return res.status(404).json({ message: "Không tìm thấy hộ khẩu" });
    }
    res.status(200).json(household);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cập nhật hộ khẩu (địa chỉ, chủ hộ)
// @route   PUT /households/:id
// @access  Private (Tổ trưởng)
export const updateHousehold = async (req, res) => {
  const { maHoKhau, diaChiHo, chuHoId } = req.body;
  try {
    const household = await Household.findById(req.params.id);
    if (!household) {
      return res.status(404).json({ message: "Không tìm thấy hộ khẩu" });
    }

    if (maHoKhau) household.maHoKhau = maHoKhau;
    if (diaChiHo) household.diaChiHo = diaChiHo;

    // Nếu thay đổi chủ hộ, phải kiểm tra
    if (chuHoId) {
      const newChuHo = await User.findById(chuHoId);
      if (!newChuHo) {
        return res.status(404).json({ message: "Không tìm thấy chủ hộ mới" });
      }
      household.chuHo = chuHoId;
      // (Middleware trong Model sẽ tự động thêm chủ hộ mới vào danh sách thành viên)
    }

    const updatedHousehold = await household.save();
    res.status(200).json(updatedHousehold);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Xóa hộ khẩu
// @route   DELETE /households/:id
// @access  Private (Tổ trưởng)
export const deleteHousehold = async (req, res) => {
  try {
    const household = await Household.findById(req.params.id);
    if (!household) {
      return res.status(404).json({ message: "Không tìm thấy hộ khẩu" });
    }
    await household.deleteOne();
    res.status(200).json({ message: "Đã xóa hộ khẩu" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy thành viên của hộ
// @route   GET /households/:id/members
// @access  Private
export const getMembers = async (req, res) => {
  try {
    const household = await Household.findById(req.params.id).populate(
      "thanhVien",
      "ten email"
    );
    if (!household) {
      return res.status(404).json({ message: "Không tìm thấy hộ khẩu" });
    }
    res.status(200).json(household.thanhVien);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Thêm thành viên vào hộ
// @route   POST /households/:id/members
// @access  Private (Tổ trưởng)
export const addMember = async (req, res) => {
  const { userId } = req.body; // ID của User cần thêm
  const householdId = req.params.id;

  try {
    const household = await Household.findById(householdId);
    if (!household) {
      return res.status(404).json({ message: "Không tìm thấy hộ khẩu" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    // Kiểm tra xem đã là thành viên chưa
    if (household.thanhVien.includes(userId)) {
      return res.status(400).json({ message: "Người dùng đã là thành viên" });
    }

    household.thanhVien.push(userId);
    await household.save();
    res.status(200).json(household);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Xóa thành viên khỏi hộ
// @route   DELETE /households/:householdId/members/:memberId
// @access  Private (Tổ trưởng)
export const removeMember = async (req, res) => {
  const { householdId, memberId } = req.params;

  try {
    const household = await Household.findById(householdId);
    if (!household) {
      return res.status(404).json({ message: "Không tìm thấy hộ khẩu" });
    }

    // === CẢNH BÁO AN TOÀN ===
    // Không cho phép xóa Chủ hộ. Phải đổi chủ hộ trước.
    if (household.chuHo.toString() === memberId) {
      return res
        .status(400)
        .json({ message: "Không thể xóa chủ hộ. Vui lòng đổi chủ hộ trước." });
    }

    // Lọc (pull) thành viên ra khỏi mảng
    household.thanhVien.pull(memberId);
    await household.save();
    res.status(200).json(household);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
