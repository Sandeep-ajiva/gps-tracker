const express = require("express");
const router = express.Router();

const GpsDeviceController = require("./controller");

const verifyToken = require("../../middleware/verifyToken");
const checkAuthorization = require("../../middleware/checkAuthorization");
const checkOrganization = require("../../middleware/checkOrganization");

// CREATE GPS DEVICE
router.post(
  "/",
  verifyToken,
  checkAuthorization(["admin", "superadmin"], "gpsDevice", "create"),
  checkOrganization,
  GpsDeviceController.create
);

// GET ALL GPS DEVICES
router.get(
  "/",
  verifyToken,
  checkAuthorization(["admin", "superadmin"], "gpsDevice", "read"),
  checkOrganization,
  GpsDeviceController.getAll
);

// GET AVAILABLE DEVICES
router.get(
  "/available",
  verifyToken,
  checkAuthorization(["admin", "superadmin"], "gpsDevice", "read"),
  checkOrganization,
  GpsDeviceController.getAvailable
);

// GET DEVICE BY ID
router.get(
  "/:id",
  verifyToken,
  checkAuthorization(["admin", "superadmin"], "gpsDevice", "read"),
  checkOrganization,
  GpsDeviceController.getById
);

// UPDATE DEVICE
router.put(
  "/:id",
  verifyToken,
  checkAuthorization(["admin", "superadmin"], "gpsDevice", "update"),
  checkOrganization,
  GpsDeviceController.update
);

// MARK FAULTY
// router.patch(
//   "/:id/mark-faulty",
//   verifyToken,
//   checkAuthorization(["admin", "superadmin"], "gpsDevice", "update"),
//   checkOrganization,
//   GpsDeviceController.markFaulty
// );

// ASSIGN DEVICE TO VEHICLE
// router.post(
//   "/:id/assign",
//   verifyToken,
//   checkAuthorization(["admin", "superadmin"], "gpsDevice", "update"),
//   checkOrganization,
//   GpsDeviceController.assignToVehicle
// );

// UNASSIGN DEVICE
// router.post(
//   "/:id/unassign",
//   verifyToken,
//   checkAuthorization(["admin", "superadmin"], "gpsDevice", "update"),
//   checkOrganization,
//   GpsDeviceController.unassignFromVehicle
// );

// DEACTIVATE DEVICE
router.patch(
  "/:id/deactivate",
  verifyToken,
  checkAuthorization(["admin", "superadmin"], "gpsDevice", "update"),
  checkOrganization,
  GpsDeviceController.deactivate
);

// HARD DELETE (SUPERADMIN)
router.delete(
  "/:id",
  verifyToken,
  checkAuthorization(["superadmin"], "gpsDevice", "delete"),
  checkOrganization,
  GpsDeviceController.remove
);

module.exports = router;
