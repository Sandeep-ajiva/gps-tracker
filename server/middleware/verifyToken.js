const jwt = require('jsonwebtoken');
const  JWT_SECRET  = process.env.SECRET_KEY;
const User = require("../Modules/user/model");
const verifyToken =  (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ status:false, message: 'Unauthorized Token: No token provided' });
  }

  jwt.verify(token, JWT_SECRET,async (err, decoded) => {
    if (err) {
      return res.status(401).json({  status:false,message: 'Token is invalid or expired' });
    }
    const user = await User.findOne({ email: decoded.email });
   
    
    if (!user) {
      return res.status(401).json({ status:false, message: "Unauthorized Token: User not found" });
    }

    req.user = user;
    next(); 
  });
};


module.exports = verifyToken;
