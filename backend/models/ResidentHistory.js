import mongoose from "mongoose";

const residentHistorySchema = new mongoose.Schema(
  {
    //tạm trú
    temporaryResidents: [
      {
        userCardID: {
          type: Number,
          required: [true, "Mã căn cước công dân là bắt buộc"],
        },
        name: {
          type: String,
          required: [true, "Tên người tạm trú là bắt buộc"],
          trim: true,
        },
        dob: {
          type: Date,
        },
        startDate: {
          type: Date,
          required: [true, "Thời gian bắt đầu cư trú là bắt buộc"],
          default: Date.now,
        },
        endDate: {
          type: Date,
          default: null,
        },
      },
    ],
    //tạm vắng
    temporaryAbsent: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        startDate: {
          type: Date,
          required: [true, "Thời gian bắt đầu tạm vắng là bắt buộc"],
          default: Date.now,
        },
        endDate: {
          type: Date,
          default: null,
        },
      }
    ]
  },
  { timestamps: true }
);

const ResidentHistory = mongoose.model("ResidentHistory", residentHistorySchema);
export default ResidentHistory;
