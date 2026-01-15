const mongoose = require("mongoose");
const GpsDeviceModel = require("./model");
const VehicleModel = require("../vehicle/model");
const paginate = require("../../helpers/limitoffset");
const Validator = require("../../helpers/validators");

/* ---------------- VALIDATION ---------------- */
const validateGpsDevice = async (data, isUpdate = false) => {
  const rules = {
    imei: isUpdate ? "string|min:10" : "required|string|min:10",
    model: "required|string|min:2",
    vendor: "string",
  };

  const validator = new Validator(data, rules);
  await validator.validate();
};

/* ---------------- CREATE ---------------- */
exports.create = async (req, res) => {
  try {
    await validateGpsDevice(req.body);

    const organizationId =
      req.user.role === "superadmin"
        ? req.body.organizationId
        : req.orgId;

    if (!organizationId) {
      return res.status(400).json({ message: "OrganizationId required" });
    }

    const device = await GpsDeviceModel.create({
      ...req.body,
      organizationId,
      status: "stock",
      isActive: true,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      status: true,
      message: "GPS device added",
      data: device,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- GET ALL ---------------- */
exports.getAll = async (req, res) => {
  try {
    const { status, model, vendor, page, limit, search } = req.query;

    const filter = { isActive: true };

    if (req.user.role !== "superadmin") {
      filter.organizationId = req.orgId;
    }

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

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- GET AVAILABLE ---------------- */
exports.getAvailable = async (req, res) => {
  const filter = {
    status: "stock",
    isActive: true,
  };

  if (req.user.role !== "superadmin") {
    filter.organizationId = req.orgId;
  }

  const devices = await GpsDeviceModel.find(filter);
  res.json({ status: true, data: devices });
};

/* ---------------- GET BY ID ---------------- */
exports.getById = async (req, res) => {
  const device = await GpsDeviceModel.findById(req.params.id);

  if (!device) return res.status(404).json({ message: "Not found" });

  if (
    req.user.role !== "superadmin" &&
    device.organizationId.toString() !== req.orgId.toString()
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json({ status: true, data: device });
};

/* ---------------- UPDATE ---------------- */
exports.update = async (req, res) => {
  const device = await GpsDeviceModel.findById(req.params.id);
  if (!device) return res.status(404).json({ message: "Not found" });

  if (
    req.user.role !== "superadmin" &&
    device.organizationId.toString() !== req.orgId.toString()
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  Object.assign(device, req.body);
  await device.save();

  res.json({ status: true, message: "Updated", data: device });
};

/* ---------------- ASSIGN ---------------- */
exports.assignToVehicle = async (req, res) => {
  const { vehicleId } = req.body;

  const device = await GpsDeviceModel.findById(req.params.id);
  const vehicle = await VehicleModel.findById(vehicleId);

  if (!device || !vehicle)
    return res.status(404).json({ message: "Device or Vehicle not found" });

  if (
    req.user.role !== "superadmin" &&
    (device.organizationId.toString() !== req.orgId.toString() ||
      vehicle.organizationId.toString() !== req.orgId.toString())
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (device.status !== "stock") {
    return res.status(400).json({ message: "Device not available" });
  }

  device.status = "assigned";
  device.assignedVehicle = vehicleId;
  device.assignedAt = new Date();

  await device.save();

  res.json({ status: true, message: "Assigned", data: device });
};

/* ---------------- UNASSIGN ---------------- */
exports.unassignFromVehicle = async (req, res) => {
  const device = await GpsDeviceModel.findById(req.params.id);

  if (!device) return res.status(404).json({ message: "Not found" });

  if (
    req.user.role !== "superadmin" &&
    device.organizationId.toString() !== req.orgId.toString()
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  device.status = "stock";
  device.assignedVehicle = null;

  await device.save();

  res.json({ status: true, message: "Unassigned" });
};

/* ---------------- DEACTIVATE ---------------- */
exports.deactivate = async (req, res) => {
  const device = await GpsDeviceModel.findById(req.params.id);

  if (!device) return res.status(404).json({ message: "Not found" });

  if (
    req.user.role !== "superadmin" &&
    device.organizationId.toString() !== req.orgId.toString()
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  device.isActive = false;
  await device.save();

  res.json({ status: true, message: "Deactivated" });
};

/* ---------------- DELETE (SUPERADMIN) ---------------- */
exports.remove = async (req, res) => {
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  await GpsDeviceModel.findByIdAndDelete(req.params.id);
  res.json({ status: true, message: "Deleted permanently" });
};
