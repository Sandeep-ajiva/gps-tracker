const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Organisation reference
    // SuperAdmin → null
    // Others     → organisationId
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      default: null,
    },

    // 🔹 Basic user details
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    //  Role-based access
    role: {
      type: String,
      enum: ["superadmin", "admin", "hr", "driver", "viewer"],
      required: true,
    },

    //  User status
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    //  Driver-specific (ONLY for driver role)
    assignedVehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null,
    },

    // Audit
    lastLoginAt: {
      type: Date,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);
