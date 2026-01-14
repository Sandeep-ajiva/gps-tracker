 const Organization = require('./model');
const Validator = require('../../helpers/validators');

const validateOrganizationData = async (data) => {
    const rules = {
        name: "required",
        email: "required",
        phone: "required",
        address: "required",
    }
    const validator = new Validator(data, rules);
    await validator.validate()

}


exports.createOrganization = async (req, res) => {
    try {
        await validateOrganizationData(req.body);

        const { name, email, phone, address } = req.body;

        const existingOrg = await Organization.findOne({
            $or: [{ email }, { phone }]
        })
        if (existingOrg) {
            return res.status(409).json({
                status: false,
                message: "Organization already exist"
            })
        }
        const organization = await Organization.create({
            name,
            email: email.toLowerCase(),
            phone: phone.trim(),
            address,
            parentOrganizationId: null,
            createdBy: req.user._id,
            status: "active"
        })
        return res.status(201).json({
            status: true,
            message: "Organization Created Successfully",
            data: organization
        })
    } catch (error) {
        console.error("Create Organization Error:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};