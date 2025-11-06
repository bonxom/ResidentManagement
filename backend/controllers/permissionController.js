import mongoose from "mongoose";
import Permission from "../models/Permission.js";

export const createPermission = async (req, res) => {
  const { permission_name, description } = req.body;

  if (!permission_name) {
    return res.status(404).json({ message: "Permission name is required"});
  }
  
  if (await Permission.findOne({ permission_name })) {
    return res.status(400).json({ message: "Permission name already exists"});
  }

  const permission = await Permission.create({
    permission_name: permission_name,
    description: description
  });
  res.status(200).json({
    message: "Created permission",
    permission
  })     
}

export const getAllPermission = async (req, res) => {
  const permissions =  await Permission.find().sort({ createdAt: -1 });
  res.status(200).json({
    message: "Request success",
    permissions
  });
}

export const getPermission = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid permission ID" });

  const permission = await Permission.findById(id);
  if (!permission) return res.status(404).json({ message: "Permission not found" });

  res.status(200).json({
    message: "Request success",
    permission
  });
}

export const updatePermission = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid permission ID" });
  const { permission_name, description } = req.body;

  const permission = await Permission.findById(id);
  if (!permission) return res.status(404).json({message: "Permission not found"});

  if (await Permission.findOne({ permission_name })) {
    return res.status(400).json({ message: "Permission name already exists"});
  }
  
  if (permission_name !== undefined) permission.permission_name = permission_name;
  if (description !== undefined) permission.description = description;

  await permission.save();
  res.status(200).json({
    message: "Updated permission",
    permission
  });
}

export const deletePermission = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid permission ID" });
  
  const permission = await Permission.findByIdAndDelete(id);
  if (!permission) return res.status(404).json({message: "Permission not found"});

  res.status(200).json({
    message: "Deleted permission"
  })
}
