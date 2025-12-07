import Transaction from "../models/Transaction.js";
import Household from "../models/Household.js";
import Fee from "../models/Fee.js";
import { calculateCompulsoryFeeAmount } from "../utils/feeCalculator.js";

export const createTransaction = async (req, res, next) => {
  try {
    const { household_id, fee_id, amount, payment_date, notes } = req.body;

    if (!household_id || !fee_id || amount === undefined) {
      return res
        .status(400)
        .json({ message: "household_id, fee_id, and amount are required" });
    }

    const [household, fee] = await Promise.all([
      Household.findById(household_id).populate("members"),
      Fee.findById(fee_id),
    ]);

    if (!household) {
      return res.status(404).json({ message: "Household not found" });
    }
    if (!fee) {
      return res.status(404).json({ message: "Fee not found" });
    }

    if (fee.is_compulsory) {
      const { amount: requiredAmount } = calculateCompulsoryFeeAmount(household);
      if (Number(amount) !== requiredAmount) {
        return res.status(400).json({
          message: "Invalid amount for compulsory fee",
          requiredAmount,
        });
      }
    }

    const transaction = await Transaction.create({
      household: household_id,
      fee: fee_id,
      amount,
      payment_date,
      notes,
    });

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

export const listTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find()
      .populate("household", "houseHoldID address")
      .populate("fee", "name is_compulsory year");
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};


export const getFeeStats = async (req, res, next) => {
  try {
    const feeId = req.params.id;

    const fee = await Fee.findById(feeId);
    if (!fee) {
      return res.status(404).json({ message: "Fee not found" });
    }

    const transactions = await Transaction.find({ fee: feeId })
      .populate("household", "houseHoldID address leader")
      .sort({ payment_date: -1 });

    const totalCollected = transactions.reduce(
      (sum, t) => sum + (t.amount || 0),
      0
    );

    const households = transactions.map((t) => ({
      transactionId: t._id,
      householdId: t.household?._id,
      houseHoldID: t.household?.houseHoldID,
      address: t.household?.address,
      amount: t.amount,
      payment_date: t.payment_date,
      notes: t.notes,
    }));

    res.status(200).json({
      feeId,
      feeName: fee.name,
      isCompulsory: fee.is_compulsory,
      totalCollected,
      households,
    });
  } catch (error) {
    next(error);
  }
};