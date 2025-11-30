import mongoose from "mongoose";
import User from "../models/User.js";
import Role from "../models/Role.js"; // Giả sử bạn có model Role
import Household from "../models/Household.js";
import { AppError } from "../middleware/AppError.js";
import { ERROR_CODE } from "../middleware/errorCode.js";

// @desc    Tạo một User mới (Đăng ký)
// @route   POST /users
// @access  Public (hoặc Private tùy bạn)
export const createUser = async (req, res) => {
  try {
    // Chỉ lấy các trường an toàn từ body. Bỏ qua 'roleName'.
    const { email, password, name, sex, dob, location, phoneNumber, userCardID } =
      req.body;

    if (!userCardID) {
      throw new AppError(ERROR_CODE.USER_USERCARDID_REQUIRED);
    }

    // Kiểm tra xem email đã tồn tại chưa
    const userExists = await User.findByEmail(email);
    if (userExists) {
      throw new AppError(ERROR_CODE.USER_EMAIL_EXISTED);
    }

    const userCardExists = await User.findByUserCardID(userCardID);
    if (userCardExists) {
      throw new AppError(ERROR_CODE.USER_USERCARDID_EXISTED);
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
      userCardID,
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
        userCardID: user.userCardID,
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
    const users = await User.find({})
      .populate("role", "role_name description")
      .populate("household", "houseHoldID address"); 
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
    const user = await User.findById(req.params.id)
      .populate("role")
      .populate("household");

    if (user) {
      res.status(200).json(user);
    } else {
      throw new AppError(ERROR_CODE.USER_NOT_EXISTED);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cập nhật User (ko cập nhật role ở đây)
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
      // if (req.body.roleName) {
      //   const newRole = await Role.findByName(req.body.roleName);
      //   if (newRole) {
      //     user.role = newRole._id;
      //   } else {
      //      return res.status(400).json({ message: "Vai trò cập nhật không hợp lệ" });
      //   }
      // }
      
      // Lưu ý: Nếu bạn cho phép cập nhật mật khẩu ở đây,
      // bạn cần xử lý hash riêng vì 'findByIdAndUpdate' không kích hoạt 'pre-save'

      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } else {
      throw new AppError(ERROR_CODE.USER_NOT_EXISTED);
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
  if (!mongoose.Types.ObjectId.isValid(id)) throw new AppError(ERROR_CODE.USER_ID_INVALID);

  if (req.user?._id?.toString() === id) {
    throw new AppError(ERROR_CODE.USER_CANNOT_DELETE_SELF);
  }

  const user = await User.findByIdAndDelete(id);
  if (!user) throw new AppError(ERROR_CODE.USER_NOT_EXISTED);

  return res.status(200).json({
    message: "Deleted user"
  })
};

// @desc    Thay đổi mật khẩu User
// @route   PATCH /users/:id/password
// @access  Private (User/Admin)
export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw new AppError(ERROR_CODE.USER_OLD_NEW_PASSWORD_REQUIRED);
    }

    const user = await User.findById(id).select("+password +userCardID");
    if (!user) {
      throw new AppError(ERROR_CODE.USER_NOT_EXISTED);
    }
    
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      throw new AppError(ERROR_CODE.USER_WRONG_PASSWORD);
    }

    user.password = newPassword;
    await user.save( { validateModifiedOnly: true });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy hộ của user hiện tại
// @route   GET /users/me/household
// @access  Private
export const getMyHousehold = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const user = await User.findById(userId).populate("household");
    if (!user) {
      throw new AppError(ERROR_CODE.USER_NOT_EXISTED);
    }

    if (!user.household) {
      throw new AppError(ERROR_CODE.USER_NO_HOUSEHOLD);
    }

    const household = await Household.findById(user.household)
      .populate("leader", "name email userCardID")
      .populate("members", "name email userCardID");

    res.status(200).json(household);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};