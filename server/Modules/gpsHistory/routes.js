const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: true,
    module: "working",
    message: "This module is active"
  });
});

module.exports = router;
