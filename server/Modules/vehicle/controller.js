const mongoose = require("mongoose");
const VehicleModel = require("./model");
const paginate = require("../../helpers/limitoffset");
const Validator = require("../../helpers/validators");

/**
 * =========================
 * VALIDATION
 * =========================
 */
const validateVehicleData = async (data) => {
  const rules = {
    organizationId: "required|string",
    vehicleType: "required|in:car,bus,truck,bike,other",
    vehicleNumber: "string",
    model: "string",
    status: "in:active,inactive",
  };

  const validator = new Validator(data, rules);
  await validator.validate();
};

/**
 * =========================
 * CREATE VEHICLE
 * POST /api/vehicles
 * =========================
 */
exports.create = async (req, res) => {
  try {
    await validateVehicleData(req.body);

    const {
      organizationId,
      vehicleType,
      vehicleNumber,
      model,
      status,
    } = req.body;

    // If vehicle type requires number plate
    if (
      ["car", "bus", "truck", "bike"].includes(vehicleType) &&
      !vehicleNumber
    ) {
      return res.status(400).json({
        status: false,
        message: "Vehicle number is required for selected vehicle type",
      });
    }

    // Duplicate check (same org + vehicle number)
    if (vehicleNumber) {
      const exists = await VehicleModel.findOne({
        organizationId,
        vehicleNumber,
      });

      if (exists) {
        return res.status(400).json({
          status: false,
          message: "Vehicle already exists",
        });
      }
    }

    const vehicle = await VehicleModel.create({
      organizationId,
      vehicleType,
      vehicleNumber,
      model,
      status: status || "active",
      createdBy: req.user?._id,
    });

    return res.status(201).json({
      status: true,
      message: "Vehicle created successfully",
      data: vehicle,
    });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        status: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * GET ALL VEHICLES (LIST + FILTERS)
 * GET /api/vehicles
 * =========================
 */
exports.getAll = async (req, res) => {
  try {
    const {
      organizationId,
      vehicleType,
      status,
      page,
      limit,
      search,
    } = req.query;

    const filter = {};
    if (organizationId) filter.organizationId = organizationId;
    if (vehicleType) filter.vehicleType = vehicleType;
    if (status) filter.status = status;

    const result = await paginate(
      VehicleModel,
      filter,
      page,
      limit,
      ["createdBy"],
      ["vehicleNumber", "model", "vehicleType"],
      search
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * =========================
 * GET VEHICLE BY ID
 * GET /api/vehicles/:id
 * =========================
 */
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid vehicle ID",
      });
    }

    const vehicle = await VehicleModel.findById(id).populate("createdBy");

    if (!vehicle) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Vehicle fetched successfully",
      data: vehicle,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * UPDATE VEHICLE
 * PUT /api/vehicles/:id
 * =========================
 */
exports.update = async (req, res) => {
  try {
    await validateVehicleData(req.body);

    const { id } = req.params;

    const updatedVehicle = await VehicleModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Vehicle updated successfully",
      data: updatedVehicle,
    });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        status: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * SOFT DELETE (DEACTIVATE)
 * PATCH /api/vehicles/:id/deactivate
 * =========================
 */
exports.deactivate = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await VehicleModel.findByIdAndUpdate(
      id,
      { status: "inactive" },
      { new: true }
    );

    if (!vehicle) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Vehicle deactivated successfully",
      data: vehicle,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * HARD DELETE (SUPER ADMIN)
 * DELETE /api/vehicles/:id
 * =========================
 */
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await VehicleModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
