const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const User = require('../users/model');
const Validator = require('../../helpers/validators')

const JWT_SECRET = process.env.JWT_SECRET;
console.log("LOGIN SECRET:", JWT_SECRET);

const validateLoginData = async (data) => {
    const rules = {
        email: "required|email",
        passwordHash: "required"
    }
    const validator = new Validator(data, rules)
    await validator.validate()
}


exports.login = async (req, res) => {
    try {
        await validateLoginData(req.body);

        const { email, passwordHash } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            return res
                .status(401)
                .json({ status: false, message: "Invalid email or password" });
        }
        const isMatch = bcrypt.compare(passwordHash, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password"
            })
        }
        if (user.status !== "active") {
            return res.status(403).json({
                status: false,
                message: "User account is inactive",
            });
        }
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                organizationId: user.organizationId || null
            },
            JWT_SECRET,
            { expiresIn: "1d" }
        )
        return res.status(200).json({
            status: true,
            message: "Login Successfully",
            token,
            user: {
                _id: user._id,
                role: user.role,
                organizationId: user.organizationId,
            },

        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Server error",
        });
    }
}