import { AppError } from "../middleware/AppError.js";
import { ERROR_CODE } from "../middleware/errorCode.js";
import Household from "../models/Household.js";
import User from "../models/User.js";

// @desc    Tạo hộ khẩu mới
// @route   POST /api/households
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

    if (leader.household) {
      return res.status(400).json({ message: "Leader already belongs to another household" });
    }

    const household = await Household.create({
      houseHoldID,
      address,
      leader: leaderId,
      members: [leaderId], // Khởi tạo với chủ hộ là thành viên đầu tiên
    });
    await User.findByIdAndUpdate(leaderId, {
      household: household._id,
      relationshipWithHead: "household owner"
    });
    res.status(201).json(household);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy tất cả hộ khẩu
// @route   GET /api/households
export const getAllHouseholds = async (req, res) => {
  try {
    const households = await Household.find({})
      .populate("leader", "name email phoneNumber userCardID").sort({ createdAt: -1 }); 

    res.status(200).json(households);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy 1 hộ khẩu bằng ID
// @route   GET /api/households/:id
export const getHouseholdById = async (req, res) => {
  try {
    const household = await Household.findById(req.params.id)
      .populate("leader", "name email phoneNumber userCardID")

    if (!household) {
      // return res.status(404).json({ message: "Household not found" });
      throw new AppError(ERROR_CODE.HOUSEHOLD_NOT_FOUND);
    }
    res.status(200).json(household);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy danh sách thành viên chi tiết của một hộ
// @route   GET /households/:id/users
export const getHouseholdResidents = async (req, res) => {
  try {
    const household = await Household.findById(req.params.id).populate({
      path: "members",
      // Lấy các trường thông tin cá nhân cần thiết
      select: "name userCardID dob sex job relationshipWithHead birthLocation ethnic phoneNumber",
    });

    if (!household) {
      return res.status(404).json({ message: "Household not found" });
    }

    res.status(200).json(household.members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cập nhật hộ khẩu (địa chỉ, chủ hộ)
// @route   PUT /api/households/:id
export const updateHousehold = async (req, res) => {
  const { houseHoldID, address, leaderId } = req.body;
  try {
    const household = await Household.findById(req.params.id);
    if (!household) {
      // return res.status(404).json({ message: "Household not found" });
      throw new AppError(ERROR_CODE.HOUSEHOLD_NOT_FOUND);
    }
    const oldLeaderId = household.leader?.toString();

    // Update Mã hộ và Địa chỉ nếu có gửi lên
    if (houseHoldID) {
        if (houseHoldID !== household.houseHoldID) {
             const duplicate = await Household.findOne({ houseHoldID });
             if (duplicate) return res.status(400).json({ message: "Duplicate Household ID" });
        }
        household.houseHoldID = houseHoldID;
    }
    if (address) household.address = address;

    // Xử lý logic đổi chủ hộ
    if (leaderId && leaderId !== household.leader.toString()) {
      const newLeader = await User.findById(leaderId);
      if (!newLeader) {
        // return res.status(404).json({ message: "New leader not found" });
        throw new AppError(ERROR_CODE.USER_NOT_FOUND);
      }
      if (
        newLeader.household &&
        newLeader.household.toString() !== household._id.toString()
      ) {
        return res.status(400).json({ message: "New leader belongs to another household" });
      }

      const oldLeaderId = household.leader;
      household.leader = leaderId;
      if (!household.members.includes(leaderId)) {
        household.members.push(leaderId);
      }

      await User.findByIdAndUpdate(oldLeaderId, { relationshipWithHead: "member" });
      await User.findByIdAndUpdate(leaderId, { 
        household: household._id,
        relationshipWithHead: "household owner" 
      });
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
        await User.findByIdAndUpdate(oldLeaderId, { household: null, relationshipWithHead: null });
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
// @route   DELETE /api/households/:id
export const deleteHousehold = async (req, res) => {
  try {
    const household = await Household.findById(req.params.id);
    if (!household) {
      // return res.status(404).json({ message: "Household not found" });
      throw new AppError(ERROR_CODE.HOUSEHOLD_NOT_FOUND);
    }

    const memberIds = [
      household.leader,
      ...(household.members || []),
    ].filter(Boolean);

    if (memberIds.length) {
      await User.updateMany(
        { _id: { $in: memberIds } },
        { $set: { household: null, relationshipWithHead: null } }
      );
    }

    await household.deleteOne();
    res.status(200).json({ message: "Household deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Thêm thành viên vào hộ
// @route   POST /api/households/:id/members
export const addMember = async (req, res) => {
  const { userId, relationship } = req.body;
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
    if (user.household && user.household.toString() !== householdId) {
        return res.status(400).json({ message: "This user is already in another household" });
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

    user.household = householdId;
    user.relationshipWithHead = relationship || "Thành viên";
    await user.save();
    res.status(200).json(household);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Xóa thành viên khỏi hộ
// @route   DELETE /api/households/:householdId/members/:memberId
export const removeMember = async (req, res) => {
  const { householdId, memberId } = req.params;

  try {
    const household = await Household.findById(householdId);
    if (!household) {
      // return res.status(404).json({ message: "Household not found" });
      throw new AppError(ERROR_CODE.HOUSEHOLD_NOT_FOUND);
    }

    // --- LOGIC MỚI: XỬ LÝ CHỦ HỘ ---
    if (household.leader.toString() === memberId) {
        // Kiểm tra xem có phải người cuối cùng không
        if (household.members.length === 1) {
            // CASE ĐẶC BIỆT: Hộ chỉ có 1 người (là chủ hộ) -> Xóa luôn hộ
            await household.deleteOne();

            // Cập nhật User về trạng thái tự do
            await User.findByIdAndUpdate(memberId, { 
                household: null,
                relationshipWithHead: null 
            });

            return res.status(200).json({ 
                message: "Household deleted because the last member was removed" 
            });
        } else {
            // CASE THƯỜNG: Còn người khác -> Bắt chuyển quyền trước
            return res.status(400).json({ 
                message: "Cannot remove the household leader. Please assign a new leader first." 
            });
        }
    }

    // --- LOGIC THƯỜNG (KHÔNG PHẢI CHỦ HỘ) ---

    // Lọc (pull) thành viên ra khỏi mảng
    household.members.pull(memberId);
    await household.save();

    // Cập nhật User (Set về null)
    await User.findByIdAndUpdate(memberId, { 
        household: null,
        relationshipWithHead: null 
    });

    res.status(200).json(household);
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

// @desc    Tách hộ (Một thành viên ra ở riêng, lập hộ mới)
// @route   POST /api/households/split
export const splitHousehold = async (req, res) => {
  const { userId, newHouseHoldID, newAddress } = req.body;

  try {
    // 1. Kiểm tra dữ liệu đầu vào
    if (!userId || !newHouseHoldID || !newAddress) {
      return res.status(400).json({ message: "Please provide enough information" });
    }

    // 2. Kiểm tra trùng mã hộ mới
    const existingHousehold = await Household.findOne({ houseHoldID: newHouseHoldID });
    if (existingHousehold) {
      return res.status(400).json({ message: "New household ID has existed" });
    }

    // 3. Lấy thông tin User và Hộ cũ
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.household) {
      return res.status(400).json({ message: "This user doesn't have any household" });
    }

    const oldHousehold = await Household.findById(user.household);
    if (!oldHousehold) return res.status(404).json({ message: "Old household is not existed" });

    // 4. Validate: Chủ hộ KHÔNG ĐƯỢC tách hộ (phải đổi chủ trước)
    if (oldHousehold.leader.toString() === userId) {
      return res.status(400).json({ 
        message: "Can't split household for the household owner" 
      });
    }

    // --- BẮT ĐẦU TÁCH HỘ ---

    // 5. Rút tên khỏi hộ cũ
    oldHousehold.members.pull(userId);
    await oldHousehold.save();

    // 6. Tạo hộ mới (User này làm chủ hộ)
    const newHousehold = await Household.create({
      houseHoldID: newHouseHoldID,
      address: newAddress,
      leader: userId,
      members: [userId],
    });

    // 7. Cập nhật thông tin User
    user.household = newHousehold._id;
    user.relationshipWithHead = "household owner"; // Cập nhật thành chủ hộ
    await user.save();

    res.status(201).json({
      message: "Split success",
      newHousehold,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Chuyển hộ (Chuyển thành viên từ hộ A sang hộ B)
// @route   POST /api/households/move
export const moveMember = async (req, res) => {
  const { userId, targetHouseholdId, relationship } = req.body;

  try {
    // 1. Kiểm tra đầu vào
    if (!userId || !targetHouseholdId || !relationship) {
      return res.status(400).json({ message: "Please provide neccessary info" });
    }

    // 2. Lấy thông tin
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.household) {
        return res.status(400).json({ message: "Can't find user's household" });
    }

    const targetHousehold = await Household.findById(targetHouseholdId);
    if (!targetHousehold) return res.status(404).json({ message: "Cannot find target household" });

    const oldHousehold = await Household.findById(user.household);
    
    // Check nếu chuyển vào chính hộ đang ở
    if (oldHousehold._id.toString() === targetHouseholdId) {
        return res.status(400).json({ message: "This user is already in target household" });
    }

    // --- [LOGIC MỚI] XỬ LÝ CHỦ HỘ ---
    let shouldDeleteOldHousehold = false;

    if (oldHousehold && oldHousehold.leader.toString() === userId) {
      // Nếu là chủ hộ, kiểm tra xem có phải là người cuối cùng không
      if (oldHousehold.members.length === 1) {
          // Case đặc biệt: Chủ hộ độc thân -> Cho phép đi và sẽ xóa nhà cũ
          shouldDeleteOldHousehold = true;
      } else {
          // Case thường: Còn người khác -> Bắt buộc chuyển quyền trước
          return res.status(400).json({ 
            message: "Please assign another resident to be household owner" 
          });
      }
    }

    // --- BẮT ĐẦU CHUYỂN ---

    // 3. Xử lý Hộ cũ
    if (oldHousehold) {
        // Rút tên khỏi danh sách
        oldHousehold.members.pull(userId);
        
        if (shouldDeleteOldHousehold) {
            // Nếu là người cuối cùng -> Xóa luôn hộ cũ
            await oldHousehold.deleteOne();
        } else {
            // Nếu còn người -> Lưu lại danh sách mới
            await oldHousehold.save();
        }
    }

    // 4. Thêm vào Hộ mới
    const isAlreadyInTarget = targetHousehold.members.some(
      (member) => member?.toString() === userId
    );
    if (!isAlreadyInTarget) {
      targetHousehold.members.push(userId);
      await targetHousehold.save();
    }

    // 5. Cập nhật User
    user.household = targetHousehold._id;
    user.relationshipWithHead = relationship;
    
    // Nếu chuyển sang nhà mới mà nhà mới chưa có chủ hộ (hiếm gặp nhưng cứ handle)
    // Hoặc đơn giản là thành viên thường
    await user.save();

    res.status(200).json({
      message: shouldDeleteOldHousehold 
        ? "Move success and delete old household (empty resident)" 
        : "Move success",
      user: {
          name: user.name,
          newHousehold: targetHousehold.houseHoldID
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// import Household from "../models/Household.js";
// import User from "../models/User.js";
// import mongoose from "mongoose";
// import ResidentHistory from "../models/ResidentHistory.js";
// import Request from "../models/Request.js"; // Import thêm Request để lấy lịch sử Sinh/Tử
// // @desc    Tạo hộ khẩu mới
// // @route   POST /api/households
// export const createHousehold = async (req, res) => {
//   const { houseHoldID, address, leaderId } = req.body;

//   try {
//     if (!houseHoldID || !address || !leaderId) {
//       return res.status(400).json({ message: "Please provide household ID, address, and leader" });
//     }

//     if (await Household.findOne({ houseHoldID })) {
//       return res.status(400).json({ message: "Household ID already exists" });
//     }

//     const leader = await User.findById(leaderId);
//     if (!leader) {
//       return res.status(404).json({ message: "Leader user not found" });
//     }

//     if (leader.household) {
//       return res.status(400).json({ message: "Leader already belongs to another household" });
//     }

//     const household = await Household.create({
//       houseHoldID,
//       address,
//       leader: leaderId,
//       members: [leaderId], // Khởi tạo với chủ hộ là thành viên đầu tiên
//     });
//     await User.findByIdAndUpdate(leaderId, {
//       household: household._id,
//       relationshipWithHead: "household owner"
//     });
//     res.status(201).json(household);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Lấy tất cả hộ khẩu
// // @route   GET /api/households
// export const getAllHouseholds = async (req, res) => {
//   try {
//     const households = await Household.find({})
//       .populate("leader", "name email phoneNumber userCardID").sort({ createdAt: -1 }); 

//     res.status(200).json(households);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Lấy 1 hộ khẩu bằng ID
// // @route   GET /api/households/:id
// export const getHouseholdById = async (req, res) => {
//   try {
//     const household = await Household.findById(req.params.id)
//       .populate("leader", "name email phoneNumber userCardID")

//     if (!household) {
//       return res.status(404).json({ message: "Household not found" });
//     }
//     res.status(200).json(household);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Lấy danh sách thành viên chi tiết của một hộ
// // @route   GET /households/:id/users
// export const getHouseholdResidents = async (req, res) => {
//   try {
//     const household = await Household.findById(req.params.id).populate({
//       path: "members",
//       // Lấy các trường thông tin cá nhân cần thiết
//       select: "name userCardID dob sex job relationshipWithHead birthLocation ethnic phoneNumber",
//     });

//     if (!household) {
//       return res.status(404).json({ message: "Household not found" });
//     }

//     res.status(200).json(household.members);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Cập nhật hộ khẩu (địa chỉ, chủ hộ)
// // @route   PUT /api/households/:id
// export const updateHousehold = async (req, res) => {
//   const { houseHoldID, address, leaderId } = req.body;
//   try {
//     const household = await Household.findById(req.params.id);
//     if (!household) {
//       return res.status(404).json({ message: "Household not found" });
//     }
//     const oldLeaderId = household.leader?.toString();

//     // Update Mã hộ và Địa chỉ nếu có gửi lên
//     if (houseHoldID) {
//         if (houseHoldID !== household.houseHoldID) {
//              const duplicate = await Household.findOne({ houseHoldID });
//              if (duplicate) return res.status(400).json({ message: "Duplicate Household ID" });
//         }
//         household.houseHoldID = houseHoldID;
//     }
//     if (address) household.address = address;

//     // Xử lý logic đổi chủ hộ
//     if (leaderId && leaderId !== household.leader.toString()) {
//       const newLeader = await User.findById(leaderId);
//       if (!newLeader) return res.status(404).json({ message: "User not found" });

//       if (
//         newLeader.household &&
//         newLeader.household.toString() !== household._id.toString()
//       ) {
//         return res.status(400).json({ message: "New leader belongs to another household" });
//       }

//       const oldLeaderId = household.leader;
//       household.leader = leaderId;
//       if (!household.members.includes(leaderId)) {
//         household.members.push(leaderId);
//       }

//       await User.findByIdAndUpdate(oldLeaderId, { relationshipWithHead: "member" });
//       await User.findByIdAndUpdate(leaderId, { 
//         household: household._id,
//         relationshipWithHead: "household owner" 
//       });
//     }

//     const updatedHousehold = await household.save();

//     // Nếu đổi leader, đảm bảo cả old và new leader đều có household reference đúng
//     const newLeaderId = household.leader?.toString();
//     if (oldLeaderId && newLeaderId && oldLeaderId !== newLeaderId) {
//       // New leader đã được cập nhật bởi post-save hook
//       // Nhưng ta cần đảm bảo old leader vẫn trong household (nếu còn là member)
//       const isOldLeaderStillMember = household.members.some(
//         (m) => m.toString() === oldLeaderId
//       );
//       if (!isOldLeaderStillMember) {
//         await User.findByIdAndUpdate(oldLeaderId, { household: null, relationshipWithHead: null });
//       }
//     }

//     const populatedHousehold = await Household.findById(req.params.id)
//       .populate("leader", "name email userCardID")
//       .populate("members", "name email userCardID");

//     res.status(200).json(populatedHousehold);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Xóa hộ khẩu
// // @route   DELETE /api/households/:id
// export const deleteHousehold = async (req, res) => {
//   try {
//     const household = await Household.findById(req.params.id);
//     if (!household) {
//       return res.status(404).json({ message: "Household not found" });
//     }

//     const memberIds = [
//       household.leader,
//       ...(household.members || []),
//     ].filter(Boolean);

//     if (memberIds.length) {
//       await User.updateMany(
//         { _id: { $in: memberIds } },
//         { $set: { household: null, relationshipWithHead: null } }
//       );
//     }

//     await household.deleteOne();
//     res.status(200).json({ message: "Household deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Thêm thành viên vào hộ
// // @route   POST /api/households/:id/members
// export const addMember = async (req, res) => {
//   const { userId, relationship } = req.body;
//   const householdId = req.params.id;

//   try {
//     const household = await Household.findById(householdId);
//     if (!household) {
//       return res.status(404).json({ message: "Household not found" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     if (user.household && user.household.toString() !== householdId) {
//         return res.status(400).json({ message: "This user is already in another household" });
//     }
//     const alreadyMember = household.members.some(
//       (member) => member?.toString() === userId
//     );
//     if (alreadyMember) {
//       return res.status(400).json({ message: "User is already a household member" });
//     }

//     household.members.push(userId);
//     await household.save();

//     user.household = householdId;
//     user.relationshipWithHead = relationship || "Thành viên";
//     await user.save();
//     res.status(200).json(household);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Xóa thành viên khỏi hộ
// // @route   DELETE /api/households/:householdId/members/:memberId
// export const removeMember = async (req, res) => {
//   const { householdId, memberId } = req.params;

//   try {
//     const household = await Household.findById(householdId);
//     if (!household) {
//       return res.status(404).json({ message: "Household not found" });
//     }

//     // --- LOGIC MỚI: XỬ LÝ CHỦ HỘ ---
//     if (household.leader.toString() === memberId) {
//         // Kiểm tra xem có phải người cuối cùng không
//         if (household.members.length === 1) {
//             // CASE ĐẶC BIỆT: Hộ chỉ có 1 người (là chủ hộ) -> Xóa luôn hộ
//             await household.deleteOne();

//             // Cập nhật User về trạng thái tự do
//             await User.findByIdAndUpdate(memberId, { 
//                 household: null,
//                 relationshipWithHead: null 
//             });

//             return res.status(200).json({ 
//                 message: "Household deleted because the last member was removed" 
//             });
//         } else {
//             // CASE THƯỜNG: Còn người khác -> Bắt chuyển quyền trước
//             return res.status(400).json({ 
//                 message: "Cannot remove the household leader. Please assign a new leader first." 
//             });
//         }
//     }

//     // --- LOGIC THƯỜNG (KHÔNG PHẢI CHỦ HỘ) ---

//     // Lọc (pull) thành viên ra khỏi mảng
//     household.members.pull(memberId);
//     await household.save();

//     // Cập nhật User (Set về null)
//     await User.findByIdAndUpdate(memberId, { 
//         household: null,
//         relationshipWithHead: null 
//     });

//     res.status(200).json(household);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Tách hộ (Một thành viên ra ở riêng, lập hộ mới)
// // @route   POST /api/households/split
// export const splitHousehold = async (req, res) => {
//   const { userId, newHouseHoldID, newAddress } = req.body;

//   try {
//     // 1. Kiểm tra dữ liệu đầu vào
//     if (!userId || !newHouseHoldID || !newAddress) {
//       return res.status(400).json({ message: "Please provide enough information" });
//     }

//     // 2. Kiểm tra trùng mã hộ mới
//     const existingHousehold = await Household.findOne({ houseHoldID: newHouseHoldID });
//     if (existingHousehold) {
//       return res.status(400).json({ message: "New household ID has existed" });
//     }

//     // 3. Lấy thông tin User và Hộ cũ
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (!user.household) {
//       return res.status(400).json({ message: "This user doesn't have any household" });
//     }

//     const oldHousehold = await Household.findById(user.household);
//     if (!oldHousehold) return res.status(404).json({ message: "Old household is not existed" });

//     // 4. Validate: Chủ hộ KHÔNG ĐƯỢC tách hộ (phải đổi chủ trước)
//     if (oldHousehold.leader.toString() === userId) {
//       return res.status(400).json({ 
//         message: "Can't split household for the household owner" 
//       });
//     }

//     // --- BẮT ĐẦU TÁCH HỘ ---

//     // 5. Rút tên khỏi hộ cũ
//     oldHousehold.members.pull(userId);
//     await oldHousehold.save();

//     // 6. Tạo hộ mới (User này làm chủ hộ)
//     const newHousehold = await Household.create({
//       houseHoldID: newHouseHoldID,
//       address: newAddress,
//       leader: userId,
//       members: [userId],
//     });

//     // 7. Cập nhật thông tin User
//     user.household = newHousehold._id;
//     user.relationshipWithHead = "household owner"; // Cập nhật thành chủ hộ
//     await user.save();

//     res.status(201).json({
//       message: "Split success",
//       newHousehold,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Chuyển hộ (Chuyển thành viên từ hộ A sang hộ B)
// // @route   POST /api/households/move
// export const moveMember = async (req, res) => {
//   const { userId, targetHouseholdId, relationship } = req.body;

//   try {
//     // 1. Kiểm tra đầu vào
//     if (!userId || !targetHouseholdId || !relationship) {
//       return res.status(400).json({ message: "Please provide neccessary info" });
//     }

//     // 2. Lấy thông tin
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (!user.household) {
//         return res.status(400).json({ message: "Can't find user's household" });
//     }

//     const targetHousehold = await Household.findById(targetHouseholdId);
//     if (!targetHousehold) return res.status(404).json({ message: "Cannot find target household" });

//     const oldHousehold = await Household.findById(user.household);
//     if (!oldHousehold) {
//       return res.status(404).json({ message: "User's current household record is missing" });
//     }
    
//     // Check nếu chuyển vào chính hộ đang ở
//     if (oldHousehold._id.toString() === targetHouseholdId) {
//         return res.status(400).json({ message: "This user is already in target household" });
//     }

//     // --- [LOGIC MỚI] XỬ LÝ CHỦ HỘ ---
//     let shouldDeleteOldHousehold = false;

//     if (oldHousehold && oldHousehold.leader.toString() === userId) {
//       // Nếu là chủ hộ, kiểm tra xem có phải là người cuối cùng không
//       if (oldHousehold.members.length === 1) {
//           // Case đặc biệt: Chủ hộ độc thân -> Cho phép đi và sẽ xóa nhà cũ
//           shouldDeleteOldHousehold = true;
//       } else {
//           // Case thường: Còn người khác -> Bắt buộc chuyển quyền trước
//           return res.status(400).json({ 
//             message: "Please assign another resident to be household owner" 
//           });
//       }
//     }

//     // --- BẮT ĐẦU CHUYỂN ---

//     // 3. Xử lý Hộ cũ
//     if (oldHousehold) {
//         // Rút tên khỏi danh sách
//         oldHousehold.members.pull(userId);
        
//         if (shouldDeleteOldHousehold) {
//             // Nếu là người cuối cùng -> Xóa luôn hộ cũ
//             await oldHousehold.deleteOne();
//         } else {
//             // Nếu còn người -> Lưu lại danh sách mới
//             await oldHousehold.save();
//         }
//     }

//     // 4. Thêm vào Hộ mới
//     const isAlreadyInTarget = targetHousehold.members.some(
//       (member) => member?.toString() === userId
//     );
//     if (!isAlreadyInTarget) {
//       targetHousehold.members.push(userId);
//       await targetHousehold.save();
//     }

//     // 5. Cập nhật User
//     user.household = targetHousehold._id;
//     user.relationshipWithHead = relationship;
    
//     // Nếu chuyển sang nhà mới mà nhà mới chưa có chủ hộ (hiếm gặp nhưng cứ handle)
//     // Hoặc đơn giản là thành viên thường
//     await user.save();

//     res.status(200).json({
//       message: shouldDeleteOldHousehold 
//         ? "Move success and delete old household (empty resident)" 
//         : "Move success",
//       user: {
//           name: user.name,
//           newHousehold: targetHousehold.houseHoldID
//       }
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // Xem lịch sử biến động của 1 hộ (Sinh/Tử/Chuyển đi/Chuyển đến)
// // @route GET /api/households/:id/changes
// export const getHouseholdChanges = async (req, res) => {
//     const { id } = req.params;
//     try {
//         // 1. Lấy lịch sử tạm trú/vắng
//         const resHistory = await ResidentHistory.findOne({ houseHoldId: id })
//             .populate("temporaryAbsent.user", "name");

//         // 2. Lấy các Request đã duyệt liên quan đến hộ này (Sinh, Tử, Tách, Nhập)
//         const requests = await Request.find({
//             "requestData.householdId": new mongoose.Types.ObjectId(id), 
//             status: "APPROVED"
//         }).sort({ updatedAt: -1 });

//         // 3. Tổng hợp lại
//         const timeline = requests.map(req => ({
//             date: req.updatedAt,
//             type: req.type, // BIRTH_REPORT, DEATH_REPORT...
//             description: req.type === 'BIRTH_REPORT' ? `Khai sinh cho bé ${req.requestData.name}` :
//                          req.type === 'DEATH_REPORT' ? `Khai tử cho thành viên ID ${req.requestData.deceasedUserId}` :
//                          req.type
//         }));

//         res.status(200).json({
//             temporaryHistory: resHistory, // Chi tiết tạm trú/vắng
//             majorChanges: timeline        // Biến động nhân khẩu
//         });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
