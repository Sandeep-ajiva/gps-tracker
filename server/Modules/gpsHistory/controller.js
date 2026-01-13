const { ajModel } = require("../../common/classes/Model");
const mongoose = require("mongoose");

const gpsHistorySchema = {
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },

  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },

  gpsDeviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GpsDevice",
    required: true,
  },

  latitude: Number,
  longitude: Number,
  speed: Number,
  ignition: Boolean,

  recordedAt: {
    type: Date,
    default: Date.now,
  },
};

const GpsHistoryModel = new ajModel(
  "GpsHistory",
  gpsHistorySchema
).getModel();

module.exports = GpsHistoryModel;
