const jwt = require("jsonwebtoken");
const User = require("../Modules/users/model");

const JWT_SECRET = process.env.SECRET_KEY;

const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ status: false, message: 'Unauthorized Token: No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized: User not found",
      });
    }

    if (user.status && user.status !== "active") {
      return res.status(403).json({
        status: false,
        message: "Forbidden: User is inactive",
      });
    }

    // 5️⃣ Attach ONLY required fields to req.user
    req.user = {
      _id: user._id,
      role: user.role,
      organizationId: user.organizationId || null,
      assignedVehicleId: user.assignedVehicleId || null,
    };

    // 6️⃣ Proceed
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

module.exports = requireAuth;
