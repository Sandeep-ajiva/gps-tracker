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
    gpsDeviceId: "required|string",
  };

  const validator = new Validator(data, rules);
  await validator.validate();
};

/* --------------------------------------------------
   ASSIGN GPS DEVICE TO VEHICLE
-------------------------------------------------- */
exports.assign = async (req, res) => {
  try {
    await validateAssign(req.body);

    const { vehicleId, gpsDeviceId } = req.body;

    if (
      !mongoose.isValidObjectId(vehicleId) ||
      !mongoose.isValidObjectId(gpsDeviceId)
    ) {
      return res.status(400).json({
        status: false,
        message: "Invalid vehicle or GPS device ID",
      });
    }

    const vehicle = await VehicleModel.findById(vehicleId);
    const device = await GpsDeviceModel.findById(gpsDeviceId);

    if (!vehicle || !device) {
      return res.status(404).json({
        status: false,
        message: "Vehicle or GPS device not found",
      });
    }

    if (device.status !== "stock") {
      return res.status(400).json({
        status: false,
        message: "GPS device is not in stock",
      });
    }

    // Create mapping (IMPORTANT: use schema field names)
    const mapping = new VehicleDeviceMappingModel({
      vehicleId,
      gpsDeviceId,
      organizationId: vehicle.organizationId || null,
      assignedAt: new Date(),
      isActive: true,
    });

    await mapping.save();

    // Update device status
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

    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

/* --------------------------------------------------
   GET ALL MAPPINGS (LIST + FILTERS)
-------------------------------------------------- */
exports.getAll = async (req, res) => {
  try {
    const { vehicleId, gpsDeviceId, page, limit, search } = req.query;

    const filter = {};
    if (vehicleId) filter.vehicleId = vehicleId;
    if (gpsDeviceId) filter.gpsDeviceId = gpsDeviceId;

    const result = await paginate(
      VehicleDeviceMappingModel,
      filter,
      page,
      limit,
      ["vehicleId", "gpsDeviceId"],
      [],
      search
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

/* --------------------------------------------------
   GET MAPPING BY ID
-------------------------------------------------- */
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid mapping ID",
      });
    }

    const mapping = await VehicleDeviceMappingModel.findById(id)
      .populate("vehicleId")
      .populate("gpsDeviceId");

    if (!mapping) {
      return res.status(404).json({
        status: false,
        message: "Mapping not found",
      });
    }

    res.status(200).json({
      status: true,
      data: mapping,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

/* --------------------------------------------------
   GET DEVICE HISTORY OF A VEHICLE
-------------------------------------------------- */
exports.getByVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid vehicle ID",
      });
    }

    const mappings = await VehicleDeviceMappingModel.find({ vehicleId: id })
      .populate("gpsDeviceId")
      .sort({ assignedAt: -1 });

    res.status(200).json({
      status: true,
      data: mappings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

/* --------------------------------------------------
   GET VEHICLE HISTORY OF A DEVICE
-------------------------------------------------- */
exports.getByDevice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid GPS device ID",
      });
    }

    const mappings = await VehicleDeviceMappingModel.find({ gpsDeviceId: id })
      .populate("vehicleId")
      .sort({ assignedAt: -1 });

    res.status(200).json({
      status: true,
      data: mappings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
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
    await mapping.save();

    await GpsDeviceModel.findByIdAndUpdate(mapping.gpsDeviceId, {
      status: "stock",
      assignedVehicle: null,
    });

    res.status(200).json({
      status: true,
      message: "GPS device unassigned successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

/* --------------------------------------------------
   HARD DELETE MAPPING
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
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
