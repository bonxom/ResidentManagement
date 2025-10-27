import User from "../models/User.js";
import Role from "../models/Role.js"; // Giả sử bạn có model Role

// @desc    Tạo một User mới (Đăng ký)
// @route   POST /users
// @access  Public (hoặc Private tùy bạn)
export const createUser = async (req, res) => {
  try {
    // 1. Chỉ lấy các trường an toàn từ body. Bỏ qua 'roleName'.
    const { email, password, ten, gioiTinh, ngaySinh, noiO, soDienThoai } =
      req.body;

    // 2. Kiểm tra xem email đã tồn tại chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // 3. TÌM VAI TRÒ MẶC ĐỊNH (ví dụ: "Cư dân")
    // Đảm bảo bạn đã có vai trò "Cư dân" trong database
    const defaultRole = await Role.findOne({ role_name: /^CƯ DÂN$/i }); 
    if (!defaultRole) {
      // Đây là lỗi nghiêm trọng của hệ thống
      return res.status(500).json({ message: "Lỗi: Không tìm thấy vai trò mặc định." });
    }

    // 4. Tạo user mới
    const user = await User.create({
      email,
      password,
      ten,
      gioiTinh,
      ngaySinh,
      noiO,
      soDienThoai,
      role: defaultRole._id, // <--- GÁN CỨNG VAI TRÒ MẶC ĐỊNH
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        ten: user.ten,
        role: defaultRole.name,
      });
    } else {
      res.status(400).json({ message: "Dữ liệu người dùng không hợp lệ" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy tất cả User
// @route   GET /users
// @access  Private (Chỉ Tổ trưởng/Admin)
export const getAllUsers = async (req, res) => {
  try {
    // .populate('role') sẽ lấy thông tin chi tiết của Role thay vì chỉ ID
    const users = await User.find({}).populate("role", "name description"); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy một User bằng ID
// @route   GET /users/:id
// @access  Private
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cập nhật User
// @route   PUT /users/:id
// @access  Private
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.ten = req.body.ten || user.ten;
      user.gioiTinh = req.body.gioiTinh || user.gioiTinh;
      user.ngaySinh = req.body.ngaySinh || user.ngaySinh;
      user.noiO = req.body.noiO || user.noiO;
      user.soDienThoai = req.body.soDienThoai || user.soDienThoai;

      // Xử lý cập nhật Role nếu có
      if (req.body.roleName) {
        const newRole = await Role.findOne({ name: req.body.roleName });
        if (newRole) {
          user.role = newRole._id;
        } else {
           return res.status(400).json({ message: "Vai trò cập nhật không hợp lệ" });
        }
      }
      
      // Lưu ý: Nếu bạn cho phép cập nhật mật khẩu ở đây,
      // bạn cần xử lý hash riêng vì 'findByIdAndUpdate' không kích hoạt 'pre-save'

      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Xóa User
// @route   DELETE /users/:id
// @access  Private (Chỉ Tổ trưởng/Admin)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne(); // Hoặc user.remove() tùy phiên bản
      res.status(200).json({ message: "Người dùng đã được xóa" });
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};