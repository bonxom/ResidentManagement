import RegistrationRequest from "../../models/Request/RegistrationRequest.js";
import User from "../../models/User.js";
import Role from "../../models/Role.js";

export const register = async (req, res, next) => {
  try {
    const { email, password, name, sex, dob, location, phoneNumber, userCardID } =
      req.body;

    if (!email || !password || !name || !userCardID) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }

    const [userExists, userCardExists, pendingEmail, pendingCard] =
      await Promise.all([
        User.findByEmail(email),
        User.findByUserCardID(userCardID),
        RegistrationRequest.findOne({ email: email.toLowerCase() }),
        RegistrationRequest.findOne({ userCardID }),
      ]);

    if (userExists || pendingEmail) {
      return res.status(400).json({ message: "Email đã tồn tại hoặc đang chờ duyệt" });
    }
    if (userCardExists || pendingCard) {
      return res.status(400).json({ message: "User card ID đã tồn tại hoặc đang chờ duyệt" });
    }

    await RegistrationRequest.create({
      email,
      password,
      name,
      sex,
      dob,
      location,
      phoneNumber,
      userCardID,
      status: "PENDING",
    });

    res
      .status(201)
      .json({ message: "Yêu cầu đăng ký đã được gửi và đang chờ duyệt" });
  } catch (error) {
    next(error);
  }
};

export const getAllRequests = async (req, res, next) => {
  try {
    const requests = await RegistrationRequest.find({ status: "PENDING" }).select(
      "+password"
    );
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

export const approveRequest = async (req, res, next) => {
  try {
    const request = await RegistrationRequest.findById(req.params.id).select(
      "+password"
    );
    if (!request || request.status !== "PENDING") {
      return res.status(404).json({ message: "Request không hợp lệ hoặc đã xử lý" });
    }

    const defaultRole = await Role.findByName("HOUSE MEMBER");
    if (!defaultRole) {
      return res.status(500).json({ message: "Thiếu vai trò mặc định HOUSE MEMBER" });
    }

    // Tạo user mới với password đã được hash sẵn trong RegistrationRequest.
    const user = new User({
      email: request.email,
      userCardID: request.userCardID,
      password: request.password,
      name: request.name,
      sex: request.sex,
      dob: request.dob,
      location: request.location,
      phoneNumber: request.phoneNumber,
      role: defaultRole._id,
    });
    user.$locals.skipHash = true; // tránh hash lần 2
    await user.save();

    request.status = "APPROVED";
    await request.save();

    res.status(201).json({
      _id: user._id,
      email: user.email,
      userCardID: user.userCardID,
      name: user.name,
      role: defaultRole.role_name,
    });
  } catch (error) {
    next(error);
  }
};

export const rejectRequest = async (req, res, next) => {
  try {
    const request = await RegistrationRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request không tồn tại" });
    }

    request.status = "REJECTED";
    await request.save();

    res.status(200).json({ message: "Đã từ chối yêu cầu" });
  } catch (error) {
    next(error);
  }
};
