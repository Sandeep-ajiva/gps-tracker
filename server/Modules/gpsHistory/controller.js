const GpsHistory = require("./model");
const Vehicle = require("../vehicle/model");

exports.getHistory = async (req, res) => {
  try {
    const { vehicleId, startDate, endDate } = req.query;

    if (!vehicleId) {
      return res.status(400).json({ status: false, message: "Vehicle ID is required" });
    }

    // Validate Vehicle ownership (optional, depending on requirements)
    // const vehicle = await Vehicle.findOne({ _id: vehicleId, organizationId: req.user.organizationId });
    // if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const query = {
      vehicleId,
    };

    if (startDate || endDate) {
      query.recordedAt = {};
      if (startDate) query.recordedAt.$gte = new Date(startDate);
      if (endDate) query.recordedAt.$lte = new Date(endDate);
    }

    // Limit results to prevent crashing the browser with too many points
    const history = await GpsHistory.find(query)
      .sort({ recordedAt: 1 })
      .limit(5000); // Max 5000 points per request

    return res.status(200).json({
      status: true,
      count: history.length,
      data: history
    });

  } catch (error) {
    console.error("Get History Error:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteHistory = async (req, res) => {
  try {
    // Only Super Admin should delete history?
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: "Denied" });
    }

    const { vehicleId } = req.query;
    if (!vehicleId) return res.status(400).json({ message: "Provide vehicleId" });

    await GpsHistory.deleteMany({ vehicleId });
    return res.status(200).json({ status: true, message: "History cleared for vehicle" });

  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
}
