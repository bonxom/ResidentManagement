import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    // requester này có thể là household nếu muốn đóng phí
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { 
      type: String,
      enum: ["REGISTER", "UPDATE_INFO", "PAYMENT"], // Có thể mở rộng thêm sau này
      required: true,
    }, 
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    // Dùng Mixed type để lưu object JSON linh hoạt. 
    // Nếu là UPDATE_INFO: lưu { job: "Mới", dob: "..." }
    // Nếu là PAYMENT: lưu { amount: 50000, evidenceImage: "url..." }
    requestData: {
      type: mongoose.Schema.Types.Mixed, 
      default: {},
    },
    leaderComment: {
      type: String, // Lý do từ chối hoặc ghi chú của tổ trưởng
      default: "",
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
export default Request;