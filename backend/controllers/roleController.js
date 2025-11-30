import { AppError } from "../middleware/AppError.js";
import { ERROR_CODE } from "../middleware/errorCode.js";
import Permission from "../models/Permission.js";
import Role from "../models/Role.js";
import mongoose from "mongoose";

// @desc    Create a new role
// @route   POST /roles
// @access  Private (Admin)
export const createRole = async (req, res) => {
  const { role_name, permissions } = req.body;
  // check input
  if (!role_name) {
    throw new AppError(ERROR_CODE.ROLE_NAME_REQUIRED);
  }

  if (await Role.findByName(role_name)) {
    throw new AppError(ERROR_CODE.ROLE_NAME_EXISTED);
  }

  if (permissions !== undefined && !Array.isArray(permissions)) {
    throw new AppError(ERROR_CODE.PERMISSION_LIST_INVALID);
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

// @desc    Get all roles
// @route   GET /roles
// @access  Private (Admin)
export const getAllRoles = async (req, res) => {
  const roles = await Role.find().sort({ createdAt: -1 });
  res.status(200).json({
    message: "Request success",
    roles
  });
}

// @desc    Get role by ID
// @route   GET /roles/:id
// @access  Private (Admin)
export const getRole = async (req, res) => {
  const { id } = req.params;
  // ID must be a mongoose ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(ERROR_CODE.ROLE_ID_INVALID);
  }
  // check if role is existed
  const role = await Role.findById(id);
  if (!role) throw new AppError(ERROR_CODE.ROLE_NOT_EXISTED);

  res.status(200).json({
    message: "Request success",
    role
  });
}

// @desc    Update an existing role
// @route   PUT /roles/:id
// @access  Private (Admin)
export const updateRole = async (req, res) => {
  const { id } = req.params;
  // ID must be a mongoose ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(ERROR_CODE.ROLE_ID_INVALID)
  }
  // check input
  const { role_name, permissions } = req.body;

  const role = await Role.findById(id);
  if (!role) throw new AppError(ERROR_CODE.ROLE_NOT_EXISTED);

  if (role_name !== undefined) {
    const duplicate = await Role.findByName(role_name);
    if (duplicate && duplicate._id.toString() !== id) {
      throw new AppError(ERROR_CODE.ROLE_NAME_EXISTED);
    }
    // role_name is provided and not duplicated
    role.role_name = role_name;
  }

  if (permissions !== undefined) {
    if (!Array.isArray(permissions)) {
      throw new AppError(ERROR_CODE.PERMISSION_LIST_INVALID);
    }
    role.permissions = await Permission.findByListOfName(permissions);
  }

  await role.save();

  res.status(200).json({
    message: "Updated role",
    role
  });
}

// @desc    Delete a role
// @route   DELETE /roles/:id
// @access  Private (Admin)
export const deleteRole = async (req, res) => {
  const { id } = req.params;
  // ID must be a mongoose ID
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid role ID" });

  const role = await Role.findByIdAndDelete(id);
  if (!role) return res.status(404).json({ message: "Role not found" });
  // console.log(role.role_name);
  res.status(200).json({
    message: "Deleted role"
  })
}
