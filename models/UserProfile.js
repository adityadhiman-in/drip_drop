import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming there's a User schema that stores login information
    required: true,
  },
  waterEnergy: {
    type: Number,
    default: 0,
  },
  aquacoins: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  townProgress: {
    type: Object,
    default: {
      houses: 0,
      farms: 0,
      waterTanks: 0,
      otherUpgrades: [],
    },
  },
  gamesPlayed: {
    type: Array,
    default: [],
  },
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
export default UserProfile;
