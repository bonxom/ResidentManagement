import mongoose from "mongoose";

const residentHistorySchema = new mongoose.Schema(
  {
    houseHoldId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Household",
      required: true,
    },
    // ... giữ nguyên temporaryResidents
    temporaryResidents: [
      {
        name: String,
        userCardID: String,
        dob: Date,
        job: String,
        reason: String,
        startDate: Date,
        endDate: Date,
      }
    ],
    // ... giữ nguyên temporaryAbsent
    temporaryAbsent: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        startDate: Date,
        endDate: Date,
        reason: String,
        temporaryAddress: String,
      }
    ],
    
    // --- [MỚI] THÊM MẢNG NÀY ĐỂ LƯU TRẺ SƠ SINH ---
    births: [
        {
            name: String,
            sex: String,
            dob: Date,
            birthLocation: String,
            birthCertificateNumber: String, // Số giấy khai sinh
            relationshipWithHead: String,
            ethnic: String,
            createdAt: { type: Date, default: Date.now } // Ngày thêm vào
        }
    ]
  },
  { timestamps: true }
);

const ResidentHistory = mongoose.model("ResidentHistory", residentHistorySchema);
export default ResidentHistory;