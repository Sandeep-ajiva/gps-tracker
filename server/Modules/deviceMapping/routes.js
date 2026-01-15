/**
 * VEHICLE – GPS DEVICE MAPPING ROUTES
 *
 *  POST    /api/vehicle-device-mappings                 -> assign gps device to vehicle
 *  GET     /api/vehicle-device-mappings                 -> get mapping history (list + filters)
 *  GET     /api/vehicle-device-mappings/:id             -> get mapping by id
 *  GET     /api/vehicle-device-mappings/vehicle/:id     -> get device history of a vehicle
 *  GET     /api/vehicle-device-mappings/device/:id      -> get vehicle history of a device
 *  PATCH   /api/vehicle-device-mappings/:id/unassign    -> unassign gps device from vehicle
 *  DELETE  /api/vehicle-device-mappings/:id             -> hard delete mapping (super admin)
 */

const express = require("express");
const router = express.Router();

// Controller
const VehicleDeviceMappingController = require("./controller");

// Middlewares
const verifyToken = require("../../middleware/verifyToken");
const checkAuthorization = require("../../middleware/checkAuthorization");

// --------------------------------------------------
// ASSIGN GPS DEVICE TO VEHICLE
// POST /api/vehicle-device-mappings
// --------------------------------------------------
router.post(
  "/",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "vehicle-device-mappings", "create"),
  VehicleDeviceMappingController.assign
);

// --------------------------------------------------
// GET ALL MAPPINGS (History + Filters)
// GET /api/vehicle-device-mappings
// --------------------------------------------------
router.get(
  "/",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "vehicle-device-mappings", "read"),
  VehicleDeviceMappingController.getAll
);

// --------------------------------------------------
// GET MAPPING BY ID
// GET /api/vehicle-device-mappings/:id
// --------------------------------------------------
router.get(
  "/:id",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "vehicle-device-mappings", "read"),
  VehicleDeviceMappingController.getById
);

// --------------------------------------------------
// GET DEVICE HISTORY OF A VEHICLE
// GET /api/vehicle-device-mappings/vehicle/:id
// --------------------------------------------------
router.get(
  "/vehicle/:id",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "vehicle-device-mappings", "read"),
  VehicleDeviceMappingController.getByVehicle
);

// --------------------------------------------------
// GET VEHICLE HISTORY OF A DEVICE
// GET /api/vehicle-device-mappings/device/:id
// --------------------------------------------------
router.get(
  "/device/:id",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "vehicle-device-mappings", "read"),
  VehicleDeviceMappingController.getByDevice
);

// --------------------------------------------------
// UNASSIGN GPS DEVICE FROM VEHICLE
// PATCH /api/vehicle-device-mappings/:id/unassign
// --------------------------------------------------
router.patch(
  "/:id/unassign",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "vehicle-device-mappings", "update"),
  VehicleDeviceMappingController.unassign
);

// --------------------------------------------------
// HARD DELETE MAPPING (SUPER ADMIN ONLY)
// DELETE /api/vehicle-device-mappings/:id
// --------------------------------------------------
router.delete(
  "/:id",
  verifyToken,
  checkAuthorization(["super_admin"], "vehicle-device-mappings", "delete"),
  VehicleDeviceMappingController.remove
);

module.exports = router;
