import Request from "../models/Request.js";
import User from "../models/User.js";
import Fee from "../models/Fee.js";
import Transaction from "../models/Transaction.js";
import ResidentHistory from "../models/ResidentHistory.js";
import Role from "../models/Role.js";
import Household from "../models/Household.js";

// @desc    Gửi yêu cầu cập nhật thông tin (Dành cho Người dân)
// @route   POST /api/requests/update-info
export const createUpdateRequest = async (req, res) => {
  try {
    const { newData } = req.body; // newData là object chứa các trường muốn sửa (vd: { job: "ABC", phoneNumber: "123" })

    if (!newData || typeof newData !== "object" || Array.isArray(newData)) {
      return res.status(400).json({ message: "Invalid payload" });
    }
    
    // Validate: Không cho phép gửi yêu cầu sửa các trường nhạy cảm qua API này
    const forbiddenFields = ["password", "role", "household", "status", "userCardID"];
    const filteredData = Object.keys(newData).reduce((acc, key) => {
        if (!forbiddenFields.includes(key)) {
            acc[key] = newData[key];
        }
        return acc;
    }, {});

    if (Object.keys(filteredData).length === 0) {
        return res.status(400).json({ message: "Nothing to update" });
    }

    const request = await Request.create({
      requester: req.user._id, // Lấy ID từ token đăng nhập
      type: "UPDATE_INFO",
      requestData: filteredData,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Gửi yêu cầu nộp tiền (Cư dân gửi)
// @route   POST /api/requests/payment
export const createPaymentRequest = async (req, res) => {
  try {
    const { feeId, amount, note, proofImage } = req.body;
    const user = req.user; // Lấy từ middleware protect

    // 1. Validate dữ liệu
    if (!feeId || !amount) {
        return res.status(400).json({ message: "Vui lòng chọn khoản thu và nhập số tiền" });
    }

    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ message: "Số tiền không hợp lệ" });
    }

    if (!user.household) {
        return res.status(400).json({ message: "Bạn chưa thuộc hộ khẩu nào để nộp phí" });
    }

    // 2. Kiểm tra khoản thu có hợp lệ không
    const fee = await Fee.findById(feeId);
    if (!fee) return res.status(404).json({ message: "Khoản thu không tồn tại" });
    if (fee.status === "COMPLETED") {
        return res.status(400).json({ message: "Đợt thu này đã kết thúc" });
    }

    // 3. Tạo Request
    const request = await Request.create({
      requester: user._id,
      type: "PAYMENT",
      requestData: {
          feeId,
          householdId: user.household, // Lưu snapshot hộ khẩu lúc nộp
          amount: parsedAmount,
          note: note || "Nộp tiền Online",
          proofImage: proofImage || "" // URL ảnh chuyển khoản (nếu có)
      }
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Lấy danh sách yêu cầu (Dành cho Tổ trưởng)
// @route   GET /api/requests
export const getAllRequests = async (req, res) => {
  try {
    const { status, type } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;

    const requests = await Request.find(filter)
      .populate("requester", "name email userCardID household") // Hiện tên người gửi
      .sort({ createdAt: -1 }); // Mới nhất lên đầu

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Xử lý duyệt/từ chối yêu cầu (Dành cho Tổ trưởng)
// @route   PUT /api/requests/:id/review
export const reviewRequest = async (req, res) => {
  const { status, leaderComment } = req.body; // status = 'APPROVED' hoặc 'REJECTED'
  const requestId = req.params.id;

  if (!["APPROVED", "REJECTED"].includes(status)) {
    return res.status(400).json({ message: "Review status is not valid" });
  }

  try {
    const request = await Request.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });
    
    if (request.status !== "PENDING") {
        return res.status(400).json({ message: "This request has been processed" });
    }
    const data = request.requestData || {};

    if (status === "APPROVED") {
      switch (request.type) {
        case "REGISTER": {
          const requesterUser = await User.findById(request.requester);
          if (!requesterUser) {
            return res.status(404).json({ message: "Requester account not found" });
          }
          requesterUser.status = "VERIFIED";
          await requesterUser.save();
          break;
        }

        // 2. Duyệt Cập nhật thông tin
        case "UPDATE_INFO":
          // Lấy data từ request đắp vào User
          await User.findByIdAndUpdate(
            request.requester,
            { 
              $set: data 
            },
            { runValidators: true }
          );
          break;

        // --- LOGIC MỚI: DUYỆT THANH TOÁN ---
        case "PAYMENT":
          {
            const { feeId, householdId, note } = data;
            const amount = Number(data.amount);
            if (!feeId || !householdId || !Number.isFinite(amount) || amount <= 0) {
              return res.status(400).json({ message: "Payment request is missing required data" });
            }
            const fee = await Fee.findById(feeId);
            if (!fee) return res.status(404).json({ message: "Fee not found" });
            if (fee.status === "COMPLETED") {
              return res.status(400).json({ message: "This fee collection has been closed" });
            }
            const household = await Household.findById(householdId);
            if (!household) {
              return res.status(404).json({ message: "Household not found" });
            }
            const isMember = household.leader?.toString() === request.requester.toString()
              || household.members?.some((member) => member?.toString() === request.requester.toString());
            if (!isMember) {
              return res.status(400).json({ message: "Requester does not belong to this household" });
            }
            const txNotes = note ? `${note} (Approved online)` : "Approved online";
            await Transaction.create({
              fee: feeId,
              household: householdId,
              amount,
              payer: request.requester,
              note: txNotes,
            });
          }
          break;
        default:
          break;
      }
    }

    request.status = status;
    request.leaderComment = leaderComment || "";
    await request.save();

    res.status(200).json({ message: `${status} successful`, request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
