const mongoose = require("mongoose");
const VehicleDeviceMappingModel = require("./model");
const VehicleModel = require("../vehicle/model");
const GpsDeviceModel = require("../gpsDevice/model");
const paginate = require("../../helpers/limitoffset");
const Validator = require("../../helpers/validators");

/* --------------------------------------------------
   VALIDATION
-------------------------------------------------- */
const validateAssign = async (data) => {
  const rules = {
    vehicleId: "required|string",
    deviceId: "required|string",
  };

  const validator = new Validator(data, rules);
  await validator.validate();
};

/* --------------------------------------------------
   ASSIGN GPS DEVICE TO VEHICLE (CREATE MAPPING)
-------------------------------------------------- */
exports.assign = async (req, res) => {
  try {
    await validateAssign(req.body);

    const { vehicleId, deviceId } = req.body;

    if (
      !mongoose.isValidObjectId(vehicleId) ||
      !mongoose.isValidObjectId(deviceId)
    ) {
      return res.status(400).json({
        status: false,
        message: "Invalid vehicle or device ID",
      });
    }

    const vehicle = await VehicleModel.findById(vehicleId);
    const device = await GpsDeviceModel.findById(deviceId);

    if (!vehicle || !device) {
      return res.status(404).json({
        status: false,
        message: "Vehicle or GPS device not found",
      });
    }

    if (device.status !== "available") {
      return res.status(400).json({
        status: false,
        message: "GPS device is not available",
      });
    }

    // Create mapping
    const mapping = new VehicleDeviceMappingModel({
      vehicle: vehicleId,
      device: deviceId,
      assignedBy: req.user.id,
      assignedAt: new Date(),
      isActive: true,
    });

    await mapping.save();

    // Update device state
    device.status = "assigned";
    device.assignedVehicle = vehicleId;
    await device.save();

    res.status(201).json({
      status: true,
      message: "GPS device assigned to vehicle",
      data: mapping,
    });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        status: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }
    res.status(500).json({ status: false, message: error.message });
  }
};

/* --------------------------------------------------
   GET ALL MAPPINGS (HISTORY + FILTERS)
-------------------------------------------------- */
exports.getAll = async (req, res) => {
  try {
    const { vehicle, device, page, limit, search } = req.query;

    let filter = {};

    if (vehicle) filter.vehicle = vehicle;
    if (device) filter.device = device;

    const result = await paginate(
      VehicleDeviceMappingModel,
      filter,
      page,
      limit,
      ["vehicle", "device"],
      [],
      search
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

/* --------------------------------------------------
   GET MAPPING BY ID
-------------------------------------------------- */
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ status: false, message: "Invalid ID" });
    }

    const mapping = await VehicleDeviceMappingModel.findById(id)
      .populate("vehicle")
      .populate("device");

    if (!mapping) {
      return res.status(404).json({
        status: false,
        message: "Mapping not found",
      });
    }

    res.status(200).json({ status: true, data: mapping });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

/* --------------------------------------------------
   GET DEVICE HISTORY OF A VEHICLE
-------------------------------------------------- */
exports.getByVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ status: false, message: "Invalid vehicle ID" });
    }

    const mappings = await VehicleDeviceMappingModel.find({ vehicle: id })
      .populate("device")
      .sort({ assignedAt: -1 });

    res.status(200).json({
      status: true,
      data: mappings,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

/* --------------------------------------------------
   GET VEHICLE HISTORY OF A DEVICE
-------------------------------------------------- */
exports.getByDevice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ status: false, message: "Invalid device ID" });
    }

    const mappings = await VehicleDeviceMappingModel.find({ device: id })
      .populate("vehicle")
      .sort({ assignedAt: -1 });

    res.status(200).json({
      status: true,
      data: mappings,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

/* --------------------------------------------------
   UNASSIGN GPS DEVICE
-------------------------------------------------- */
exports.unassign = async (req, res) => {
  try {
    const mapping = await VehicleDeviceMappingModel.findById(req.params.id);

    if (!mapping || !mapping.isActive) {
      return res.status(404).json({
        status: false,
        message: "Active mapping not found",
      });
    }

    mapping.isActive = false;
    mapping.unassignedAt = new Date();
    mapping.unassignedBy = req.user.id;

    await mapping.save();

    // Update device back to stock
    await GpsDeviceModel.findByIdAndUpdate(mapping.device, {
      status: "available",
      assignedVehicle: null,
    });

    res.status(200).json({
      status: true,
      message: "GPS device unassigned successfully",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

/* --------------------------------------------------
   HARD DELETE MAPPING (SUPER ADMIN)
-------------------------------------------------- */
exports.remove = async (req, res) => {
  try {
    const mapping = await VehicleDeviceMappingModel.findByIdAndDelete(
      req.params.id
    );

    if (!mapping) {
      return res.status(404).json({
        status: false,
        message: "Mapping not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Mapping permanently deleted",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
