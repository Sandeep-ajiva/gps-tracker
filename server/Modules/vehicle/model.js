const { ajModel } = require("../../common/classes/Model");
const mongoose = require("mongoose");

const vehicleSchema = {
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },

  vehicleNumber: {
    type: String,
    required: true,
    trim: true,
  },

  vehicleType: {
    type: String,
    enum: ["car", "bus", "truck"],
    required: true,
  },

  model: {
    type: String,
    trim: true,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
};

const VehicleModel = new ajModel("Vehicle", vehicleSchema).getModel();
module.exports = VehicleModel;
