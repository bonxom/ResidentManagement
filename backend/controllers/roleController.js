import Permission from "../models/Permission.js";
import Role from "../models/Role.js";
import mongoose from "mongoose";

export const createRole = async (req, res) => {
  const { role_name, permissions } = req.body;

  if (!role_name) {
    return res.status(404).json({ message: "Role name is required"});
  }

  if (await Role.findOne({ role_name })) {
    return res.status(400).json({ message: "Role name already exists"})
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
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid role ID" });

  const role = await Role.findById(id);
  if (!role) return res.status(404).json({message: "Role not found"});

  res.status(200).json({
    message: "Request success",
    role
  });
}

export const updateRole = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid role ID" });
  const { role_name, permissions } = req.body;

  const role = await Role.findById(id);
  if (!role) return res.status(404).json({ message: "Role not found" });

  if (await Role.findOne({ role_name })) {
    return res.status(400).json({ message: "Role name already exists"})
  }



  if (role_name !== undefined) role.role_name = role_name;
  role.permissions = await Permission.findByListOfName(permissions);
  await role.save();

  res.status(200).json({
    message: "Updated role",
    role
  });
}

export const deleteRole = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid role ID" });

  const role = Role.findByIdAndDelete(id);
  if (!role) return res.status(404).json({ message: "Role not found" });

  res.status(200).json({
    message: "Deleted role"
  })
}