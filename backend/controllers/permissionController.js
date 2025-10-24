import Permission from "../models/Permission.js";

export const createPermission = async (req, res) => {
  const { permission_name, description } = req.body;
  if (!permission_name) {
    return res.status(400).json({ message: "Permission name is required"});
  }
  const permission = await Permission.create({
    permission_name: permission_name,
    description: description
  });
  res.status(201).json(permission)     
}