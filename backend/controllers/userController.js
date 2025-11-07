import mongoose from "mongoose";
import User from "../models/User.js";
import Role from "../models/Role.js"; // Giả sử bạn có model Role

// @desc    Tạo một User mới (Đăng ký)
// @route   POST /users
// @access  Public (hoặc Private tùy bạn)
export const createUser = async (req, res) => {
  try {
    // Chỉ lấy các trường an toàn từ body. Bỏ qua 'roleName'.
    const { email, password, name, sex, dob, location, phoneNumber } =
      req.body;

    // Kiểm tra xem email đã tồn tại chưa
    const userExists = await User.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Đảm bảo bạn đã có vai trò "Cư dân" trong database
    const defaultRole = await Role.findByName("HOUSE MEMBER"); 
    if (!defaultRole) {
      // Đây là lỗi nghiêm trọng của hệ thống
      return res.status(500).json({ message: "Lỗi: Không tìm thấy vai trò mặc định." });
    }

    // Tạo user mới
    const user = await User.create({
      email,
      password,
      name,
      sex,
      dob,
      location,
      phoneNumber,
      role: defaultRole._id, // <--- GÁN CỨNG VAI TRÒ MẶC ĐỊNH
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        name: user.name,
        role: defaultRole.role_name,
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
    const users = await User.find({}).populate("role", "role_name description"); 
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
      user.name = req.body.name || user.name;
      user.sex = req.body.sex || user.sex;
      user.dob = req.body.dob || user.dob;
      user.location = req.body.location || user.location;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

      // Xử lý cập nhật Role nếu có
      if (req.body.roleName) {
        const newRole = await Role.findByName(req.body.roleName);
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
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid user ID" });

  if (req.user?._id?.toString() === id) {
    return res.status(400).json({ message: "You cannot delete your own account" });
  }

  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  return res.status(200).json({
    message: "Deleted user"
  })
};
