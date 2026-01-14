const mongoose = require("mongoose");
const GpsDeviceModel = require("./model");
const VehicleModel = require("../vehicle/model");
const paginate = require("../../helpers/limitoffset");
const Validator = require("../../helpers/validators");

/* --------------------------------------------------
   VALIDATION
-------------------------------------------------- */
const validateGpsDevice = async (data, isUpdate = false) => {
  const rules = {
    imei: isUpdate ? "string|min:10" : "required|string|min:10",
    model: "required|string|min:2",
    vendor: "string",
    status: "in:available,assigned,faulty",
  };

  const validator = new Validator(data, rules);
  await validator.validate();
};

/* --------------------------------------------------
   CREATE GPS DEVICE (STOCK ENTRY)
-------------------------------------------------- */
exports.create = async (req, res) => {
  try {
    await validateGpsDevice(req.body);

    const device = new GpsDeviceModel({
      ...req.body,
      status: "available",
      createdBy: req.user.id,
    });

    await device.save();

    res.status(201).json({
      status: true,
      message: "GPS device added to stock",
      data: device,
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
   GET ALL GPS DEVICES (LIST + FILTERS)
-------------------------------------------------- */
exports.getAll = async (req, res) => {
  try {
    const { status, model, vendor, page, limit, search } = req.query;

    let filter = { isActive: true };

    if (status) filter.status = status;
    if (model) filter.model = model;
    if (vendor) filter.vendor = vendor;

    const result = await paginate(
      GpsDeviceModel,
      filter,
      page,
      limit,
      ["assignedVehicle"],
      ["imei", "model", "vendor"],
      search
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

/* --------------------------------------------------
   GET AVAILABLE DEVICES (STOCK)
-------------------------------------------------- */
exports.getAvailable = async (req, res) => {
  try {
    const devices = await GpsDeviceModel.find({
      status: "available",
      isActive: true,
    });

    res.status(200).json({
      status: true,
      data: devices,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

/* --------------------------------------------------
   GET DEVICE BY ID
-------------------------------------------------- */
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ status: false, message: "Invalid ID" });
    }

    const device = await GpsDeviceModel.findById(id).populate(
      "assignedVehicle"
    );

    if (!device) {
      return res.status(404).json({ status: false, message: "Device not found" });
    }

    res.status(200).json({ status: true, data: device });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

/* --------------------------------------------------
   UPDATE DEVICE
-------------------------------------------------- */
exports.update = async (req, res) => {
  try {
    await validateGpsDevice(req.body, true);

    const device = await GpsDeviceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!device) {
      return res.status(404).json({ status: false, message: "Device not found" });
    }

    res.status(200).json({
      status: true,
      message: "Device updated successfully",
      data: device,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

/* --------------------------------------------------
   MARK DEVICE AS FAULTY
-------------------------------------------------- */
exports.markFaulty = async (req, res) => {
  try {
    const device = await GpsDeviceModel.findById(req.params.id);

    if (!device) {
      return res.status(404).json({ status: false, message: "Device not found" });
    }

    device.status = "faulty";
    device.assignedVehicle = null;

    await device.save();

    res.status(200).json({
      status: true,
      message: "Device marked as faulty",
      data: device,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

/* --------------------------------------------------
   ASSIGN DEVICE TO VEHICLE
-------------------------------------------------- */
exports.assignToVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.body;

    if (!mongoose.isValidObjectId(vehicleId)) {
      return res.status(400).json({ status: false, message: "Invalid vehicle ID" });
    }

    const device = await GpsDeviceModel.findById(req.params.id);
    const vehicle = await VehicleModel.findById(vehicleId);

    if (!device || !vehicle) {
      return res.status(404).json({ status: false, message: "Device or vehicle not found" });
    }

    if (device.status !== "available") {
      return res.status(400).json({ status: false, message: "Device not available" });
    }

    device.status = "assigned";
    device.assignedVehicle = vehicleId;
    device.assignedAt = new Date();

    await device.save();

    res.status(200).json({
      status: true,
      message: "Device assigned to vehicle",
      data: device,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

/* --------------------------------------------------
   UNASSIGN DEVICE
-------------------------------------------------- */
exports.unassignFromVehicle = async (req, res) => {
  try {
    const device = await GpsDeviceModel.findById(req.params.id);

    if (!device) {
      return res.status(404).json({ status: false, message: "Device not found" });
    }

    device.status = "available";
    device.assignedVehicle = null;

    await device.save();

    res.status(200).json({
      status: true,
      message: "Device unassigned successfully",
      data: device,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

/* --------------------------------------------------
   SOFT DELETE (DEACTIVATE)
-------------------------------------------------- */
exports.deactivate = async (req, res) => {
  try {
    const device = await GpsDeviceModel.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!device) {
      return res.status(404).json({ status: false, message: "Device not found" });
    }

    res.status(200).json({
      status: true,
      message: "Device deactivated",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

/* --------------------------------------------------
   HARD DELETE (SUPER ADMIN)
-------------------------------------------------- */
exports.remove = async (req, res) => {
  try {
    const result = await GpsDeviceModel.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ status: false, message: "Device not found" });
    }

    res.status(200).json({
      status: true,
      message: "Device permanently deleted",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
