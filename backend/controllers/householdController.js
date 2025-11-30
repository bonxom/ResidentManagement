import Household from "../models/Household.js";
import ResidentHistory from "../models/ResidentHistory.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// @desc    Tạo hộ khẩu mới
// @route   POST /households
// @access  Private (HAMLET LEADER)
export const createHousehold = async (req, res) => {
  const { houseHoldID, address, leaderId } = req.body;

  try {
    if (!houseHoldID || !address || !leaderId) {
      return res.status(400).json({ message: "Please provide household ID, address, and leader" });
    }

    if (await Household.findOne({ houseHoldID })) {
      return res.status(400).json({ message: "Household ID already exists" });
    }

    const leader = await User.findById(leaderId);
    if (!leader) {
      return res.status(404).json({ message: "Leader user not found" });
    }

    const household = await Household.create({
      houseHoldID,
      address,
      leader: leaderId,
      members: [leaderId], // Khởi tạo với chủ hộ là thành viên đầu tiên
    });

    // Cập nhật user.household cho leader (hook post-save sẽ xử lý)
    // Nhưng để chắc chắn, ta cập nhật thủ công
    await User.findByIdAndUpdate(leaderId, { household: household._id });

    const populatedHousehold = await Household.findById(household._id)
      .populate("leader", "name email userCardID")
      .populate("members", "name email userCardID");

    res.status(201).json(populatedHousehold);
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
      return res.status(404).json({ message: "Household not found" });
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
      return res.status(404).json({ message: "Household not found" });
    }

    const oldLeaderId = household.leader?.toString();

    if (houseHoldID) household.houseHoldID = houseHoldID;
    if (address) household.address = address;

    // Nếu thay đổi chủ hộ, phải kiểm tra
    if (leaderId) {
      const newLeader = await User.findById(leaderId);
      if (!newLeader) {
        return res.status(404).json({ message: "New leader not found" });
      }
      household.leader = leaderId;
      // (Middleware trong Model sẽ tự động thêm chủ hộ mới vào danh sách thành viên)
    }

    const updatedHousehold = await household.save();

    // Nếu đổi leader, đảm bảo cả old và new leader đều có household reference đúng
    const newLeaderId = household.leader?.toString();
    if (oldLeaderId && newLeaderId && oldLeaderId !== newLeaderId) {
      // New leader đã được cập nhật bởi post-save hook
      // Nhưng ta cần đảm bảo old leader vẫn trong household (nếu còn là member)
      const isOldLeaderStillMember = household.members.some(
        (m) => m.toString() === oldLeaderId
      );
      if (!isOldLeaderStillMember) {
        await User.findByIdAndUpdate(oldLeaderId, { household: null });
      }
    }

    const populatedHousehold = await Household.findById(req.params.id)
      .populate("leader", "name email userCardID")
      .populate("members", "name email userCardID");

    res.status(200).json(populatedHousehold);
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
      return res.status(404).json({ message: "Household not found" });
    }

    // Xóa household reference trong tất cả members trước khi xóa household
    if (household.members && household.members.length > 0) {
      await User.updateMany(
        { _id: { $in: household.members } },
        { $set: { household: null } }
      );
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
      return res.status(404).json({ message: "Household not found" });
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
      return res.status(404).json({ message: "Household not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyMember = household.members.some(
      (member) => member?.toString() === userId
    );
    if (alreadyMember) {
      return res.status(400).json({ message: "User is already a household member" });
    }

    household.members.push(userId);
    await household.save();

    // Cập nhật user.household cho member mới (hook post-save đã xử lý)
    // Nhưng để chắc chắn, ta cập nhật thủ công
    await User.findByIdAndUpdate(userId, { household: householdId });

    const updatedHousehold = await Household.findById(householdId)
      .populate("leader", "name email userCardID")
      .populate("members", "name email userCardID");

    res.status(200).json(updatedHousehold);
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
      return res.status(404).json({ message: "Household not found" });
    }

    // Không cho phép xóa Chủ hộ. Phải đổi chủ hộ trước.
    if (household.leader.toString() === memberId) {
      return res
        .status(400)
        .json({ message: "Cannot remove the household leader. Please assign a new leader first." });
    }

    // Lọc (pull) thành viên ra khỏi mảng
    household.members.pull(memberId);
    await household.save();

    // Xóa household reference trong user
    await User.findByIdAndUpdate(memberId, { household: null });

    const updatedHousehold = await Household.findById(householdId)
      .populate("leader", "name email userCardID")
      .populate("members", "name email userCardID");

    res.status(200).json(updatedHousehold);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy lịch sử cư trú của hộ
// @route   GET /households/:householdId/resident-history
// @access  Private (HAMLET LEADER)
export const getResidentHistory = async (req, res) => {
    const { householdId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(householdId)) {
        return res.status(400).json({ message: "Invalid Household ID" });
    }

    try {
        // Tìm household
        const household = await Household.findById(householdId);
        if (!household) {
            return res.status(404).json({ message: "Household not found" });
        }

        let residentHistory;
        
        // Nếu household có historyID, lấy ResidentHistory theo ID đó
        if (household.historyID) {
            residentHistory = await ResidentHistory.findById(household.historyID)
                .populate("temporaryAbsent.user", "name email userCardID");
        }
        
        // Nếu không tìm thấy, tạo mới
        if (!residentHistory) {
            residentHistory = await ResidentHistory.create({ houseHoldId: householdId });
            
            // Cập nhật historyID vào household
            await Household.updateOne(
                { _id: householdId },
                { $set: { historyID: residentHistory._id } }
            );
            
            // Populate sau khi tạo
            residentHistory = await ResidentHistory.findById(residentHistory._id)
                .populate("houseHoldId", "houseHoldID address")
                .populate("temporaryAbsent.user", "name email userCardID");
        }

        res.status(200).json(residentHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// @desc    Thêm người tạm trú vào lịch sử cư trú của hộ
// @route   POST /households/:householdId/temporary-residents
// @access  Private (HAMLET LEADER)
export const addTemporaryResident = async (req, res) => {
    const { householdId } = req.params;
    const { userCardID, name, dob, startDate, endDate } = req.body;

    try {
        // Validate household ID
        if (!mongoose.Types.ObjectId.isValid(householdId)) {
            return res.status(400).json({ message: "Invalid Household ID" });
        }

        // Kiểm tra household có tồn tại không
        const household = await Household.findById(householdId);
        if (!household) {
            return res.status(404).json({ message: "Household not found" });
        }

        // Validate required fields
        if (!userCardID || !name) {
            return res.status(400).json({ message: "userCardID and name are required" });
        }

        let residentHistory;
        
        // Nếu household có historyID, lấy ResidentHistory
        if (household.historyID) {
            residentHistory = await ResidentHistory.findById(household.historyID);
        }
        
        // Nếu không có, tạo mới
        if (!residentHistory) {
            residentHistory = await ResidentHistory.create({
                houseHoldId: householdId,
                temporaryResidents: [],
                temporaryAbsent: []
            });
            
            // Cập nhật historyID vào household
            await Household.updateOne(
                { _id: householdId },
                { $set: { historyID: residentHistory._id } }
            );
        }

        // Kiểm tra xem người tạm trú đã tồn tại chưa (dựa vào userCardID)
        const existingResident = residentHistory.temporaryResidents.find(
            resident => resident.userCardID === userCardID
        );

        if (existingResident) {
            return res.status(400).json({ 
                message: "Temporary resident with this userCardID already exists in this household" 
            });
        }
        
        // Thêm người tạm trú mới
        const newTemporaryResident = {
            userCardID,
            name,
            dob: dob || null,
            startDate: startDate || Date.now(),
            endDate: endDate || null
        };

        residentHistory.temporaryResidents.push(newTemporaryResident);
        await residentHistory.save();

        const updatedHistory = await ResidentHistory.findById(residentHistory._id)
            .populate("temporaryAbsent.user", "name email userCardID");
        res.status(201).json({
            message: "Temporary resident added successfully",
            residentHistory: updatedHistory
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// @desc    Kết thúc thời gian tạm trú của một người
// @route   PUT /households/:householdId/temporary-residents/end
// @access  Private (HAMLET LEADER)
export const endOfTemporaryLiving = async (req, res) => {
    const { householdId } = req.params;
    const { userCardID, endDate } = req.body;

    try {
      if (!mongoose.Types.ObjectId.isValid(householdId)) {
        return res.status(400).json({ message: "Invalid Household ID" });
      }
      const household = await Household.findById(householdId);
      if (!household) {
        return res.status(404).json({ message: "Household not found" });
      }
        
      let residentHistory;  
      if (household.historyID) {
          residentHistory = await ResidentHistory.findById(household.historyID);
      }
      if (!residentHistory) {
          return res.status(404).json({ message: "Resident history not found for this household" });
      }

      const resident = residentHistory.temporaryResidents.find(
        (r) => r.userCardID === userCardID
      );
      if (!resident) {
        return res.status(404).json({ message: "Temporary resident not found" });
      }

      if (resident.endDate) {
        return res.status(400).json({ message: "Temporary residence already ended" });
      }
      resident.endDate = endDate || Date.now();
      await residentHistory.save();

      res.status(200).json({ message: "Temporary residence ended successfully", resident });
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}
