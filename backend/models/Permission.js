import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    permission_name: {
      type: String,
      required: true,
      unique: true,
      unique: true,      // sẽ tạo unique index
      uppercase: true,   // lưu dưới dạng chữ hoa
      trim: true,
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
    }
  },
  {
    timestamps: true,
  }
)

permissionSchema.statics.findByName = function(name) {
  return this.findOne({ permission_name: name }, null, { runSettersOnQuery: true });
};

permissionSchema.statics.findByListOfName = async function (names) {
  if (!Array.isArray(names) || names.length === 0) return [];
  const perList = [];
  for (const permission_name of names) {
    const permission = await this.findOne({ permission_name });
    if (permission) {
      perList.push(permission);
    }
  }
  return perList;
}

export default mongoose.model("Permission", permissionSchema);
