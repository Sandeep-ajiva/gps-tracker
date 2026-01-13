const { ajModel } = require("../../common/classes/Model");
const mongoose = require("mongoose");

const gpsDeviceSchema = {
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },

  imei: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  model: {
    type: String,
    trim: true,
  },

  manufacturer: {
    type: String,
    trim: true,
  },

  simNumber: {
    type: String,
    trim: true,
  },

  status: {
    type: String,
    enum: ["stock", "assigned", "faulty"],
    default: "stock",
  },
};

const GpsDeviceModel = new ajModel(
  "GpsDevice",
  gpsDeviceSchema
).getModel();

module.exports = GpsDeviceModel;
