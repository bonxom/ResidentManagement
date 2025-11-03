import mongoose from "mongoose";

const householdSchema = new mongoose.Schema(
    {
        maHoKhau: {
            type: String,
            required: [true, "Mã hộ khẩu là bắt buộc"],
            unique: true,
            trim: true,
            uppercase: true,
        },
        diaChiHo: {
            type: String,
            required: [true, "Địa chỉ hộ là bắt buộc"],
            trim: true,
        },
        chuHo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Chủ hộ là bắt buộc"],
        },
        thanhVien: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {timestamps: true,}
)

householdSchema.pre("save", function (next) {
  if (this.isModified("chuHo") || this.isModified("thanhVien")) {
    if (!this.thanhVien.includes(this.chuHo)) {
      this.thanhVien.push(this.chuHo);
    }
  }
  next();
});

const Household = mongoose.model("Household", householdSchema);
export default Household;