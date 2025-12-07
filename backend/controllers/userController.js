import mongoose from "mongoose";
import User from "../models/User.js";
import Role from "../models/Role.js"; // Giả sử bạn có model Role
import Household from "../models/Household.js";
import { AppError } from "../middleware/AppError.js";
import { ERROR_CODE } from "../middleware/errorCode.js";
import Request from "../models/Request.js";

// @desc    Tạo một User mới (Admin/Tổ trưởng tạo trực tiếp)
// @route   POST /api/users
export const createUser = async (req, res) => {
  try {
    const { email, password, name, sex, dob,  phoneNumber, userCardID,
      job, ethnic, birthLocation, status } = // Cho phép nhận status hoặc tự set
      req.body;

    if (!userCardID || !email || !password || !name) {
      return res.status(400).json({ message: "Missing information, please fill all" });
    }
    
    // Check trùng lặp
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email has existed" });

    const cardExists = await User.findOne({ userCardID });
    if (cardExists) return res.status(400).json({ message: "userCardID has existed" });

    const defaultRole = await Role.findByName("MEMBER"); 
    if (!defaultRole) {
      return res.status(500).json({ message: "Role: \"MEMBER\" not found" });
    }

    const user = await User.create({
      email, password, name, sex, dob,
      phoneNumber, userCardID,
      job, ethnic, birthLocation,
      role: defaultRole._id,
      household: null,
      relationshipWithHead: null,
      status: status || "VERIFIED" 
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: defaultRole.role_name,
        status: user.status // Trả về status để admin biết
      });
    } else {
      res.status(400).json({ message: "Data not valid" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    // 1. Tạo User với status mặc định là PENDING
    const { email, password, name, sex, dob, 
      phoneNumber, userCardID,
      job, ethnic, birthLocation } =
      req.body;

    if (!userCardID || !email || !password || !name) {
      return res.status(400).json({ message: "Missing information, please fill all" });
    }
    // Check trùng lặp
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email has existed" });

    const cardExists = await User.findOne({ userCardID });
    if (cardExists) return res.status(400).json({ message: "userCardID has existed" });

    const defaultRole = await Role.findByName("MEMBER"); 
    if (!defaultRole) {
      return res.status(500).json({ message: "Role: \"MEMBER\" not found" });
    }

    const newUser = await User.create({
        ...req.body,
        status: "PENDING", // Đảm bảo status là Pending
        role: defaultRole._id
    });

    // 2. TẠO NGAY YÊU CẦU DUYỆT ĐĂNG KÝ
    await Request.create({
        requester: newUser._id,
        type: "REGISTER",
        requestData: { note: "This user want to register" }
    });

    res.status(201).json({ 
        message: "Registeration in process. Please wait for approvement",
        user: newUser 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy tất cả User
// @route   GET /api/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .populate("role", "role_name")
      .populate("household", "houseHoldID address")
      .select("-password");
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy một User bằng ID
// @route   GET /api/users/:id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("role")
      .populate("household", "houseHoldID address members"); 

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cập nhật User
// @route   PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    // Cập nhật thông tin (Chỉ cập nhật nếu có gửi lên)
    user.name = req.body.name || user.name;
    user.sex = req.body.sex || user.sex;
    user.dob = req.body.dob || user.dob;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    
    // Cập nhật các trường thông tin nhân khẩu
    user.job = req.body.job || user.job;
    user.ethnic = req.body.ethnic || user.ethnic;
    user.birthLocation = req.body.birthLocation || user.birthLocation;

    // Xử lý Role (Cẩn trọng: Thường chỉ Admin mới được sửa quyền)
    if (req.body.roleName) {
      const newRole = await Role.findOne({ role_name: req.body.roleName });
      if (newRole) {
        user.role = newRole._id;
      }
    }
    const updatedUser = await user.save();
    const responseUser = updatedUser.toObject();
    delete responseUser.password;

    res.status(200).json(responseUser);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Xóa User
// @route   DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid userID" });
  }

  // Ngăn tự xóa chính mình (nếu cần)
  if (req.user && req.user._id.toString() === id) {
    return res.status(400).json({ message: "Cannot delete yourself" });
  }

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 1. Nếu User này là CHỦ HỘ của một hộ nào đó -> Không cho xóa ngay
    const ledHousehold = await Household.findOne({ leader: id });
    if (ledHousehold) {
      return res.status(400).json({ 
        message: `This user is the owner of household ID: ${ledHousehold.houseHoldID}. Remove the owner role to delete him.` 
      });
    }
    // 2. Nếu User đang là THÀNH VIÊN của một hộ -> Phải rút tên khỏi hộ đó
    if (user.household) {
      await Household.findByIdAndUpdate(user.household, {
        $pull: { members: id } // Lệnh $pull của MongoDB giúp xóa phần tử khỏi mảng
      });
    }


    await user.deleteOne();
    return res.status(200).json({ message: "Delete sucessful" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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