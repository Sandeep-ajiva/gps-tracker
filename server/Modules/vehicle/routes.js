//  POST    api/vehicles                    for create vehicles
//  GET     api/vehicles                    for get vehicles (list + filters)
//  GET     /api/vehicles/:id               for get vehicle by id
//  PUT     /api/vehicles/:id               for update vehicle details
//  PATCH   /api/vehicles/:id/deactivate    for soft delete vehicle
//  Delete  /api/vehicle/:id                for hard delete vehicle (Only super admin)

const express = require("express");
const router = express.Router();

// Middlewares file imports
const VehicleController = require("./controller");
const verifyToken = require("../../middleware/verifyToken");
const checkAuthorization = require("../../middleware/checkAuthorization");

// vehicle routes

// create vehicle
router.post(
  "/",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "vehicles", "create"),
  VehicleController.create
);

// Get vehicle
router.get(
  "/",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "vehicles", "read"),
  VehicleController.getAll
);

// Get by Id Vehicle
router.get(
  "/:id",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "vehicles", "read"),
  VehicleController.getById
);

// PUT for update vehile details
router.put(
  "/:id",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "vehicles", "update"),
  VehicleController.update
);

// SOFT DELETE (deactivate vehicle)
// PATCH /api/vehicles/:id/deactivate
router.patch(
  "/:id/deactivate",
  verifyToken,
  checkAuthorization(["admin", "super_admin"], "vehicles", "update"),
  VehicleController.deactivate
);

// HARD DELETE (super admin only)
// DELETE /api/vehicles/:id
router.delete(
  "/:id",
  verifyToken,
  checkAuthorization(["super_admin"], "vehicles", "delete"),
  VehicleController.remove
);

module.exports = router;
