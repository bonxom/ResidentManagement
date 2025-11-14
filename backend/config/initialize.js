import Permission from "../models/Permission.js";
import Role from "../models/Role.js";
import User from "../models/User.js";

const INIT_PERMISSIONS = {
  //user
  "DELETE USER" : "Delete a user account"  ,
  "EDIT USER" : "Update user information"  ,
  "VIEW USER LIST": "See the list of users"  ,
  "VIEW USER": "See a user's profile"  ,
  "DEACTIVATE USER": "Disable an account without deleting"  ,
  "VERIFY USER": "Verify user information"  ,
  "RESET USER PASSWORD": "Reset a user's password"  ,
  "ASSIGN ROLES": "Assign roles to a user"  ,
  "CREATE ACCOUNT": "Create a accountant acc or user acc"  ,
  "MANAGE USER PERMISSIONS": "Grant/revoke permissions for a specific user"  ,
  //permission
  "VIEW PERMISSIONS" :"See all permissions"  ,
  "CREATE PERMISSION": "Create a permission"  ,
  "EDIT PERMISSION" : "Edit permission details"  ,
  "DELETE PERMISSION" : "Delete a permission"  ,
  //role
  "VIEW ROLES": "See all roles"  ,
  "CREATE ROLE": "Create a role"  ,
  "EDIT ROLE": "Edit role details"  ,
  "DELETE ROLE": "Delete a role"  ,
  //household
  "CHANGE HOUSEHOLD LEADER" : "Change household leader" ,
  "VIEW HOUSEHOLD LIST": "See households"  ,
  "VIEW HOUSEHOLD": "See household details"  ,
  "CREATE HOUSEHOLD": "Create a household"  ,
  "EDIT HOUSEHOLD": "Edit household information"  ,
  "DELETE HOUSEHOLD": "Delete a household" ,
}

const INIT_ROLES = {
  "HAMLET LEADER": [
    // user
    "DELETE USER",
    "EDIT USER",
    "VIEW USER LIST",
    "VIEW USER",
    "DEACTIVATE USER",
    "VERIFY USER",
    "RESET USER PASSWORD",
    "ASSIGN ROLES",
    "CREATE ACCOUNT",
    "MANAGE USER PERMISSIONS",
    // permission
    "VIEW PERMISSIONS",
    "CREATE PERMISSION",
    "EDIT PERMISSION",
    "DELETE PERMISSION",
    // role
    "VIEW ROLES",
    "CREATE ROLE",
    "EDIT ROLE",
    "DELETE ROLE",
    // household
    "CHANGE HOUSEHOLD LEADER",
    "VIEW HOUSEHOLD LIST",
    "VIEW HOUSEHOLD",
    "CREATE HOUSEHOLD",
    "EDIT HOUSEHOLD",
    "DELETE HOUSEHOLD"
  ],

  "ACCOUNTANT": [
    "VIEW USER LIST",
    "VIEW USER",
    "VIEW PERMISSIONS",
    "VIEW ROLES",
    "VIEW HOUSEHOLD LIST",
    "VIEW HOUSEHOLD",
  ],

  "HOUSE MEMBER": [
    "VIEW USER",
    "VIEW HOUSEHOLD"
  ]
};

const initPermissions = async () => {
  for (const [per, des] of Object.entries(INIT_PERMISSIONS)) {
    const existPer = await Permission.findByName(per);
    if (existPer) continue;

    await Permission.create({
      permission_name: per,
      description: des,
    });

    console.log("INIT_per: ", per);
  }
}

const initRoles = async () => {
  for (const [role, permissions] of Object.entries(INIT_ROLES)) {
    const exitRole = await Role.findByName(role);
    if (exitRole) continue;

    const perList = await Permission.findByListOfName(permissions)
    await Role.create({
      role_name : role,
      permissions: perList 
    });

    console.log("INIT_role: ", role);
  }
}

const initAdmin = async () => {
  const existAdmin = await User.findByEmail("admin@res.com");
  if (!existAdmin) {
    console.log("INIT admin");
    const hamletRole = await Role.findByName("HAMLET LEADER")
    if (!hamletRole) {
      console.warn('[seed] Missing role "HAMLET LEADER". Seed roles before initAdmin().');
      return;
    }

    await User.create({
      email: "admin@res.com",
      userCardID: 1,
      password: "123456",
      name: "admin",
      role: hamletRole._id,
    });

    console.log(
      "INIT_ADMIN: Create admin account\n" +
      "email: admin@res.com\npassword: 123456\n" +
      "Please change admin's password to secure your system"
    );  
  }
}

export const defaultInit = async () => {
  await initPermissions();
  await initRoles();
  await initAdmin();
};

