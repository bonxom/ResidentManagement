import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Dùng để hash mật khẩu

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email là bắt buộc"],
      unique: true, // Đảm bảo email là duy nhất
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Mật khẩu là bắt buộc"],
      select: false, // Tự động ẩn mật khẩu khi truy vấn User
    },
    name: {
      type: String,
      required: [true, "Tên là bắt buộc"],
    },
    sex: {
      type: String,
      enum: ["Nam", "Nữ", "Khác"], // Chỉ chấp nhận các giá trị này
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
    // Đây là phần liên kết với Role có sẵn của bạn
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role", // Tên Model Role của bạn (phải khớp)
      required: true,
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

// Middleware của Mongoose: Tự động HASH mật khẩu trước khi LƯU
userSchema.pre("save", async function (next) {
  // Chỉ hash nếu mật khẩu được thay đổi (hoặc là user mới)
  if (!this.isModified("password")) return next();

  // Hash mật khẩu với độ phức tạp là 12
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Thêm một method để kiểm tra mật khẩu (dùng khi đăng nhập)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.statics.findByEmail = function(email) {
  return this.findOne({email : email}, null, { runSettersOnQuery: true });
}

const User = mongoose.model("User", userSchema);
export default User;
