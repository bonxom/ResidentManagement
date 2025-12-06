import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    is_compulsory: {
      type: Boolean,
      required: true,
      default: false,
    },
    year: {
      type: Number,
      required: true,
      min: 2000,
      max: 3000,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const Fee = mongoose.model("Fee", feeSchema);
export default Fee;
