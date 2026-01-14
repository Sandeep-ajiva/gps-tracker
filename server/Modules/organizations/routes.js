const express = require("express");
const router = express.Router();

const requireAuth = require("../../middleware/verifyToken");
const checkAuthorization = require("../../middleware/checkAuthorization");

const Controller = require('./controller')

router.post(
  "/",
  requireAuth,
  checkAuthorization(["superadmin"], "organizations", "create"),
  Controller.createOrganization
);


module.exports = router;
