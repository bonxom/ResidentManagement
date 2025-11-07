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
    statusCode: 400
  },

  ROLE_NAME_EXISTED: {
    code: 1002,
    message: "Role name already exists",
    statusCode: 400
  },

  ROLE_NOT_EXISTED: {
    code: 1003,
    message: "Role not existed",
    statusCode: 404
  },

  //PERMISSION
  PERMISSION_LIST_IVALID: {
    code: 2000,
    message: "Input permission must be an array",
    statusCode: 400
  }
}