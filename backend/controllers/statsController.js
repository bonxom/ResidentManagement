import Transaction from "../models/Transaction.js";
import Fee from "../models/Fee.js";

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
