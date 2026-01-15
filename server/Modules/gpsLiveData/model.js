const { ajModel } = require("../../common/classes/Model");
const mongoose = require("mongoose");

const gpsLiveDataSchema = {
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

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
    speed: Number,
    ignition: Boolean,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
};

const GpsLiveDataModel = new ajModel(
  "GpsLiveData",
  gpsLiveDataSchema
).getModel();

module.exports = GpsLiveDataModel;
