const mongoose = require("mongoose");
const MappingModel = require("./model");
const VehicleModel = require("../vehicle/model");
const GpsDeviceModel = require("../gpsDevice/model");
const paginate = require("../../helpers/limitoffset");
const Validator = require("../../helpers/validators");

/* ---------------- VALIDATION ---------------- */
const validateAssign = async (data) => {
  const rules = {
    vehicleId: "required|string",
    deviceId: "required|string",
  };
  const validator = new Validator(data, rules);
  await validator.validate();
};

/* ---------------- ASSIGN ---------------- */
exports.assign = async (req, res) => {
  try {
    await validateAssign(req.body);

    const { vehicleId, deviceId } = req.body;

    if (
      !mongoose.isValidObjectId(vehicleId) ||
      !mongoose.isValidObjectId(deviceId)
    ) {
      return res.status(400).json({ message: "Invalid IDs" });
    }

    const vehicle = await VehicleModel.findById(vehicleId);
    const device = await GpsDeviceModel.findById(deviceId);

    if (!vehicle || !device) {
      return res.status(404).json({ message: "Vehicle or Device not found" });
    }

    // 🔒 ORG CHECK
    if (
      req.user.role !== "superadmin" &&
      (vehicle.organizationId.toString() !== req.orgId.toString() ||
        device.organizationId.toString() !== req.orgId.toString())
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // 1 DEVICE → 1 VEHICLE
    const activeDeviceMap = await MappingModel.findOne({
      device: deviceId,
      isActive: true,
    });
    if (activeDeviceMap) {
      return res.status(400).json({ message: "Device already assigned" });
    }

    // 1 VEHICLE → 1 DEVICE
    const activeVehicleMap = await MappingModel.findOne({
      vehicle: vehicleId,
      isActive: true,
    });
    if (activeVehicleMap) {
      return res.status(400).json({ message: "Vehicle already has a device" });
    }

    if (device.status !== "stock") {
      return res.status(400).json({ message: "Device not available" });
    }

    const mapping = await MappingModel.create({
      vehicle: vehicleId,
      device: deviceId,
      organizationId: vehicle.organizationId,
      assignedBy: req.user.userId,
      assignedAt: new Date(),
      isActive: true,
    });

    device.status = "assigned";
    device.assignedVehicle = vehicleId;
    await device.save();

    res.status(201).json({
      status: true,
      message: "Device assigned to vehicle",
      data: mapping,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- GET ALL ---------------- */
exports.getAll = async (req, res) => {
  const filter = {};

  if (req.user.role !== "superadmin") {
    filter.organizationId = req.orgId;
  }

  const result = await paginate(
    MappingModel,
    filter,
    req.query.page,
    req.query.limit,
    ["vehicle", "device"],
    [],
    req.query.search
  );

  res.json(result);
};

/* ---------------- GET BY ID ---------------- */
exports.getById = async (req, res) => {
  const mapping = await MappingModel.findById(req.params.id)
    .populate("vehicle")
    .populate("device");

  if (!mapping) return res.status(404).json({ message: "Not found" });

  if (
    req.user.role !== "superadmin" &&
    mapping.organizationId.toString() !== req.orgId.toString()
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json({ status: true, data: mapping });
};

/* ---------------- GET BY VEHICLE ---------------- */
exports.getByVehicle = async (req, res) => {
  const vehicle = await VehicleModel.findById(req.params.id);
  if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

  if (
    req.user.role !== "superadmin" &&
    vehicle.organizationId.toString() !== req.orgId.toString()
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const mappings = await MappingModel.find({ vehicle: req.params.id })
    .populate("device")
    .sort({ assignedAt: -1 });

  res.json({ status: true, data: mappings });
};

/* ---------------- GET BY DEVICE ---------------- */
exports.getByDevice = async (req, res) => {
  const device = await GpsDeviceModel.findById(req.params.id);
  if (!device) return res.status(404).json({ message: "Device not found" });

  if (
    req.user.role !== "superadmin" &&
    device.organizationId.toString() !== req.orgId.toString()
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const mappings = await MappingModel.find({ device: req.params.id })
    .populate("vehicle")
    .sort({ assignedAt: -1 });

  res.json({ status: true, data: mappings });
};

/* ---------------- UNASSIGN ---------------- */
exports.unassign = async (req, res) => {
  const mapping = await MappingModel.findById(req.params.id);

  if (!mapping || !mapping.isActive) {
    return res.status(404).json({ message: "Active mapping not found" });
  }

  if (
    req.user.role !== "superadmin" &&
    mapping.organizationId.toString() !== req.orgId.toString()
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  mapping.isActive = false;
  mapping.unassignedAt = new Date();
  mapping.unassignedBy = req.user.userId;
  await mapping.save();

  await GpsDeviceModel.findByIdAndUpdate(mapping.device, {
    status: "stock",
    assignedVehicle: null,
  });

  res.json({ status: true, message: "Device unassigned" });
};

/* ---------------- DELETE (SUPERADMIN) ---------------- */
exports.remove = async (req, res) => {
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  await MappingModel.findByIdAndDelete(req.params.id);
  res.json({ status: true, message: "Mapping deleted permanently" });
};
