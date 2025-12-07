import User from "../models/User.js";
import Household from "../models/Household.js";
import Transaction from "../models/Transaction.js";
import Fee from "../models/Fee.js";

// @desc    Lấy số liệu tổng quan cho Dashboard
// @route   GET /api/stats/dashboard
export const getDashboardStats = async (req, res) => {
  try {
    // 1. Đếm nhân khẩu
    const totalUsers = await User.countDocuments({ status: "VERIFIED" });
    
    // 2. Đếm hộ khẩu
    const totalHouseholds = await Household.countDocuments({});

    // 3. Tổng tiền đã thu (Tất cả các đợt)
    const allTransactions = await Transaction.find({});
    const totalRevenue = allTransactions.reduce((sum, t) => sum + t.amount, 0);

    // 4. Đếm khoản thu đang mở
    const activeFees = await Fee.countDocuments({ status: "ACTIVE" });

    // 5. Thống kê nhanh: Nam/Nữ (Vẽ biểu đồ tròn)
    const males = await User.countDocuments({ sex: "Nam" });
    const females = await User.countDocuments({ sex: "Nữ" });

    res.status(200).json({
      demographics: {
        total_users: totalUsers,
        total_households: totalHouseholds,
        gender: { male: males, female: females }
      },
      financial: {
        total_revenue: totalRevenue,
        active_campaigns: activeFees
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};