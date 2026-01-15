/**
 * GPS DEVICE ROUTES
 *
 *  POST    /api/gpsDevice                   -> create gps device (stock entry)
 *  GET     /api/gpsDevice                   -> get gps devices (list + filters)
 *  GET     /api/gpsDevice/:id                -> get gps device by id
 *  PUT     /api/gpsDevice/:id                -> update gps device details
 *  PATCH   /api/gpsDevice/:id/mark-faulty    -> mark device as faulty
 *  POST    /api/gpsDevice/:id/assign         -> assign device to vehicle
 *  POST    /api/gpsDevice/:id/unassign       -> unassign device from vehicle
 *  GET     /api/gpsDevice/available          -> get available (stock) devices
 *  PATCH   /api/gpsDevice/:id/deactivate     -> soft delete gps device
 *  DELETE  /api/gpsDevice/:id                -> hard delete gps device (super admin)
 */

const express = require("express");
const router = express.Router();

// Controllers
const GpsDeviceController = require("./controller");

// Middlewares
const verifyToken = require("../../middleware/verifyToken");
const checkAuthorization = require("../../middleware/checkAuthorization");

// --------------------------------------------------
// CREATE GPS DEVICE (Stock Entry)
// POST /api/gps-devices
// --------------------------------------------------
router.post(
  "/",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "gps-devices", "create"),
  GpsDeviceController.create
);

// --------------------------------------------------
// GET GPS DEVICES (List + Filters)
// GET /api/gps-devices
// --------------------------------------------------
router.get(
  "/",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "gps-devices", "read"),
  GpsDeviceController.getAll
);

// --------------------------------------------------
// GET AVAILABLE (STOCK) DEVICES
// GET /api/gps-devices/available
// --------------------------------------------------
router.get(
  "/available",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "gps-devices", "read"),
  GpsDeviceController.getAvailable
);

// --------------------------------------------------
// GET GPS DEVICE BY ID
// GET /api/gps-devices/:id
// --------------------------------------------------
router.get(
  "/:id",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "gps-devices", "read"),
  GpsDeviceController.getById
);

// --------------------------------------------------
// UPDATE GPS DEVICE DETAILS
// PUT /api/gps-devices/:id
// --------------------------------------------------
router.put(
  "/:id",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "gps-devices", "update"),
  GpsDeviceController.update
);

// --------------------------------------------------
// MARK DEVICE AS FAULTY
// PATCH /api/gps-devices/:id/mark-faulty
// --------------------------------------------------
router.patch(
  "/:id/mark-faulty",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "gps-devices", "update"),
  GpsDeviceController.markFaulty
);

// --------------------------------------------------
// ASSIGN DEVICE TO VEHICLE
// POST /api/gps-devices/:id/assign
// --------------------------------------------------
router.post(
  "/:id/assign",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "gps-devices", "update"),
  GpsDeviceController.assignToVehicle
);

// --------------------------------------------------
// UNASSIGN DEVICE FROM VEHICLE
// POST /api/gps-devices/:id/unassign
// --------------------------------------------------
router.post(
  "/:id/unassign",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "gps-devices", "update"),
  GpsDeviceController.unassignFromVehicle
);

// --------------------------------------------------
// SOFT DELETE (DEACTIVATE DEVICE)
// PATCH /api/gps-devices/:id/deactivate
// --------------------------------------------------
router.patch(
  "/:id/deactivate",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "gps-devices", "update"),
  GpsDeviceController.deactivate
);

// --------------------------------------------------
// HARD DELETE (SUPER ADMIN ONLY)
// DELETE /api/gps-devices/:id
// --------------------------------------------------
router.delete(
  "/:id",
  verifyToken,
  checkAuthorization(["super_admin"], "gps-devices", "delete"),
  GpsDeviceController.remove
);

module.exports = router;
