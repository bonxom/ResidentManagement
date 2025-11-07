import { AppError } from "../middleware/AppError.js";
import { ERROR_CODE } from "../middleware/errorCode.js";
import Permission from "../models/Permission.js";
import Role from "../models/Role.js";
import mongoose from "mongoose";

export const createRole = async (req, res) => {
  const { role_name, permissions } = req.body;

  if (!role_name) {
    throw new AppError(ERROR_CODE.ROLE_NAME_REQUIRED);
  }

  if (await Role.findByName(role_name)) {
    throw new AppError(ERROR_CODE.ROLE_NAME_EXISTED);
  }

  if (!Array.isArray(permissions)) {
    throw new AppError(ERROR_CODE.PERMISSION_LIST_IVALID);
  }

  const perList = await Permission.findByListOfName(permissions);
  const role = await Role.create({
    role_name: role_name,
    permissions: perList,
  });

  res.status(200).json({
    message: "Created role",
    role
  });
}

export const getAllRoles = async (req, res) => {
  const roles = await Role.find().sort({ createAt: -1 });
  res.status(200).json({
    message: "Request success",
    roles
  });
}

export const getRole = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(ERROR_CODE.ROLE_ID_INVALID);
  }

  const role = await Role.findById(id);
  if (!role) throw new AppError(ERROR_CODE.ROLE_NOT_EXISTED);

  res.status(200).json({
    message: "Request success",
    role
  });
}

export const updateRole = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(ER)
  }
  const { role_name, permissions } = req.body;

  const role = await Role.findById(id);
  if (!role) throw new AppError(ERROR_CODE.ROLE_NOT_EXISTED);

  if (role_name !== undefined) {
    const duplicate = await Role.findByName(role_name);
    if (duplicate) {
      throw new AppError(ERROR_CODE.ROLE_NAME_EXISTED);
    }
    role.role_name = role_name;
  }

  if (!Array.isArray(permissions)) {
    throw new AppError(ERROR_CODE.PERMISSION_LIST_IVALID);
  }
  role.permissions = Permission.findByListOfName(permissions);

  await role.save();

  res.status(200).json({
    message: "Updated role",
    role
  });
}

export const deleteRole = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid role ID" });

  const role = await Role.findByIdAndDelete(id);
  if (!role) return res.status(404).json({ message: "Role not found" });
  // console.log(role.role_name);
  res.status(200).json({
    message: "Deleted role"
  })
}
