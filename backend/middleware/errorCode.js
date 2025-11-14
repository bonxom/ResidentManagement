export const ERROR_CODE = {
  UNCATEGORIZED_EXCEPTION: {
    code: 9999,
    message: "Uncategorized error",
    statusCode: 500,
  },

  //ROLE
  ROLE_ID_INVALID: {
    code: 1000,
    message: "Role ID must be a mongoose.Types.ObjectId",
    statusCode: 400,
  },

  ROLE_NAME_REQUIRED: {
    code: 1001,
    message: "Role name is required",
    statusCode: 400,
  },

  ROLE_NAME_EXISTED: {
    code: 1002,
    message: "Role name already exists",
    statusCode: 400,
  },

  ROLE_NOT_EXISTED: {
    code: 1003,
    message: "Role not existed",
    statusCode: 404,
  },

  //PERMISSION
  PERMISSION_LIST_IVALID: {
    code: 2000,
    message: "Input permission must be an array",
    statusCode: 400,
  },

  PERMISSION_NOT_EXISTED: {
    code: 2001,
    message: "Permission does not exist",
    statusCode: 404,
  },

  PERMISSION_NAME_REQUIRED: {
    code: 2002,
    message: "Permission name is required",
    statusCode: 400,
  },

  PERMISSION_NAME_EXISTED: {
    code: 2003,
    message: "Permission name already exists",
    statusCode: 400,
  },

  PERMISSION_ID_INVALID: {
    code: 2004,
    message: "Permission ID must be a mongoose.Types.ObjectId",
    statusCode: 400,
  },
  //Không có quyền truy cập route
  FORBIDDEN: {
    code: 3000,
    message: "You do not have permission to access this resource",
    statusCode: 403,
  },

  //Thiếu req.user (chưa đăng nhập)
  UNAUTHORIZED: {
    code: 3001,
    message: "Authentication required",
    statusCode: 401,
  },
  //Missing role in user
  USER_ROLE_NOT_FOUND: {
    code: 3002,
    message: "User role not found",
    statusCode: 403,
  },
  //Lỗi liên quan đến User
  //User không tồn tại
  USER_NOT_EXISTED: {
    code: 4000,
    message: "User not existed",
    statusCode: 404,
  },
  USER_ID_INVALID: {
    code: 4001,
    message: "User ID must be a mongoose.Types.ObjectId",
    statusCode: 400,
  },
  //Email existed
  USER_EMAIL_EXISTED: {
    code: 4002,
    message: "Email already exists",
    statusCode: 400,
  },
  //Lỗi Authentication (JWT, login)

  TOKEN_MISSING: {
    code: 5000,
    message: "Authorization token is missing",
    statusCode: 401,
  },
  TOKEN_INVALID: {
    code: 5001,
    message: "Token is invalid",
    statusCode: 401,
  },
  TOKEN_EXPIRED: {
    code: 5002,
    message: "Token has expired",
    statusCode: 401,
  },
  MISSING_FIELDS: {
    code: 6000,
    message: "Missing required fields",
    statusCode: 400,
  },
  INVALID_PAYLOAD: {
    code: 6001,
    message: "Invalid request payload",
    statusCode: 400,
  },
};
