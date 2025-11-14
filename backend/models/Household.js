import mongoose from "mongoose";

const householdSchema = new mongoose.Schema(
  {
    houseHoldID: {
      type: String,
      required: [true, "Household ID is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Household leader is required"],
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

householdSchema.pre("save", function (next) {
  if ((this.isModified("leader") || this.isModified("members")) && this.leader) {
    const leaderId = this.leader.toString();
    const hasLeader = (this.members || []).some(
      (member) => member?.toString() === leaderId
    );
    if (!hasLeader) {
      this.members.push(this.leader);
    }
  }
  next();
});

const Household = mongoose.model("Household", householdSchema);
export default Household;
