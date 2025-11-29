import { AppError } from "../middleware/AppError.js";
import { ERROR_CODE } from "../middleware/errorCode.js";
import Household from "../models/Household.js";
import User from "../models/User.js";

// @desc    Tạo hộ khẩu mới
// @route   POST /households
// @access  Private (HAMLET LEADER)
export const createHousehold = async (req, res) => {
  const { houseHoldID, address, leaderId } = req.body;

  try {
    if (!houseHoldID || !address || !leaderId) {
      // return res.status(400).json({ message: "Please provide household ID, address, and leader" });
      throw new AppError(ERROR_CODE.HOUSEHOLD_INFO_INCOMPLETE);
    }

    if (await Household.findOne({ houseHoldID })) {
      // return res.status(400).json({ message: "Household ID already exists" });
      throw new AppError(ERROR_CODE.HOUSEHOLD_ID_EXISTED);
    }

    const leader = await User.findById(leaderId);
    if (!leader) {
      // return res.status(404).json({ message: "Leader user not found" });
      throw new AppError(ERROR_CODE.USER_NOT_FOUND);
    }

    const household = await Household.create({
      houseHoldID,
      address,
      leader: leaderId,
      members: [leaderId], // Khởi tạo với chủ hộ là thành viên đầu tiên
    });

    res.status(201).json(household);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy tất cả hộ khẩu
// @route   GET /households
// @access  Private (HAMLET LEADER)
export const getAllHouseholds = async (req, res) => {
  try {
    const households = await Household.find({})
      .populate("leader", "name email")
      .populate("members", "name email");

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
      .populate("leader", "name email")
      .populate("members", "name email");

    if (!household) {
      // return res.status(404).json({ message: "Household not found" });
      throw new AppError(ERROR_CODE.HOUSEHOLD_NOT_FOUND);
    }
    res.status(200).json(household);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cập nhật hộ khẩu (địa chỉ, chủ hộ)
// @route   PUT /households/:id
// @access  Private (HAMLET LEADER)
export const updateHousehold = async (req, res) => {
  const { houseHoldID, address, leaderId } = req.body;
  try {
    const household = await Household.findById(req.params.id);
    if (!household) {
      // return res.status(404).json({ message: "Household not found" });
      throw new AppError(ERROR_CODE.HOUSEHOLD_NOT_FOUND);
    }

    if (houseHoldID) household.houseHoldID = houseHoldID;
    if (address) household.address = address;

    // Nếu thay đổi chủ hộ, phải kiểm tra
    if (leaderId) {
      const newLeader = await User.findById(leaderId);
      if (!newLeader) {
        // return res.status(404).json({ message: "New leader not found" });
        throw new AppError(ERROR_CODE.USER_NOT_FOUND);
      }
      household.leader = leaderId;
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
// @access  Private (HAMLET LEADER)
export const deleteHousehold = async (req, res) => {
  try {
    const household = await Household.findById(req.params.id);
    if (!household) {
      // return res.status(404).json({ message: "Household not found" });
      throw new AppError(ERROR_CODE.HOUSEHOLD_NOT_FOUND);
    }
    await household.deleteOne();
    res.status(200).json({ message: "Household deleted" });
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
      "members",
      "name email"
    );
    if (!household) {
      // return res.status(404).json({ message: "Household not found" });
      throw new AppError(ERROR_CODE.HOUSEHOLD_NOT_FOUND);
    }
    res.status(200).json(household.members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Thêm thành viên vào hộ
// @route   POST /households/:id/members
// @access  Private (HAMLET LEADER)
export const addMember = async (req, res) => {
  const { userId } = req.body; // ID của User cần thêm
  const householdId = req.params.id;

  try {
    const household = await Household.findById(householdId);
    if (!household) {
      // return res.status(404).json({ message: "Household not found" });
      throw new AppError(ERROR_CODE.HOUSEHOLD_NOT_FOUND);
    }

    const user = await User.findById(userId);
    if (!user) {
      // return res.status(404).json({ message: "User not found" });
      throw new AppError(ERROR_CODE.USER_NOT_FOUND);
    }

    const alreadyMember = household.members.some(
      (member) => member?.toString() === userId
    );
    if (alreadyMember) {
      // return res
      //   .status(400)
      //   .json({ message: "User is already a household member" });
      throw new AppError(ERROR_CODE.USER_ALREADY_HOUSEHOLD_MEMBER);
    }

    household.members.push(userId);
    await household.save();
    res.status(200).json(household);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Xóa thành viên khỏi hộ
// @route   DELETE /households/:householdId/members/:memberId
// @access  Private (HAMLET LEADER)
export const removeMember = async (req, res) => {
  const { householdId, memberId } = req.params;

  try {
    const household = await Household.findById(householdId);
    if (!household) {
      // return res.status(404).json({ message: "Household not found" });
      throw new AppError(ERROR_CODE.HOUSEHOLD_NOT_FOUND);
    }

    // Không cho phép xóa Chủ hộ. Phải đổi chủ hộ trước.
    if (household.leader.toString() === memberId) {
      // return res.status(400).json({
      //   message:
      //     "Cannot remove the household leader. Please assign a new leader first.",
      // });
      throw new AppError(ERROR_CODE.CANNOT_REMOVE_HOUSEHOLD_LEADER);
    }

    // Lọc (pull) thành viên ra khỏi mảng
    household.members.pull(memberId);
    await household.save();
    res.status(200).json(household);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
