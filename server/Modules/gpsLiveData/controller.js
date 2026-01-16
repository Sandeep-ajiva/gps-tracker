// Imports moved to Service
// const GpsLiveData = require("./model");
// const GpsHistory = require("../gpsHistory/model");
// const GpsDevice = require("../gpsDevice/model");
// const redisClient = require("../../config/redis");
const { getIo } = require("../../socket");
const GpsService = require("./service");

const Controller = {
    // Receives data from device/simulator
    // Body: { imei, lat, lng, speed, activation, etc. }
    ingestData: async (req, res) => {
        const result = await GpsService.processGpsData(req.body);
        return res.status(result.status).json({ message: result.message });
    },

    getAll: async (req, res) => {
        // Implement logic to get all current live data for an org
        // ...
    }
};

module.exports = Controller;
