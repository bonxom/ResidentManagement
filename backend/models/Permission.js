import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    permission_name: {
      type: String,
      required: true,
      unique: true,
      unique: true,      // sẽ tạo unique index
      uppercase: true,   // lưu dưới dạng chữ hoa
      trim: true,
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
    }
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("Permission", permissionSchema);