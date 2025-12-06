import Fee from "../models/Fee.js";
import Household from "../models/Household.js";
import { calculateCompulsoryFeeAmount } from "../utils/feeCalculator.js";

export const createFee = async (req, res, next) => {
  try {
    const { name, is_compulsory, year, description } = req.body;

    if (!name || year === undefined) {
      return res
        .status(400)
        .json({ message: "Fee name and year are required" });
    }

    const fee = await Fee.create({
      name,
      is_compulsory: Boolean(is_compulsory),
      year,
      description,
    });

    res.status(201).json(fee);
  } catch (error) {
    next(error);
  }
};

export const getFees = async (req, res, next) => {
  try {
    const fees = await Fee.find().sort({ createdAt: -1 });
    res.status(200).json(fees);
  } catch (error) {
    next(error);
  }
};

export const getFeeById = async (req, res, next) => {
  try {
    const fee = await Fee.findById(req.params.id);
    if (!fee) {
      return res.status(404).json({ message: "Fee not found" });
    }
    res.status(200).json(fee);
  } catch (error) {
    next(error);
  }
};

export const updateFee = async (req, res, next) => {
  try {
    const fee = await Fee.findById(req.params.id);
    if (!fee) {
      return res.status(404).json({ message: "Fee not found" });
    }

    const { name, is_compulsory, year, description } = req.body;
    if (name !== undefined) fee.name = name;
    if (is_compulsory !== undefined) fee.is_compulsory = Boolean(is_compulsory);
    if (year !== undefined) fee.year = year;
    if (description !== undefined) fee.description = description;

    const updated = await fee.save();
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteFee = async (req, res, next) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);
    if (!fee) {
      return res.status(404).json({ message: "Fee not found" });
    }
    res.status(200).json({ message: "Fee deleted" });
  } catch (error) {
    next(error);
  }
};

// Tính phí cho một hộ khẩu theo khoản thu cụ thể.
export const calculateHouseholdFee = async (req, res, next) => {
  try {
    const { feeId } = req.body;
    const householdId = req.params.id;

    if (!feeId) {
      return res.status(400).json({ message: "feeId is required" });
    }

    const fee = await Fee.findById(feeId);
    if (!fee) {
      return res.status(404).json({ message: "Fee not found" });
    }

    const household = await Household.findById(householdId).populate("members");
    if (!household) {
      return res.status(404).json({ message: "Household not found" });
    }

    if (!fee.is_compulsory) {
      // Khoản tự nguyện: để người dùng nhập nên trả về 0.
      return res.status(200).json({
        isCompulsory: fee.is_compulsory,
        amount: 0,
        householdId,
        feeId,
      });
    }

    // Phí vệ sinh bắt buộc: 6.000 VNĐ * 12 tháng * số thành viên.
    const { amount, memberCount } = calculateCompulsoryFeeAmount(household);
    return res.status(200).json({
      isCompulsory: fee.is_compulsory,
      amount,
      memberCount,
      householdId,
      feeId,
    });
  } catch (error) {
    next(error);
  }
};
