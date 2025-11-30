import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const registrationRequestSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email là bắt buộc"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    userCardID: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Mật khẩu là bắt buộc"],
      select: false,
    },
    name: {
      type: String,
      required: [true, "Tên là bắt buộc"],
    },
    sex: {
      type: String,
      enum: ["Nam", "Nữ", "Khác"],
    },
    dob: {
      type: Date,
    },
    location: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

registrationRequestSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const RegistrationRequest = mongoose.model(
  "RegistrationRequest",
  registrationRequestSchema
);
export default RegistrationRequest;
