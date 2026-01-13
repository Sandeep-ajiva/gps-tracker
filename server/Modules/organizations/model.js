const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    address: {
      type: String,
      default: "",
    },

    // Status of organisation
    status: {
      type: String,
      enum: ["pending", "active", "suspended", "expired"],
      default: "active",
    },

    // SUB-ORGANIZATION SUPPORT
    // null  → Parent Organization
    // value → Sub Organization
    parentOrganizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      default: null,
    },

    // Who created this organization
    // Super Admin → Parent Org
    // Org Admin   → Sub Org
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Organization", organizationSchema);
