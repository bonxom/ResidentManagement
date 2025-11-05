import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware 1: "protect" - Xác thực người dùng
export const protect = async (req, res, next) => {
  let token;

  // 1. Đọc token từ header "Authorization"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Tách lấy token (format: "Bearer <token>")
      token = req.headers.authorization.split(" ")[1];

      // 2. Xác thực token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Lấy thông tin user từ ID trong token (đã có role)
      // Gắn user vào đối tượng 'req' để các hàm controller sau có thể dùng
      req.user = await User.findById(decoded.id).select("-password").populate("role");

      if (!req.user) {
         return res.status(401).json({ message: "Người dùng không tồn tại" });
      }

      next(); // Đi tiếp đến controller
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Token không hợp lệ, không có quyền truy cập" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Không tìm thấy token, không có quyền truy cập" });
  }
};


// Middleware 2: "authorize" - Phân quyền dựa trên vai trò
// (...roles) là một mảng các vai trò được phép
// Ví dụ: authorize('HAMLET LEADER', 'Kiểm toán')
export const authorize = (...roles) => {
  return (req, res, next) => {
    
    if (!req.user || !req.user.role) {
         return res.status(403).json({ 
            message: "Lỗi phân quyền, không tìm thấy vai trò." ,
            role: req.user  || "ok"
          });
    }

    // LẤY ROLE CỦA USER VÀ CHUYỂN SANG VIẾT HOA
    const userRole = req.user.role.role_name.toUpperCase();

    // CHUYỂN TẤT CẢ ROLE ĐƯỢC PHÉP (TỪ ROUTER) SANG VIẾT HOA
    const allowedRoles = roles.map(r => r.toUpperCase());

    // SO SÁNH HAI CHUỖI VIẾT HOA
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ 
        message: `Vai trò "${req.user.role.role_name}" không có quyền thực hiện hành động này` 
      });
    }
    
    next();
  };
};
